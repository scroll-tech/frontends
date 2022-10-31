const CracoLessPlugin = require("craco-less");
const webpack = require("webpack");
const path = require("path");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {},
            javascriptEnabled: true,
          },
        },
      },
    },
  ],

  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      assert: "assert",
      buffer: "buffer",
      crypto: "crypto-browserify",
      http: "stream-http",
      https: "https-browserify",
      os: "os-browserify/browser",
      process: "process/browser",
      stream: "stream-browserify",
      util: "util",
    },
    experiments: {
      asyncWebAssembly: true,
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: "process/browser",
        Buffer: ["buffer", "Buffer"],
      }),
    ],
  },
};
