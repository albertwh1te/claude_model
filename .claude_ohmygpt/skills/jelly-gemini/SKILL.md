---
name: jelly-gemini
description: >-
  Google Gemini AI integration for Claude Code. Supports multimodal analysis,
  long context processing, fast inference with Gemini 2.5 Flash/Pro models,
  and Nano Banana image generation/editing extension.
  Activated when users mention "Gemini", need image analysis, image generation, or require large context processing.
trigger-keywords: gemini, google ai, use gemini, gemini model, multimodal, long context, analyze image, fast model, gemini flash, gemini pro, 제미나이, 구글 AI, 이미지 분석, 멀티모달, nano banana, 나노 바나나, image generation, 이미지 생성, generate image, 이미지 만들어, 그림 그려, create image, edit image, 이미지 편집, restore photo, 사진 복원, icon, 아이콘, diagram, 다이어그램
allowed-tools: Read, Bash, Edit, Write
priority: high
---

# jelly-gemini: Google Gemini AI Integration for Claude Code

---

## Overview

The jelly-gemini skill integrates Google's Gemini AI models into Claude Code, providing access to advanced capabilities including:

- **Multimodal Processing**: Native image and video analysis alongside text
- **Massive Context Windows**: 1M+ token support for entire codebase analysis
- **Fast Inference**: Optimized models for high-speed tasks (gemini-2.5-flash)
- **Advanced Reasoning**: Deep-thinking models for complex problem-solving
- **Long Document Analysis**: Process large documents, PDFs, and extensive codebases directly
- **🍌 Nano Banana Image Generation**: Create, edit, and restore images using Gemini's image models

### Why Use Gemini?

**Use Gemini when you need:**
- Image or screenshot analysis with code context
- Analysis of extremely large codebases or documents (100k+ tokens)
- Fast, cost-effective responses for high-volume tasks
- Multimodal understanding (combining visual and textual information)
- Google's latest AI capabilities and real-time web knowledge integration

**Key Strengths:**
- 1,048,576 token context window (vs typical 128k)
- Native multimodal support (images, video)
- Fast inference with gemini-2.5-flash
- Cost-effective for large-scale analysis

---

## When to Use This Skill

This skill activates when:

### Explicit Activation
- User explicitly mentions "Gemini" or requests Gemini assistance
- User says "use Gemini", "ask Gemini", "help with Gemini"
- User references specific Gemini models ("gemini-2.5-flash", "gemini-pro")

### Capability-Based Activation
- **Multimodal tasks**: "analyze this image", "review screenshot", "multimodal analysis"
- **Long context**: "analyze entire codebase", "review large document", "process 100k tokens"
- **Fast processing**: "quick analysis", "fast summary", "rapid response"
- **Google-specific**: "Google AI", "use Google's model"

### Continuation Activation
- Keywords: "continue", "resume", "keep going", "add to that"
- Context references: "that analysis", "previous Gemini work"
- Incremental requests: "now add", "follow up on", "expand that"

---

## How It Works

### Activation Detection

The skill uses a priority-based activation system:

**Priority 1 (Explicit)** - Immediate Activation:
- User mentions "Gemini" or specific Gemini model names
- Action: Activate jelly-gemini immediately

**Priority 2 (Capability)** - Contextual Activation:
- User needs multimodal processing or provides image files
- User mentions long-context analysis or has large input
- Action: Suggest Gemini, activate if appropriate

**Priority 3 (Continuation)** - Session Resumption:
- User says "continue" with previous Gemini context
- User references previous Gemini output
- Action: Resume last Gemini session

**Priority 4 (Negative)** - Do Not Activate:
- User explicitly mentions other tools (Codex, Claude, etc.)
- User's task clearly better suited for Claude
- Action: Do not activate

### Model Selection Logic

Gemini uses a **single-model-per-task** approach based on task complexity and context requirements:

