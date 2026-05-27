import axios from 'axios';
import redis from '../../database/redisConnection';
import ApiResponseHandler from '../apiResponseHandler';

const SYMBOLS = [
  'BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'XRPUSDT',
  'TRXUSDT', 'DOGEUSDT', 'SHIBUSDT', 'USDCUSDT', 'DAIUSDT',
];

const CACHE_KEY = 'prices:binance:v1';
const CACHE_TTL = 30; // seconds

export default async (req, res, next) => {
  try {
    // 1️⃣ Redis cache hit — return in ~5ms
    const cached = await redis.get(CACHE_KEY).catch(() => null);
    if (cached) {
      res.setHeader('X-Cache', 'HIT');
      return res.json({ data: JSON.parse(cached) });
    }

    // 2️⃣ Cache miss — fetch from Binance REST API (~100-200ms)
    const response = await axios.get(
      'https://api.binance.com/api/v3/ticker/24hr',
      {
        params: { symbols: JSON.stringify(SYMBOLS) },
        timeout: 5000,
      }
    );

    const prices: Record<string, { c: string; P: string }> = {};
    (response.data as any[]).forEach((ticker) => {
      prices[ticker.symbol] = {
        c: ticker.lastPrice,
        P: ticker.priceChangePercent,
      };
    });

    // 3️⃣ Store in Redis — next request returns in ~5ms
    redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(prices)).catch(() => {});

    res.setHeader('X-Cache', 'MISS');
    return res.json({ data: prices });
  } catch (error) {
    // Never crash — return empty so client falls back to WebSocket
    return res.json({ data: {} });
  }
};
