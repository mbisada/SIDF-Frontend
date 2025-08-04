#!/bin/sh

# Debug information
set -x
echo "=== Starting Bootstrap ==="
echo "User: $(id -un) ($(id -u))"
echo "Group: $(id -gn) ($(id -g))"
echo "Node: $(node -v)"
echo "NPM: $(npm -v)"

# Install dependencies if not present
if [ ! -d "node_modules" ]
then
  echo "Installing dependencies..."
  npm install || {
    echo "ERROR: Dependency installation failed"
    exit 1
  }
fi

# Build the React app
echo "Building the React app..."
npm run build || {
  echo "ERROR: Build failed"
  exit 1
}

# Verify build output
if [ ! -d "/app/dist" ]
then
  echo "ERROR: Build directory '/app/dist' not found!"
  exit 1
fi

# Prepare Nginx directory
echo "Preparing Nginx directory..."
rm -rf /usr/share/nginx/html/* 2>/dev/null
mkdir -p /usr/share/nginx/html

# Copy build files
echo "Copying build files..."
cp -rf /app/dist/* /usr/share/nginx/html/ || {
  echo "ERROR: Failed to copy files"
  exit 1
}

# Verify copy succeeded
if [ -z "$(ls -A /usr/share/nginx/html)" ]
then
  echo "ERROR: Nginx directory is empty after copy!"
  exit 1
fi

# Start Nginx
echo "Starting Nginx server..."
exec nginx -g 'daemon off;'