```
User Request Received
│
├─ Contains "deep think", "complex reasoning", "mathematical"?
│  └─ YES → Use gemini-3.0-deep-think
│
├─ Contains "analyze large document", "review entire codebase", "architecture"?
│  └─ YES → Use gemini-2.5-pro
│
├─ Contains "quick", "fast", "simple", "summarize"?
│  └─ YES → Use gemini-2.5-flash-lite
│
└─ DEFAULT (General Tasks)
   └─ Use gemini-2.5-flash
```

### Model Lineup

| Model | Context Window | Best For | Speed | Cost |
|-------|---------------|----------|-------|------|
| **gemini-2.5-flash** | 1M tokens | General use, fast processing, balanced performance | Fast | Low |
| **gemini-2.5-pro** | 1M tokens | Complex reasoning, architecture design, deep analysis | Moderate | High |
| **gemini-2.5-flash-lite** | 1M tokens | Ultra-fast responses, simple tasks, high volume | Fastest | Lowest |
| **gemini-3.0-deep-think** | 1M tokens | Mathematical reasoning, complex problem-solving | Slow | Highest |

**Default Model**: `gemini-2.5-flash` - Best price-performance ratio for 90% of tasks

---

## Command Structure

### Basic Command Pattern

The skill invokes Gemini through a wrapper script or direct SDK integration:

```bash
gemini generate \
  --model gemini-2.5-flash \
  --temperature 1.0 \
  --max-tokens 8192 \
  "your prompt here"
```

### Required Components

1. **Model Selection**: `--model <model-name>`
2. **Prompt**: The text request (required)
3. **Configuration**: Temperature, tokens, safety settings
4. **Optional**: Images, session context, format options

### Command Examples

#### Simple Query
```bash
gemini generate \
  --model gemini-2.5-flash \
  "Explain how binary search works"
```

#### Image Analysis
```bash
gemini generate \
  --model gemini-2.5-flash \
  --image screenshot.png \
  "Analyze this UI design and suggest improvements"
```

#### Long Context Review
```bash
gemini generate \
  --model gemini-2.5-pro \
  --max-tokens 16384 \
  "Review this entire codebase for security vulnerabilities"
```

#### Deep Reasoning
```bash
gemini generate \
  --model gemini-3.0-deep-think \
  --temperature 1.0 \
  --max-tokens 16384 \
  "Solve this complex mathematical optimization problem"
```

---

## Configuration Parameters

### Temperature

```yaml
Parameter: temperature
Type: float
Range: 0.0 - 2.0
Default: 1.0

Values:
  - 0.0: Deterministic (always highest probability)
  - 0.3: Low randomness (focused, consistent)
  - 1.0: Balanced (recommended default)
  - 1.5: High creativity
  - 2.0: Maximum randomness

WARNING: For Gemini 3.x models, DO NOT change from 1.0
```

**Usage**:
```bash
gemini generate --temperature 1.0 "prompt"
```

### Top-P (Nucleus Sampling)

```yaml
Parameter: top_p
Type: float
Range: 0.0 - 1.0
Default: 0.95

Values:
  - 0.8: More focused, less diversity
  - 0.95: Balanced (default)
  - 1.0: Consider all tokens
```

**Usage**:
```bash
gemini generate --top-p 0.95 "prompt"
```

### Max Output Tokens

```yaml
Parameter: max_output_tokens
Type: integer
Range: 1 - 65536 (model-dependent)
Default: 8192

Values:
  - 1024: Short responses
  - 4096: Medium responses
  - 8192: Standard (default)
  - 16384: Long responses
  - 65536: Maximum (gemini-2.5-pro only)
```

**Usage**:
```bash
gemini generate --max-tokens 8192 "prompt"
```

### Safety Settings

Gemini supports 4 safety categories with configurable thresholds:

**Categories:**
- `HARM_CATEGORY_HARASSMENT`
- `HARM_CATEGORY_HATE_SPEECH`
- `HARM_CATEGORY_SEXUALLY_EXPLICIT`
- `HARM_CATEGORY_DANGEROUS_CONTENT`

