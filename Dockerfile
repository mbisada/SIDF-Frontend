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

# Create app directory with proper permissions
RUN mkdir -p /app && \
    chown -R nginx:nginx /app

WORKDIR /app

# Copy package files first for better caching
COPY --chown=nginx:nginx package*.json ./
COPY --chown=nginx:nginx neotek-ob-sdk*.tgz ./

# Install dependencies as nginx user
RUN npm install

# Copy bootstrap script early to verify it exists
COPY --chown=nginx:nginx bootstrap.sh ./

# Make script executable and verify
USER root
RUN chmod +x /app/bootstrap.sh && \
    ls -la /app/bootstrap.sh && \
    [ -x /app/bootstrap.sh ] || (echo "Bootstrap script is not executable" && exit 1)

# Copy the rest of the application
COPY --chown=nginx:nginx . .

# Copy Nginx configuration
COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8087

# Run as nginx user for security
USER nginx

CMD ["/app/bootstrap.sh"]