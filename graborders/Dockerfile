# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Copy dependencies definition first
COPY package*.json ./

# Clean cache and install dependencies
RUN npm cache clean --force
RUN npm install --legacy-peer-deps

# Copy app source
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy custom nginx config (for React/Vue/SPA routing)
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output to nginx html folder
COPY --from=builder /app/dist /usr/share/nginx/html
