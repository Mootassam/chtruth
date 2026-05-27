import ApiResponseHandler from "../apiResponseHandler";
import AssetsServices from '../../services/assetsServices';
import redis from '../../database/redisConnection';

const CACHE_TTL = 30;

export const buildAssetsCacheKey = (tenantId: string, userId: string) =>
  `wallet:assets:${tenantId}:${userId}`;

export default async (req, res, next) => {
  try {
    const tenantId = req.params.tenantId;
    const userId = req.currentUser?.id || 'anon';
    const cacheKey = buildAssetsCacheKey(tenantId, userId);

    const cached = await redis.get(cacheKey).catch(() => null);
    if (cached) {
      res.setHeader('X-Cache', 'HIT');
      return ApiResponseHandler.success(req, res, JSON.parse(cached));
    }

    const payload = await new AssetsServices(req).findAndCountAllMobile(req.query);
    redis.setex(cacheKey, CACHE_TTL, JSON.stringify(payload)).catch(() => {});

    res.setHeader('X-Cache', 'MISS');
    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
