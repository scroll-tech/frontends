const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/faucetapi",
    createProxyMiddleware({
      // target: process.env.REACT_APP_BASE_URI + "/faucet",
      target: "http://192.168.10.113:8080",
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
