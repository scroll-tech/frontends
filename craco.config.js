const CracoLessPlugin = require("craco-less")
const webpack = require("webpack")
const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const SentryWebpackPlugin = require("@sentry/webpack-plugin")
require("./scripts/download-blog-posts.data.json.js")

module.exports = {
  babel: {
    plugins: ["@emotion/babel-plugin"],
  },
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
  // local proxy
  devServer: {
    proxy: {
      // "/bridgehistory/api": {
      //   target: "http://localhost:4000",
      //   pathRewrite: { "^/bridgehistory/api": "/api" },
      //  },
      // "/rollupscan/api": {
      //   target: "http://10.0.3.119:8560",
      //   pathRewrite: { "^/rollupscan/api": "/api" },
      // },
    },
  },

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
    configure: function (webpackConfig, { env }) {
      webpackConfig.ignoreWarnings = [
        function ignoreSourcemapsloaderWarnings(warning) {
          return (
            warning.module && warning.module.resource.includes("node_modules") && warning.details && warning.details.includes("source-map-loader")
          )
        },
      ]
      webpackConfig.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      })

      webpackConfig.module.rules.push({
        test: /\.m?js$/,
        include: /node_modules/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      })

      if (env === "production" && process.env.CI) {
        const sentryPlugin = new SentryWebpackPlugin({
          org: "scroll-zkp",
          project: "scroll-io",
          include: "./build",
          release: process.env.REACT_APP_VERSION,
        })
        webpackConfig.plugins.push(sentryPlugin)

        const instanceOfMiniCssExtractPlugin = webpackConfig.plugins.find(plugin => plugin instanceof MiniCssExtractPlugin)
        instanceOfMiniCssExtractPlugin.options.ignoreOrder = true
      }
      return webpackConfig
    },
  },
}
