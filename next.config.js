/** @type {import('next').NextConfig} */
require("./scripts/download-blog-posts.data.json.js")
const { withSentryConfig } = require("@sentry/nextjs")

const packageJson = require("./package.json")
const nextConfig = {
  env: {
    NEXT_PUBLIC_VERSION: packageJson.version,
  },
  images: {
    deviceSizes: [600, 900, 1200, 1536],
  },
  // trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/developer-nft",
        destination: "/developer-nft/mint",
        permanent: true,
      },
      // blog
      { source: "/blog/scalingSecurity", destination: "/blog/scaling-security", permanent: true },
      { source: "/blog/founderLetter", destination: "/blog/founder-letter", permanent: true },
      { source: "/blog/scrollSepolia", destination: "/blog/scroll-sepolia", permanent: true },
      { source: "/blog/contributeToScroll", destination: "/blog/contribute-to-scroll", permanent: true },
      { source: "/blog/alphaTestnet", destination: "/blog/alpha-testnet", permanent: true },
      { source: "/blog/releaseNote0109", destination: "/blog/release-note-0109", permanent: true },
      { source: "/blog/proofGeneration", destination: "/blog/proof-generation", permanent: true },
      { source: "/blog/upgradingPreAlphaTestnet", destination: "/blog/upgrading-pre-alpha-testnet", permanent: true },
      { source: "/blog/technicalPrinciples", destination: "/blog/technical-principles", permanent: true },
      { source: "/blog/preAlphaTestnet", destination: "/blog/pre-alpha-testnet", permanent: true },
      { source: "/blog/visionAndValues", destination: "/blog/vision-and-values", permanent: true },
      { source: "/blog/zkEVM", destination: "/blog/zkevm", permanent: true },
      { source: "/blog/scrollsFreshCoat", destination: "/blog/scrolls-fresh-coat", permanent: true },
      { source: "/sticker-vote", destination: "/sticker-winners", permanent: true },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "scroll-tech.github.io",
        port: "",
        pathname: "/token-list/data/**",
      },
    ],
  },
  // eslint-disable-next-line
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    config.ignoreWarnings = [
      function ignoreSourcemapsloaderWarnings(warning) {
        return warning.module && warning.module.resource.includes("node_modules") && warning.details && warning.details.includes("source-map-loader")
      },
    ]
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

    return config
  },
  sentry: {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    // tunnelRoute: "/monitoring-tunnel",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  },
}

// Injected content via Sentry wizard below

module.exports = withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Suppresses source map uploading logs during build
  silent: true,
  org: "scroll-zkp",
  project: "scroll-io",
  authToken: process.env.SENTRY_AUTH_TOKEN,
})
