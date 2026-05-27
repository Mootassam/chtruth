import ApiResponseHandler from '../apiResponseHandler';
import axios from 'axios';
import redis from '../../database/redisConnection';

const ENDPOINTS = ['https://api.binance.com', 'https://api.binance.us'];
let endpointIdx = 0;

const CACHE_TTL = 5; // 5 seconds — klines change with every new tick

export default async (req, res) => {
  try {
    const { symbol = 'BTCUSDT', interval = '1m', limit = '500' } = req.query as Record<string, string>;
    const cacheKey = `market:klines:${symbol}:${interval}:${limit}`;

    const cached = await redis.get(cacheKey).catch(() => null);
    if (cached) {
      res.setHeader('X-Cache', 'HIT');
      return res.json({ data: JSON.parse(cached) });
    }

    const base = ENDPOINTS[endpointIdx];
    try {
      const { data } = await axios.get(`${base}/api/v3/klines`, {
        params: { symbol, interval, limit: Number(limit) },
        timeout: 8_000,
      });

      const candles = (data as any[]).map((d) => ({
        timestamp: d[0],
        open:      +d[1],
        high:      +d[2],
        low:       +d[3],
        close:     +d[4],
        volume:    +d[5],
      }));

      redis.setex(cacheKey, CACHE_TTL, JSON.stringify(candles)).catch(() => {});
      res.setHeader('X-Cache', 'MISS');
      return res.json({ data: candles });
    } catch {
      // rotate to next endpoint on failure
      endpointIdx = (endpointIdx + 1) % ENDPOINTS.length;
      throw new Error('Failed to fetch klines from Binance');
    }
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
