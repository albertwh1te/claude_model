#!/bin/bash

# Basic usage examples for gemini-cli

# Set this to your gemini-cli.js location
CLI="../gemini-cli.js"

echo "=== Gemini CLI Usage Examples ==="
echo

# Example 1: Simple prompt
echo "Example 1: Simple prompt"
echo "Command: node $CLI 'Explain quantum computing in one sentence'"
echo
node "$CLI" "Explain quantum computing in one sentence"
echo
echo "---"
echo

# Example 2: Using specific model
echo "Example 2: Using gemini-2.5-pro"
echo "Command: node $CLI --model gemini-2.5-pro 'Design a REST API for a blog'"
echo
node "$CLI" --model gemini-2.5-pro --no-stream "Design a REST API for a blog in 3 endpoints"
echo
echo "---"
echo

# Example 3: JSON output
echo "Example 3: JSON format output"
echo "Command: node $CLI --format json 'Create a JSON array with 3 programming languages'"
echo
node "$CLI" --format json --no-stream "Output a JSON array with exactly 3 programming language names"
echo
echo "---"
echo

# Example 4: Piping content
echo "Example 4: Piping stdin"
echo "Command: echo 'Summarize: AI is transforming technology' | node $CLI"
echo
echo "AI is transforming technology through machine learning and automation." | node "$CLI" --no-stream "Summarize this in one short sentence"
echo
echo "---"
echo

# Example 5: Code generation
echo "Example 5: Code generation with format=code"
echo "Command: node $CLI --format code 'Write a JavaScript function to reverse a string'"
echo
node "$CLI" --format code --no-stream "Write a JavaScript function to reverse a string"
echo
echo "---"
echo

echo "=== Examples complete ==="
