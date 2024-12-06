#!/bin/bash

# Debug user/group
echo "Running as user: $(id -u)"
echo "Running as group: $(id -g)"

# Install dependencies if not present
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Build the React app
echo "Building the React app..."
npm run build

# Copy build files to /usr/share/nginx/html
echo "Copying build files to /usr/share/nginx/html..."
cp -r /app/dist/* /usr/share/nginx/html

# Start Nginx
nginx -g 'daemon off;'
