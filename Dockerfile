FROM nginx:1.19.0

# Install Node.js (improved version)
RUN sed -i 's|http://deb.debian.org/debian|http://archive.debian.org/debian|g' /etc/apt/sources.list && \
    sed -i 's|http://security.debian.org/debian-security|http://archive.debian.org/debian-security|g' /etc/apt/sources.list && \
    echo 'Acquire::Check-Valid-Until "false";' > /etc/apt/apt.conf.d/99no-check-valid-until && \
    apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Create app directory and set proper permissions
RUN mkdir -p /app && \
    chown -R nginx:nginx /app && \
    chmod -R 755 /app

WORKDIR /app

# Copy package files first for better caching
COPY --chown=nginx:nginx package*.json ./
COPY --chown=nginx:nginx neotek-ob-sdk*.tgz ./

# Install dependencies as nginx user
USER nginx
RUN npm install

# Copy bootstrap script with proper permissions
COPY --chown=nginx:nginx bootstrap.sh ./
RUN chmod +x /app/bootstrap.sh

# Copy the rest of the application
COPY --chown=nginx:nginx . .

# Copy Nginx configuration
COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf

# Switch back to root to ensure Nginx can start
USER root

# Verify bootstrap.sh permissions (debugging)
RUN ls -la /app/bootstrap.sh && \
    [ -x /app/bootstrap.sh ] || (echo "Bootstrap script is not executable" && exit 1)

EXPOSE 8087

# Run as nginx user for security
USER nginx

CMD ["/app/bootstrap.sh"]