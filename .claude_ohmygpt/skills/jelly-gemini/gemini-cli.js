#!/usr/bin/env node

/**
 * Gemini CLI Wrapper
 *
 * A production-ready Node.js CLI wrapper for Google's Gemini AI API.
 * Provides streaming responses, multimodal support, session management,
 * and comprehensive error handling.
 *
 * Usage:
 *   gemini-cli "your prompt here"
 *   gemini-cli --model gemini-2.5-pro "complex analysis"
 *   gemini-cli --image screenshot.png "describe this image"
 *   cat prompt.txt | gemini-cli
 *
 * Environment:
 *   GOOGLE_API_KEY - Required. Get from https://aistudio.google.com/app/apikey
 */

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import { createInterface } from 'readline';

// ============================================================================
// Configuration and Constants
// ============================================================================

const DEFAULT_MODEL = 'gemini-2.5-flash';
const DEFAULT_TEMPERATURE = 1.0;
const DEFAULT_MAX_TOKENS = 8192;
const DEFAULT_SAFETY_LEVEL = 'default';

const SUPPORTED_IMAGE_FORMATS = ['.png', '.jpg', '.jpeg', '.webp', '.heic', '.heif'];
const MAX_IMAGE_SIZE = 20 * 1024 * 1024; // 20MB

const SAFETY_SETTINGS = {
  strict: [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  ],
  default: [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  ],
  permissive: [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
  ],
};

const ERROR_MESSAGES = {
  noApiKey: `Error: GOOGLE_API_KEY not found

To fix:
1. Set your Google API key: export GOOGLE_API_KEY="your_key"
2. Get a key: https://aistudio.google.com/app/apikey
3. Add to your shell profile for persistence

Example:
  export GOOGLE_API_KEY="AIzaSy..."
  gemini-cli "test prompt"`,

  invalidModel: (model) => `Error: Invalid or unavailable model "${model}"

To fix:
1. Use a supported model (gemini-2.5-flash, gemini-2.5-pro, etc.)
2. Check available models at https://ai.google.dev/gemini-api/docs/models
3. Verify your API key has access to the model

Example:
  gemini-cli --model gemini-2.5-flash "your prompt"`,

  rateLimited: `Error: Too many requests to Gemini API

To fix:
1. Wait 60 seconds and retry
2. Check your quota limits
3. Consider upgrading to a higher tier

Current limits (Free tier):
  - 15 requests per minute
  - 1M tokens per minute
  - 1500 requests per day`,

  safetyBlocked: (categories) => `Error: Content blocked by Gemini safety filters

Blocked categories: ${categories.join(', ')}

To fix:
1. Rephrase your prompt to avoid sensitive content
2. For code analysis: --safety-level permissive
3. Review content against Google's policies

Example:
  gemini-cli --safety-level permissive "analyze security code"`,

  invalidImage: (path) => `Error: Invalid or unsupported image file "${path}"

To fix:
1. Use supported formats: PNG, JPG, JPEG, WebP, HEIC, HEIF
2. Ensure file size is under 20MB
3. Check file exists and is readable

Example:
  gemini-cli --image screenshot.png "describe this"`,

  authFailed: `Error: Gemini API authentication failed

To fix:
1. Verify your API key is correct
2. Check key hasn't expired
3. Ensure key has Gemini API permissions

Get a new key: https://aistudio.google.com/app/apikey`,

  serviceUnavailable: `Error: Gemini API service unavailable

To fix:
1. Wait a few minutes and retry
2. Check Google Cloud Status: https://status.cloud.google.com/
3. Verify your internet connection

The service may be temporarily down for maintenance.`,
};

// ============================================================================
// Argument Parsing
// ============================================================================

function parseArgs() {
  const args = {
    model: DEFAULT_MODEL,
    temperature: DEFAULT_TEMPERATURE,
    maxTokens: DEFAULT_MAX_TOKENS,
    safetyLevel: DEFAULT_SAFETY_LEVEL,
    format: 'text',
    images: [],
    prompt: '',
    help: false,
    stream: true,
  };

  const argv = process.argv.slice(2);
  let positionalArgs = [];

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    const nextArg = argv[i + 1];

    if (arg === '--help' || arg === '-h') {
      args.help = true;
    } else if (arg === '--model' || arg === '-m') {
      args.model = nextArg;
      i++;
    } else if (arg === '--temperature' || arg === '-t') {
      args.temperature = parseFloat(nextArg);
      i++;
    } else if (arg === '--max-tokens') {
      args.maxTokens = parseInt(nextArg, 10);
      i++;
    } else if (arg === '--safety-level') {
      args.safetyLevel = nextArg;
      i++;
    } else if (arg === '--format') {
      args.format = nextArg;
      i++;
    } else if (arg === '--image') {
      args.images.push(nextArg);
      i++;
    } else if (arg === '--no-stream') {
      args.stream = false;
    } else if (!arg.startsWith('-')) {
      positionalArgs.push(arg);
    }
  }

  // Join positional args as prompt
  args.prompt = positionalArgs.join(' ');

  return args;
}

