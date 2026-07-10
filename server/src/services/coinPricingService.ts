import axios from "axios";
import redis from "../database/redisConnection";
import { REDIS_KEY_TICKER } from "./marketDataService";

// Minimum deposit/withdrawal amount in USD per coin (same thresholds apply to both)
export const MIN_AMOUNT_USD_BY_COIN: Record<string, number> = {
  BTC: 100,
  SOL: 100,
  XRP: 100,
  ETH: 100,
  BNB: 100,
  DOGE: 100,
  USDC: 50,
  USDT: 50,
};
export const DEFAULT_MIN_AMOUNT_USD = 50;

// Withdrawal fee in USD per coin
export const WITHDRAWAL_FEE_USD_BY_COIN: Record<string, number> = {
  XRP: 10,
};
export const DEFAULT_WITHDRAWAL_FEE_USD = 5;

const STABLECOINS = new Set(["USDT", "USDC", "DAI"]);

const COINGECKO_ID_BY_SYMBOL: Record<string, string> = {
  BTC: "bitcoin",
  ETH: "ethereum",
  BNB: "binancecoin",
  SOL: "solana",
  XRP: "ripple",
  TRX: "tron",
  DOGE: "dogecoin",
  SHIB: "shiba-inu",
};

export function getMinAmountUsd(symbol: string): number {
  return MIN_AMOUNT_USD_BY_COIN[symbol?.toUpperCase()] ?? DEFAULT_MIN_AMOUNT_USD;
}

// Withdrawal and deposit share the same minimum amount thresholds.
export const getMinWithdrawalUsd = getMinAmountUsd;
export const getMinDepositUsd = getMinAmountUsd;

export function getWithdrawalFeeUsd(symbol: string): number {
  return WITHDRAWAL_FEE_USD_BY_COIN[symbol?.toUpperCase()] ?? DEFAULT_WITHDRAWAL_FEE_USD;
}

export async function getUsdPrice(symbol: string): Promise<number> {
  const sym = symbol?.toUpperCase();

  if (!sym) {
    throw new Error("Currency symbol is required");
  }

  if (STABLECOINS.has(sym)) {
    return 1;
  }

  // Fast path: reuse the live ticker already cached by marketDataService
  try {
    const cached = await redis.get(REDIS_KEY_TICKER(`${sym}USDT`));
    if (cached) {
      const price = Number(JSON.parse(cached).c);
      if (price > 0) {
        return price;
      }
    }
  } catch (_) {
    // fall through to CoinGecko
  }

  const coinId = COINGECKO_ID_BY_SYMBOL[sym];
  if (!coinId) {
    throw new Error(`No price mapping available for ${symbol}`);
  }

  const resp = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price",
    {
      params: {
        ids: coinId,
        vs_currencies: "usd",
      },
    }
  );

  const price = Number(resp.data?.[coinId]?.usd || 0);
  if (!price) {
    throw new Error(`Failed to fetch USD price for ${symbol}`);
  }

  return price;
}
