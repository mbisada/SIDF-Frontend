FROM nginx:1.19.0

# Install Node.js (using archive.debian.org for old images)
RUN sed -i 's|http://deb.debian.org/debian|http://archive.debian.org/debian|g' /etc/apt/sources.list && \
    sed -i 's|http://security.debian.org/debian-security|http://archive.debian.org/debian-security|g' /etc/apt/sources.list && \
    echo 'Acquire::Check-Valid-Until "false";' > /etc/apt/apt.conf.d/99no-check-valid-until && \
    apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Create and set /app as working directory
RUN mkdir -p /app && \
    chmod 755 /app
WORKDIR /app

# Copy package files first (for caching)
COPY package.json ./
COPY neotek-ob-sdk*.tgz ./
RUN npm install

# Copy the entire app (including bootstrap.sh)
COPY . .

RUN sed -i 's/\r$//' /app/bootstrap.sh && \
    chmod +x /app/bootstrap.sh && \
    echo "Bootstrap.sh first line:" && \
    head -n1 /app/bootstrap.sh

# DEBUG: Verify bootstrap.sh exists and is executable
RUN ls -la /app && \
    ls -la /app/bootstrap.sh && \
    chmod +x /app/bootstrap.sh && \
    echo "Bootstrap.sh permissions:" && \
    ls -la /app/bootstrap.sh

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8087

# Use absolute path + shell fallback for debugging
CMD ["sh", "-c", "if [ -x /app/bootstrap.sh ]; then echo 'Starting bootstrap.sh...'; /app/bootstrap.sh; else echo 'ERROR: bootstrap.sh not found or not executable!'; ls -la /app; exit 1; fi"]