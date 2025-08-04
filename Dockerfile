FROM nginx:1.19.0

# Install Node.js
RUN sed -i 's|http://deb.debian.org/debian|http://archive.debian.org/debian|g' /etc/apt/sources.list && \
    sed -i 's|http://security.debian.org/debian-security|http://archive.debian.org/debian-security|g' /etc/apt/sources.list && \
    echo 'Acquire::Check-Valid-Until "false";' > /etc/apt/apt.conf.d/99no-check-valid-until && \
    apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Create and prepare app directory
RUN mkdir -p /app && \
    chown -R nginx:nginx /app

WORKDIR /app

# Copy package files first for layer caching
COPY package*.json ./
COPY neotek-ob-sdk*.tgz ./

# Install dependencies
RUN npm install

# Copy bootstrap script with proper permissions
COPY bootstrap.sh ./
RUN chmod +x /app/bootstrap.sh && \
    ls -la /app/bootstrap.sh && \
    /bin/sh -c "[ -x /app/bootstrap.sh ] || { echo 'Error: bootstrap.sh not executable'; exit 1; }"

# Copy remaining application files
COPY . .

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set permissions for Nginx
RUN chown -R nginx:nginx /app && \
    chmod -R 755 /app && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d

EXPOSE 8087

USER nginx

CMD ["/bin/sh", "/app/bootstrap.sh"]