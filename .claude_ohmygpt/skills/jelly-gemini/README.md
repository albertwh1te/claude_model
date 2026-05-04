# Jelly-Gemini: Google Gemini AI Integration for Claude Code

Harness the power of Google's latest Gemini AI models directly within Claude Code. The jelly-gemini skill gives you instant access to multimodal analysis, massive context windows (1M+ tokens), and blazing-fast inference—perfect for analyzing screenshots, reviewing entire codebases, or tackling complex reasoning problems.

## Overview

### What is Jelly-Gemini?

Jelly-gemini is a Claude Code skill that seamlessly integrates Google's Gemini AI models into your development workflow. Instead of switching between tools, you can now ask Claude Code to use Gemini for specific tasks, combining the strengths of both systems.

### Why Use Gemini?

Gemini excels in scenarios where Claude's native capabilities might be limited:

| Capability | Gemini | Claude |
|-----------|--------|--------|
| **Context Window** | 1M+ tokens | 200k tokens |
| **Image Analysis** | Native multimodal | Limited |
| **Processing Speed** | Flash: ultra-fast | Standard |
| **Use Cases** | Long documents, images | General coding |

**Real-world use cases:**
- Analyze UI screenshots and architecture diagrams
- Review 100k-line codebases in a single request
- Process large documents or PDFs directly
- Compare multiple images simultaneously
- Perform deep mathematical reasoning

### Key Capabilities

**Multimodal Processing**: Combine text and images for comprehensive analysis. Ask Gemini to "analyze this screenshot alongside this code" and it understands the full picture.

**Massive Context Windows**: Upload entire projects, long documents, or complex specifications. The 1M token context means "show me the whole codebase" actually works.

**Fast Inference**: Gemini Flash delivers results in seconds, perfect for quick analyses and high-volume tasks without breaking the bank.

**Flexible Models**: Choose from Flash (fast/cheap), Pro (powerful), or Deep-Think (mathematical reasoning) depending on your needs.

**Session Management**: Multi-turn conversations remember context, so you can iteratively refine analyses or designs.

## Features

### Model Lineup

Jelly-gemini provides access to Google's latest model family, each optimized for different use cases:

| Model | Speed | Reasoning | Context | Best For | Cost |
|-------|-------|-----------|---------|----------|------|
| **gemini-2.5-flash** | ⚡ Fastest | Standard | 1M | General coding, quick analysis, multimodal tasks | Lowest |
| **gemini-2.5-pro** | Standard | Advanced | 1M | Complex design, security reviews, large documents | Higher |
| **gemini-2.5-flash-lite** | Ultra-fast | Basic | 1M | Simple summaries, high-volume tasks | Cheapest |
| **gemini-3.0-deep-think** | Slowest | Deep reasoning | 1M | Math problems, complex optimization | Highest |

**Default**: gemini-2.5-flash handles 90% of requests with the best price-performance ratio.

### Multimodal Support

- **Image formats**: PNG, JPEG, WebP, HEIC (up to 20MB each)
- **Multiple images**: Analyze and compare up to 16 images per request
- **Text + visuals**: Combine code with screenshots, diagrams, or mockups
- **Resolution**: Supports high-res images up to 3072x3072 pixels

Example: "Analyze this UI screenshot, compare it with this wireframe, and suggest improvements based on the current code."

### Long-Context Processing

- **1M token context window**: Process documents, codebases, and specifications that would normally require multiple requests
- **Automatic chunking**: Jelly-gemini handles large inputs intelligently
- **Token budgeting**: Transparent token usage helps you plan requests

### Session Management

Continue multi-turn conversations without repeating context:

```
Turn 1: "Design a REST API"
Gemini: [Provides complete API design]

Turn 2: "Add authentication to that API"
Gemini: [References previous design, adds auth]

Turn 3: "Now add rate limiting"
Gemini: [Includes all previous context automatically]
```

## Installation

### Prerequisites

- **Node.js 18+** or **Python 3.9+**
- Google account (free)
- Claude Code v1.0+

### Step 1: Get a Google API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the generated key

### Step 2: Set Environment Variable

Add to your shell configuration (`.bashrc`, `.zshrc`, etc.):

```bash
export GOOGLE_API_KEY="YOUR_API_KEY_HERE"
```

Or set temporarily in current session:

```bash
export GOOGLE_API_KEY="AIzaSyD..."
```

### Step 3: Install Dependencies

**For Python users:**
```bash
pip install google-generativeai
```

**For Node.js users:**
```bash
npm install @google/generative-ai
```

### Step 4: Test Installation

Verify everything works:

```bash
# Test the skill is installed
claude -p "Use Gemini to explain quantum computing"
```

