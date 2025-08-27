FROM node:18 AS builder  # Use Node.js 18 or higher

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /app
COPY package*.json ./
COPY package-lock.json ./

# Use pnpm instead of npm
RUN pnpm install --silent

COPY . .
RUN pnpm run build

FROM nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html