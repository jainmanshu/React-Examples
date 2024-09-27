#!/bin/bash

# Find all directories containing package.json but exclude node_modules
while IFS= read -r dir; do
  echo "Running npm audit for $dir"
  (cd "$dir" && npm audit fix)
done < <(find . -type f -name "package.json" -not -path "*/node_modules/*" -exec dirname {} \;)