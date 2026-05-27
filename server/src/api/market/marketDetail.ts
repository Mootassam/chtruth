import ApiResponseHandler from '../apiResponseHandler';
import redis from '../../database/redisConnection';
import { REDIS_KEY_TICKER, fetchTrades } from '../../services/marketDataService';

export default async (req, res) => {
  try {
    const { symbol } = req.params;

    const [tickerRaw, trades] = await Promise.all([
      redis.get(REDIS_KEY_TICKER(symbol.toUpperCase())).catch(() => null),
      fetchTrades(symbol.toUpperCase()).catch(() => []),
    ]);

    const ticker = tickerRaw ? JSON.parse(tickerRaw) : null;
    return res.json({ data: { ticker, trades } });
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
