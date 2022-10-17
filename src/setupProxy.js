const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/faucetapi",
    createProxyMiddleware({
      target: "https://prealpha.scroll.io/faucet",
      changeOrigin: true,
      pathRewrite: { "/faucetapi": "" },
    })
  );
};
