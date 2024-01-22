/** @type {import('next').NextConfig} */
const SentryWebpackPlugin = require("@sentry/webpack-plugin")
const packageJson = require("./package.json")
const nextConfig = {
  env: {
    NEXT_PUBLIC_VERSION: packageJson.version,
  },
  // trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/developer-nft",
        destination: "/developer-nft/mint",
        permanent: true,
      },
    ]
  },
  compiler: {
    // emotion: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    config.ignoreWarnings = [
      function ignoreSourcemapsloaderWarnings(warning) {
        return warning.module && warning.module.resource.includes("node_modules") && warning.details && warning.details.includes("source-map-loader")
      },
    ]
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        cacheGroups: {
          styles: {
            name: "styles",
            type: "css/mini-extract",
            chunks: "all",
            enforce: true,
          },
        },
      },
    }
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find(rule => rule.test?.test?.(".svg"))
    config.module.rules.push(
      ...[
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/, // *.svg?url
        },
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
          use: [
            {
              loader: "@svgr/webpack",
              options: {
                svgoConfig: {
                  plugins: [
                    {
                      name: "preset-default",
                      params: {
                        overrides: {
                          removeViewBox: false,
                        },
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
        // .md
        {
          test: /\.md$/,
          use: "raw-loader",
        },
      ],
    )

    fileLoaderRule.exclude = /\.svg$/i

    if (!dev) {
      const sentryPlugin = new SentryWebpackPlugin({
        org: "scroll-zkp",
        project: "scroll-io",
        include: "./build",
        release: packageJson.version,
      })
      config.plugins.push(sentryPlugin)
    }

    return config
  },
}

module.exports = nextConfig
