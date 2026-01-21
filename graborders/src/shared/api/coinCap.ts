import axios from 'axios';

export const COINCAP_BASE_URL = '/api/https://api.coincap.io/v2';
export const COINCAP_WS_URL = 'wss://ws.coincap.io/prices?assets=ALL';

// Map common symbols to CoinCap IDs
// This is a starting list. For a robust solution, we should fetch from API or cache.
export const symbolToIdMap: { [key: string]: string } = {
  'BTC': 'bitcoin',
  'ETH': 'ethereum',
  'USDT': 'tether',
  'BNB': 'binance-coin',
  'SOL': 'solana',
  'XRP': 'xrp',
  'DOGE': 'dogecoin',
  'ADA': 'cardano',
  'AVAX': 'avalanche-2',
  'TRX': 'tron',
  'DOT': 'polkadot',
  'MATIC': 'polygon',
  'LTC': 'litecoin',
  'SHIB': 'shiba-inu',
  'UNI': 'uniswap',
  'LINK': 'chainlink',
  'ATOM': 'cosmos',
  'XLM': 'stellar',
  'BCH': 'bitcoin-cash',
  'ALGO': 'algorand',
  'FIL': 'filecoin',
  'VET': 'vechain',
  'ICP': 'internet-computer',
  'MANA': 'decentraland',
  'SAND': 'the-sandbox',
  'AXS': 'axie-infinity',
  'THETA': 'theta-network',
  'XTZ': 'tezos',
  'EOS': 'eos',
  'AAVE': 'aave',
  'SUI': 'sui',
  'NEAR': 'near-protocol',
  'QNT': 'quant',
  'FTM': 'fantom',
  'GRT': 'the-graph',
  'RUNE': 'thorchain',
  'FLOW': 'flow',
  'CHZ': 'chiliz',
  'ETC': 'ethereum-classic',
  'XMR': 'monero',
  'EGLD': 'multiversx-egold',
  'APE': 'apecoin',
  'BSV': 'bitcoin-sv',
  'ZEC': 'zcash',
  'AR': 'arweave',
  'MINA': 'mina',
  'MKR': 'maker',
  'STX': 'stacks',
  'KCS': 'kucoin-token',
  'HT': 'huobi-token',
  'NEO': 'neo',
  'IOTA': 'iota',
  'ZIL': 'zilliqa',
  'LUNC': 'terra-luna-classic',
  'LUNA': 'terra-luna-2',
  'COMP': 'compound',
  'DASH': 'dash',
  'KAVA': 'kava',
  'XEM': 'nem',
  '1INCH': '1inch',
  'HOT': 'holo',
  'ENJ': 'enjin-coin',
  'BAT': 'basic-attention-token',
  'TFUEL': 'theta-fuel',
  'QTUM': 'qtum',
  'RVN': 'ravencoin',
  'CRV': 'curve-dao-token',
  'ROSE': 'oasis-network',
  'CELO': 'celo',
  'LDO': 'lido-dao',
  'GMT': 'stepn',
  'SNX': 'synthetix',
  'GLM': 'golem',
  'ANKR': 'ankr',
  'YFI': 'yearn-finance',
  'TWT': 'trust-wallet-token',
  'CVX': 'convex-finance',
  'CAKE': 'pancakeswap',
  'SUSHI': 'sushiswap',
  'DYDX': 'dydx',
  'ASTR': 'astar',
  'WOO': 'woo-network',
  'IMX': 'immutable-x',
  'ENS': 'ethereum-name-service',
  'PEOPLE': 'constitutiondao',
  'GAL': 'project-galaxy',
  'LRC': 'loopring',
  'JASMY': 'jasmycoin',
  'SLP': 'smooth-love-potion',
  'DAR': 'mines-of-dalarnia',
  'ALICE': 'my-neighbor-alice',
  'TLM': 'alien-worlds',
  'BAKE': 'bakerytoken',
  'BURGER': 'burger-swap',
  'C98': 'coin98',
  'MASK': 'mask-network',
  'ATA': 'automata-network',
  'BETA': 'beta-finance',
  'LAZIO': 'lazio-fan-token',
  'PORTO': 'fc-porto-fan-token',
  'SANTOS': 'santos-fc-fan-token',
  'ALPINE': 'alpine-f1-team-fan-token',
  'PYR': 'vulcan-forged-pyr',
  'HIGH': 'highstreet',
  'OOKI': 'ooki-protocol',
  'ACH': 'alchemy-pay',
  'FXS': 'frax-share',
  'LOKA': 'league-of-kingdoms-arena',
  'VOXEL': 'voxies',
  'MOB': 'mobilecoin',
  'NEXO': 'nexo',
  'SCRT': 'secret',
  'AMP': 'amp',
  'AUDIO': 'audius',
  'ONT': 'ontology',
  'GLMR': 'moonbeam',
  'FLUX': 'flux',
  'SC': 'siacoin',
  'WAXP': 'wax',
  'HIVE': 'hive',
  'PLA': 'playdapp',
  'POWR': 'powerledger',
  'POLY': 'polymath',
  'STRAX': 'stratis',
  'STPT': 'standard-tokenization-protocol',
  'DATA': 'streamr',
  'CTSI': 'cartesi',
  'DENT': 'dent',
  'OCEAN': 'ocean-protocol',
  'NMR': 'numeraire',
  'RLC': 'iexec-rlc',
  'BAND': 'band-protocol',
  'TRB': 'tellor',
  'REQ': 'request',
  'NKN': 'nkn',
  'STORJ': 'storj',
  'OGN': 'origin-protocol',
  'COTI': 'coti',
  'IOST': 'iost',
  'LSK': 'lisk',
  'OMG': 'omg-network',
  'ICX': 'icon',
  'KNC': 'kyber-network-crystal-v2',
  'BAL': 'balancer',
  'SRM': 'serum',
  'RAY': 'raydium',
  'MNGO': 'mango-markets',
  'ORCA': 'orca',
  'SABER': 'saber',
  'ATLAS': 'star-atlas',
  'POLIS': 'star-atlas-dao',
  'FIDA': 'bonfida',
  'KIN': 'kin',
  'SAMO': 'samoyedcoin',
  'CWAR': 'cryowar',
  'GENE': 'genopets',
  'DFL': 'defi-land',
  'AURY': 'aurory',
  'SYP': 'sypool',
  'SLC': 'solice',
  'SNY': 'synthetify',
  'APEX': 'apeX',
  'GST': 'green-satoshi-token',
  'MBOX': 'mobox',
  'CHESS': 'tranchess',
  'RNDR': 'render-token',
  'BICO': 'biconomy',
  'FLOKI': 'floki',
  'PEPE': 'pepe',
  'ARB': 'arbitrum',
  'APT': 'aptos',
  'OP': 'optimism',
  'BLUR': 'blur',
  'MAGIC': 'magic',
  'GMX': 'gmx',
  'RDNT': 'radiant-capital',
  'SSV': 'ssv-network',
  'ID': 'space-id',
  'EDU': 'open-campus',
  'SUI': 'sui',
  'WBTC': 'wrapped-bitcoin',
  'DAI': 'dai',
  'LEO': 'unus-sed-leo',
  'OKB': 'okb',
  'CRO': 'cronos',
  'BTT': 'bittorrent',
  'KAS': 'kaspa',
  'TON': 'toncoin',
};