You should see Gemini activate and provide a response.

## Quick Start

### Activate Gemini Explicitly

Just mention "Gemini" in your request:

```
You: "Use Gemini to analyze this screenshot and identify usability issues"
Result: Gemini activates with flash model, analyzes image, returns detailed feedback
```

### Analyze Images

```
You: "Gemini, review these three UI mockups and recommend the best design"
Gemini: Analyzes all three images and provides comparative analysis
```

### Review Large Codebases

```
You: "Use Gemini to review this entire backend for security vulnerabilities"
Gemini: Processes the full codebase (even 100k+ lines) in one request
```

### Continue Conversations

```
Turn 1: You: "Design a REST API for a blog"
Gemini: [Returns comprehensive API design]

Turn 2: You: "Add authentication to that design"
Gemini: [References previous design, adds auth details]
```

### Switch Models Explicitly

```
You: "Use Gemini Pro to deeply analyze this architecture..."
Result: Activates more powerful pro model for complex analysis

You: "Use Gemini Deep Think to solve this optimization problem..."
Result: Activates reasoning-optimized model for complex math
```

## Configuration

### CLI Options

When invoking Gemini through Claude Code, these options customize behavior:

```bash
# Specify model
gemini generate --model gemini-2.5-pro "your prompt"

# Control response length
gemini generate --max-tokens 16384 "detailed analysis"

# Adjust temperature for creativity
gemini generate --temperature 1.5 "write creative content"

# Use permissive safety mode for code analysis
gemini generate --safety-level permissive "review security code"

# Multiple images
gemini generate --image img1.png --image img2.png "compare these"

# JSON output
gemini generate --format json "return structured data"
```

### Environment Variables

Required:
```bash
GOOGLE_API_KEY=your_api_key_here
```

Optional:
```bash
# Set default model (default: gemini-2.5-flash)
export GEMINI_DEFAULT_MODEL="gemini-2.5-pro"

# Set session directory (default: ~/.jelly-gemini/sessions)
export GEMINI_SESSION_DIR="$HOME/.gemini-sessions"

# Show token usage (default: true)
export GEMINI_SHOW_USAGE="true"
```

### Configuration Profiles

Pre-configured profiles for common scenarios:

**Code Analysis** (deterministic, permissive safety):
```bash
gemini generate --profile code-analysis "review this code"
```

**Creative Writing** (high temperature, long output):
```bash
gemini generate --profile creative "write a short story"
```

**Deep Reasoning** (deep-think model, long output):
```bash
gemini generate --profile reasoning "solve this math problem"
```

**Fast Summary** (flash-lite, short output):
```bash
gemini generate --profile quick "summarize this document"
```

## Usage Patterns

### When to Use Gemini

Choose Gemini when you need:

✅ **Image Analysis**: "Analyze this screenshot and identify issues"
✅ **Large Codebases**: "Review this 100k-line codebase for bugs"
✅ **Multiple Images**: "Compare these three UI designs"
✅ **Long Documents**: "Summarize this 50-page specification"
✅ **Fast Processing**: "Quick summary of this code"
✅ **Deep Reasoning**: "Solve this complex optimization problem"

### When NOT to Use Gemini

Use Claude directly for:

❌ **Code execution**: Gemini can't run code
❌ **Real-time web search**: Claude's web access is better
❌ **Interactive debugging**: Claude's iterative workflow is superior
❌ **High-precision tasks requiring fine-tuning**: Claude has more control

### Comparison with Other Skills

| Need | Best Choice | Why |
|------|-------------|-----|
| Image analysis | Gemini | Multimodal native support |
| Large codebase review | Gemini | 1M context window |
| Complex reasoning (code-focused) | Codex | Specialized for code |
| General assistance | Claude native | Always available, seamless |
| Real-time research | Claude | Web search capabilities |

## Practical Examples

### Example 1: Screenshot Analysis

```
You: "Gemini, analyze this screenshot of our UI and identify accessibility issues"

Gemini: "I'll analyze the screenshot for accessibility issues...

Issues Found:
1. Color contrast: The blue text (RGB 70, 130, 200) on light background fails WCAG AA standards
2. Missing alt text: Images don't have descriptive alt attributes
3. Font size: Body text at 12px is too small for readability

Recommendations:
1. Increase contrast ratio to 4.5:1 minimum
2. Add descriptive alt text to all images
3. Increase body font to 14-16px
..."
```

### Example 2: Large Codebase Review

