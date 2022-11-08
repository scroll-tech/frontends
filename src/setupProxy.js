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
};