**Threshold Levels:**
- `BLOCK_NONE`: No blocking
- `BLOCK_LOW_AND_ABOVE`: Block low+ probability
- `BLOCK_MEDIUM_AND_ABOVE`: Block medium+ (default)
- `BLOCK_ONLY_HIGH`: Block only high probability

**Usage**:
```bash
# Default safety (strict)
gemini generate --safety-level default "prompt"

# Permissive mode for code analysis
gemini generate --safety-level permissive "analyze security vulnerability"
```

### Response Format Options

```bash
# JSON output
gemini generate --format json "analyze this code structure"

# Markdown output
gemini generate --format markdown "document this API"

# Streaming
gemini generate --stream "explain algorithm step by step"
```

### Multimodal Configuration

**Image Support:**
- Formats: JPEG, PNG, WebP, HEIC, HEIF
- Max size: 20MB per image
- Max images: 16 per request
- Resolution: Up to 3072x3072 pixels

**Usage**:
```bash
# Single image
gemini generate --image screenshot.png "what's in this image?"

# Multiple images
gemini generate \
  --image img1.png \
  --image img2.png \
  "compare these screenshots"
```

### Configuration Profiles

**Default (Balanced)**:
```json
{
  "model": "gemini-2.5-flash",
  "temperature": 1.0,
  "top_p": 0.95,
  "max_output_tokens": 8192,
  "safety_settings": "BLOCK_MEDIUM_AND_ABOVE"
}
```

**Code Analysis (Deterministic)**:
```json
{
  "model": "gemini-2.5-pro",
  "temperature": 0.3,
  "top_p": 0.8,
  "max_output_tokens": 8192,
  "safety_settings": "BLOCK_ONLY_HIGH"
}
```

**Creative Writing**:
```json
{
  "model": "gemini-2.5-flash",
  "temperature": 1.5,
  "top_p": 0.98,
  "max_output_tokens": 16384,
  "safety_settings": "BLOCK_MEDIUM_AND_ABOVE"
}
```

**Deep Reasoning**:
```json
{
  "model": "gemini-3.0-deep-think",
  "temperature": 1.0,
  "top_p": 0.95,
  "max_output_tokens": 16384,
  "safety_settings": "BLOCK_MEDIUM_AND_ABOVE"
}
```

---

## Session Management

### Session Persistence Approach

Unlike some CLI tools, Gemini uses **manual session management** through file-based context accumulation.

**Session File Location**: `~/.jelly-gemini/sessions/`

**Session File Structure**:
```json
{
  "session_id": "gemini-session-20251119-143022",
  "created_at": "2025-11-19T14:30:22Z",
  "model": "gemini-2.5-flash",
  "messages": [
    {
      "role": "user",
      "content": "Design a REST API for a blog system",
      "timestamp": "2025-11-19T14:30:22Z"
    },
    {
      "role": "model",
      "content": "Here's a comprehensive REST API design...",
      "timestamp": "2025-11-19T14:30:28Z"
    }
  ],
  "total_tokens": 4567,
  "last_updated": "2025-11-19T14:35:10Z"
}
```

### Multi-Turn Conversation Flow

```
Turn 1: Initial Request (New Session)
User: "Design a REST API for a blog system"
→ Create new session file: gemini-session-abc123.json
→ Store: user message, model response, metadata

Turn 2: Continuation Request
User: "Add authentication to that API design"
→ Detect continuation keywords ("that")
→ Load session file: gemini-session-abc123.json
→ Build context: previous messages + new request
→ Call Gemini API with full context
→ Append response to session file

Turn 3: Further Continuation
User: "Now add rate limiting"
→ Load full session history
→ Include all previous turns in context
→ Call Gemini API with accumulated context
→ Update session file
```

### Session Commands

