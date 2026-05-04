# Error Handling Guide

Comprehensive reference for all error types, meanings, troubleshooting steps, and recovery strategies for the jelly-gemini skill.

## Overview

The jelly-gemini skill provides clear error messages with actionable solutions. This guide helps you understand, diagnose, and resolve issues quickly.

---

## Authentication Errors

### Error 401: Unauthorized

**Full Error Message**:
```
Error: Gemini API authentication failed (401)
Reason: Invalid or missing API key
```

**Causes**:
- `GOOGLE_API_KEY` environment variable not set
- API key is invalid or expired
- API key doesn't have required permissions
- API key was revoked from Google Cloud Console

**Diagnosis**:
```bash
# Check if API key is set
echo $GOOGLE_API_KEY

# If empty, key is not set
# If set, verify key is correct format (starts with AIza...)
```

**Solutions**:

**Step 1: Get a valid API key**
1. Visit: https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key" or select existing key
4. Copy the key to clipboard

**Step 2: Set environment variable**
```bash
# Set for current session
export GOOGLE_API_KEY="AIzaSyD..."

# Set permanently (add to ~/.zshrc or ~/.bashrc)
echo 'export GOOGLE_API_KEY="AIzaSyD..."' >> ~/.zshrc
source ~/.zshrc

# Verify it's set
echo $GOOGLE_API_KEY
```

**Step 3: Test connection**
```bash
gemini generate "hello"
```

**Verification**:
```bash
# Verify key is valid
gemini auth check
# Should output: Authentication successful
```

### Error 403: Forbidden

**Full Error Message**:
```
Error: Access forbidden (403)
Reason: API key lacks required permissions
```

**Causes**:
- API key exists but doesn't have Generative AI API enabled
- API key is restricted to specific hosts/IPs
- Account quota exceeded or suspended

**Solutions**:

**Enable Generative AI API**:
1. Visit: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com
2. Click "Enable" button
3. Wait 30-60 seconds for activation
4. Try gemini command again

**Check API Restrictions**:
1. Visit: https://console.cloud.google.com/apis/credentials
2. Click on your API key
3. Under "API restrictions", ensure "Generative AI API" is allowed
4. If restricted to other APIs, modify to include Generative AI

**Check Quota**:
1. Visit: https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com/quotas
2. Verify quotas are not exceeded
3. If exceeded, wait for quota reset or upgrade plan

---

## Rate Limiting Errors

### Error 429: Too Many Requests

**Full Error Message**:
```
Error: Rate limit exceeded (429)
Reason: Too many requests in short timeframe
Retry-After: 60 seconds
```

**Causes**:
- Exceeded requests per minute (15 req/min free tier)
- Exceeded tokens per minute (1M tokens/min free tier)
- Exceeded daily request limit (1500 requests/day free tier)

**Current Limits** (Free Tier):
```
Requests:    15 per minute
Tokens:      1M per minute
Daily:       1500 requests per day
```

**Solutions**:

**Short-term (immediate)**:
```bash
# Wait 60 seconds, then retry
sleep 60
gemini generate "your prompt"
```

**Medium-term (within session)**:
```bash
# Reduce request frequency
# Instead of:
for i in {1..20}; do gemini generate "prompt"; done

# Do:
for i in {1..5}; do gemini generate "prompt"; sleep 3; done
```

**Long-term (ongoing)**:

1. **Upgrade API quota**:
   - Visit: https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com/quotas
   - Request quota increase
   - Wait for Google approval (24-48 hours)

2. **Use batch processing**:
   ```bash
   # Process multiple requests with delays
   gemini batch --delay 5 requests.json
   ```

3. **Use flash-lite model** (lower token consumption):
   ```bash
   gemini generate \
     --model gemini-2.5-flash-lite \
     "your prompt"
   ```

**Automatic Retry Strategy**:
The jelly-gemini skill automatically retries 429 errors with exponential backoff:
```
Attempt 1: Immediate
Attempt 2: Wait 2 seconds, retry
Attempt 3: Wait 4 seconds, retry
Attempt 4: Wait 8 seconds, retry
Max attempts: 3
```

---

## Content Safety Errors

### Error 400: Safety Blocked (Content Filter)

**Full Error Message**:
```
Error: Request blocked (400)
Reason: Content blocked by safety filters
Blocked categories:
  - HARM_CATEGORY_DANGEROUS_CONTENT
Details: Request violates content policy
```

**Causes**:
- Content discusses dangerous/illegal topics
- Request involves hateful or harassing content
- Request contains sexually explicit material
- Safety filters overly cautious (false positive)

