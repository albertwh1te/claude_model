# Configuration Guide

Complete reference for all CLI parameters, safety settings, and configuration options available in the jelly-gemini skill.

## Overview

The jelly-gemini skill provides fine-grained control over model behavior through CLI parameters. This guide explains each parameter, its effects, and best practices for different use cases.

---

## Core Parameters

### --model

**Purpose**: Specify which Gemini model to use
**Type**: String
**Default**: `gemini-2.5-flash`
**Required**: No (uses default if not specified)

**Available Values**:
```
gemini-2.5-flash      # General purpose (recommended)
gemini-2.5-pro        # Advanced reasoning
gemini-2.5-flash-lite # Ultra-fast lightweight
gemini-3.0-deep-think # Deep mathematical reasoning
```

**Usage**:
```bash
gemini generate \
  --model gemini-2.5-pro \
  "Analyze this architecture"
```

**When to Override Default**:
- Task complexity requires Pro or Deep Think
- Need ultra-fast responses (use Flash Lite)
- Handling deep mathematical problems (use Deep Think)
- Optimizing for cost with simple tasks (use Flash Lite)

**Performance Impact**:
- Flash: Baseline (1-5s response time)
- Flash Lite: 2-3x faster, less accurate
- Pro: 10x slower, significantly better quality
- Deep Think: 50x slower, best reasoning

---

### --temperature

**Purpose**: Control randomness and creativity in responses
**Type**: Float
**Range**: 0.0 - 2.0
**Default**: 1.0
**Unit**: Unitless (relative scale)

**Value Meanings**:
```
0.0  = Deterministic (always highest probability)
0.3  = Low randomness (focused, consistent)
0.7  = Reduced randomness
1.0  = Balanced (recommended default)
1.5  = High creativity
2.0  = Maximum randomness
```

**Behavior at Different Temperatures**:

**Temperature 0.0 (Deterministic)**:
- Always selects most probable token
- Identical output for identical input
- Best for: Code generation, reproducible results
- Disadvantage: Potentially boring, less diverse

**Temperature 0.3-0.5 (Low Randomness)**:
- Focused, consistent responses
- Still some variability for diversity
- Best for: Code reviews, security analysis, fact retrieval
- Use case: When consistency matters

**Temperature 1.0 (Balanced, Default)**:
- Well-balanced randomness and quality
- Good diversity in responses
- Best for: General tasks, default choice
- Use case: When uncertain about temperature

**Temperature 1.5-2.0 (High Creativity)**:
- Very creative, exploratory responses
- Significant variability between runs
- Best for: Brainstorming, creative writing, idea generation
- Disadvantage: May be less reliable for technical tasks

**Usage Examples**:

```bash
# Deterministic code generation
gemini generate \
  --temperature 0.3 \
  --model gemini-2.5-flash \
  "Generate a Python class for a queue data structure"

# Balanced general task
gemini generate \
  --temperature 1.0 \
  --model gemini-2.5-flash \
  "Explain how REST APIs work"

# Creative brainstorming
gemini generate \
  --temperature 1.8 \
  --model gemini-2.5-flash \
  "Brainstorm 10 novel features for a todo application"
```

**Critical Restriction**:
**For Gemini 3.0 Deep Think models, temperature MUST be 1.0 and cannot be changed.**

```bash
# CORRECT for Deep Think
gemini generate \
  --model gemini-3.0-deep-think \
  --temperature 1.0 \
  "Complex mathematical problem"

# INCORRECT - will fail or be ignored
gemini generate \
  --model gemini-3.0-deep-think \
  --temperature 0.5 \
  "Complex mathematical problem"
```

**Best Practices**:
- Default to 1.0 unless you have a specific reason to change
- Lower temperatures (0.3-0.7) for technical, reproducible tasks
- Higher temperatures (1.5+) for creative exploration
- Always use 1.0 for Deep Think models (no flexibility)

---

### --top-p (Top-K Sampling Alternative)

**Purpose**: Control diversity through nucleus sampling
**Type**: Float
**Range**: 0.0 - 1.0
**Default**: 0.95
**Alternative To**: Temperature (use one or the other, not both)