```
You: "Use Gemini to analyze this entire backend for security vulnerabilities"
[Provides 100k lines of code]

Gemini: "Scanning full codebase (100,568 tokens)...

SECURITY FINDINGS:

Critical Issues:
1. SQL injection risk in user_auth.py, line 457
   - User input not parameterized in SQL query
   - Fix: Use parameterized queries or ORM

2. Hardcoded API keys in config.py
   - Production keys exposed in source
   - Fix: Move to environment variables

Medium Issues:
3. Missing CSRF protection on form endpoints
4. Unencrypted password storage detected

...
"
```

### Example 3: Image Comparison

```
You: "Gemini, compare these three UI mockups and recommend the best design"
[Provides mockup1.png, mockup2.png, mockup3.png]

Gemini: "Analyzing three mockups...

Design #1 - Strengths: Clean navigation, good hierarchy
Design #2 - Strengths: Modern aesthetic, intuitive flow
Design #3 - Strengths: Maximum usability, accessible

Recommendation: Design #2
This design balances modern aesthetics with strong usability...
"
```

### Example 4: Session Continuation

```
Turn 1:
You: "Design a REST API for an e-commerce platform"
Gemini: [Returns complete API design with endpoints, schemas, auth flow]
Session created: gemini-abc123

Turn 2:
You: "Now add webhook support to that API design"
Gemini: [Loads previous session, adds webhooks while maintaining context]
Session updated: gemini-abc123

Turn 3:
You: "Also add rate limiting and improve error responses"
Gemini: [Full context from turns 1 & 2, adds new features]
```

### Example 5: Quick Code Review

```
You: "Use Gemini Flash Lite for a quick review of this function"

Gemini: "Function review (fast mode):

Issues Found:
1. Missing null check before accessing array[0]
2. Could use more descriptive variable names

Suggestion: Add input validation at start of function
"
```

## Troubleshooting

### Skill Not Activating?

**Problem**: You mention Gemini but it doesn't activate

**Solutions**:
1. Be explicit: Start with "Use Gemini" or "Ask Gemini"
2. Check keyword: Message should contain "gemini", "multimodal", or "long context"
3. Provide image: If doing image analysis, include image file path

```
Good: "Use Gemini to analyze this screenshot"
Good: "Gemini, review this large codebase"
Works: "Analyze this image" [with image file included]
```

### API Key Errors

**Problem**: "Gemini API authentication failed"

**Solutions**:
```bash
# 1. Verify key is set
echo $GOOGLE_API_KEY

# 2. Get a new key from https://aistudio.google.com/app/apikey
# 3. Set it properly
export GOOGLE_API_KEY="AIzaSyD..."

# 4. Test it works
gemini auth check
```

### Rate Limit Errors

**Problem**: "Too many requests" or HTTP 429

**Solutions**:
- Wait 60 seconds before retrying
- Jelly-gemini automatically retries with backoff
- Check limits: 15 requests/minute free tier
- Upgrade quota if needed for higher volume

### Safety Filters Blocking Content

**Problem**: "Content blocked by safety filters"

**Solutions**:
```bash
# For legitimate code analysis, use permissive mode
gemini generate --safety-level permissive "analyze security vulnerability"

# Or rephrase your request to avoid sensitive language
```

### Image Not Processing

**Problem**: Image file not recognized

**Solutions**:
1. Check format: PNG, JPEG, WebP, HEIC supported
2. Check size: Max 20MB per image
3. Verify path: Use absolute or relative path correctly
4. Try explicit mention: "Analyze this screenshot: [path]"

### Response Too Short

**Problem**: Answer got cut off

**Solution**: Increase token limit
```bash
gemini generate --max-tokens 16384 "provide comprehensive analysis..."
```

### Session Not Resuming

**Problem**: "Continue" doesn't remember previous context

**Solutions**:
1. Use continuation keywords: "continue", "add to that", "also"
2. Check session exists: `gemini sessions list`
3. Try explicit reference: "Based on the API design we just created..."
4. Start fresh if needed: "New session: Design a database schema"

## Best Practices

### DO

✅ **Be specific with requests**: "Analyze this screenshot for accessibility issues" beats "review this"

✅ **Use continuation keywords**: "Continue with that design - add caching" tells Gemini to resume the session

✅ **Leverage the context window**: Provide entire codebases at once instead of chunking

✅ **Choose appropriate models**: Use Flash for speed, Pro for complexity

✅ **Combine modalities**: Show images alongside code for better context

✅ **Use permissive mode for code**: Security analysis works better with `--safety-level permissive`

✅ **Specify models explicitly when uncertain**: "Use Gemini Pro" removes ambiguity

### DON'T

❌ **Don't change temperature for Gemini 3.x models**: Must stay at 1.0 (breaks model performance)