```bash
# List active sessions
gemini sessions list

# Show session details
gemini sessions show <session-id>

# Resume specific session
gemini sessions resume <session-id> "new prompt"

# Resume last session
gemini sessions resume --last "new prompt"

# Clear old sessions
gemini sessions clean --older-than 7d

# Delete specific session
gemini sessions delete <session-id>
```

### Continuation Detection

The skill recognizes these continuation signals:

**Explicit Keywords:**
- "continue", "resume", "keep going"
- "add to that", "now add", "follow up on"
- "expand that", "also", "furthermore"

**Context References:**
- "that", "this", "the above"
- "previous", "earlier"

**Decision Logic:**
```
User Request → Contains Continuation Keywords?
                      │
         ┌────────────┴────────────┐
         YES                       NO
         │                         │
      Resume Session          New Session
      (Load Context)          (Fresh Start)
```

---

## Error Handling

### Common Errors and Fixes

#### Authentication Error (401)

```
Error: Gemini API authentication failed

To fix:
1. Set your Google API key: export GOOGLE_API_KEY="your_key"
2. Get a key: https://aistudio.google.com/app/apikey
3. Verify key is valid: gemini auth check

Example:
export GOOGLE_API_KEY="AIzaSyD..."
gemini generate "test prompt"
```

#### Rate Limit Error (429)

```
Error: Too many requests to Gemini API

To fix:
1. Wait 60 seconds and retry
2. Use --batch mode for multiple requests
3. Upgrade to higher quota tier

Current limits:
- 15 requests per minute
- 1M tokens per minute
- 1500 requests per day
```

#### Safety Blocked Error (400)

```
Error: Content blocked by Gemini safety filters

To fix:
1. Rephrase to avoid sensitive topics
2. For code analysis: --safety-level permissive
3. Review content against Google's policies

Example:
gemini generate \
  --safety-level permissive \
  "analyze security vulnerability in code"
```

#### Model Not Found Error

```
Error: Gemini model not found or unavailable

To fix:
1. Check available models: gemini models list
2. Use stable fallback: --model gemini-1.5-pro
3. Update to latest gemini CLI: pip install -U google-genai

Example:
gemini generate --model gemini-1.5-pro "your prompt"
```

### Error Handling Flow

```
API Call Made
│
├─ Success (200 OK)
│  └─ Return response to user
│
├─ Auth Error (401, 403)
│  └─ Show auth setup instructions
│     └─ Do NOT retry
│
├─ Rate Limit (429)
│  └─ Parse Retry-After header
│     └─ Retry with exponential backoff (max 3 attempts)
│
├─ Safety Block (400 + safety)
│  └─ Parse blocked categories
│     └─ Show rephrasing suggestions
│        └─ Do NOT retry
│
├─ Service Error (500, 503, 504)
│  └─ Retry with exponential backoff (max 3 attempts)
│     └─ If all retries fail → Try fallback model
│
└─ Input Validation (400)
   └─ Parse specific validation error
      └─ Show parameter fix suggestions
```

### Model Fallback Chain

When primary model fails, the skill attempts fallback models:

```
gemini-2.5-flash      → Primary
gemini-2.0-flash-exp  → Secondary
gemini-1.5-flash      → Tertiary
gemini-1.5-pro        → Stable fallback
```

---

## Usage Examples

### Example 1: Simple Query

**User Request**: "Explain how asynchronous programming works in Python"

**Skill Executes**:
```bash
gemini generate \
  --model gemini-2.5-flash \
  --temperature 1.0 \
  --max-tokens 8192 \
  "Explain how asynchronous programming works in Python"
```

**Result**: Gemini provides clear explanation using fast, cost-effective model.

---

### Example 2: Image Analysis

**User Request**: "Analyze this screenshot and identify usability issues"

**Skill Executes**:
```bash
gemini generate \
  --model gemini-2.5-flash \
  --image screenshot.png \
  "Analyze this screenshot and identify usability issues"
```

**Result**: Gemini performs multimodal analysis combining visual and textual understanding.