**Value Meanings**:
```
0.8  = More focused (only top 80% probable tokens)
0.9  = Balanced focus
0.95 = Default (consider top 95% of tokens)
1.0  = Consider all tokens (maximum diversity)
```

**How It Works**:
Top-p (nucleus sampling) works differently from temperature:
- Selects tokens from top probability distribution that sum to p
- Temperature scales probabilities uniformly
- Together they provide two independent controls

**Usage**:
```bash
gemini generate \
  --top-p 0.8 \
  --model gemini-2.5-flash \
  "Generate a technical specification"
```

**When to Use Top-P**:
- Fine-grained control over output diversity
- When temperature alone doesn't achieve desired effect
- Reducing nonsensical outputs while keeping creativity

**Comparison with Temperature**:
```
         Temperature | Top-P
---------|-----------|----------
Control  | Randomness| Diversity
Effect   | Global    | Local
Best For | General   | Specific
Default  | 1.0       | 0.95
```

**Best Practices**:
- Start with temperature (more intuitive)
- Use top-p if temperature needs fine-tuning
- Don't change both simultaneously
- Default 0.95 works well for most cases

---

### --max-tokens (Max Output Tokens)

**Purpose**: Limit maximum output length
**Type**: Integer
**Range**: 1 - 65,536
**Default**: 8,192
**Unit**: Tokens (roughly 3-4 characters per token)

**Common Values**:
```
1,024   = Short responses (50-150 words)
2,048   = Brief responses (150-500 words)
4,096   = Medium responses (300-1,200 words)
8,192   = Standard responses (600-2,500 words) [DEFAULT]
16,384  = Long responses (1,200-5,000 words)
32,768  = Very long responses (2,500-10,000 words)
65,536  = Maximum (5,000-20,000 words)
```

**When to Adjust**:

**Reduce (< 4,096)**:
- Quick summaries needed
- High-volume batch processing
- Real-time applications with latency constraints
- Cost optimization for simple tasks
- When verbose responses aren't needed

**Keep Default (8,192)**:
- Standard code reviews
- API documentation generation
- Tutorial writing
- Explanations
- Most general tasks

**Increase (> 8,192)**:
- Comprehensive system design documents
- Full architectural analysis
- Detailed step-by-step solutions
- Multiple alternative approaches with analysis
- Large refactoring guides

**Usage Examples**:

```bash
# Quick summary
gemini generate \
  --max-tokens 1024 \
  --model gemini-2.5-flash-lite \
  "Summarize this 100-page document in 3 bullet points"

# Standard analysis
gemini generate \
  --max-tokens 8192 \
  --model gemini-2.5-flash \
  "Review this code for improvements"

# Comprehensive architecture document
gemini generate \
  --max-tokens 32768 \
  --model gemini-2.5-pro \
  "Design a complete microservices architecture for an e-commerce platform"
```

**Token-to-Words Conversion**:
```
1,000 tokens   ≈ 300-750 words
4,000 tokens   ≈ 1,200-3,000 words
8,192 tokens   ≈ 2,500-6,000 words
16,384 tokens  ≈ 5,000-12,000 words
32,768 tokens  ≈ 10,000-24,000 words
```

