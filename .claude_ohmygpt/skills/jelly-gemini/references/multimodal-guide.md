# Multimodal Guide

Complete reference for multimodal capabilities of the jelly-gemini skill, including image analysis, supported formats, and practical examples.

## Overview

Gemini models support multimodal analysis, combining text and image inputs to provide comprehensive understanding. This guide covers all aspects of using images with the jelly-gemini skill.

---

## Supported Image Formats

### Primary Formats

| Format | Extension | MIME Type | Quality | Use Case | Notes |
|--------|-----------|-----------|---------|----------|-------|
| JPEG | .jpg/.jpeg | image/jpeg | High | Photography, screenshots | Widely supported, good compression |
| PNG | .png | image/png | Lossless | Technical diagrams, UI | No compression loss, larger files |
| WebP | .webp | image/webp | High | Web images | Modern format, good compression |
| HEIC | .heic | image/heic | High | iOS photos | Apple-native format |
| HEIF | .heif | image/heif | High | Modern photos | Container format for HEIC |
| GIF | .gif | image/gif | Low | Animated sequences | Each frame processed separately |

### Format Recommendations

**For Code Screenshots**:
- PNG recommended (lossless, preserves code clarity)
- JPEG acceptable (smaller file size)
- WebP good (balance of quality and size)

**For UI/UX Design**:
- PNG best (preserves exact pixels)
- WebP good (modern standard)
- JPEG acceptable (if color banding acceptable)

**For Photographs**:
- JPEG recommended (standard format)
- WebP modern alternative (better compression)
- HEIC/HEIF if from Apple devices

**For Technical Diagrams**:
- PNG preferred (lossless, clarity)
- SVG converted to PNG (vector to raster)
- PDF converted to PNG (if diagram format)

---

## Image Size and Limits

### File Size Constraints

**Maximum file size**: 20 MB per image
**Typical image sizes**:

```
Screenshot (1920x1080):     100-500 KB
Diagram (1000x800):         50-200 KB
Photo (3000x2000):          500-2 MB
Document scan (2480x3508):  1-5 MB
```

### Resolution Limits

**Maximum dimensions**: 3,072 x 3,072 pixels
**Recommended dimensions**:

```
Screenshots:        1920x1080 (Full HD)
                    or 1280x720 (HD)

UI Designs:         1440x900 (MacBook)
                    or 1920x1080 (standard)

Diagrams:           1000x800 (square)
                    or 1200x600 (wide)

Documents:          2480x3508 (A4 size)
                    or 1920x2560 (mobile)
```

### Image Quantity Limits

**Maximum images per request**: 16 images
**Typical usage**: 1-5 images per request

**Processing multiple images**:
```bash
# 2-3 images: Instant processing
gemini generate \
  --image img1.png \
  --image img2.png \
  --image img3.png \
  "Compare these three designs"

# 5+ images: Still fast but slightly longer
gemini generate \
  --image img1.png \
  --image img2.png \
  --image img3.png \
  --image img4.png \
  --image img5.png \
  "Analyze these wireframes"

# 10+ images: Use if needed, but consider breaking into multiple requests
gemini generate \
  --image img1.png \
  --image img2.png \
  --image img3.png \
  --image img4.png \
  --image img5.png \
  --image img6.png \
  --image img7.png \
  --image img8.png \
  --image img9.png \
  --image img10.png \
  "Review this full design system"
```

### Image Quality Optimization

**For Fast Processing**:
- Use JPEG format
- Reduce dimensions to 1280x720
- Compress to < 500 KB

**For Best Quality**:
- Use PNG format
- Keep original resolution
- Allow up to 2 MB file size

**For Balance**:
- Use WebP format
- 1920x1080 resolution
- 500-1000 KB size

---

## Using Images with --image Flag

### Basic Image Analysis

**Single image with text prompt**:
```bash
gemini generate \
  --image screenshot.png \
  "What's in this screenshot?"
```

**Multiple images in sequence**:
```bash
gemini generate \
  --image design-v1.png \
  --image design-v2.png \
  --image design-v3.png \
  "Compare these three design iterations and recommend the best one"
```