---

### Example 3: Long Context Code Review

**User Request**: "Review this entire codebase for security vulnerabilities"

**Skill Executes**:
```bash
gemini generate \
  --model gemini-2.5-pro \
  --max-tokens 16384 \
  --safety-level permissive \
  "Review this entire codebase for security vulnerabilities"
```

**Result**: Gemini Pro analyzes large codebase with 1M token context window.

---

### Example 4: Multimodal Task with Multiple Images

**User Request**: "Compare these three UI mockups and recommend the best design"

**Skill Executes**:
```bash
gemini generate \
  --model gemini-2.5-flash \
  --image mockup1.png \
  --image mockup2.png \
  --image mockup3.png \
  "Compare these three UI mockups and recommend the best design"
```

**Result**: Gemini analyzes all three images simultaneously and provides comparative analysis.

---

### Example 5: Session Continuation

**Turn 1 - Initial Request**:
```
User: "Design a REST API for a blog system"

Skill: gemini generate --model gemini-2.5-flash \
  "Design a REST API for a blog system"
```

**Turn 2 - Continuation**:
```
User: "Add authentication to that API design"

Skill: gemini sessions resume --last
→ Loads previous context
→ Includes Turn 1 conversation
→ Adds new request
→ Calls Gemini with full context
```

**Turn 3 - Further Continuation**:
```
User: "Now add rate limiting and error handling"

Skill: gemini sessions resume --last
→ Loads full session history (Turns 1 + 2)
→ Adds new request
→ Maintains complete context
```

---

### Example 6: Deep Reasoning Task

**User Request**: "Solve this complex optimization problem: minimize cost function while satisfying 5 constraints"

**Skill Executes**:
```bash
gemini generate \
  --model gemini-3.0-deep-think \
  --temperature 1.0 \
  --max-tokens 16384 \
  "Solve this complex optimization problem: minimize cost function while satisfying 5 constraints"
```

**Result**: Gemini Deep Think provides step-by-step mathematical reasoning and solution.

---

### Example 7: Fast Summary Generation

**User Request**: "Quick summary of this 50-page document"

**Skill Executes**:
```bash
gemini generate \
  --model gemini-2.5-flash-lite \
  --max-tokens 4096 \
  "Summarize this document in 3-5 bullet points: [document content]"
```

**Result**: Ultra-fast summary using lightweight model.

---

## Integration with Claude Code

### Skill Invocation Flow

```
Claude Code Session
│
├─ User: "Use Gemini to analyze this screenshot"
│
└─ Claude Code detects "Gemini" keyword
   │
   └─ Loads jelly-gemini skill (SKILL.md)
      │
      └─ Skill activates:
         │
         ├─ Layer 1: Confirms activation (explicit mention)
         ├─ Layer 2: Classifies as multimodal analysis
         ├─ Layer 3: Selects gemini-2.5-flash
         ├─ Layer 4: Assembles config with image support
         ├─ Layer 5: Creates new session
         ├─ Layer 6: Builds API request with image
         ├─ Layer 7: Executes via SDK
         ├─ Layer 8: Handles any errors
         └─ Layer 9: Formats and returns response
            │
            └─ Response sent to Claude Code
               │
               └─ Claude Code presents to user
```

### Workflow Example

1. **User makes request** with Gemini trigger
2. **Claude detects** jelly-gemini skill activation
3. **Skill classifies** task type and selects model
4. **Command constructed** with appropriate flags
5. **Gemini API called** with full configuration
6. **Response processed** and formatted
7. **Session saved** for potential continuation
8. **Result returned** to user via Claude

---

## Best Practices

### DO:

- **Specify intent clearly**: "Analyze this image for accessibility issues"
- **Use continuation keywords**: "Continue with that design - add error handling"
- **Leverage long context**: Provide entire codebases or large documents directly
- **Choose appropriate model**: Use flash for speed, pro for complexity
- **Combine text and images**: Gemini excels at multimodal understanding
- **Use safety permissive mode** for code analysis to avoid false blocks
- **Provide context in sessions**: Reference previous work for continuity

