const CracoLessPlugin = require("craco-less")
const webpack = require("webpack")
const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { loaderByName, addBeforeLoader } = require("@craco/craco")

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
    configure: function(webpackConfig, { env }) {
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
      if (env === "production") {
        const instanceOfMiniCssExtractPlugin = webpackConfig.plugins.find(plugin => plugin instanceof MiniCssExtractPlugin)

        instanceOfMiniCssExtractPlugin.options.ignoreOrder = true
      }
      return webpackConfig
    },
  },
}
