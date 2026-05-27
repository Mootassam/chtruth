/**
 * Market Data Service
 *
 * Polls Binance on the SERVER side (no geo-restriction for clients).
 * Tries api.binance.com first (global); falls back to api.binance.us (USA).
 * Caches in Redis and broadcasts via Socket.IO so every connected client
 * gets real-time prices without making any Binance call themselves.
 *
 * Also handles per-symbol kline (candle) subscriptions so FuturesChart
 * gets live candle updates without touching binance.us directly.
 */

import axios from 'axios';
import redis from '../database/redisConnection';

export const REDIS_KEY_TICKERS = 'market:tickers:v2';
export const REDIS_KEY_TICKER  = (symbol: string) => `market:ticker:${symbol}`;
export const REDIS_KEY_TRADES  = (symbol: string) => `market:trades:${symbol}`;

const POLL_INTERVAL_MS    = 8_000;  // full ticker refresh every 8s
const KLINE_POLL_MS       = 3_000;  // candle refresh every 3s
const REDIS_TTL_TICKERS   = 30;
const REDIS_TTL_TICKER    = 10;
const REDIS_TTL_TRADES    = 10;

const ENDPOINTS = [
  'https://api.binance.com',
  'https://api.binance.us',
];
let endpointIdx = 0;

let _io: any    = null;
let _timer: ReturnType<typeof setTimeout> | null = null;

// ─── kline subscription tracking ─────────────────────────────────────────────
// key = "BTCUSDT:1m"  →  { timer, subscribers: Set<socketId> }
const klinePolls = new Map<string, { timer: ReturnType<typeof setTimeout>; subscribers: Set<string> }>();

// ─── depth (order book) subscription tracking ─────────────────────────────────
// key = "depth:BTCUSDT"  →  { timer, subscribers: Set<socketId> }
const depthPolls = new Map<string, { timer: ReturnType<typeof setTimeout>; subscribers: Set<string> }>();

// ─── helpers ──────────────────────────────────────────────────────────────────

function formatVolume(v: number): string {
  if (v >= 1e9) return (v / 1e9).toFixed(1) + 'B';
  if (v >= 1e6) return (v / 1e6).toFixed(1) + 'M';
  return v.toFixed(0);
}

function buildTicker(item: any) {
  const isPositive = !String(item.priceChangePercent).startsWith('-');
  const volume     = parseFloat(item.volume);
  return {
    s:   item.symbol,
    n:   item.symbol.replace('USDT', '') + '/USDT',
    c:   item.lastPrice,
    P:   Math.abs(parseFloat(item.priceChangePercent)).toFixed(2),
    pos: isPositive,
    vf:  formatVolume(volume),
    q:   parseFloat(item.quoteVolume),
    h:   item.highPrice,
    l:   item.lowPrice,
    v:   item.volume,
  };
}

// ─── ticker poll (background, runs forever) ──────────────────────────────────

async function fetchAndBroadcast() {
  const base = ENDPOINTS[endpointIdx];
  try {
    const { data } = await axios.get(`${base}/api/v3/ticker/24hr`, { timeout: 10_000 });

    const tickers = (data as any[])
      .filter((item) =>
        item.symbol.endsWith('USDT') &&
        !/(UP|DOWN|BEAR|BULL)/.test(item.symbol)
      )
      .sort((a, b) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume))
      .slice(0, 200)
      .map(buildTicker);

    redis.setex(REDIS_KEY_TICKERS, REDIS_TTL_TICKERS, JSON.stringify(tickers)).catch(() => {});
    tickers.forEach((t) =>
      redis.setex(REDIS_KEY_TICKER(t.s), REDIS_TTL_TICKER, JSON.stringify(t)).catch(() => {})
    );

    if (_io) _io.emit('market:update', tickers);

  } catch (err: any) {
    console.error(`[MarketService] ticker error (${ENDPOINTS[endpointIdx]}):`, err.message);
    endpointIdx = (endpointIdx + 1) % ENDPOINTS.length;
  } finally {
    _timer = setTimeout(fetchAndBroadcast, POLL_INTERVAL_MS);
  }
}

// ─── kline polling (on-demand per symbol+interval) ────────────────────────────

function scheduleKlinePoll(key: string, symbol: string, interval: string) {
  const poll = async () => {
    const entry = klinePolls.get(key);
    if (!entry || entry.subscribers.size === 0) {
      klinePolls.delete(key);
      return; // no subscribers left — stop
    }

    try {
      const base = ENDPOINTS[endpointIdx];
      const { data } = await axios.get(`${base}/api/v3/klines`, {
        params: { symbol, interval, limit: 2 },
        timeout: 5_000,
      });

      if (Array.isArray(data) && data.length) {
        const last = data[data.length - 1];
        const candle = {
          timestamp: last[0],
          open:      +last[1],
          high:      +last[2],
          low:       +last[3],
          close:     +last[4],
          volume:    +last[5],
        };
        if (_io) _io.emit(`market:kline:${symbol}:${interval}`, candle);
      }
    } catch (_) {
      // silently skip — client keeps the last candle until next tick
    }

    // reschedule only if still has subscribers
    const current = klinePolls.get(key);
    if (current && current.subscribers.size > 0) {
      current.timer = setTimeout(poll, KLINE_POLL_MS);
    } else {
      klinePolls.delete(key);
    }
  };

  return setTimeout(poll, KLINE_POLL_MS);
}