**Common False Positives**:
- Analyzing security vulnerabilities in code
- Discussing cryptography or hashing algorithms
- Reviewing authentication mechanisms
- Technical security discussions

**Solutions**:

**Option 1: Use Permissive Safety Mode** (for legitimate technical content)
```bash
gemini generate \
  --safety-level permissive \
  "analyze this SQL injection vulnerability"
```

**Option 2: Rephrase Request**
```bash
# Original (might be blocked)
gemini generate "analyze this malware code"

# Rephrased (less likely to trigger filters)
gemini generate \
  --safety-level permissive \
  "review this code for security vulnerabilities"
```

**Option 3: Provide Context**
```bash
gemini generate \
  --safety-level permissive \
  "This is code from a security audit. Analyze it:
   [code here]"
```

**When to Use Permissive Mode**:
- Code security analysis
- Cryptographic algorithm implementation
- Authentication mechanism review
- Vulnerability analysis
- Security research

**When NOT to Use Permissive Mode**:
- General user conversations
- Content from untrusted sources
- Non-technical discussions
- Customer-facing content

---

## Model Errors

### Error: Model Not Found

**Full Error Message**:
```
Error: Model not found
Model: gemini-unknown-model
Available models:
  - gemini-2.5-flash
  - gemini-2.5-pro
  - gemini-2.5-flash-lite
  - gemini-3.0-deep-think
```

**Causes**:
- Typo in model name
- Model not yet released or deprecated
- Model temporarily unavailable

**Solutions**:

**Check available models**:
```bash
gemini models list
```

**Use correct model name**:
```bash
# INCORRECT
gemini generate --model gemini-flash "prompt"

# CORRECT
gemini generate --model gemini-2.5-flash "prompt"
```

**Use fallback model**:
```bash
# If specific model unavailable, use stable fallback
gemini generate --model gemini-2.5-flash "prompt"
```

### Error: Model Unavailable

**Full Error Message**:
```
Error: Model temporarily unavailable
Model: gemini-2.5-pro
Status: Rate limited at model level
Retry-After: 300 seconds
```

**Causes**:
- Model experiencing high traffic
- Model undergoing maintenance
- Temporary service disruption

**Solutions**:

**Wait and retry**:
```bash
# Wait 5 minutes and retry
sleep 300
gemini generate --model gemini-2.5-pro "prompt"
```

**Switch to alternative model**:
```bash
# Use different model with similar capabilities
gemini generate --model gemini-2.5-flash "prompt"
```

**Check status page**:
Visit: https://status.cloud.google.com/

---

## Input Validation Errors

### Error 400: Invalid Request

**Full Error Message**:
```
Error: Invalid request (400)
Reason: Input validation failed
Details: max_tokens exceeds model limit
```

**Common Causes**:
- `max_tokens` exceeds model maximum
- Temperature outside valid range
- Invalid parameter value
- Missing required fields

**Solutions**:

**Invalid max_tokens**:
```bash
# INCORRECT - exceeds maximum (65536)
gemini generate --max-tokens 100000 "prompt"

# CORRECT
gemini generate --max-tokens 32768 "prompt"
```

**Invalid temperature**:
```bash
# INCORRECT - outside range
gemini generate --temperature 5.0 "prompt"

# CORRECT - within 0.0-2.0
gemini generate --temperature 1.5 "prompt"
```

**Invalid top-p**:
```bash
# INCORRECT - outside range
gemini generate --top-p 2.0 "prompt"

# CORRECT - within 0.0-1.0
gemini generate --top-p 0.95 "prompt"
```

**Temperature fixed at 1.0 for Deep Think**:
```bash
# INCORRECT - changing temperature on Deep Think
gemini generate \
  --model gemini-3.0-deep-think \
  --temperature 0.5 \
  "prompt"

# CORRECT - temperature must stay at 1.0
gemini generate \
  --model gemini-3.0-deep-think \
  --temperature 1.0 \
  "prompt"
```

---

## File and Image Errors

### Error: Image File Not Found

**Full Error Message**:
```
Error: Image file not found
File: /path/to/image.png
Suggestion: Check file path is correct
```

**Causes**:
- File path incorrect or typo
- File doesn't exist
- File moved or deleted
- Relative path doesn't work from current directory

**Solutions**:

**Verify file exists**:
```bash
ls -la /path/to/image.png

# If not found, find the file
find ~ -name "image.png" -type f
```

**Use absolute path**:
```bash
# INCORRECT - relative path
gemini generate --image screenshot.png "analyze"

# CORRECT - absolute path
gemini generate --image /Users/jelly/screenshots/screenshot.png "analyze"
```

