#!/bin/sh

# Debug information
echo "=== Starting Bootstrap ==="
echo "User: $(id -un) ($(id -u))"
echo "Group: $(id -gn) ($(id -g))"
echo "Node: $(node -v)"
echo "NPM: $(npm -v)"

# Install dependencies if not present
if [ ! -d "node_modules" ]
then
  echo "Installing dependencies..."
  if ! npm install
  then
    echo "ERROR: Dependency installation failed" >&2
    exit 1
  fi
fi

# Build the React app
echo "Building the React app..."
if ! npm run build
then
  echo "ERROR: Build failed" >&2
  exit 1
fi

# Verify build output exists
if [ ! -d "/app/dist" ]
then
  echo "ERROR: Build directory '/app/dist' not found!" >&2
  exit 1
fi

# Prepare Nginx directory
echo "Preparing Nginx directory..."
rm -rf /usr/share/nginx/html/* 2>/dev/null
mkdir -p /usr/share/nginx/html

# Copy build files
echo "Copying build files..."
if ! cp -rf /app/dist/* /usr/share/nginx/html/
then
  echo "ERROR: Failed to copy files" >&2
  exit 1
fi

# Verify copy succeeded
if [ -z "$(ls -A /usr/share/nginx/html)" ]
then
  echo "ERROR: Nginx directory is empty after copy!" >&2
  exit 1
fi

# Start Nginx
echo "Starting Nginx server..."
exec nginx -g 'daemon off;'
