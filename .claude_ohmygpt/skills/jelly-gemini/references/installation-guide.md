# Gemini CLI Installation & Configuration Guide

**Google Gemini CLI** - Command-line interface for Google Gemini AI models

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Authentication Setup](#authentication-setup)
- [Getting Started](#getting-started)
- [Available Models](#available-models)
- [Rate Limits](#rate-limits)
- [Command Reference](#command-reference)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

---

## Prerequisites

Before installing Gemini CLI, ensure you have:

- **Node.js 18+** (verified: v22.19.0 works)
- **npm** package manager
- **Google Gemini API Key** from [Google AI Studio](https://makersuite.google.com/app/apikey)

---

## Installation

### Step 1: Verify Node.js Version

```bash
node --version
```

**Required**: v18.0.0 or higher

### Step 2: Install Gemini CLI Globally

```bash
npm install -g @google/gemini-cli
```

**Installed version**: 0.15.4
**Dependencies**: 556 packages

### Step 3: Verify Installation

```bash
gemini --version
```

Expected output: `0.15.4` or higher

---

## Authentication Setup

### Option 1: Environment Variables (Recommended)

**For CLI usage**:
```bash
export GEMINI_API_KEY="your_api_key_here"
# or
export GOOGLE_API_KEY="your_api_key_here"
```

**Make permanent** (add to ~/.zshrc or ~/.bashrc):
```bash
echo 'export GEMINI_API_KEY="your_api_key_here"' >> ~/.zshrc
source ~/.zshrc
```

### Option 2: .env File (For Project-specific Usage)

Add to your `.env` file:
```bash
GOOGLE_API_KEY="your_api_key_here"
GEMINI_API_KEY="your_api_key_here"  # For Gemini CLI
```

**Note**: Ensure `.env` is in `.gitignore` to keep API keys secure.

### Option 3: Settings File

Create `~/.gemini/settings.json`:
```json
{
  "auth": {
    "apiKey": "your_api_key_here"
  }
}
```

---

## Getting Started

### Basic Usage

```bash
# Simple prompt
gemini "Hello, Gemini!"

# With system prompt
gemini --system="You are a helpful assistant" "What is the capital of France?"

# Specify model
gemini --model="gemini-pro" "Explain quantum computing"
```

### Verify API Key

```bash
echo $GEMINI_API_KEY
# Should output your API key (first 20 chars shown for security)
```

---

## Available Models

| Model ID | Context Window | Best For |
|----------|----------------|----------|
| `gemini-pro` | Standard | General tasks |
| `gemini-2.5-pro-latest` | 1M tokens | Long context, advanced reasoning |
| `gemini-2.0-flash-exp` | Experimental | Fast responses |

**Note**: Some models may have quota limitations on free tier.

---

## Rate Limits

### Free Tier

- **Requests per minute**: 60 RPM
- **Requests per day**: 1,000 RPD
- **Token limits**: Vary by model

### Quota Exceeded Error

If you see:
```
Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests
```

**Solution**: Wait for the suggested retry time or upgrade to paid tier.

---

## Command Reference

### Basic Commands

```bash
# Get help
gemini --help

# Check version
gemini --version

# Simple prompt
gemini "your prompt here"

# With options
gemini --model="gemini-pro" --system="system prompt" "user prompt"
```

### Common Options

| Option | Description |
|--------|-------------|
| `--model <model>` | Specify model (default: gemini-pro) |
| `--system <text>` | Set system prompt |
| `--temperature <num>` | Control randomness (0.0-1.0) |
| `--max-tokens <num>` | Maximum response tokens |

---

## Troubleshooting

### Error: "Please set an Auth method"

**Solution**: Set `GEMINI_API_KEY` environment variable:
```bash
export GEMINI_API_KEY="your_api_key_here"
```

### Error: "Quota exceeded"

**Cause**: Free tier limits reached (60 RPM or 1,000 RPD)

**Solutions**:
1. Wait for quota reset
2. Upgrade to paid tier
3. Use rate limiting in your application

### Error: "Model not found"

**Cause**: Model name incorrect or not available for API version

**Solution**: Use verified model names:
- `gemini-pro`
- `gemini-2.5-pro-latest`

### Both GOOGLE_API_KEY and GEMINI_API_KEY are set

**Note**: Gemini CLI uses `GOOGLE_API_KEY` if both are set. This is expected behavior.

---

## Best Practices

### Security

✅ **DO**:
- Store API keys in `.env` files
- Add `.env` to `.gitignore`
- Use environment variables for production
- Rotate API keys regularly

❌ **DON'T**:
- Commit API keys to version control
- Share API keys publicly
- Hard-code API keys in source code

### Performance

- Use appropriate models for your use case
- Implement retry logic for quota errors
- Cache responses when possible
- Monitor your usage at [Google AI Studio](https://ai.dev/usage?tab=rate-limit)

### Rate Limiting

For applications with high volume:
```bash
# Implement delays between requests
sleep 1  # Wait 1 second between API calls
```

---

## Additional Resources

- **Official Documentation**: https://geminicli.com/docs/
- **GitHub Repository**: https://github.com/google-gemini/gemini-cli
- **Google AI Studio**: https://makersuite.google.com/app/apikey
- **API Documentation**: https://ai.google.dev/gemini-api/docs
- **Usage Dashboard**: https://ai.dev/usage?tab=rate-limit

---

## Installation Summary

### Verified Configuration

- **Node.js**: v22.19.0 ✅
- **Gemini CLI**: v0.15.4 ✅
- **API Key**: Configured in `.env` ✅
- **Environment Variable**: `GEMINI_API_KEY` and `GOOGLE_API_KEY` ✅
- **Basic Test**: Successful ✅

### Quick Test

```bash
export GEMINI_API_KEY="your_api_key_here"
gemini "Hello, Gemini! Please respond with a short greeting."
```

**Expected Response**: A friendly greeting from Gemini

---

**Version**: 1.0
**Last Updated**: 2025-11-18
**Maintained By**: Jelly's .claude Configuration Project