### DON'T:

- **Change temperature for Gemini 3.x models** (must stay at 1.0)
- **Exceed token limits** without using gemini-2.5-pro
- **Ignore safety blocks** - rephrase instead of bypassing
- **Mix unrelated requests** in same session
- **Use lite models for complex reasoning** tasks
- **Forget to specify images** when visual analysis is needed
- **Assume session persistence** across tool restarts without verification

### Performance Tips

1. **Use gemini-2.5-flash** as default for best price-performance
2. **Use gemini-2.5-flash-lite** for high-volume simple tasks
3. **Use gemini-2.5-pro** only when complexity truly requires it
4. **Batch similar requests** to minimize API calls
5. **Leverage 1M context window** instead of chunking large inputs
6. **Use streaming mode** for long responses to see progress
7. **Cache long context** when analyzing same codebase repeatedly

### Request Quality

**Good Requests:**
- "Analyze this architecture diagram and suggest improvements"
- "Review this 100k-line codebase for performance bottlenecks"
- "Compare these three screenshots and identify design inconsistencies"

**Vague Requests:**
- "Help with image"
- "Look at this"
- "Analysis"

**Pattern**: Descriptive, specific requests with clear objectives get optimal results.

---

## Model Selection Guide

### Use gemini-2.5-flash (Default) For:
- General coding assistance
- Code reviews and analysis
- Documentation generation
- Explanations and tutorials
- Quick research and summarization
- Multimodal tasks (images + text)
- Most day-to-day tasks

### Use gemini-2.5-pro For:
- Complex architectural design
- Performance optimization strategies
- Security audits requiring deep analysis
- Advanced algorithm design
- Trade-off analysis
- Long-document analysis (100k+ tokens)
- Entire codebase reviews

### Use gemini-3.0-deep-think For:
- Mathematical proofs and complex calculations
- Multi-step reasoning challenges
- Advanced optimization problems
- Research-level analysis
- When user explicitly requests "deep thinking"

### Use gemini-2.5-flash-lite For:
- Ultra-fast responses needed
- Simple summarization tasks
- High-volume batch processing
- Cost optimization for simple queries

**Default**: When uncertain, use `gemini-2.5-flash` - it handles 90% of tasks efficiently.

---

## Troubleshooting

### Skill Not Activating?

**Check:**
- Request matches trigger keywords (Gemini, multimodal, long context, etc.)
- No competing skills mentioned (Codex, specific other tools)
- Explicitly mention "Gemini" if uncertain

**Try:** "Use Gemini to help me with..."

### Session Not Resuming?

**Check:**
- Previous Gemini session exists (check session files)
- Used continuation keywords ("continue", "resume", "add to that")
- Session files in `~/.jelly-gemini/sessions/` are accessible

**Try:** `gemini sessions list` to verify sessions exist

### API Errors?

**First Steps:**
1. Verify `GOOGLE_API_KEY` environment variable set
2. Check API quota limits: https://console.cloud.google.com/
3. Review error message for specific category
4. Consult error handling section above

**Common Fixes:**
- Auth errors → Set API key correctly
- Rate limits → Wait and retry with backoff
- Safety blocks → Rephrase or use permissive mode
- Model errors → Try fallback models

### Safety Filter Blocking Code Analysis?

**Solution:** Use permissive safety mode for technical content:
```bash
gemini generate \
  --safety-level permissive \
  "analyze this security vulnerability code"
```

### Response Too Short or Truncated?

**Solution:** Increase max tokens:
```bash
gemini generate \
  --max-tokens 16384 \
  "provide comprehensive analysis of..."
```

---

## Additional Resources

### Official Documentation
- Gemini API Docs: https://ai.google.dev/gemini-api/docs
- Gemini Models Reference: https://ai.google.dev/gemini-api/docs/models
- Safety Settings Guide: https://ai.google.dev/gemini-api/docs/safety-settings
- Google GenAI Python SDK: https://github.com/google/generative-ai-python

