import ApiResponseHandler from '../apiResponseHandler';
import redis from '../../database/redisConnection';
import { REDIS_KEY_TICKERS } from '../../services/marketDataService';

export default async (req, res) => {
  try {
    const cached = await redis.get(REDIS_KEY_TICKERS).catch(() => null);
    if (cached) {
      res.setHeader('X-Cache', 'HIT');
      return res.json({ data: JSON.parse(cached) });
    }
    // Cache is warming up — return empty so client falls back to shimmer
    res.setHeader('X-Cache', 'MISS');
    return res.json({ data: [] });
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
