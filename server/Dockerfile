# Use a modern Node version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only package files first
COPY package*.json ./

# Clean npm cache and install deps
RUN npm cache clean --force
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Set environment variables
ENV BACKEND_URL="http://159.198.70.147:8084/api"

# Expose your app port
EXPOSE 8084

# Install Redis (better to use a separate container, but keeping your setup)
RUN apk add --no-cache redis
EXPOSE 6379

# Start Redis and your Node.js app together
CMD ["sh", "-c", "redis-server & npm start"]
