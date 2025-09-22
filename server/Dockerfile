FROM node:14.16.0-alpine3.13
WORKDIR /app
COPY package*.json /app/
COPY . /app/
RUN npm install
#RUN npm ci --only=production
#RUN  npm install --production --silent && mv node_modules ../
# ENV BACKEND_URL="http://162.213.249.168:8080/api"
# ENV BACKEND_URL="https://www.mexclogal.org/api/"
ENV BACKEND_URL="http://162.213.249.168:8084/api"
# ENV BACKEND_URL="http://162.213.249.168:8080/api"
EXPOSE 8084
# Install Redis
RUN apk add --no-cache redis
EXPOSE 6379
# Copy the rest of your application code to the container


# Start Redis and your Node.js application
CMD ["sh", "-c", "redis-server & npm start"]