### Supported File Paths

**Absolute paths** (recommended):
```bash
gemini generate \
  --image /Users/jelly/screenshots/ui.png \
  "Review this UI"
```

**Relative paths** (work if in correct directory):
```bash
# Must be in directory with images
gemini generate \
  --image ./screenshots/ui.png \
  "Review this UI"
```

**Home directory expansion**:
```bash
gemini generate \
  --image ~/Projects/screenshots/ui.png \
  "Review this UI"
```

**Current directory**:
```bash
# With ls to see files
gemini generate \
  --image diagram.png \
  "Explain this diagram"
```

### Error Handling for Missing Images

**File not found**:
```
Error: Image file not found: screenshot.png
Solution: Check file path, use absolute path if needed
```

**Invalid format**:
```
Error: Unsupported image format: .bmp
Solution: Convert to PNG, JPEG, WebP, HEIC, or HEIF
```

**File too large**:
```
Error: Image exceeds 20 MB limit
Solution: Compress image or reduce dimensions
```

---

## Image Analysis Use Cases

### Code Review with Screenshots

**UI Code Review**:
```bash
gemini generate \
  --image button-component.png \
  --safety-level permissive \
  "Review this button component screenshot. Check for:
   1. Visual consistency
   2. Accessibility (color contrast, sizes)
   3. Responsive design indicators
   4. State variations (hover, active, disabled)"
```

**Layout Analysis**:
```bash
gemini generate \
  --image layout-design.png \
  "Analyze this layout design for:
   - Visual hierarchy
   - Whitespace usage
   - Alignment and consistency
   - Mobile responsiveness"
```

### UI/UX Design Review

**Design Critique**:
```bash
gemini generate \
  --image mockup.png \
  "Provide detailed feedback on this mockup:
   1. User experience flow
   2. Visual design consistency
   3. Accessibility considerations
   4. Improvement suggestions"
```

**Wireframe Analysis**:
```bash
gemini generate \
  --image wireframe.png \
  --image mockup.png \
  "Compare this wireframe with the final mockup:
   - Are layout changes justified?
   - Are any key elements missing?
   - Is information hierarchy preserved?"
```

### Error Message and Exception Analysis

**Analyzing Error Screens**:
```bash
gemini generate \
  --image error-screen.png \
  --safety-level permissive \
  "Analyze this error screen:
   1. Is the error clear to users?
   2. Are steps to resolve provided?
   3. Should this error be prevented?"
```

**Stack Trace Visualization**:
```bash
gemini generate \
  --image crash-log.png \
  --safety-level permissive \
  "Help me understand this crash log screenshot"
```

### Document Analysis

**Invoice/Receipt Processing**:
```bash
gemini generate \
  --image invoice.png \
  "Extract and summarize the key information from this invoice"
```

**Form Analysis**:
```bash
gemini generate \
  --image form-screenshot.png \
  "Analyze this form design:
   1. Field labels clarity
   2. Input validation feedback
   3. Error message placement
   4. Improvement suggestions"
```

### Architecture and Diagram Analysis

**System Diagram Review**:
```bash
gemini generate \
  --image architecture-diagram.png \
  "Review this system architecture diagram:
   - Component responsibilities
   - Data flow correctness
   - Scalability concerns
   - Redundancy and failover"
```

**Database Schema Diagram**:
```bash
gemini generate \
  --image schema-diagram.png \
  --safety-level permissive \
  "Analyze this database schema:
   - Normalization level
   - Relationship correctness
   - Index opportunities
   - Performance considerations"
```

### Comparative Analysis

**Design Comparison**:
```bash
gemini generate \
  --image design-a.png \
  --image design-b.png \
  --image design-c.png \
  "Compare these three design approaches:
   1. Pros and cons of each
   2. Best for which use case
   3. Overall recommendation"
```

**Feature Implementation Comparison**:
```bash
gemini generate \
  --image before-screenshot.png \
  --image after-screenshot.png \
  "Compare these two versions of the same feature:
   - What changed?
   - Is the change an improvement?
   - Any regressions?"
```