### Skill References
See `references/` directory for:
- Installation guide
- Model comparison matrix
- Configuration reference
- Session workflow examples
- Multimodal usage guide
- Troubleshooting details

### Related Skills
- `jelly-codex-skill`: Code-focused high-reasoning tasks
- `jelly-sequential-thinking`: Complex analytical reasoning
- `jelly-multi-ai-code-review`: Multi-tool orchestration

---

## Configuration Setup

### Environment Variables

Required:
```bash
export GOOGLE_API_KEY="your_google_api_key_here"
```

Optional:
```bash
export GEMINI_DEFAULT_MODEL="gemini-2.5-flash"
export GEMINI_SESSION_DIR="$HOME/.jelly-gemini/sessions"
```

### Getting API Key

1. Visit: https://aistudio.google.com/app/apikey
2. Create new API key or use existing
3. Copy key to environment variable
4. Verify: `gemini auth check`

### Installation

Install Google Generative AI SDK:
```bash
pip install google-generativeai
```

Or use npm wrapper if available:
```bash
npm install -g @google/generative-ai
```

---

## Version Information

**Skill Version**: 1.1
**Gemini API Version**: 2025 (supports Gemini 2.5 and 3.0 models)
**Nano Banana Version**: 1.0.10
**Last Updated**: December 16, 2025
**Compatibility**: Claude Code v1.0+

---

## 🍌 Nano Banana - Image Generation Extension

Nano Banana is a Gemini CLI extension for AI-powered image generation, editing, and restoration using Gemini's image models.

### Installation Status

The Nano Banana extension is **installed and enabled** on this system:
- Extension Version: 1.0.10
- Location: `~/.gemini/extensions/nanobanana`
- Status: Enabled (User & Workspace)

### Available Commands

Use these commands within Gemini CLI sessions:

| Command | Description | Example |
|---------|-------------|---------|
| `/generate` | Create images from text prompts | `/generate "watercolor fox in forest"` |
| `/edit` | Modify existing images | `/edit photo.png "add sunglasses"` |
| `/restore` | Restore old/damaged photos | `/restore old_photo.jpg` |
| `/icon` | Generate app icons, favicons | `/icon "coffee logo" --sizes="64,128,256"` |
| `/pattern` | Create seamless patterns/textures | `/pattern "geometric hexagons" --type="seamless"` |
| `/story` | Generate sequential images | `/story "seed growing into tree" --steps=4` |
| `/diagram` | Create flowcharts, architecture diagrams | `/diagram "CI/CD pipeline" --type="flowchart"` |
| `/nanobanana` | Natural language interface | `/nanobanana create a tech startup logo` |

### Command Options

**Generation Options:**
- `--count=N` - Generate 1-8 variations
- `--styles` - Artistic styles: watercolor, oil-painting, sketch, photorealistic, anime
- `--variations` - Variation types: lighting, angle, color-palette, mood, season
- `--preview` - Automatically display results
- `--seed=123` - Reproducible generation

**Icon Options:**
- `--sizes` - Size variants: "16,32,64,128,256"
- `--type` - Icon type: app-icon, favicon, ui-element

**Pattern Options:**
- `--type` - Pattern type: seamless, texture
- `--colors` - Color scheme: mono, duotone, colorful
- `--density` - Pattern density: sparse, medium, dense

**Diagram Options:**
- `--type` - Diagram type: flowchart, architecture, sequence, mockup
- `--complexity` - Detail level: simple, moderate, detailed
- `--style` - Visual style: minimal, technical, professional

**Story Options:**
- `--steps=N` - Number of frames (1-8)
- `--type` - Story type: process, tutorial, narrative

### Usage Examples

