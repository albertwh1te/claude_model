# Gemini Models Reference

Complete reference for all Gemini models available through the jelly-gemini skill, including capabilities, limitations, and selection guidance.

## Overview

Google's Gemini AI lineup offers multiple specialized models designed for different use cases, performance requirements, and complexity levels. The jelly-gemini skill supports the latest Gemini 2.5 and 3.0 generation models.

---

## Model Lineup

### gemini-2.5-flash

**Status**: Recommended Default Model
**Context Window**: 1,048,576 tokens (1M)
**Max Output**: 65,536 tokens

**Overview**:
Fast, cost-effective general-purpose model that handles most tasks with high quality. Provides the best price-performance ratio across a wide range of use cases.

**Key Characteristics**:
- Balanced speed and quality
- Excellent for code analysis
- Strong multimodal capabilities
- Optimal cost per request
- Fast response times (typically 1-5 seconds)

**Best For**:
- General coding assistance and code reviews
- Documentation and tutorial generation
- Explanations of technical concepts
- Quick research and summarization
- Multimodal analysis (images + text combined)
- Daily development tasks and utilities
- API documentation generation
- Bug analysis and fixing suggestions
- Test case generation

**Limitations**:
- Not optimized for extremely complex mathematical reasoning
- May provide less detailed analysis than gemini-2.5-pro for architectural decisions
- Limited reasoning depth compared to gemini-3.0-deep-think

**Performance Metrics**:
- Typical latency: 1-5 seconds
- Cost per 1M input tokens: ~$0.075
- Cost per 1M output tokens: ~$0.30
- Request limits: 15 requests/minute (free tier)

**Configuration Example**:
```bash
gemini generate \
  --model gemini-2.5-flash \
  --temperature 1.0 \
  --max-tokens 8192 \
  "Generate comprehensive API documentation for this REST endpoint"
```

**When to Choose Over Others**:
- Default choice when uncertain about model selection
- When cost is a consideration
- When response speed matters
- For iterative development workflows
- For batch processing multiple requests

---

### gemini-2.5-pro

**Status**: Premium Model
**Context Window**: 1,048,576 tokens (1M)
**Max Output**: 65,536 tokens

**Overview**:
Advanced reasoning model designed for complex tasks requiring deeper analysis and nuanced understanding. Offers the highest quality for architectural design and comprehensive code reviews.

**Key Characteristics**:
- Advanced reasoning capabilities
- Deeper analysis and recommendations
- Better handling of trade-offs and complexity
- Highest quality explanations
- Moderate response times (typically 10-30 seconds)

**Best For**:
- Complex architectural design and system planning
- Performance optimization and bottleneck identification
- Security audits and vulnerability analysis requiring deep understanding
- Advanced algorithm and data structure design
- Trade-off analysis between multiple approaches
- Large codebase analysis (50k-1M tokens)
- Enterprise system design
- Complex refactoring strategies
- Research-level technical analysis
- Comprehensive documentation of complex systems

**Limitations**:
- Higher cost than gemini-2.5-flash (4x more expensive)
- Slower response times
- Overkill for simple queries or brief explanations
- Not necessary for straightforward code assistance

**Performance Metrics**:
- Typical latency: 10-30 seconds
- Cost per 1M input tokens: ~$0.30
- Cost per 1M output tokens: ~$1.20
- Request limits: 15 requests/minute (free tier)

**Configuration Example**:
```bash
gemini generate \
  --model gemini-2.5-pro \
  --max-tokens 16384 \
  "Review this entire microservices architecture for scalability and resilience patterns"
```

**When to Choose Over Others**:
- Complex architectural decisions with multiple trade-offs
- Deep security analysis of critical code
- Performance optimization of large systems
- Analysis of codebases exceeding 50k tokens
- When highest quality output is required
- Enterprise-level system design

**Cost Considerations**:
gemini-2.5-pro costs approximately 4x more than gemini-2.5-flash. Use only when the additional reasoning capability is necessary.

---

### gemini-2.5-flash-lite

**Status**: Ultra-Lightweight Model
**Context Window**: 1,048,576 tokens (1M)
**Max Output**: 65,536 tokens

**Overview**:
Streamlined model optimized for speed and cost, ideal for high-volume simple tasks where response latency is critical and reasoning complexity is low.

**Key Characteristics**:
- Ultra-fast response times (typically under 1 second)
- Lowest operational cost
- Perfect for batch processing
- Ideal for high-volume workloads
- Excellent for real-time applications

