const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/faucetapi",
    createProxyMiddleware({
      target: "https://staging-prealpha.scroll.io/faucet",
      changeOrigin: true,
      pathRewrite: { "/faucetapi": "" },
    })
  );
  app.use(
    "/whitelist",
    createProxyMiddleware({
      target: "https://staging-prealpha.scroll.io/",
      changeOrigin: true,
    })
  );
};
