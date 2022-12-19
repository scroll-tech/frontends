const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/faucetapi",
    createProxyMiddleware({
      target: process.env.REACT_APP_API_BASE_URI + "/faucet",
      changeOrigin: true,
      pathRewrite: { "/faucetapi": "" },
    })
  );
  app.use(
    "/bridgeapi",
    createProxyMiddleware({
      target: process.env.REACT_APP_API_BASE_URI + "/bridgehistory",
      changeOrigin: true,
      secure: false,
      pathRewrite: { "/bridgeapi": "/api" },
      timeout: 50000,
    })
  );
};
