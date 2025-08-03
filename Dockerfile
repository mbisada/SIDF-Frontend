FROM nginx:1.19.0

# Install Node.js inside the Nginx image
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean

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

# Copy app source code and Nginx configuration
COPY . .
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN chmod -R 777 bootstrap.sh

# Expose the port for Nginx
EXPOSE 8087

# Run the bootstrap script
CMD ["/app/bootstrap.sh"]
