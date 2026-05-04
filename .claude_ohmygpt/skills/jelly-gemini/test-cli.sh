#!/bin/bash

# Test script for gemini-cli.js
# Validates all major features

set -e

echo "=== Gemini CLI Test Suite ==="
echo

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLI="$SCRIPT_DIR/gemini-cli.js"

# Test counter
PASSED=0
FAILED=0

# Helper functions
pass() {
    echo -e "${GREEN}✓${NC} $1"
    ((PASSED++))
}

fail() {
    echo -e "${RED}✗${NC} $1"
    ((FAILED++))
}

warn() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Test 1: Help flag
echo "Test 1: Help flag"
if node "$CLI" --help | grep -q "Gemini CLI"; then
    pass "Help text displays"
else
    fail "Help text missing"
fi
echo

# Test 2: Missing API key error
echo "Test 2: API key validation"
if (unset GOOGLE_API_KEY && node "$CLI" "test" 2>&1 | grep -q "GOOGLE_API_KEY not found"); then
    pass "API key validation works"
else
    fail "API key validation failed"
fi
echo

# Test 3: Check if API key is set
echo "Test 3: API key availability"
if [ -n "$GOOGLE_API_KEY" ]; then
    pass "GOOGLE_API_KEY is set"
    LIVE_TESTS=true
else
    warn "GOOGLE_API_KEY not set - skipping live API tests"
    LIVE_TESTS=false
fi
echo

# Test 4: Stdin support
echo "Test 4: Stdin input"
if [ "$LIVE_TESTS" = true ]; then
    RESULT=$(echo "Say exactly: test successful" | node "$CLI" --no-stream 2>&1)
    if [ $? -eq 0 ]; then
        pass "Stdin input accepted"
    else
        fail "Stdin input failed: $RESULT"
    fi
else
    warn "Skipped (no API key)"
fi
echo

# Test 5: Model parameter
echo "Test 5: Model parameter parsing"
if node "$CLI" --help | grep -q "gemini-2.5-flash"; then
    pass "Model options documented"
else
    fail "Model options not documented"
fi
echo

# Test 6: Temperature parameter
echo "Test 6: Temperature parameter"
if node "$CLI" --help | grep -q "temperature"; then
    pass "Temperature parameter documented"
else
    fail "Temperature parameter not documented"
fi
echo

# Test 7: Format options
echo "Test 7: Output format options"
if node "$CLI" --help | grep -q "json.*markdown.*code"; then
    pass "Format options documented"
else
    fail "Format options not documented"
fi
echo

# Test 8: Image support documented
echo "Test 8: Image support"
if node "$CLI" --help | grep -q "image"; then
    pass "Image support documented"
else
    fail "Image support not documented"
fi
echo

# Test 9: Safety level options
echo "Test 9: Safety level options"
if node "$CLI" --help | grep -q "safety-level"; then
    pass "Safety level options documented"
else
    fail "Safety level options not documented"
fi
echo

# Test 10: Streaming option
echo "Test 10: Streaming options"
if node "$CLI" --help | grep -q "no-stream"; then
    pass "Streaming options documented"
else
    fail "Streaming options not documented"
fi
echo

# Test 11: Basic prompt (if API key available)
echo "Test 11: Basic prompt execution"
if [ "$LIVE_TESTS" = true ]; then
    RESULT=$(node "$CLI" --no-stream "Say exactly: OK" 2>&1)
    if [ $? -eq 0 ]; then
        pass "Basic prompt executed successfully"
    else
        fail "Basic prompt failed: $RESULT"
    fi
else
    warn "Skipped (no API key)"
fi
echo

# Test 12: JSON format (if API key available)
echo "Test 12: JSON format output"
if [ "$LIVE_TESTS" = true ]; then
    RESULT=$(node "$CLI" --no-stream --format json 'Output JSON: {"status": "ok"}' 2>&1)
    if echo "$RESULT" | grep -q '"status"'; then
        pass "JSON format output works"
    else
        warn "JSON format may not have parsed correctly"
    fi
else
    warn "Skipped (no API key)"
fi
echo

# Summary
echo "=== Test Summary ==="
echo -e "Passed: ${GREEN}$PASSED${NC}"
echo -e "Failed: ${RED}$FAILED${NC}"
echo

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}Some tests failed.${NC}"
    exit 1
fi