**Best For**:
- Quick summarization of documents
- Simple question answering
- High-volume batch processing
- Real-time content moderation
- Simple code formatting and linting suggestions
- Text classification and categorization
- Quick fact retrieval
- Basic code snippet generation
- Simple documentation queries
- Cost-critical applications

**Limitations**:
- Cannot handle complex reasoning tasks
- Limited reasoning depth
- Not suitable for architectural design
- Poor performance on nuanced analysis
- May miss subtle issues in code review

**Performance Metrics**:
- Typical latency: < 1 second
- Cost per 1M input tokens: ~$0.03
- Cost per 1M output tokens: ~$0.12
- Request limits: 30 requests/minute (free tier)

**Configuration Example**:
```bash
gemini generate \
  --model gemini-2.5-flash-lite \
  --max-tokens 2048 \
  "Summarize this document in 3-5 bullet points"
```

**When to Choose Over Others**:
- Cost optimization for simple tasks
- When response time is critical (< 1 second needed)
- High-volume batch processing (100+ requests)
- Simple summarization tasks
- Proof-of-concept demonstrations
- Development and testing environments

**Cost Optimization**:
gemini-2.5-flash-lite costs about 1/10th the price of gemini-2.5-flash. For high-volume operations, this model can deliver significant savings.

---

### gemini-3.0-deep-think

**Status**: Advanced Reasoning Model
**Context Window**: 1,048,576 tokens (1M)
**Max Output**: 65,536 tokens

**Overview**:
Specialized model for complex reasoning tasks requiring step-by-step analysis, multi-stage problem-solving, and deep mathematical or logical reasoning.

**Key Characteristics**:
- Extended reasoning capability
- Step-by-step solution generation
- Deep mathematical reasoning
- Complex problem decomposition
- Longest response times (typically 30-120 seconds)
- Higher operational cost
- **Temperature must remain at 1.0** (non-configurable)

**Best For**:
- Mathematical proofs and complex calculations
- Multi-step reasoning challenges requiring explicit work
- Advanced optimization problems
- Research-level technical analysis
- Complex algorithm design with justification
- Strategy and planning problems
- Complex data structure design with trade-off analysis
- Competitive programming problems
- Advanced machine learning algorithm design
- Complex systems engineering challenges

**Limitations**:
- Slowest response times (30-120 seconds)
- Highest operational cost
- Cannot use custom temperature settings (must stay at 1.0)
- Not suitable for quick queries
- Overkill for simple tasks

**Performance Metrics**:
- Typical latency: 30-120 seconds
- Cost per 1M input tokens: ~$1.00
- Cost per 1M output tokens: ~$4.00
- Request limits: 15 requests/minute (free tier)

**Critical Limitation**:
**Temperature must always be 1.0 for Gemini 3.0 Deep Think models**. Any attempt to modify the temperature parameter will be ignored or cause an error.

**Configuration Example**:
```bash
gemini generate \
  --model gemini-3.0-deep-think \
  --temperature 1.0 \
  --max-tokens 16384 \
  "Solve this complex optimization problem: minimize f(x,y) = x^2 + 2y^2 - xy + x - y subject to constraints..."
```

**When to Choose Over Others**:
- Explicit requirement for deep reasoning
- Mathematical proofs and complex calculations
- Research-level analysis
- When user explicitly requests "deep thinking"
- Complex multi-step problem solving
- Competitive programming or algorithmic challenges

**Cost Optimization**:
gemini-3.0-deep-think costs significantly more (~15x gemini-2.5-flash-lite). Use only when deep reasoning is genuinely required.

---

## Model Selection Matrix

| Metric | Flash | Pro | Flash Lite | Deep Think |
|--------|-------|-----|-----------|-----------|
| **Speed** | Fast (1-5s) | Moderate (10-30s) | Ultra-fast (<1s) | Slow (30-120s) |
| **Quality** | High | Very High | Good | Excellent |
| **Cost** | Low | High (4x) | Very Low (1/10x) | Very High (15x) |
| **Reasoning** | Good | Very Good | Basic | Advanced |
| **Context Window** | 1M | 1M | 1M | 1M |
| **Max Output** | 65k | 65k | 65k | 65k |
| **Best For** | General | Complex | High-volume | Deep reasoning |
| **Use Case %** | 70% | 15% | 10% | 5% |

---

## Model Comparison Details

### Code Analysis & Review

**Simple code review** (< 5k tokens):
- Recommended: gemini-2.5-flash
- Cost-effective and sufficient for typical file reviews

**Complex codebase review** (50k-1M tokens):
- Recommended: gemini-2.5-pro
- Provides comprehensive analysis of entire systems

