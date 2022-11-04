const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/faucetapi",
    createProxyMiddleware({
      target: process.env.REACT_APP_BASE_URI + "/faucet",
      changeOrigin: true,
      pathRewrite: { "/faucetapi": "" },
    })
  );
  app.use(
    "/whitelist",
    createProxyMiddleware({
      target: process.env.REACT_APP_BASE_URI,
      changeOrigin: true,
    })
  );
  app.use(
    "/bridgeapi",
    createProxyMiddleware({
      target: "http://192.168.10.118:3000",
      // target: "https://staging-prealpha.scroll.io/",
      changeOrigin: true,
      secure: false,
      pathRewrite: { "/bridgeapi": "/api" },
      timeout: 50000,
    })
  );
};
