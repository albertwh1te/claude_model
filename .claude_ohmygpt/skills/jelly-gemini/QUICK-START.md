# Gemini CLI - Quick Start Guide

Get started with the Gemini CLI wrapper in 5 minutes.

## 1. Install Dependencies

```bash
cd /Users/jelly/personal/jelly-dotclaude/skills/jelly-gemini
npm install
```

## 2. Set API Key

```bash
export GOOGLE_API_KEY="your_api_key_here"
```

Get your API key: https://aistudio.google.com/app/apikey

## 3. Test Installation

```bash
node gemini-cli.js --help
```

You should see the help text.

## 4. Try Basic Commands

### Simple prompt
```bash
node gemini-cli.js "Explain AI in one sentence"
```

### Use specific model
```bash
node gemini-cli.js --model gemini-2.5-pro "Design a REST API"
```

### JSON output
```bash
node gemini-cli.js --format json "List 3 programming languages"
```

### Pipe content
```bash
echo "AI is amazing" | node gemini-cli.js "Summarize this"
```

### Analyze image
```bash
node gemini-cli.js --image screenshot.png "What's in this image?"
```

## 5. Common Use Cases

### Code Review
```bash
cat myfile.py | node gemini-cli.js --safety-level permissive "Review this code"
```

### Documentation
```bash
cat api.js | node gemini-cli.js --format markdown "Generate API docs"
```

### Data Processing
```bash
node gemini-cli.js --format json "Generate 5 sample user objects"
```

### Creative Writing
```bash
node gemini-cli.js --temperature 1.5 "Write a short story about robots"
```

## All Available Options

| Flag | Description | Example |
|------|-------------|---------|
| `--model`, `-m` | Model to use | `--model gemini-2.5-pro` |
| `--temperature`, `-t` | Randomness (0-2) | `--temperature 1.5` |
| `--max-tokens` | Max output length | `--max-tokens 16384` |
| `--safety-level` | Safety filter | `--safety-level permissive` |
| `--format` | Output format | `--format json` |
| `--image` | Image file | `--image pic.png` |
| `--no-stream` | Wait for full response | `--no-stream` |
| `--help`, `-h` | Show help | `--help` |

## Troubleshooting

### "GOOGLE_API_KEY not found"
```bash
export GOOGLE_API_KEY="your_key"
```

### "Cannot find module"
```bash
npm install
```

### "Permission denied"
```bash
chmod +x gemini-cli.js
```

## Full Documentation

- **CLI README**: `CLI-README.md` - Complete documentation
- **Implementation**: `IMPLEMENTATION-SUMMARY.md` - Technical details
- **Examples**: `examples/basic-usage.sh` - Practical examples
- **Tests**: `test-cli.sh` - Validation suite

## Support

- Gemini API Docs: https://ai.google.dev/gemini-api/docs
- Get API Key: https://aistudio.google.com/app/apikey
- Model Reference: https://ai.google.dev/gemini-api/docs/models

---

That's it! You're ready to use the Gemini CLI. 🚀
