# Stage 1: Build React app
FROM node:18-alpine AS builder
WORKDIR /app

# Copy dependencies definitions
COPY package*.json ./

# Clean cache & install dependencies
RUN npm cache clean --force
RUN npm install --legacy-peer-deps

# Copy the rest of the app
COPY . .

# Build the app (use "build" if you don’t have "build:production")
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy custom nginx config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output
COPY --from=builder /app/build /usr/share/nginx/html