#### Text-to-Image Generation
```bash
# Simple image
gemini
> /generate "a serene Japanese garden at sunset"

# Multiple variations with styles
> /generate "mountain landscape" --count=4 --styles="watercolor,oil-painting,sketch,photorealistic"

# With preview
> /generate "futuristic city skyline" --count=3 --preview
```

#### Image Editing
```bash
> /edit portrait.jpg "change background to a beach sunset"
> /edit product.png "add a soft shadow and reflection"
> /edit logo.png "make it more minimalist" --preview
```

#### Icon Generation
```bash
# App icon set
> /icon "coffee shop logo" --type="app-icon" --sizes="64,128,256,512" --preview

# Favicon
> /icon "company initials JD" --type="favicon" --sizes="16,32,64"
```

#### Diagram Creation
```bash
# Architecture diagram
> /diagram "microservices architecture for e-commerce" --type="architecture" --complexity="detailed"

# Flowchart
> /diagram "user authentication flow" --type="flowchart" --style="technical"

# UI Mockup
> /diagram "mobile app dashboard" --type="mockup" --style="minimal"
```

#### Story/Sequence Generation
```bash
# Process visualization
> /story "coffee brewing process" --steps=6 --type="process" --preview

# Tutorial steps
> /story "how to tie a tie" --steps=5 --type="tutorial"
```

#### Pattern Creation
```bash
# Seamless pattern
> /pattern "geometric triangles" --type="seamless" --colors="duotone" --preview

# Texture
> /pattern "wood grain" --type="texture" --colors="mono"
```

### Environment Variables

Configure Nano Banana with these environment variables:

```bash
# API Key (priority order - use one)
export NANOBANANA_GEMINI_API_KEY="your_key"   # Recommended
export NANOBANANA_GOOGLE_API_KEY="your_key"   # Alternative
export GEMINI_API_KEY="your_key"              # Fallback
export GOOGLE_API_KEY="your_key"              # Fallback

# Model Selection
export NANOBANANA_MODEL="gemini-2.5-flash-image"  # Default
# Or for Nano Banana Pro (Gemini 3 Pro Image):
export NANOBANANA_MODEL="gemini-3-pro-image-preview"
```

### Models

| Model | Description | Best For |
|-------|-------------|----------|
| `gemini-2.5-flash-image` | Default, fast image generation | Most use cases, quick iterations |
| `gemini-3-pro-image-preview` | Nano Banana Pro, advanced reasoning | Complex compositions, detailed diagrams |

### Integration with Claude Code

When the user requests image generation or editing tasks, invoke the Gemini CLI with Nano Banana commands:

```bash
# Start Gemini CLI session for image work
gemini

# Or run a single command
gemini -c "/generate 'your prompt here'"
```

**Workflow Example:**
1. User: "이미지 생성해줘 - 우주를 떠다니는 고양이"
2. Claude detects image generation keywords → activates jelly-gemini
3. Execute: `gemini` then `/generate "a cat floating in space, cosmic background, whimsical"`
4. Return generated image path to user

### Best Practices

**DO:**
- Use descriptive, detailed prompts for better results
- Specify artistic style for consistent aesthetics
- Use `--preview` for immediate visual feedback
- Use `--count` for variations when exploring concepts
- Use appropriate command for the task (icon vs generate vs diagram)

**DON'T:**
- Use vague, single-word prompts
- Request inappropriate or harmful content
- Ignore model limitations for complex scenes
- Mix incompatible styles in single generation

---

## Summary

The jelly-gemini skill provides powerful integration with Google's Gemini AI models, offering unique capabilities:

- **Multimodal analysis** for combining visual and textual understanding
- **Massive context windows** for entire codebase reviews
- **Fast inference** for high-speed, cost-effective tasks
- **Session management** for multi-turn conversations
- **Flexible configuration** for precise control over model behavior
- **🍌 Nano Banana** for AI-powered image generation, editing, and restoration

Use this skill when you need Google AI's strengths: multimodal processing, long-context understanding, rapid inference, or creative image generation.
