const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/faucetapi",
    createProxyMiddleware({
      target: "http://192.168.50.2:3000",
      // target: process.env.REACT_APP_BASE_URI + "/faucet",
      changeOrigin: true,
      pathRewrite: { "/faucetapi": "" },
    })
  );
  app.use(
    "/bridgeapi",
    createProxyMiddleware({
      target: process.env.REACT_APP_BASE_URI + "/bridgehistoryapi",
      changeOrigin: true,
      secure: false,
      pathRewrite: { "/bridgeapi": "/api" },
      timeout: 50000,
    })
  );
  app.use(
    "/whitelist",
    createProxyMiddleware({
      target: process.env.REACT_APP_BASE_URI,
      changeOrigin: true,
    })
  );
};