// Reverse map for ID to Symbol
export const idToSymbolMap: { [key: string]: string } = {};
Object.entries(symbolToIdMap).forEach(([symbol, id]) => {
  idToSymbolMap[id] = symbol;
});

// Helper to get ID from symbol (e.g. BTCUSDT -> bitcoin)
export const getAssetId = (symbol: string): string => {
    let base = symbol.toUpperCase();
    if (base.endsWith('USDT')) {
        base = base.replace('USDT', '');
    } else if (base.endsWith('BTC') && base.length > 3) {
        base = base.replace('BTC', '');
    } else if (base.endsWith('ETH') && base.length > 3) {
        base = base.replace('ETH', '');
    }
    
    // Check map first
    if (symbolToIdMap[base]) return symbolToIdMap[base];
    
    // Fallback: lowercase full name (naive)
    return base.toLowerCase();
}

// Helper to parse symbol (e.g., "BTCUSDT" -> from: "BTC", to: "USDT")
export const parseSymbol = (symbol: string) => {
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
  return { fsym: upper, tsym: 'USDT' };
};

// Fetch top coins
export const fetchTopCoins = async (limit: number = 100, tsym: string = 'USDT') => {
  try {
    const response = await axios.get(`${COINCAP_BASE_URL}/assets?limit=${limit}`);
    const data = response.data.data;
    
    return data.map((item: any) => {
      // Update maps dynamically if not present
      if (!symbolToIdMap[item.symbol]) {
          symbolToIdMap[item.symbol] = item.id;
          idToSymbolMap[item.id] = item.symbol;
      }

      return {
        symbol: `${item.symbol}${tsym}`,
        baseSymbol: item.symbol,
        lastPrice: item.priceUsd,
        priceChange: '0', // CoinCap doesn't give absolute change, only percent
        priceChangePercent: item.changePercent24Hr,
        volume: item.volumeUsd24Hr,
        quoteVolume: item.volumeUsd24Hr, // Approx
        isPositive: parseFloat(item.changePercent24Hr) >= 0,
        id: item.id
      };
    });
  } catch (error) {
    console.error("Error fetching top coins:", error);
    return [];
  }
};