### Accessibility Audit

**Visual Accessibility Review**:
```bash
gemini generate \
  --image ui-screenshot.png \
  "Audit this UI for accessibility:
   1. Color contrast ratios
   2. Text size and readability
   3. Icon clarity
   4. Focus indicators
   5. Interactive element sizing"
```

### Logo and Branding Analysis

**Logo Review**:
```bash
gemini generate \
  --image logo.png \
  "Analyze this logo design:
   - Brand message conveyed
   - Scalability (works at different sizes)
   - Color psychology
   - Uniqueness and memorability"
```

---

## Advanced Multimodal Techniques

### Image + Code Context

**Analyzing code WITH screenshot of output**:
```bash
# First, analyze the code
gemini generate \
  --model gemini-2.5-flash \
  "Review this code for performance issues"

# Then follow up with screenshot of actual performance
gemini generate \
  --session last \
  --image performance-screenshot.png \
  "Here's the actual performance. Does this match your analysis?"
```

### Sequential Image Analysis

**Step-by-step visual walkthrough**:
```bash
# Step 1: Analyze first screen
gemini generate \
  --image step1-welcome.png \
  "Start analyzing this onboarding flow"

# Step 2: Continue with next screen
gemini generate \
  --session last \
  --image step2-permissions.png \
  "Continue with this second screen"

# Step 3: Complete analysis
gemini generate \
  --session last \
  --image step3-setup.png \
  "Final screen - provide overall assessment"
```

### Multi-format Comparison

**Text spec vs. visual implementation**:
```bash
gemini generate \
  --image design-spec.png \
  --image implementation-screenshot.png \
  "Verify implementation matches specification:
   - All elements present?
   - Correct spacing?
   - Color accuracy?
   - Typography correct?"
```

---

## Image Quality Tips

### Best Practices for Screenshots

**Before Taking Screenshot**:
1. Close unnecessary windows
2. Ensure good lighting (if photographing)
3. Set zoom to 100% (native resolution)
4. Use clear, high-contrast content