// ─── depth polling (on-demand per symbol) ────────────────────────────────────

function scheduleDepthPoll(key: string, symbol: string) {
  const poll = async () => {
    const entry = depthPolls.get(key);
    if (!entry || entry.subscribers.size === 0) {
      depthPolls.delete(key);
      return;
    }
    try {
      const base = ENDPOINTS[endpointIdx];
      const { data } = await axios.get(`${base}/api/v3/depth`, {
        params: { symbol, limit: 10 },
        timeout: 5_000,
      });
      if (_io && data) {
        const asks = (data.asks || []).slice(0, 5).map((a: string[]) => ({ price: a[0], amount: a[1] }));
        const bids = (data.bids || []).slice(0, 5).map((b: string[]) => ({ price: b[0], amount: b[1] }));
        _io.emit(`market:depth:${symbol}`, { asks, bids });
      }
    } catch (_) {}
    const current = depthPolls.get(key);
    if (current && current.subscribers.size > 0) {
      current.timer = setTimeout(poll, 2_000);
    } else {
      depthPolls.delete(key);
    }
  };
  return setTimeout(poll, 2_000);
}

// ─── Socket.IO connection handler ─────────────────────────────────────────────

function setupSocketHandlers(io: any) {
  io.on('connection', (socket: any) => {
    // subscribe to live candle updates for a symbol+interval
    socket.on('subscribe:kline', ({ symbol, interval }: { symbol: string; interval: string }) => {
      if (!symbol || !interval) return;
      const key = `${symbol}:${interval}`;

      if (klinePolls.has(key)) {
        klinePolls.get(key)!.subscribers.add(socket.id);
      } else {
        const timer = scheduleKlinePoll(key, symbol, interval);
        klinePolls.set(key, { timer, subscribers: new Set([socket.id]) });
      }
    });

    // unsubscribe
    socket.on('unsubscribe:kline', ({ symbol, interval }: { symbol: string; interval: string }) => {
      if (!symbol || !interval) return;
      const key = `${symbol}:${interval}`;
      const entry = klinePolls.get(key);
      if (!entry) return;
      entry.subscribers.delete(socket.id);
      if (entry.subscribers.size === 0) {
        clearTimeout(entry.timer);
        klinePolls.delete(key);
      }
    });

    // subscribe to live order book for a symbol
    socket.on('subscribe:depth', ({ symbol }: { symbol: string }) => {
      if (!symbol) return;
      const key = `depth:${symbol}`;
      if (depthPolls.has(key)) {
        depthPolls.get(key)!.subscribers.add(socket.id);
      } else {
        const timer = scheduleDepthPoll(key, symbol);
        depthPolls.set(key, { timer, subscribers: new Set([socket.id]) });
      }
    });

    socket.on('unsubscribe:depth', ({ symbol }: { symbol: string }) => {
      if (!symbol) return;
      const key = `depth:${symbol}`;
      const entry = depthPolls.get(key);
      if (!entry) return;
      entry.subscribers.delete(socket.id);
      if (entry.subscribers.size === 0) {
        clearTimeout(entry.timer);
        depthPolls.delete(key);
      }
    });

    // clean up all subscriptions when a client disconnects
    socket.on('disconnect', () => {
      klinePolls.forEach((entry, key) => {
        entry.subscribers.delete(socket.id);
        if (entry.subscribers.size === 0) {
          clearTimeout(entry.timer);
          klinePolls.delete(key);
        }
      });
      depthPolls.forEach((entry, key) => {
        entry.subscribers.delete(socket.id);
        if (entry.subscribers.size === 0) {
          clearTimeout(entry.timer);
          depthPolls.delete(key);
        }
      });
    });
  });
}

// ─── public API ───────────────────────────────────────────────────────────────

export function initMarketDataService(io: any) {
  if (_timer) return;
  _io = io;
  setupSocketHandlers(io);
  fetchAndBroadcast();
}

export async function fetchTrades(symbol: string): Promise<any[]> {
  const key = REDIS_KEY_TRADES(symbol);
  const cached = await redis.get(key).catch(() => null);
  if (cached) return JSON.parse(cached);

  const base = ENDPOINTS[endpointIdx];
  const { data } = await axios.get(`${base}/api/v3/trades`, {
    params: { symbol, limit: 20 },
    timeout: 8_000,
  });

  redis.setex(key, REDIS_TTL_TRADES, JSON.stringify(data)).catch(() => {});
  return data;
}
