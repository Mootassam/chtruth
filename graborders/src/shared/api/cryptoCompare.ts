import axios from 'axios';

// API Key for CryptoCompare
// You should replace this with your own API key from https://min-api.cryptocompare.com/
export const CRYPTOCOMPARE_API_KEY = '8ef04da549bf4177d0d5747a59be921a07d4d477feb7c970d7d9b471774d952d';

export const CRYPTOCOMPARE_BASE_URL = 'https://min-api.cryptocompare.com/data';
export const CRYPTOCOMPARE_WS_URL = `wss://streamer.cryptocompare.com/v2?api_key=${CRYPTOCOMPARE_API_KEY}`;

// Helper to parse symbol (e.g., "BTCUSDT" -> from: "BTC", to: "USDT")
export const parseSymbol = (symbol: string) => {
  // Simple heuristic: if ends with USDT, split. 
  // Otherwise assume it's a crypto-crypto pair or handle common quote currencies.
  // For this app, it seems most pairs are with USDT.
  const upper = symbol.toUpperCase();
  if (upper.endsWith('USDT')) {
    return { fsym: upper.replace('USDT', ''), tsym: 'USDT' };
  }
  if (upper.endsWith('BTC')) {
    return { fsym: upper.replace('BTC', ''), tsym: 'BTC' };
  }
  if (upper.endsWith('ETH')) {
    return { fsym: upper.replace('ETH', ''), tsym: 'ETH' };
  }
  // Default fallback
  return { fsym: upper, tsym: 'USDT' };
};

// Fetch top 100 coins by volume (for CoinList)
export const fetchTopCoins = async (limit: number = 100, tsym: string = 'USDT') => {
  try {
    const response = await axios.get(`${CRYPTOCOMPARE_BASE_URL}/top/totalvolfull?limit=${limit}&tsym=${tsym}&api_key=${CRYPTOCOMPARE_API_KEY}`);
    const data = response.data.Data;
    
    // Map to structure used in CoinListModal (similar to Binance ticker)
    return data.map((item: any) => {
      const raw = item.RAW?.[tsym] || {};
      const coinInfo = item.CoinInfo || {};
      
      return {
        symbol: `${coinInfo.Name}${tsym}`,
        baseSymbol: coinInfo.Name,
        lastPrice: raw.PRICE?.toString() || '0',
        priceChange: raw.CHANGE24HOUR?.toString() || '0',
        priceChangePercent: raw.CHANGEPCT24HOUR?.toString() || '0',
        volume: raw.VOLUME24HOUR?.toString() || '0',
        quoteVolume: raw.VOLUME24HOURTO?.toString() || '0',
        isPositive: (raw.CHANGEPCT24HOUR || 0) >= 0
      };
    });
  } catch (error) {
    console.error("Error fetching top coins:", error);
    return [];
  }
};

// Fetch full ticker data (similar to Binance ticker/24hr)
export const fetchTicker24h = async (symbol: string) => {
  const { fsym, tsym } = parseSymbol(symbol);
  try {
    const response = await axios.get(`${CRYPTOCOMPARE_BASE_URL}/pricemultifull?fsyms=${fsym}&tsyms=${tsym}&api_key=${CRYPTOCOMPARE_API_KEY}`);
    const data = response.data.RAW[fsym][tsym];
    
    // Map to a structure compatible with the app's expectations (approximating Binance response)
    return {
      symbol: symbol,
      lastPrice: data.PRICE.toString(),
      priceChange: data.CHANGE24HOUR.toString(),
      priceChangePercent: data.CHANGEPCT24HOUR.toString(),
      highPrice: data.HIGH24HOUR.toString(),
      lowPrice: data.LOW24HOUR.toString(),
      volume: data.VOLUME24HOUR.toString(),
      quoteVolume: data.VOLUME24HOURTO.toString(),
      openPrice: data.OPEN24HOUR.toString(),
    };
  } catch (error) {
    console.error(`Error fetching ticker for ${symbol}:`, error);
    throw error;
  }
};

// Fetch trades (history)
export const fetchTrades = async (symbol: string, limit: number = 20) => {
  try {
    const response = await axios.get(`https://api.binance.us/api/v3/trades?symbol=${symbol}&limit=${limit}`);
    const data = response.data;
    return data.map((item: any) => ({
      p: item.price?.toString() || "0",
      q: item.qty?.toString() || "0",
      T: item.time,
      m: item.isBuyerMaker === true,
    }));
  } catch (error) {
    console.error(`Error fetching trades for ${symbol}:`, error);
    return [];
  }
};

// Fetch KLines (Candlestick data)
export const fetchKlines = async (symbol: string, interval: string, limit: number = 500) => {
  const { fsym, tsym } = parseSymbol(symbol);
  
  // Map Binance intervals to CryptoCompare endpoints
  let endpoint = 'histominute';
  let aggregate = 1;
  
  // Binance intervals: 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M
  switch (interval) {
    case '1m': endpoint = 'histominute'; aggregate = 1; break;
    case '3m': endpoint = 'histominute'; aggregate = 3; break;
    case '5m': endpoint = 'histominute'; aggregate = 5; break;
    case '15m': endpoint = 'histominute'; aggregate = 15; break;
    case '30m': endpoint = 'histominute'; aggregate = 30; break;
    case '1h': endpoint = 'histohour'; aggregate = 1; break;
    case '2h': endpoint = 'histohour'; aggregate = 2; break;
    case '4h': endpoint = 'histohour'; aggregate = 4; break;
    case '6h': endpoint = 'histohour'; aggregate = 6; break;
    case '8h': endpoint = 'histohour'; aggregate = 8; break;
    case '12h': endpoint = 'histohour'; aggregate = 12; break;
    case '1d': endpoint = 'histoday'; aggregate = 1; break;
    case '3d': endpoint = 'histoday'; aggregate = 3; break;
    case '1w': endpoint = 'histoday'; aggregate = 7; break;
    case '1M': endpoint = 'histoday'; aggregate = 30; break; // Approx
    default: endpoint = 'histominute'; aggregate = 1;
  }

  try {
    const response = await axios.get(`${CRYPTOCOMPARE_BASE_URL}/v2/${endpoint}?fsym=${fsym}&tsym=${tsym}&limit=${limit}&aggregate=${aggregate}&api_key=${CRYPTOCOMPARE_API_KEY}`);
    const data = response.data.Data.Data;
    
    // Map to Binance structure: [time, open, high, low, close, volume, ...]
    return data.map((d: any) => [
      d.time * 1000, // CryptoCompare is in seconds, Binance in ms
      d.open,
      d.high,
      d.low,
      d.close,
      d.volumefrom, // volume
      d.volumeto, // quote volume
    ]);
  } catch (error) {
    console.error(`Error fetching klines for ${symbol}:`, error);
    return [];
  }
};

// WebSocket Subscription helper
export const getSubscriptionString = (symbol: string, type: 'Ticker' | 'Trade' | 'Kline' = 'Ticker') => {
  const { fsym, tsym } = parseSymbol(symbol);
  if (type === 'Ticker') {
    return `5~CCCAGG~${fsym}~${tsym}`;
  } else if (type === 'Trade') {
    return `0~CCCAGG~${fsym}~${tsym}`; // 0 is Trade
  }
  return `5~CCCAGG~${fsym}~${tsym}`;
};