**Performance Impact**:
- Longer max-tokens increases latency
- Double max-tokens roughly doubles response time
- Cost increases with max-tokens used (only pays for what's generated)

**Best Practices**:
- Start with default 8,192
- Increase only if responses are being truncated
- Monitor actual token usage (shown in response metadata)
- Use --stream flag to see progress for long responses

---

## Safety Configuration

### --safety-level

**Purpose**: Control content filtering strictness
**Type**: String
**Default**: `default` (strict filtering)
**Values**: `default` | `permissive`

**Default Mode (Strict)**:
- Maximum filtering across all harm categories
- Safest mode for general use
- May occasionally block legitimate technical content
- Recommended for production applications

**Permissive Mode**:
- Reduced filtering suitable for technical analysis
- Necessary for code security analysis
- Allows discussion of vulnerabilities and sensitive code
- Recommended for development and technical tasks

**Safety Categories Affected**:
```
HARM_CATEGORY_HARASSMENT
HARM_CATEGORY_HATE_SPEECH
HARM_CATEGORY_SEXUALLY_EXPLICIT
HARM_CATEGORY_DANGEROUS_CONTENT
```

**When Default Mode Blocks You**:
- Analyzing security vulnerabilities in code
- Discussing dangerous algorithms (encryption, hashing)
- Reviewing code that processes sensitive data
- Security research and penetration testing

**Usage Examples**:

```bash
# Safe mode for general content
gemini generate \
  --safety-level default \
  "Explain how OAuth 2.0 works"

# Permissive for technical security analysis
gemini generate \
  --safety-level permissive \
  "Analyze this code for SQL injection vulnerabilities"

# Permissive for algorithm discussion
gemini generate \
  --safety-level permissive \
  "Implement AES encryption algorithm"
```

**Safety Threshold Details**:

**Default**:
- BLOCK_MEDIUM_AND_ABOVE: Blocks medium+ probability of harm
- Most conservative
- Some false positives on technical content
- Recommended for user-facing applications

**Permissive**:
- BLOCK_ONLY_HIGH: Blocks only high probability content
- Still filters obviously harmful content
- Allows legitimate security/technical discussion
- Recommended for development and research

**Best Practices**:
- Start with `default` (safer)
- Switch to `permissive` only for technical code analysis
- Don't use permissive for untrusted user input
- Review outputs for any concerning content

---

### Safety in Practice

**Example: Code Analysis**

```bash
# CORRECT - Use permissive for vulnerability analysis
gemini generate \
  --safety-level permissive \
  "Review this authentication code for security vulnerabilities"

# INCORRECT - Default mode may block analysis
gemini generate \
  --safety-level default \
  "Review this authentication code for security vulnerabilities"
```

**Example: General Assistance**

```bash
# CORRECT - Default safe mode fine
gemini generate \
  --safety-level default \
  "How do I implement a login form?"

# Still works with permissive, but unnecessary
gemini generate \
  --safety-level permissive \
  "How do I implement a login form?"
```

---

## Output Formatting

### --format

**Purpose**: Control response format
**Type**: String
**Default**: `text`
**Values**: `text` | `json` | `markdown`

**Text Format**:
- Plain text output
- Default format
- Best for: General explanations, discussions
- No special formatting

**JSON Format**:
- Structured JSON output
- Machine-parseable
- Best for: Programmatic processing, API responses
- Useful for: Automation, data extraction

**Markdown Format**:
- Markdown-formatted output
- Includes headers, code blocks, lists
- Best for: Documentation, tutorials, technical writing
- Preserves formatting in output

**Usage Examples**:

```bash
# Plain text
gemini generate \
  --format text \
  "Explain REST API design principles"

# JSON for structured data
gemini generate \
  --format json \
  --model gemini-2.5-flash \
  "Generate API response schema"

# Markdown for documentation
gemini generate \
  --format markdown \
  "Create a tutorial on async/await in JavaScript"
```

**Best Practices**:
- Use `markdown` for documentation generation
- Use `json` when you need to parse the response programmatically
- Use `text` for interactive explanation
- Combine with `--output` flag to save formatted output

---

### --stream

**Purpose**: Enable streaming output for real-time response display
**Type**: Boolean flag (no value)
**Default**: Disabled
**Effect**: Prints tokens as they arrive instead of waiting for complete response

**Usage**:
```bash
# Stream long response
gemini generate \
  --stream \
  --max-tokens 16384 \
  "Provide a comprehensive tutorial on TypeScript generics"
```

**When to Use**:
- Long responses (10k+ tokens) where you don't want to wait
- Real-time visualization of response generation
- Testing streaming capability
- High-latency scenarios

**When NOT to Use**:
- Short responses (don't need streaming)
- Machine parsing of output (need complete response)
- Batch processing (streaming adds overhead)

**Performance Impact**:
- Streaming starts immediately (better perceived latency)
- Total time similar to non-streaming
- Network bandwidth: identical
- Best for: User perception of responsiveness

---

## Advanced Configuration

### --top-k

**Purpose**: Alternative diversity control (rarely needed)
**Type**: Integer
**Range**: 1 - 1000
**Default**: Not set (uses default algorithm)

**How It Works**:
- Limits sampling to top K most probable tokens
- Similar to top-p but uses fixed number instead of probability
- Less commonly used than top-p or temperature

**Typical Values**:
```
Top-K 20   = Conservative (only top 20 tokens)
Top-K 40   = Balanced
Top-K 100+ = Liberal (many possible tokens)
```

**When to Use**:
- Advanced fine-tuning of diversity
- When top-p alone doesn't achieve desired effect
- Reducing output variance in specific scenarios

**Usage**:
```bash
gemini generate \
  --top-k 40 \
  "Generate function names for a calculator class"
```

---

### --presence-penalty

**Purpose**: Penalize repeating tokens
**Type**: Float
**Range**: -2.0 to 2.0
**Default**: 0
**Effect**: Discourages repetition of tokens already in output

**Values**:
```
-2.0 = Encourage repetition
0.0  = Neutral (default)
1.0  = Moderate penalty for repetition
2.0  = Strong penalty for repetition
```

**When to Use**:
- Reducing redundant explanations
- Encouraging diverse vocabulary
- Avoiding repeated code patterns
- Generating diverse suggestions

**Usage**:
```bash
gemini generate \
  --presence-penalty 1.0 \
  "Generate 10 different ways to implement a function"
```

---

### --frequency-penalty

**Purpose**: Penalize tokens based on frequency in output
**Type**: Float
**Range**: -2.0 to 2.0
**Default**: 0
**Effect**: Discourages overusing common tokens

**Values**:
```
-2.0 = Allow frequent repetition
0.0  = Neutral (default)
1.0  = Moderate penalty
2.0  = Strong penalty for frequent tokens
```

**Difference from Presence Penalty**:
- Presence: Penalizes any repetition
- Frequency: Penalizes proportional to how much it's used
- Frequency is more nuanced

**Usage**:
```bash
gemini generate \
  --frequency-penalty 0.5 \
  "Write creative product names avoiding overused words"
```

---

## Session Configuration

### --session

**Purpose**: Specify which session to use or create
**Type**: String
**Default**: Auto-creates new session if not specified
**Format**: Session ID or special values

**Special Values**:
```
--session last      = Use most recent session
--session new       = Always create new session
--session <id>      = Use specific session by ID
```

**Usage**:

```bash
# Create new session explicitly
gemini generate --session new "Initial design question"

# Resume last session
gemini generate --session last "Continue with that design"

# Use specific session
gemini generate --session gemini-session-abc123 "Resume this session"
```

**Session File Location**:
```
~/.jelly-gemini/sessions/gemini-session-YYYYMMDD-HHMMSS.json
```

**Best Practices**:
- Use `--session last` for natural conversations
- Use `--session new` to start fresh topic
- Sessions automatically saved, no manual management needed

---

### --no-save

**Purpose**: Prevent saving response to session
**Type**: Boolean flag (no value)
**Default**: Disabled (responses are saved)
**Effect**: Response processed but not stored in session history

**Usage**:
```bash
# One-off query without affecting session
gemini generate \
  --session last \
  --no-save \
  "Quick question about previous work"
```

**When to Use**:
- Quick tangential questions
- One-off queries
- Not wanting to pollute session history
- Testing without committing to session

**When NOT to Use**:
- Normal conversation flow (should save)
- Continuation work (must save)

---

## Profile-Based Configuration

Pre-configured profiles for common scenarios.

### Code Analysis Profile

**Best for**: Reviewing and analyzing code
```bash
gemini generate \
  --model gemini-2.5-pro \
  --temperature 0.3 \
  --top-p 0.8 \
  --safety-level permissive \
  --format markdown \
  "Review this code"
```

### Creative Writing Profile

**Best for**: Content creation and brainstorming
```bash
gemini generate \
  --model gemini-2.5-flash \
  --temperature 1.8 \
  --max-tokens 16384 \
  --format markdown \
  "Write a blog post about"
```

### Research Profile

**Best for**: Analyzing large documents and codebases
```bash
gemini generate \
  --model gemini-2.5-pro \
  --temperature 1.0 \
  --max-tokens 16384 \
  --format markdown \
  "Analyze this research"
```

### Speed Profile

**Best for**: Quick responses prioritizing latency
```bash
gemini generate \
  --model gemini-2.5-flash-lite \
  --temperature 1.0 \
  --max-tokens 4096 \
  "Quick question"
```

### Deep Thinking Profile

**Best for**: Complex mathematical or logical problems
```bash
gemini generate \
  --model gemini-3.0-deep-think \
  --temperature 1.0 \
  --max-tokens 16384 \
  --format markdown \
  "Complex problem"
```

---

## Configuration Best Practices

### Principle 1: Start Simple

```bash
# GOOD - Start with minimal config
gemini generate "your question"

# UNNECESSARY - Overspecifying
gemini generate \
  --model gemini-2.5-flash \
  --temperature 1.0 \
  --top-p 0.95 \
  --max-tokens 8192 \
  --safety-level default \
  "your question"
```

### Principle 2: Change One Parameter at a Time

```bash
# Good - Test effect of temperature
gemini generate --temperature 0.3 "test"
gemini generate --temperature 0.7 "test"
gemini generate --temperature 1.5 "test"

# Bad - Changes multiple unknowns
gemini generate --temperature 0.3 --max-tokens 4096 "test"
```

### Principle 3: Match Configuration to Task

| Task | Model | Temperature | Top-P | Max Tokens |
|------|-------|-------------|-------|-----------|
| Code Review | Pro | 0.3 | 0.8 | 8192 |
| General Q&A | Flash | 1.0 | 0.95 | 8192 |
| Creative | Flash | 1.5 | 0.98 | 16384 |
| Fast Summary | Lite | 1.0 | 0.95 | 2048 |
| Deep Thinking | 3.0 | 1.0 | 0.95 | 16384 |

### Principle 4: Safety First

```bash
# CORRECT - Safe default, specific where needed
gemini generate --safety-level default "general query"
gemini generate --safety-level permissive "code vulnerability analysis"

# INCORRECT - Unsafe default
gemini generate --safety-level permissive "general query"
```

### Principle 5: Cost Awareness

```bash
# EFFICIENT - Use Flash Lite for simple tasks
gemini generate --model gemini-2.5-flash-lite "summarize"

# WASTEFUL - Using Pro for simple task
gemini generate --model gemini-2.5-pro "summarize"

# JUSTIFIED - Using Pro for complex analysis
gemini generate --model gemini-2.5-pro "architectural review"
```

---

## Troubleshooting Configuration

### Output Too Short

**Solution**: Increase max-tokens
```bash
# Before
gemini generate --max-tokens 2048 "comprehensive analysis"

# After
gemini generate --max-tokens 8192 "comprehensive analysis"
```

### Output Too Verbose

**Solution**: Reduce max-tokens
```bash
# Before
gemini generate --max-tokens 16384 "quick summary"

# After
gemini generate --max-tokens 2048 "quick summary"
```

### Too Much Randomness

**Solution**: Reduce temperature
```bash
# Before (random)
gemini generate --temperature 1.8 "technical documentation"

# After (focused)
gemini generate --temperature 0.5 "technical documentation"
```

### Response Getting Blocked by Safety

**Solution**: Use permissive mode
```bash
# Before (blocked)
gemini generate "analyze security vulnerability"

# After (works)
gemini generate --safety-level permissive "analyze security vulnerability"
```

### Responses Too Similar to Previous Ones

**Solution**: Increase temperature or presence penalty
```bash
gemini generate \
  --temperature 1.5 \
  --presence-penalty 1.0 \
  "generate diverse alternatives"
```

### Model Not Found

**Solution**: Use fallback model
```bash
# Use stable fallback
gemini generate --model gemini-2.5-flash "query"

# Check available models
gemini models list
```

---

## Configuration Quick Reference

| Parameter | Type | Default | Effect |
|-----------|------|---------|--------|
| --model | String | flash | Which Gemini model |
| --temperature | Float | 1.0 | Randomness (0=deterministic, 2=creative) |
| --top-p | Float | 0.95 | Diversity (nucleus sampling) |
| --max-tokens | Integer | 8192 | Max output length |
| --format | String | text | Output format (text/json/markdown) |
| --safety-level | String | default | Content filtering (default/permissive) |
| --stream | Flag | off | Stream output in real-time |
| --session | String | auto | Session management (last/new/id) |
| --no-save | Flag | off | Don't save to session |

