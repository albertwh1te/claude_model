# Gemini CLI Wrapper

A production-ready Node.js CLI wrapper for Google's Gemini AI API with streaming support, multimodal capabilities, and comprehensive error handling.

## Features

- **Streaming Responses**: Real-time output as the model generates
- **Multimodal Support**: Process images along with text prompts
- **Multiple Models**: Support for gemini-2.5-flash, gemini-2.5-pro, gemini-3.0-deep-think, and more
- **Flexible Configuration**: Control temperature, max tokens, safety settings
- **Response Formatting**: JSON, markdown, code extraction, or plain text
- **Error Handling**: User-friendly messages with actionable solutions
- **Retry Logic**: Automatic exponential backoff for rate limits and service errors
- **Stdin Support**: Pipe content from files or other commands

## Installation

### Prerequisites

- Node.js 18.0.0 or higher
- Google API key (get from https://aistudio.google.com/app/apikey)

### Setup

```bash
# Navigate to the skill directory
cd /Users/jelly/personal/jelly-dotclaude/skills/jelly-gemini

# Install dependencies
npm install

# Set your API key
export GOOGLE_API_KEY="your_api_key_here"

# Make executable (already done)
chmod +x gemini-cli.js

# Test installation
./gemini-cli.js --help
```

### Optional: Global Installation

```bash
# Link globally
npm link

# Now use from anywhere
gemini-cli "hello world"
```

## Usage

### Basic Usage

```bash
# Simple prompt
./gemini-cli.js "Explain quantum computing in simple terms"

# Use specific model
./gemini-cli.js --model gemini-2.5-pro "Design a scalable REST API"

# Disable streaming (wait for complete response)
./gemini-cli.js --no-stream "Generate a short story"
```

### Multimodal (Image Analysis)

```bash
# Single image
./gemini-cli.js --image screenshot.png "What's in this image?"

# Multiple images
./gemini-cli.js --image before.png --image after.png "Compare these screenshots"

# Image + detailed prompt
./gemini-cli.js --image diagram.png "Explain this architecture diagram in detail, focusing on data flow"
```

### Advanced Configuration

```bash
# Creative writing with higher temperature
./gemini-cli.js --temperature 1.5 --max-tokens 16384 "Write a sci-fi short story"

# Code analysis with permissive safety
./gemini-cli.js --safety-level permissive "Analyze this security vulnerability code"

# JSON output
./gemini-cli.js --format json "List the top 5 programming languages with pros and cons"

# Code extraction
./gemini-cli.js --format code "Write a Python function to calculate fibonacci"
```

### Stdin Piping

```bash
# Pipe file content
cat document.txt | ./gemini-cli.js "Summarize this document"

# Pipe from other commands
git diff | ./gemini-cli.js "Explain these code changes"

# Combine with jq for JSON processing
echo '{"task": "analyze"}' | ./gemini-cli.js --format json "Process this JSON"
```

## Command-Line Options

| Option | Short | Description | Default |
|--------|-------|-------------|---------|
| `--model` | `-m` | Model to use | `gemini-2.5-flash` |
| `--temperature` | `-t` | Randomness (0.0-2.0) | `1.0` |
| `--max-tokens` | | Maximum output tokens | `8192` |
| `--safety-level` | | Safety filter level | `default` |
| `--format` | | Output format | `text` |
| `--image` | | Image file path (repeatable) | `[]` |
| `--no-stream` | | Disable streaming | `false` |
| `--help` | `-h` | Show help | |

### Available Models

- `gemini-2.5-flash` - Fast, balanced performance (default)
- `gemini-2.5-pro` - Deep analysis, complex reasoning
- `gemini-3.0-deep-think` - Advanced mathematical/logical reasoning
- `gemini-1.5-pro` - Stable production model
- `gemini-1.5-flash` - Legacy fast model

### Safety Levels

- `strict` - Block medium and above for all categories
- `default` - Balanced safety (recommended)
- `permissive` - Only block high-risk content (for code analysis)

### Output Formats

- `text` - Plain text (default)
- `json` - Extract and pretty-print JSON
- `markdown` - Markdown formatted
- `code` - Extract code blocks only

## Examples

### Code Review

```bash
cat myfile.py | ./gemini-cli.js --model gemini-2.5-pro "Review this Python code for bugs and improvements"
```

### Image Analysis

```bash
./gemini-cli.js --image screenshot.png --image comparison.png "Compare these UI designs and suggest improvements"
```

### Creative Writing

```bash
./gemini-cli.js --temperature 1.8 --max-tokens 16384 "Write a detailed outline for a science fiction novel about AI consciousness"
```

### Data Processing

```bash
./gemini-cli.js --format json "Generate a JSON array of 10 sample user objects with name, email, and age fields"
```

### Documentation

```bash
cat api.py | ./gemini-cli.js --format markdown "Generate comprehensive API documentation for this code"
```

## Error Handling

The CLI provides clear, actionable error messages:

### Authentication Error
```
Error: GOOGLE_API_KEY not found

To fix:
1. Set your Google API key: export GOOGLE_API_KEY="your_key"
2. Get a key: https://aistudio.google.com/app/apikey
3. Add to your shell profile for persistence
```

### Rate Limiting
```
Error: Too many requests to Gemini API

To fix:
1. Wait 60 seconds and retry
2. Check your quota limits
3. Consider upgrading to a higher tier
```

### Safety Block
```
Error: Content blocked by Gemini safety filters

To fix:
1. Rephrase your prompt to avoid sensitive content
2. For code analysis: --safety-level permissive
3. Review content against Google's policies
```

## API Rate Limits (Free Tier)

- **Requests per minute**: 15
- **Tokens per minute**: 1,000,000
- **Requests per day**: 1,500

The CLI automatically retries with exponential backoff when rate limits are hit (up to 3 attempts).

## Supported Image Formats

- PNG (`.png`)
- JPEG (`.jpg`, `.jpeg`)
- WebP (`.webp`)
- HEIC (`.heic`)
- HEIF (`.heif`)

**Limitations**:
- Max file size: 20MB per image
- Max images: 16 per request
- Max resolution: 3072x3072 pixels

## Integration with jelly-gemini Skill

This CLI wrapper is designed to work seamlessly with the jelly-gemini skill in Claude Code:

```bash
# Claude Code can invoke the CLI
gemini-cli --model gemini-2.5-pro "Analyze this architecture"

# Or use it in skill workflows
cat codebase.txt | gemini-cli --safety-level permissive "Review security"
```

## Troubleshooting

### "Cannot find module '@google/generative-ai'"
```bash
npm install
```

### "Permission denied"
```bash
chmod +x gemini-cli.js
```

### "API key not valid"
- Verify your API key is correct
- Check it hasn't expired
- Ensure it has Gemini API permissions
- Get a new key: https://aistudio.google.com/app/apikey

### Streaming doesn't work
- Check your terminal supports ANSI output
- Try `--no-stream` for non-streaming mode
- Ensure Node.js 18+ is installed

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GOOGLE_API_KEY` | Yes | Google API key for Gemini API |

Add to your shell profile for persistence:

```bash
# ~/.bashrc or ~/.zshrc
export GOOGLE_API_KEY="AIzaSy..."
```

## Development

### Run Tests
```bash
npm test
```

### Debug Mode
```bash
NODE_DEBUG=* ./gemini-cli.js "test prompt"
```

### Lint and Format
```bash
# Add to package.json if needed
npm run lint
npm run format
```

## Architecture

The CLI follows a modular design:

1. **Argument Parsing**: Parse command-line flags and options
2. **Input Handling**: Read from args or stdin
3. **Validation**: Validate images, configuration
4. **API Client**: Initialize Google Generative AI SDK
5. **Content Generation**: Stream or batch generate content
6. **Error Handling**: Retry logic with exponential backoff
7. **Response Formatting**: Format based on `--format` flag
8. **Output**: Stream to stdout or print complete response

## Performance

- **Streaming mode**: ~2-10s for first token, continuous output
- **Non-streaming**: 5-30s depending on model and complexity
- **Memory**: ~50MB base + model overhead
- **Network**: Efficient chunked transfer encoding

## Security

- API keys read from environment only (not stored)
- No data persistence (stateless)
- Safety filters applied by default
- Image data transmitted as base64 over HTTPS

## License

MIT

## Links

- [Google Gemini API Docs](https://ai.google.dev/gemini-api/docs)
- [Get API Key](https://aistudio.google.com/app/apikey)
- [Model Reference](https://ai.google.dev/gemini-api/docs/models)
- [Safety Settings Guide](https://ai.google.dev/gemini-api/docs/safety-settings)