**Use home directory expansion**:
```bash
gemini generate --image ~/screenshots/screenshot.png "analyze"
```

### Error: Unsupported Image Format

**Full Error Message**:
```
Error: Unsupported image format
Format: .bmp
Supported formats: JPEG, PNG, WebP, HEIC, HEIF
```

**Causes**:
- File format not supported
- Wrong file extension
- File corrupted

**Solutions**:

**Convert to supported format**:
```bash
# Convert using ImageMagick
convert image.bmp image.png

# Or use online converter
# webp/webconverter.com/convert
```

**Verify file is not corrupted**:
```bash
# Check if PNG file is valid
file image.png
# Should output: "PNG image data..."

# Try opening in image viewer
open image.png
```

**Check file extension**:
```bash
# File command to see actual format
file image.jpg
# If shows PNG but named .jpg, rename it
mv image.jpg image.png
```

### Error: Image File Too Large

**Full Error Message**:
```
Error: Image exceeds size limit
Size: 25 MB
Maximum: 20 MB
```

**Causes**:
- Image file > 20 MB
- High resolution image
- Uncompressed image format

**Solutions**:

**Compress image**:
```bash
# Reduce quality (JPEG)
convert large.png -quality 85 compressed.jpg

# Reduce dimensions
convert large.png -resize 1920x1080 resized.png

# Use WebP (best compression)
convert large.png compressed.webp
```

**Check file size**:
```bash
ls -lh image.png
# Look at size column

# If > 20 MB, compress as above
```

---

## Session Errors

### Error: Session Not Found

**Full Error Message**:
```
Error: Session not found
Session ID: gemini-session-abc123
```

**Causes**:
- Session file deleted
- Session ID incorrect
- Session expired (older than retention period)

**Solutions**:

**List available sessions**:
```bash
gemini sessions list
```

**Use last session**:
```bash
gemini sessions resume --last "new prompt"
```

**Create new session**:
```bash
gemini generate --session new "prompt"
```

### Error: Session Corrupted

**Full Error Message**:
```
Error: Failed to read session
Session: gemini-session-abc123
Details: Invalid JSON in session file
```

**Causes**:
- Session file corrupted
- Partial write to disk
- File system error

**Solutions**:

**Delete and recreate session**:
```bash
rm ~/.jelly-gemini/sessions/gemini-session-abc123.json

# Start fresh session
gemini generate --session new "prompt"
```

**List and verify sessions**:
```bash
# List all sessions
ls -la ~/.jelly-gemini/sessions/

# Check session format
cat ~/.jelly-gemini/sessions/gemini-session-*.json | jq .

# If corrupted, delete and recreate
```

---

## Network and Service Errors

### Error 500: Internal Server Error

**Full Error Message**:
```
Error: Internal server error (500)
Details: Unexpected error processing request
Retry-After: 30 seconds
```

**Causes**:
- Gemini API service error
- Transient service issue
- Server processing failure

**Solutions**:

**Automatic retry** (skill handles this):
The skill automatically retries 500 errors up to 3 times with exponential backoff.

**Manual retry**:
```bash
# Wait and retry
sleep 30
gemini generate "prompt"
```

### Error 503: Service Unavailable

**Full Error Message**:
```
Error: Service temporarily unavailable (503)
Details: Server is temporarily unable to handle request
Retry-After: 60 seconds
```

**Causes**:
- Gemini API experiencing high load
- Server maintenance in progress
- Service degradation

**Solutions**:

**Wait for service recovery**:
```bash
# Check status page
open https://status.cloud.google.com/

# Wait 60+ seconds
sleep 60

# Retry
gemini generate "prompt"
```

**Check system status**:
Visit: https://status.cloud.google.com/

### Error 504: Gateway Timeout

**Full Error Message**:
```
Error: Gateway timeout (504)
Details: Request took too long to complete
```

**Causes**:
- Request processing took > 120 seconds
- Network connectivity issue
- Large request size causing delay

**Solutions**:

**Reduce request complexity**:
```bash
# Instead of very long request
gemini generate --model gemini-2.5-pro "analyze 1M tokens"

# Break into smaller requests
gemini generate --model gemini-2.5-flash "analyze 100k tokens, part 1"
```

**Switch to faster model**:
```bash
# Use Flash instead of Pro
gemini generate --model gemini-2.5-flash "prompt"
```

**Check network connection**:
```bash
# Test connectivity
ping google.com

# Test HTTPS
curl https://generativelanguage.googleapis.com/
```

---

## Common Error Patterns and Solutions

