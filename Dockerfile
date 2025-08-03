FROM nginx:1.19.0

# Install Node.js inside the Nginx image
RUN sed -i 's|http://deb.debian.org/debian|http://archive.debian.org/debian|g' /etc/apt/sources.list && \
    sed -i 's|http://security.debian.org/debian-security|http://archive.debian.org/debian-security|g' /etc/apt/sources.list && \
    echo 'Acquire::Check-Valid-Until "false";' > /etc/apt/apt.conf.d/99no-check-valid-until && \
    apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Create directories with permissions for all users
RUN mkdir -p /.npm /.cache /app/cache /app/var/run/ /app/cache/client_temp /app/cache/proxy_temp /var/run/ /app/node_modules/ && \
    chmod -R 777 /.npm /.cache /app/cache /app /app/var/run/ /var/run/ /app/node_modules/

# Set permissions for /usr/share/nginx/html to allow all users
RUN chmod -R 777 /usr/share/nginx/html

WORKDIR /app

# Copy package.json and SDKs before copying the rest of the app for better caching
COPY package.json ./
COPY neotek-ob-sdk*.tgz ./

# Install dependencies
RUN npm install

# Copy bootstrap.sh first and set permissions
COPY bootstrap.sh ./
RUN chmod +x /app/bootstrap.sh && \
    chown nginx:nginx /app/bootstrap.sh

# Copy app source code and Nginx configuration
COPY . .

RUN chown -R nginx:nginx /app && \
    chmod -R 755 /app
    
RUN ls -la /app/bootstrap.sh

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port for Nginx
EXPOSE 8087

# Run the bootstrap script
CMD ["/app/bootstrap.sh"]