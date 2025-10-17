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
ENV BACKEND_URL="https://www.nexus-exchange.com/api"

# Expose your app port
EXPOSE 8084

# Remove Redis installation and just start your app
CMD ["npm", "start"]