# jelly-gemini Reference Documentation

Complete reference guide for the jelly-gemini skill with deep dives into models, configuration, multimodal capabilities, and error handling.

## Documentation Files

### 1. gemini-models.md (629 lines)
**Complete model lineup and selection guide**

Covers all Gemini models available through the skill:
- **gemini-2.5-flash** - Recommended default for most tasks
- **gemini-2.5-pro** - Advanced reasoning and complex analysis
- **gemini-2.5-flash-lite** - Ultra-fast lightweight model
- **gemini-3.0-deep-think** - Deep mathematical and logical reasoning

**Key Sections**:
- Model overview and capabilities
- Performance characteristics (speed, quality, cost)
- When to use each model
- Pricing breakdown and cost examples
- Token counting and estimation
- Model selection matrix and decision tree
- Model lifecycle and deprecation policy
- Context window utilization

**Use This Guide When**:
- Selecting the right model for your task
- Understanding model capabilities and limitations
- Comparing pricing between models
- Estimating costs for requests
- Deciding between Flash, Pro, Flash Lite, or Deep Think

---

### 2. configuration-guide.md (856 lines)
**Complete CLI parameter and configuration reference**

Comprehensive guide to all configuration options:

**Core Parameters**:
- `--model` - Model selection
- `--temperature` - Randomness and creativity control
- `--top-p` - Nucleus sampling for diversity
- `--max-tokens` - Output length limiting
- `--safety-level` - Content filtering

**Advanced Parameters**:
- `--format` - Output formatting (text, JSON, markdown)
- `--stream` - Real-time streaming
- `--top-k` - Alternative diversity control
- `--presence-penalty` - Repetition penalty
- `--frequency-penalty` - Frequency-based penalty
- `--session` - Session management
- `--no-save` - Prevent session saving

**Key Sections**:
- Detailed parameter explanations
- Value ranges and defaults
- Usage examples for each parameter
- Pre-configured profiles (code analysis, creative, research, speed, deep thinking)
- Best practices and principles
- Troubleshooting common configuration issues
- Parameter quick reference table

**Use This Guide When**:
- Configuring the model for specific tasks
- Fine-tuning response quality or creativity
- Managing safety and content filtering
- Optimizing for speed vs quality
- Troubleshooting output quality issues

---

### 3. multimodal-guide.md (738 lines)
**Image analysis and multimodal capabilities**

Complete guide to working with images:

**Fundamentals**:
- Supported image formats (JPEG, PNG, WebP, HEIC, HEIF)
- File size limits and constraints
- Resolution and dimension guidelines
- Image quantity limits (up to 16 per request)

**Using Images**:
- `--image` flag syntax and usage
- File path handling (absolute, relative, home expansion)
- Error handling for missing/invalid images
- Quality optimization tips

**Use Cases**:
- Code review with screenshots
- UI/UX design analysis
- Error message analysis
- Document and diagram analysis
- Comparative design analysis
- Accessibility audits
- Logo and branding review

**Advanced Techniques**:
- Image + code context analysis
- Sequential image analysis
- Multi-format comparison
- Performance characteristics with images
- Token usage estimation

**Key Sections**:
- Format recommendations
- Image quality best practices
- Performance with multiple images
- Cost impact of images
- Format conversion guide
- Real-world multimodal workflows
- Troubleshooting image issues

**Use This Guide When**:
- Analyzing images or screenshots
- Processing multiple images
- Understanding image constraints
- Optimizing image quality and size
- Troubleshooting image-related errors

---

### 4. error-handling.md (851 lines)
**Complete error reference and troubleshooting**

Comprehensive error handling guide:

**Error Categories**:
- **Authentication Errors** (401, 403) - API key issues
- **Rate Limiting** (429) - Too many requests
- **Content Safety** (400) - Safety filter blocks
- **Model Errors** - Model not found or unavailable
- **Input Validation** (400) - Invalid parameters
- **File and Image Errors** - Missing or invalid files
- **Session Errors** - Session corruption or not found
- **Network and Service** (500, 503, 504) - Server errors

**For Each Error**:
- Full error message format
- Root causes
- Diagnosis steps
- Step-by-step solutions
- Verification procedures

**Key Sections**:
- All error types with explanations
- Troubleshooting flowchart
- Diagnostic checklist
- Error recovery strategies (backoff, fallback, decomposition)
- Error code reference table
- Quick diagnosis guide
- Information to provide when getting help

**Use This Guide When**:
- Encountering any error
- Diagnosing unexpected behavior
- Understanding error messages
- Recovering from failures
- Setting up proper error handling
- Reporting issues to support

---

## Quick Navigation

### By Task

**I'm new to Gemini. Where do I start?**
1. Start with **installation-guide.md** (setup)
2. Read **gemini-models.md** (understand models)
3. Review **configuration-guide.md** (basic configuration)

**I want to analyze an image.**
- Read **multimodal-guide.md** (image analysis guide)

**I'm getting an error.**
- Check **error-handling.md** (troubleshooting)

**I want to optimize costs.**
- Read **gemini-models.md** (pricing section)
- Review **configuration-guide.md** (cost optimization)