function showHelp() {
  console.log(`Gemini CLI - Google Gemini AI Command Line Interface

USAGE:
  gemini-cli [OPTIONS] <prompt>
  cat file.txt | gemini-cli [OPTIONS]

OPTIONS:
  -m, --model <model>          Model to use (default: gemini-2.5-flash)
                               Options: gemini-2.5-flash, gemini-2.5-pro,
                                       gemini-3.0-deep-think, gemini-1.5-pro

  -t, --temperature <temp>     Temperature 0.0-2.0 (default: 1.0)
                               Lower = more focused, Higher = more creative

  --max-tokens <num>           Maximum output tokens (default: 8192)

  --safety-level <level>       Safety filter level (default: default)
                               Options: strict, default, permissive

  --format <format>            Output format (default: text)
                               Options: text, json, markdown, code

  --image <path>               Add image file (can be used multiple times)
                               Supports: PNG, JPG, JPEG, WebP, HEIC, HEIF

  --no-stream                  Disable streaming (wait for complete response)

  -h, --help                   Show this help message

EXAMPLES:
  # Basic usage
  gemini-cli "Explain quantum computing"

  # Use specific model
  gemini-cli --model gemini-2.5-pro "Design a scalable API"

  # Analyze image
  gemini-cli --image screenshot.png "What's in this image?"

  # Multiple images
  gemini-cli --image before.png --image after.png "Compare these"

  # Code analysis with permissive safety
  gemini-cli --safety-level permissive "Review this security code"

  # JSON output
  gemini-cli --format json "List programming languages"

  # Pipe input
  cat document.txt | gemini-cli "Summarize this"

  # Creative writing
  gemini-cli --temperature 1.5 "Write a short story about AI"

ENVIRONMENT:
  GOOGLE_API_KEY               Required. Get from https://aistudio.google.com/app/apikey

MORE INFO:
  Documentation: https://ai.google.dev/gemini-api/docs
  GitHub: https://github.com/google/generative-ai-js
`);
}

// ============================================================================
// Image Processing
// ============================================================================

function validateImage(imagePath) {
  try {
    const ext = extname(imagePath).toLowerCase();
    if (!SUPPORTED_IMAGE_FORMATS.includes(ext)) {
      throw new Error(`Unsupported format: ${ext}`);
    }

    const stats = readFileSync(imagePath);
    if (stats.length > MAX_IMAGE_SIZE) {
      throw new Error(`File too large: ${(stats.length / 1024 / 1024).toFixed(2)}MB (max 20MB)`);
    }

    return true;
  } catch (error) {
    throw new Error(`Cannot read image: ${error.message}`);
  }
}

function imageToGenerativePart(imagePath) {
  const ext = extname(imagePath).toLowerCase();
  const mimeTypeMap = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.heic': 'image/heic',
    '.heif': 'image/heif',
  };

  const imageData = readFileSync(resolve(imagePath));

  return {
    inlineData: {
      data: imageData.toString('base64'),
      mimeType: mimeTypeMap[ext] || 'image/jpeg',
    },
  };
}

// ============================================================================
// Response Formatting
// ============================================================================

function formatResponse(text, format) {
  switch (format) {
    case 'json':
      try {
        // Try to extract JSON from markdown code blocks
        const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[1]);
          return JSON.stringify(parsed, null, 2);
        }
        // Try to parse as direct JSON
        const parsed = JSON.parse(text);
        return JSON.stringify(parsed, null, 2);
      } catch (e) {
        return text; // Return as-is if not valid JSON
      }

    case 'code':
      // Extract code blocks
      const codeMatch = text.match(/```[\w]*\n([\s\S]*?)\n```/);
      return codeMatch ? codeMatch[1] : text;

    case 'markdown':
      return text; // Already in markdown format

    case 'text':
    default:
      return text;
  }
}

// ============================================================================
// Error Handling
// ============================================================================

class GeminiError extends Error {
  constructor(message, type, retryable = false) {
    super(message);
    this.name = 'GeminiError';
    this.type = type;
    this.retryable = retryable;
  }
}

