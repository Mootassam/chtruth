// redisConnection.ts - UPDATED WITH BETTER ERROR HANDLING
import IORedis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || 'redis://:91l3C92VHX9OytcgcV@redis:6379';


// const REDIS_URL = 'redis://localhost:6379';

console.log('Connecting to Redis with URL:', REDIS_URL.replace(/:[^:]*@/, ':****@')); // Hide password in logs

const redisConnection = new IORedis(REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  connectTimeout: 10000,
  lazyConnect: true,
});

// Enhanced error handling
redisConnection.on('error', (err) => {
  console.error('Redis connection error:', err.message);
});

redisConnection.on('connect', () => {
  console.log('✅ Redis connected successfully');
});

redisConnection.on('ready', () => {
  console.log('✅ Redis is ready to accept commands');
});

redisConnection.on('close', () => {
  console.log('🔴 Redis connection closed');
});

// Test connection on startup
redisConnection.connect().catch(err => {
  console.error('Failed to connect to Redis:', err.message);
});

export default redisConnection;