❌ **Don't exceed token limits carelessly**: Monitor usage, especially with Pro models

❌ **Don't bypass safety blocks repeatedly**: Rephrase instead of fighting the filter

❌ **Don't mix unrelated requests in one session**: Start fresh for new topics

❌ **Don't use Flash-Lite for complex tasks**: It's designed for simple summaries

❌ **Don't forget to include images when doing visual analysis**: The skill can't see what you see

❌ **Don't assume session persistence across restarts**: Recreate sessions if needed

### Performance Tips

1. **Default to Flash**: Best price-performance for 90% of tasks
2. **Batch similar requests**: Reduce API calls by combining related work
3. **Use the 1M context**: Don't chunk large inputs; let Gemini handle them
4. **Streaming for long responses**: Add `--stream` flag to see progress
5. **Cache session history**: Reuse sessions for iterative work
6. **Estimate tokens beforehand**: ~4 tokens per word helps planning

## Comparison with Similar Tools

### vs. Claude Code Native

| Aspect | Gemini | Claude |
|--------|--------|--------|
| Context window | 1M+ tokens | 200k tokens |
| Image support | Full multimodal | Limited |
| Speed | Flash: ultra-fast | Standard |
| Integration | Skill-based | Native |
| Best for | Long documents, images | Everything else |

**Use Gemini when**: Image analysis, 100k+ token inputs
**Use Claude when**: General coding, complex features, real-time iteration

### vs. Codex Skill

| Aspect | Gemini | Codex |
|--------|--------|-------|
| Speed | Fast | Complex reasoning |
| Focus | Balanced | Code-specialized |
| Reasoning | Standard | Very deep |
| Context | 1M | 128k |
| Cost | Cheaper | Higher |

**Use Gemini when**: Quick analysis, multimodal, long documents
**Use Codex when**: Complex code reasoning, mathematical proofs

## Advanced Usage

### Custom Configuration Profiles

Create a `.geminirc` file in your home directory for custom defaults:

```json
{
  "default_model": "gemini-2.5-flash",
  "profiles": {
    "secure-code-review": {
      "model": "gemini-2.5-pro",
      "temperature": 0.3,
      "safety_level": "permissive"
    }
  }
}
```

### Batch Processing

Process multiple requests efficiently:

```bash
# Process list of files with same analysis
for file in *.py; do
  echo "Analyzing $file..."
  gemini generate "Review this Python file for improvements: $(cat $file)"
done
```

### Token Budget Management

Check estimated usage before processing:

```bash
# Get token estimate
gemini estimate-tokens "your prompt here"

# Shows: prompt_tokens: 1234, max_completion: 6766, estimated_cost: $0.0037
```

## Support & Documentation

- **Official Gemini Docs**: https://ai.google.dev/gemini-api/docs
- **Model Reference**: https://ai.google.dev/gemini-api/docs/models
- **Safety Settings**: https://ai.google.dev/gemini-api/docs/safety-settings
- **API Console**: https://console.cloud.google.com/

## FAQ

**Q: Is Gemini free to use?**
A: Yes, Google provides generous free tier (up to 1500 requests/day, 1M tokens/min). Premium tiers available for higher volume.

**Q: Can I use Gemini offline?**
A: No, Gemini requires internet connection to Google's API.

**Q: What if I run out of free API quota?**
A: Upgrade to a paid plan or wait for quota reset. You can monitor usage in Google Cloud Console.

**Q: Does Gemini remember my project context?**
A: Sessions persist in `~/.jelly-gemini/sessions/` and stay active for 24 hours. You can continue multi-turn conversations during this time.

**Q: Which model should I choose?**
A: Start with Flash (default). Use Pro if Flash seems insufficient. Use Deep-Think only for mathematical reasoning.

**Q: Can I analyze video files?**
A: Currently image-only. Video support planned for future releases.

**Q: Is my code secure when sent to Gemini?**
A: Your code is sent to Google's API. Review Google's privacy policy. Don't send proprietary code you're not comfortable sharing externally.

**Q: Can I use Gemini for production systems?**
A: Yes, but review Google's terms of service. Consider API rate limits and costs for high-volume applications.

## Feedback & Issues

Found a bug? Want to suggest a feature?

- Check [existing issues](https://github.com/jelly/jelly-dotclaude/issues)
- Create a new issue with detailed description
- Include error messages, command used, and expected behavior

## License

This skill integrates with Google's Gemini API, which is subject to Google's terms of service. The jelly-gemini skill implementation follows the project's license.

---

**Version**: 1.0
**Last Updated**: November 19, 2025
**Compatibility**: Claude Code v1.0+, Node.js 18+ or Python 3.9+