**Security vulnerability analysis**:
- Recommended: gemini-2.5-pro
- Better at identifying subtle security issues

**Quick linting/formatting suggestions**:
- Recommended: gemini-2.5-flash-lite
- Fast enough for real-time integration

### Multimodal Tasks

**Image analysis with text**:
- Recommended: gemini-2.5-flash
- Excellent multimodal capabilities at low cost

**Multiple image comparison** (3+ images):
- Recommended: gemini-2.5-flash
- Handles multiple images simultaneously without issue

**Detailed visual design review**:
- Recommended: gemini-2.5-pro
- Provides more nuanced analysis of design decisions

### Documentation & Writing

**API documentation generation**:
- Recommended: gemini-2.5-flash
- Fast and produces quality documentation

**Tutorial and guide creation**:
- Recommended: gemini-2.5-flash
- Good explanatory capability at reasonable speed

**Technical writing refinement**:
- Recommended: gemini-2.5-pro
- Better handling of nuance and clarity

### Research & Analysis

**Quick fact lookup**:
- Recommended: gemini-2.5-flash-lite
- Fast response for simple queries

**Comprehensive research summary** (50k+ tokens):
- Recommended: gemini-2.5-pro
- Better analysis of large documents

**Complex research analysis**:
- Recommended: gemini-3.0-deep-think
- Multi-step reasoning through complex topics

### Mathematical & Logical

**Basic math problems**:
- Recommended: gemini-2.5-flash
- Handles standard calculations well

**Complex proofs & optimization**:
- Recommended: gemini-3.0-deep-think
- Specialized for mathematical reasoning

---

## Pricing Overview

Pricing is per 1 million tokens processed.

### Input Token Pricing
```
gemini-2.5-flash:      $0.075 per 1M tokens
gemini-2.5-pro:        $0.30 per 1M tokens (4x Flash)
gemini-2.5-flash-lite: $0.03 per 1M tokens (0.4x Flash)
gemini-3.0-deep-think: $1.00 per 1M tokens (13x Flash)
```

### Output Token Pricing
```
gemini-2.5-flash:      $0.30 per 1M tokens
gemini-2.5-pro:        $1.20 per 1M tokens (4x Flash)
gemini-2.5-flash-lite: $0.12 per 1M tokens (0.4x Flash)
gemini-3.0-deep-think: $4.00 per 1M tokens (13x Flash)
```

### Example Costs

**Small request** (1k input, 1k output):
- Flash: $0.00013
- Flash Lite: $0.00005
- Pro: $0.00065
- Deep Think: $0.00500

**Medium request** (10k input, 5k output):
- Flash: $0.00225
- Flash Lite: $0.00090
- Pro: $0.00900
- Deep Think: $0.05000

**Large request** (100k input, 20k output):
- Flash: $0.01350
- Flash Lite: $0.00540
- Pro: $0.05400
- Deep Think: $0.13000

**Huge codebase** (1M input, 50k output):
- Flash: $0.13500
- Flash Lite: $0.05400
- Pro: $0.54000
- Deep Think: $1.30000

---

## Token Counting

Understanding token counts helps estimate costs and optimize requests.

### Approximate Token Counts

```
1 character ≈ 0.25 tokens
1 word ≈ 1.3 tokens
1 line of code ≈ 1.5 tokens
1 KB of text ≈ 256 tokens
1 MB of code ≈ 250k tokens
1 minute of video ≈ 10k tokens (if supported)
1 image ≈ 100-1000 tokens (varies by size)
```

### Token Estimation Examples

**Typical API endpoint documentation**:
- ~2k input tokens + ~1k output = ~$0.0002 on Flash

**Full TypeScript file review** (500 lines):
- ~1.5k input tokens + ~2k output = ~$0.0008 on Flash

**Entire microservices codebase** (200 files, 50k lines):
- ~100k input tokens + ~10k output = ~$0.0135 on Flash
- Same request on Pro: ~$0.054
- Same request on Deep Think: ~$0.13

---

## Model Lifecycle & Stability

### Current Generation (2025)

**Gemini 2.5 Models**:
- gemini-2.5-flash: Latest stable general model
- gemini-2.5-pro: Latest stable premium model
- gemini-2.5-flash-lite: Latest lightweight model
- Status: Full production support
- Expected availability: Minimum 12 months

**Gemini 3.0 Models**:
- gemini-3.0-deep-think: Latest reasoning model
- Status: Full production support
- Expected availability: Minimum 12 months

### Previous Generation (2024)

