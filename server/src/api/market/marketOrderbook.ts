import ApiResponseHandler from '../apiResponseHandler';
import axios from 'axios';
import redis from '../../database/redisConnection';

const ENDPOINTS = ['https://api.binance.com', 'https://api.binance.us'];
let endpointIdx = 0;

const CACHE_TTL = 2; // 2 seconds — order book changes rapidly

export default async (req, res) => {
  try {
    const { symbol = 'BTCUSDT', limit = '10' } = req.query as Record<string, string>;
    const cacheKey = `market:orderbook:${symbol}`;

    const cached = await redis.get(cacheKey).catch(() => null);
    if (cached) {
      res.setHeader('X-Cache', 'HIT');
      return res.json({ data: JSON.parse(cached) });
    }

    const base = ENDPOINTS[endpointIdx];
    try {
      const { data } = await axios.get(`${base}/api/v3/depth`, {
        params: { symbol, limit: Number(limit) },
        timeout: 5_000,
      });

      const book = {
        asks: (data.asks || []).slice(0, 5).map((a: string[]) => ({ price: a[0], amount: a[1] })),
        bids: (data.bids || []).slice(0, 5).map((b: string[]) => ({ price: b[0], amount: b[1] })),
      };

      redis.setex(cacheKey, CACHE_TTL, JSON.stringify(book)).catch(() => {});
      res.setHeader('X-Cache', 'MISS');
      return res.json({ data: book });
    } catch {
      endpointIdx = (endpointIdx + 1) % ENDPOINTS.length;
      throw new Error('Failed to fetch order book from Binance');
    }
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
