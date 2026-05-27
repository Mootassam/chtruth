export default (app) => {
  // No auth / tenant required — public market data served from Redis cache
  app.get('/market/tickers',        require('./marketTickers').default);
  app.get('/market/detail/:symbol', require('./marketDetail').default);
  app.get('/market/klines',         require('./marketKlines').default);
  app.get('/market/orderbook',      require('./marketOrderbook').default);
};