**Cropping**:
- Crop to relevant area
- Remove unnecessary UI chrome when possible
- Keep context visible (don't crop too tightly)

**Resolution**:
- Use full screen resolution (1920x1080 or higher)
- Don't downscale before sending

**Compression**:
- PNG for exact pixels (code, diagrams)
- JPEG for photographs (smaller files)
- WebP for balance

### Example: Good Screenshot

```
✓ Full code visible without truncation
✓ Color syntax highlighting clear
✓ Line numbers visible
✓ Editor UI cropped out (code area only)
✓ Zoom level allows text readability
✓ File saved as PNG for quality
```

### Example: Poor Screenshot

```
✗ Code partially cut off
✗ Text too small to read
✗ Lots of irrelevant UI
✗ Saved as low-quality JPEG
✗ Extreme zoom level
```

---

## Performance Characteristics

### Response Time with Images

**Single image**:
- 1-5 seconds (typical)
- Fast if < 1 MB

**Multiple images** (2-5):
- 5-10 seconds
- Linear time increase

**Large images** (> 2 MB):
- 10-30 seconds
- Depends on content complexity

**Many images** (10-16):
- 15-30 seconds
- Near maximum latency

### Token Usage with Images

**Simple images** (logos, icons):
- ~100 tokens

**Complex images** (screenshots, designs):
- ~500-1000 tokens each

**Large images** (full page screenshots):
- ~1000-2000 tokens each

**Multiple images**:
- Roughly additive (image1 + image2 + ... + imageN)

### Cost Impact

Image processing increases both input tokens and cost:

```
Base query:           500 tokens = $0.00004 (Flash)
+ 1 image:          1000 tokens = $0.00008 (Flash)
+ 3 images:         2500 tokens = $0.00019 (Flash)
+ 5 images:         4000 tokens = $0.00030 (Flash)
```

---

## Troubleshooting Image Issues

### Image Not Being Processed

**Check**:
1. File path is correct (use absolute path)
2. File format is supported
3. File exists and is readable

**Solution**:
```bash
# Verify file exists
ls -la /path/to/image.png

# Use absolute path explicitly
gemini generate \
  --image /absolute/path/to/image.png \
  "analyze this"
```

### Analysis Seems Wrong

**Possible causes**:
1. Image quality too poor
2. Content too small to read
3. Model not given enough context in prompt

**Solution**:
```bash
# Better screenshot quality
gemini generate \
  --image high-quality-screenshot.png \
  --format markdown \
  "Detailed analysis of: [specific question]"

# Switch to better model
gemini generate \
  --model gemini-2.5-pro \
  --image image.png \
  "detailed analysis"
```

### Memory/Performance Issues

**Many large images causing slowdown**:

**Solution**: Break into multiple requests
```bash
# Instead of 10 images at once
gemini generate \
  --image img1.png \
  --image img2.png \
  --image img3.png \
  "Analyze first batch"

gemini generate \
  --image img4.png \
  --image img5.png \
  --image img6.png \
  "Analyze second batch"
```

### File Size Errors

**Image too large**:
- Compress using image tool
- Reduce dimensions
- Use JPEG instead of PNG

```bash
# Example: Compress using ImageMagick
convert large-image.png -quality 85 compressed-image.jpg

# Reduce dimensions
convert image.png -resize 1920x1080 resized-image.png
```

---

## Image Format Conversion Guide

### Convert PDF to Image

```bash
# Using ImageMagick
convert -density 200 document.pdf output.png

# Using pdftoimage (if available)
pdftoppm document.pdf output -png
```

### Convert SVG to Image

```bash
# Using ImageMagick
convert diagram.svg -density 200 diagram.png

# Using Inkscape
inkscape diagram.svg -e diagram.png
```

### Optimize Image Size

```bash
# Reduce quality and size
convert image.png -quality 85 compressed.jpg

# Resize dimensions
convert image.png -resize 1920x1080 resized.png

# Use WebP (best compression)
convert image.png compressed.webp
```

### Crop Image

```bash
# Crop to specific area
convert image.png -crop 1200x800+100+50 cropped.png

# Remove margins
convert image.png -trim trimmed.png
```

---

## Real-World Multimodal Workflows

### Design System Review

**Workflow**:
1. Export all component screenshots
2. Create comparison image sets
3. Analyze for consistency

**Commands**:
```bash
# Analyze design system consistency
gemini generate \
  --image button-primary.png \
  --image button-secondary.png \
  --image button-tertiary.png \
  --image card-component.png \
  --image modal-component.png \
  "Review design system consistency:
   - Color palette adherence
   - Typography consistency
   - Spacing rules
   - Component state variations"
```

### Mobile App Audit

**Workflow**:
1. Screenshot each major screen
2. Capture different device sizes
3. Document error states

**Commands**:
```bash
# Audit mobile experience
gemini generate \
  --model gemini-2.5-pro \
  --image home-screen.png \
  --image profile-screen.png \
  --image settings-screen.png \
  --image error-state.png \
  "Perform comprehensive mobile UX audit:
   - Navigation clarity
   - Touch target sizes
   - Visual hierarchy
   - Accessibility compliance"
```

### Bug Analysis

**Workflow**:
1. Capture error state screenshot
2. Include relevant code snippet
3. Add expected vs actual behavior

**Commands**:
```bash
# Analyze visual bug
gemini generate \
  --image bug-screenshot.png \
  --safety-level permissive \
  "This button is misaligned. Here's the CSS: [code].
   What's the issue and how to fix it?"
```

---

## Best Practices Summary

1. **Use appropriate format**: PNG for exact pixels, JPEG for photos
2. **Optimize size**: Compress images while maintaining readability
3. **Clear content**: Ensure text is readable and important elements visible
4. **One focus**: Each image should have clear subject matter
5. **Multiple angles**: Use several images to show different aspects
6. **Provide context**: Include text explanation with images
7. **Professional crops**: Remove unnecessary UI/elements
8. **Match your question**: Ensure image content relates to your prompt
9. **Batch wisely**: Up to 16 images per request, but 3-5 usually sufficient
10. **Test quality**: Verify analysis accuracy before relying on results

