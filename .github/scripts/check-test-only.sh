#!/bin/bash

# Find all test files and check for .only
FOUND_ONLY=$(find __tests__ -type f -name "*.test.ts" -o -name "*.spec.ts" | xargs grep -l "\.only")

if [ ! -z "$FOUND_ONLY" ]; then
    echo "Error: Found .only in test files:"
    echo "$FOUND_ONLY"
    exit 1
fi

exit 0 