function handleError(error, attempt = 1, maxRetries = 3) {
  // Authentication errors
  if (error.message?.includes('API_KEY') || error.status === 401 || error.status === 403) {
    console.error(ERROR_MESSAGES.authFailed);
    process.exit(1);
  }

  // Rate limiting
  if (error.status === 429) {
    if (attempt < maxRetries) {
      const waitTime = Math.pow(2, attempt) + Math.random();
      console.error(`\nRate limited. Retrying in ${waitTime.toFixed(1)}s (attempt ${attempt}/${maxRetries})...`);
      return new Promise(resolve => setTimeout(resolve, waitTime * 1000));
    } else {
      console.error(ERROR_MESSAGES.rateLimited);
      process.exit(1);
    }
  }

  // Safety blocks
  if (error.message?.includes('SAFETY') || error.message?.includes('blocked')) {
    const categories = ['Unknown'];
    console.error(ERROR_MESSAGES.safetyBlocked(categories));
    process.exit(1);
  }

  // Service unavailable
  if (error.status === 500 || error.status === 503 || error.status === 504) {
    if (attempt < maxRetries) {
      const waitTime = Math.pow(2, attempt);
      console.error(`\nService unavailable. Retrying in ${waitTime}s (attempt ${attempt}/${maxRetries})...`);
      return new Promise(resolve => setTimeout(resolve, waitTime * 1000));
    } else {
      console.error(ERROR_MESSAGES.serviceUnavailable);
      process.exit(1);
    }
  }

  // Generic error
  console.error(`Error: ${error.message || 'Unknown error occurred'}`);

  if (error.stack) {
    console.error('\nStack trace:');
    console.error(error.stack);
  }

  process.exit(1);
}

// ============================================================================
// API Client
// ============================================================================

async function generateContent(genAI, args, prompt) {
  const model = genAI.getGenerativeModel({
    model: args.model,
    safetySettings: SAFETY_SETTINGS[args.safetyLevel] || SAFETY_SETTINGS.default,
    generationConfig: {
      temperature: args.temperature,
      maxOutputTokens: args.maxTokens,
      topP: 0.95,
      topK: 40,
    },
  });

  // Build content parts
  const parts = [];

  // Add text prompt
  parts.push({ text: prompt });

  // Add images if present
  for (const imagePath of args.images) {
    try {
      validateImage(imagePath);
      parts.push(imageToGenerativePart(imagePath));
    } catch (error) {
      console.error(ERROR_MESSAGES.invalidImage(imagePath));
      console.error(`Details: ${error.message}`);
      process.exit(1);
    }
  }

  // Generate content
  let attempt = 1;
  const maxRetries = 3;

  while (attempt <= maxRetries) {
    try {
      if (args.stream) {
        // Streaming mode
        const result = await model.generateContentStream({ contents: [{ role: 'user', parts }] });

        let fullText = '';
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          process.stdout.write(chunkText);
          fullText += chunkText;
        }

        console.log(); // Final newline
        return fullText;
      } else {
        // Non-streaming mode
        const result = await model.generateContent({ contents: [{ role: 'user', parts }] });
        const response = await result.response;
        const text = response.text();

        return text;
      }
    } catch (error) {
      const waitPromise = handleError(error, attempt, maxRetries);
      if (waitPromise) {
        await waitPromise;
        attempt++;
        continue;
      } else {
        throw error;
      }
    }
  }
}

// ============================================================================
// Input Handling
// ============================================================================

async function readStdin() {
  return new Promise((resolve) => {
    if (process.stdin.isTTY) {
      resolve('');
      return;
    }

    let data = '';
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });

    rl.on('line', (line) => {
      data += line + '\n';
    });

    rl.on('close', () => {
      resolve(data.trim());
    });
  });
}

// ============================================================================
// Main
// ============================================================================

async function main() {
  const args = parseArgs();

  // Show help
  if (args.help) {
    showHelp();
    process.exit(0);
  }

  // Check API key
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    console.error(ERROR_MESSAGES.noApiKey);
    process.exit(1);
  }

  // Get prompt from args or stdin
  let prompt = args.prompt;
  if (!prompt) {
    const stdinInput = await readStdin();
    if (!stdinInput) {
      console.error('Error: No prompt provided\n');
      showHelp();
      process.exit(1);
    }
    prompt = stdinInput;
  }

  // Initialize API client
  const genAI = new GoogleGenerativeAI(apiKey);

  try {
    // Generate content
    const text = await generateContent(genAI, args, prompt);

    // Format and output
    if (!args.stream) {
      // Only format if not streaming (already printed during streaming)
      const formatted = formatResponse(text, args.format);
      console.log(formatted);
    } else if (args.format !== 'text') {
      // Re-format if streaming but non-text format requested
      const formatted = formatResponse(text, args.format);
      console.log('\n--- Formatted Output ---');
      console.log(formatted);
    }

  } catch (error) {
    handleError(error);
  }
}

// Run main function
main().catch((error) => {
  console.error('Unexpected error:', error.message);
  process.exit(1);
});