// Fetch full ticker data
export const fetchTicker24h = async (symbol: string) => {
    const id = getAssetId(symbol);
    try {
        // Fetch asset data and daily candle in parallel to get High/Low
        const [assetResponse, candlesResponse] = await Promise.all([
            axios.get(`${COINCAP_BASE_URL}/assets/${id}`),
            axios.get(`${COINCAP_BASE_URL}/candles?exchange=binance&interval=d1&baseId=${id}&quoteId=tether`)
        ]);

        const data = assetResponse.data.data;
        const candles = candlesResponse.data.data;
        const lastCandle = candles && candles.length > 0 ? candles[candles.length - 1] : null;

        return {
            symbol: symbol,
            lastPrice: data.priceUsd,
            priceChange: '0', // Not available directly
            priceChangePercent: data.changePercent24Hr,
            highPrice: lastCandle ? lastCandle.high : data.priceUsd,
            lowPrice: lastCandle ? lastCandle.low : data.priceUsd,
            volume: data.volumeUsd24Hr,
            quoteVolume: data.volumeUsd24Hr,
            openPrice: lastCandle ? lastCandle.open : data.priceUsd
        };
    } catch (e) {
        console.error(`Error fetching ticker for ${symbol}:`, e);
        // Fallback if candle fetch fails
        try {
             const response = await axios.get(`${COINCAP_BASE_URL}/assets/${id}`);
             const data = response.data.data;
             return {
                symbol: symbol,
                lastPrice: data.priceUsd,
                priceChange: '0',
                priceChangePercent: data.changePercent24Hr,
                highPrice: data.priceUsd,
                lowPrice: data.priceUsd,
                volume: data.volumeUsd24Hr,
                quoteVolume: data.volumeUsd24Hr,
                openPrice: data.priceUsd
            };
        } catch (innerE) {
            throw innerE;
        }
    }
}

// Fetch trades (history)
// We use Binance API as a fallback because CoinCap doesn't provide recent trades list easily
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
    const id = getAssetId(symbol);
    
    // Map interval
    // m1, m5, m15, m30, h1, h2, h6, h12, d1
    let ccInterval = 'm1';
    switch(interval) {
        case '1m': ccInterval = 'm1'; break;
        case '5m': ccInterval = 'm5'; break;
        case '15m': ccInterval = 'm15'; break;
        case '30m': ccInterval = 'm30'; break;
        case '1h': ccInterval = 'h1'; break;
        case '2h': ccInterval = 'h2'; break;
        case '4h': ccInterval = 'h2'; break; // Approx
        case '6h': ccInterval = 'h6'; break;
        case '8h': ccInterval = 'h6'; break; // Approx
        case '12h': ccInterval = 'h12'; break;
        case '1d': ccInterval = 'd1'; break;
        case '3d': ccInterval = 'd1'; break; // Approx
        case '1w': ccInterval = 'd1'; break; // Approx
        default: ccInterval = 'm1';
    }
    
    try {
        // We use candles endpoint with binance exchange
        const response = await axios.get(`${COINCAP_BASE_URL}/candles?exchange=binance&interval=${ccInterval}&baseId=${id}&quoteId=tether`);
        const data = response.data.data;
        
        // Map to structure: [time, open, high, low, close, volume, quoteVolume]
        // CoinCap returns: { open, high, low, close, volume, period }
        return data.slice(-limit).map((d: any) => [
            d.period,
            d.open,
            d.high,
            d.low,
            d.close,
            d.volume,
            0 // quote volume unknown
        ]);
        
    } catch (e) {
        console.error(`Error fetching klines for ${symbol}:`, e);
        return [];
    }
}

// WebSocket Subscription helper
// CoinCap doesn't use subscription strings in the same way, but we can return the ID
export const getSubscriptionString = (symbol: string) => {
    return getAssetId(symbol);
};

// Get CoinCap WebSocket URL for specific assets
export const getCoinCapWsUrl = (assets: string[]) => {
    if (assets.length === 0) return 'wss://ws.coincap.io/prices?assets=ALL';
    return `wss://ws.coincap.io/prices?assets=${assets.join(',')}`;
}