**I want the best quality output.**
- Read **gemini-models.md** (model capabilities)
- Review **configuration-guide.md** (quality parameters)

**I need fast responses.**
- Read **gemini-models.md** (speed comparison)
- Use gemini-2.5-flash-lite (see configuration-guide.md)

### By Parameter/Feature

**Temperature and Randomness**:
- configuration-guide.md: "Temperature" section

**Max Tokens and Output Length**:
- configuration-guide.md: "Max Output Tokens" section

**Safety and Content Filtering**:
- configuration-guide.md: "Safety Configuration" section
- error-handling.md: "Content Safety Errors" section

**Images and Multimodal**:
- multimodal-guide.md (entire document)

**Session Management**:
- configuration-guide.md: "Session Configuration" section
- error-handling.md: "Session Errors" section

**Model Selection**:
- gemini-models.md: "Model Selection Matrix" and "Decision Tree"

**Cost Optimization**:
- gemini-models.md: "Pricing Overview" section
- configuration-guide.md: "Principle 5: Cost Awareness"

**Performance and Latency**:
- gemini-models.md: "Performance Metrics" section
- configuration-guide.md: "Stream" section

---

## Common Questions Answered

### Which model should I use?

**Default choice**: gemini-2.5-flash
- Best price-performance ratio
- Handles 70% of use cases
- Recommended unless specific reason otherwise

**Choose Flash for**: General tasks, code review, documentation
**Choose Pro for**: Complex analysis, full codebase review, architecture design
**Choose Flash Lite for**: Speed-critical, high-volume, cost-critical tasks
**Choose Deep Think for**: Mathematical proofs, complex reasoning, optimization

See **gemini-models.md** for detailed decision tree.

### How do I analyze an image?

Use the `--image` flag:
```bash
gemini generate --image screenshot.png "analyze this"
```

See **multimodal-guide.md** for complete guide with examples.

### What should temperature be?

**Default (1.0)** works for most cases. Adjust based on:
- **Lower** (0.3-0.7) for technical, reproducible tasks
- **Higher** (1.5-2.0) for creative exploration
- **Always 1.0** for Deep Think models

See **configuration-guide.md** for temperature details.

### How much will this cost?

Use **gemini-models.md** pricing section:
- Flash: ~$0.075 per 1M input tokens
- Pro: 4x Flash price
- Flash Lite: 0.4x Flash price

Includes cost examples for different request sizes.

### I got an error. What now?

1. Check **error-handling.md** for your error type
2. Follow troubleshooting steps provided
3. Use diagnostic checklist if unsure

---

## Files Organization

```
references/
├── README.md                    # This file (navigation guide)
├── gemini-models.md            # Models and model selection
├── configuration-guide.md       # Parameters and configuration
├── multimodal-guide.md         # Images and multimodal analysis
├── error-handling.md           # Errors and troubleshooting
└── installation-guide.md       # Installation and setup (existing)
```

---

## Document Statistics

| File | Lines | Topics | Examples |
|------|-------|--------|----------|
| gemini-models.md | 629 | 8 | 15+ |
| configuration-guide.md | 856 | 15+ | 30+ |
| multimodal-guide.md | 738 | 12 | 20+ |
| error-handling.md | 851 | 10+ | 25+ |
| **Total** | **3,074** | **45+** | **90+** |

---

## Best Practices Summary

### Model Selection Principles

1. **Start with Flash** (default choice)
2. **Upgrade to Pro** only if complexity requires it
3. **Use Flash Lite** for cost-sensitive or speed-critical tasks
4. **Use Deep Think** for mathematical reasoning

### Configuration Principles

1. **Start simple** (use defaults)
2. **Change one parameter at a time**
3. **Match configuration to task**
4. **Prioritize safety** (use default mode unless technical)
5. **Monitor costs** (use Flash Lite for simple tasks)

### Multimodal Best Practices

1. **Use appropriate format** (PNG for exact pixels, JPEG for photos)
2. **Optimize size** (compress while maintaining readability)
3. **Clear content** (ensure text readable)
4. **One focus** (each image has clear subject)
5. **Batch wisely** (3-5 images usually sufficient)

### Error Handling Principles

1. **Read full error message** (contains specific cause)
2. **Check diagnostics first** (API key, network, quotas)
3. **Follow step-by-step solutions** (provided in error-handling.md)
4. **Use automatic retry** (skill handles most cases)
5. **Decompose large requests** if repeated timeouts

---

## Version Information

**Last Updated**: November 19, 2025
**Skill Version**: 1.0
**Gemini API Version**: 2025
**Compatibility**: Claude Code v1.0+

---

## Getting More Help

### Resources

- **Official Gemini Docs**: https://ai.google.dev/gemini-api/docs
- **API Status**: https://status.cloud.google.com/
- **Console/Quotas**: https://console.cloud.google.com/apis/dashboard
- **Model Information**: https://ai.google.dev/gemini-api/docs/models

### When to Check Each Resource

**Gemini Models Reference**: When model availability or capabilities unclear
**Google Cloud Console**: When checking quotas, usage, or API status
**Status Page**: When experiencing widespread failures