**Gemini 1.5 Models** (fallback options if needed):
- gemini-1.5-flash: Previous generation fast model
- gemini-1.5-pro: Previous generation premium model
- Status: Supported but will eventually deprecate
- Recommendation: Migrate to 2.5 series

### Deprecation Policy

Google typically supports models for 12+ months after a new generation release. The jelly-gemini skill includes fallback chains to handle eventual deprecations gracefully.

---

## Selecting the Right Model

### Decision Tree

```
What's your primary concern?
│
├─ "I need fast, cost-effective results"
│  └─ Use: gemini-2.5-flash (70% of use cases)
│
├─ "I need the highest quality analysis"
│  └─ Use: gemini-2.5-pro
│
├─ "I need ultra-fast responses (< 1 second)"
│  └─ Use: gemini-2.5-flash-lite
│
└─ "I need deep mathematical or logical reasoning"
   └─ Use: gemini-3.0-deep-think
```

### Quick Selection Guide

**Choose Flash if**:
- You're uncertain which model to use
- Budget is a consideration
- Task is general or mixed complexity
- Response time should be reasonable (1-5s)
- Task is typical development work

**Choose Pro if**:
- Analyzing entire codebases (> 50k tokens)
- Complex architectural design decisions
- Deep security analysis required
- Quality matters more than cost
- Enterprise-level analysis needed

**Choose Flash Lite if**:
- Response time must be < 1 second
- Processing 100+ requests in a session
- Cost is the primary constraint
- Task is fundamentally simple
- Real-time applications need the model

**Choose Deep Think if**:
- Mathematical proofs or calculations
- Multi-step reasoning explicitly needed
- Complex optimization problems
- Research-level analysis required
- User explicitly requests "deep thinking"

---

## Advanced Model Features

### Context Window Utilization

All Gemini models support 1M token context windows. This enables:

- **Entire codebase analysis**: Load entire projects without chunking
- **Large document processing**: Process 200+ page documents in single request
- **Long conversation history**: Maintain context across 100+ turns
- **Multimodal long-form**: Combine images, text, and video in same context

**Practical Example**:
A 500k token codebase can be analyzed in a single request on any Gemini model, eliminating the need for chunking or multiple requests.

### Output Token Limits

**Default (8192 tokens)**:
Suitable for most tasks:
- Code reviews and analyses
- Documentation generation
- Explanations and tutorials
- API design proposals

**Extended (16384+ tokens)**:
For comprehensive responses:
- Full system design documents
- Detailed step-by-step solutions
- Multiple approaches with trade-offs
- Extended tutorials and guides

**Maximum (65536 tokens)**:
For extensive analysis:
- Complete architectural documentation
- Full codebase refactoring guides
- Comprehensive research papers
- Multiple alternative solutions with analysis

---

## Model Performance Characteristics

### Input Processing Speed

```
Model               | Speed         | Use For
--------------------|---------------|-----------------------------------
Flash               | Standard      | General tasks
Flash Lite          | 2-3x faster   | High-volume processing
Pro                 | Slower        | Complex analysis
Deep Think          | 3-5x slower   | Deep reasoning tasks
```

### Quality/Speed Trade-offs

```
Model        | Quality | Speed   | Best When
-------------|---------|---------|---------------------------
Flash Lite   | Good    | Fastest | Time matters > quality
Flash        | High    | Fast    | Balanced (RECOMMENDED)
Pro          | Very    | Slower  | Quality matters > cost
Deep Think   | Best    | Slowest | Complex reasoning needed
```

### Memory & Resource Usage

All models handle up to 1M tokens in context. No client-side chunking required:

```
Codebase Size | Approach
--------------|----------------------------------
< 10k tokens  | Any model fine
10-100k tokens| Any model fine
100k-1M tokens| Any model fine; Pro recommended
> 1M tokens   | Not supported; must chunk manually
```

---

## Monitoring and Debugging

### Checking Available Models

```bash
gemini models list
```

Returns current available models and their status.

### Verifying Model Capabilities

```bash
gemini models info gemini-2.5-flash
```

Shows detailed information about specific model including:
- Context window size
- Max output tokens
- Supported features
- Cost per token
- Status and availability

### API Quota Status

Check your quota at: https://console.cloud.google.com/

Monitor:
- Requests per minute
- Tokens per minute
- Requests per day
- Current usage

---

## Additional Resources

- [Gemini Models Documentation](https://ai.google.dev/gemini-api/docs/models)
- [Gemini API Reference](https://ai.google.dev/api/rest)
- [Pricing Calculator](https://ai.google.dev/pricing)
- [Model Comparison Tool](https://ai.google.dev/gemini-api/docs/models)