## Quick Diagnosis Flowchart

```
Error Occurred
│
├─ Starts with "401" or "403"
│  └─ Authentication Error → Check API key (see: Authentication Errors)
│
├─ Starts with "429"
│  └─ Rate Limited → Wait and retry (see: Rate Limiting Errors)
│
├─ Starts with "400" with "blocked" or "safety"
│  └─ Content Filtered → Use permissive mode (see: Content Safety Errors)
│
├─ Starts with "400" with "Invalid"
│  └─ Invalid Input → Check parameters (see: Input Validation Errors)
│
├─ Mentions "not found"
│  └─ File/Resource Missing → Check path (see: File and Image Errors)
│
├─ Starts with "500", "503", "504"
│  └─ Service Error → Wait and retry (see: Network and Service Errors)
│
└─ Model mentioned as unavailable
   └─ Model Error → Switch model (see: Model Errors)
```

---

## Troubleshooting Checklist

### Before Asking for Help

**Basic Diagnostics**:
```bash
# 1. Verify API key is set
echo $GOOGLE_API_KEY

# 2. Check key format (should start with AIza)
echo $GOOGLE_API_KEY | head -c 4

# 3. List available models
gemini models list

# 4. Verify network connectivity
ping google.com

# 5. Check API quota
# Visit: https://console.cloud.google.com/apis/dashboard
```

**For Image Errors**:
```bash
# 1. Verify file exists
ls -la /path/to/image.png

# 2. Check file format
file /path/to/image.png

# 3. Check file size
ls -lh /path/to/image.png

# 4. Use absolute path
gemini generate --image /absolute/path/to/image.png "prompt"
```

**For Safety Blocks**:
```bash
# 1. Rephrase request
# 2. Use permissive safety mode
# 3. Provide more context
gemini generate --safety-level permissive "rephrased prompt"
```

**For Rate Limits**:
```bash
# 1. Check current time (limits reset at minute boundary)
date

# 2. Count recent requests
history | grep "gemini generate" | tail -20

# 3. Wait 60+ seconds before retrying
sleep 65
gemini generate "prompt"
```

---

## Error Recovery Strategies

### Strategy 1: Exponential Backoff

```bash
# Automatic in skill, but manual example:
for attempt in {1..3}; do
  gemini generate "prompt" && break
  sleep $((2 ** attempt))
done
```

### Strategy 2: Model Fallback

```bash
# Try primary, fallback to secondary
gemini generate --model gemini-2.5-pro "complex analysis" || \
  gemini generate --model gemini-2.5-flash "complex analysis"
```

### Strategy 3: Request Decomposition

```bash
# Large request
gemini generate --model gemini-2.5-pro "analyze 1M tokens"

# Fails? Break it up
gemini generate --model gemini-2.5-flash "analyze tokens 1-250k"
gemini generate --model gemini-2.5-flash "analyze tokens 250k-500k"
gemini generate --model gemini-2.5-flash "analyze tokens 500k-750k"
gemini generate --model gemini-2.5-flash "analyze tokens 750k-1M"
```

### Strategy 4: Parameter Tuning

```bash
# Fails with current parameters
gemini generate --temperature 1.5 --max-tokens 16384 "prompt"

# Adjust and retry
gemini generate --temperature 1.0 --max-tokens 8192 "prompt"
```

---

## Getting Help

### Information to Provide

When reporting an issue:

1. **Full error message** (copy-paste)
2. **Command used** (sanitize API key):
   ```bash
   gemini generate --model gemini-2.5-flash "your prompt"
   ```
3. **Environment**:
   ```bash
   echo "API Key set: $([ -n "$GOOGLE_API_KEY" ] && echo "yes" || echo "no")"
   gemini --version
   ```
4. **Reproduction steps** (exact steps to recreate error)
5. **Expected vs actual behavior**

### Self-Help Resources

- **Official Docs**: https://ai.google.dev/gemini-api/docs
- **API Status**: https://status.cloud.google.com/
- **Pricing/Quotas**: https://console.cloud.google.com/
- **Models**: https://ai.google.dev/gemini-api/docs/models

---

## Error Code Reference

| Code | Category | Meaning | Action |
|------|----------|---------|--------|
| 401 | Auth | Unauthorized | Check API key |
| 403 | Auth | Forbidden | Enable API, check permissions |
| 429 | Rate Limit | Too many requests | Wait and retry |
| 400 | Validation | Bad request | Check parameters |
| 500 | Server | Internal error | Retry with backoff |
| 503 | Server | Unavailable | Wait for recovery |
| 504 | Server | Timeout | Reduce complexity |

