import { isSepolia } from "@/utils"

const sepoliaRoutes = [
  {
    name: "Native zkEVM Layer 2 for Ethereum",
    path: "/",
  },
  {
    name: "Terms and Conditions[Archive]",
    path: "/archive/20230308/terms-and-conditions",
  },
  {
    name: "Terms of Service",
    path: "/terms-of-service",
  },
  {
    name: "Privacy Policy",
    path: "/privacy-policy",
  },
  {
    name: "Resources",
    path: "portal",
    fullPath: "/portal",
  },
  {
    name: "Bridge",
    path: "/bridge",
    fullPath: "/bridge",
  },
  {
    name: "Bridge FAQ",
    path: "/bridge/faq",
    fullPath: "/bridge/faq",
  },
  {
    name: "Join Us",
    path: "/join-us",
  },
  {
    name: "Rollup Explorer",
    path: "/rollupscan",
    fullPath: "/rollupscan",
  },
  {
    name: "Rollup Explorer: Batch Details",
    path: "/rollupscan/batch/:batchIndex",
    fullPath: "/rollupscan/batch/:batchIndex",
  },
  {
    name: "Rollup Explorer: Chunk List",
    path: "/rollupscan/batch/:batchIndex/chunks",
    fullPath: "/rollupscan/batch/:batchIndex/chunks",
  },
  {
    name: "Rollup Explorer: Chunk Details",
    path: "/rollupscan/batch/:batchIndex/chunk/:chunkIndex",
    fullPath: "/rollupscan/batch/:batchIndex/chunk/:chunkIndex",
  },
  {
    name: "Rollup Explorer: Block Details",
    path: "/rollupscan/batch/:batchIndex/blocks",
    fullPath: "/rollupscan/batch/:batchIndex/blocks",
  },
  {
    name: "Rollup Explorer: Block Details",
    path: "/rollupscan/batch/:batchIndex/chunk/:chunkIndex/blocks",
    fullPath: "/rollupscan/batch/:batchIndex/chunk/:chunkIndex/blocks",
  },
]

const mainnetRoutes = [
  {
    name: "Native zkEVM Layer 2 for Ethereum",
    path: "/",
  },
  {
    name: "Our Story",
    path: "/story",
  },
  {
    name: "Join Us",
    path: "/join-us",
  },
  {
    name: "Blog Detail",
    path: "/blog/:blogId",
  },
  // Avoid references from other places and retain temporarily.
  {
    name: "Terms and Conditions",
    path: "/terms-and-conditions",
  },
  {
    name: "Terms and Conditions[Archive]",
    path: "/archive/20230308/terms-and-conditions",
  },
  {
    name: "Terms of Service",
    path: "/terms-of-service",
  },
  {
    name: "Privacy Policy",
    path: "/privacy-policy",
  },
  {
    name: "Resources",
    path: "portal",
    fullPath: "/portal",
  },
  {
    name: "Bridge",
    path: "/bridge",
    fullPath: "/bridge",
  },
  {
    name: "Bridge FAQ",
    path: "/bridge/faq",
    fullPath: "/bridge/faq",
  },
  {
    name: "Ecosystem",
    path: "/ecosystem",
    fullPath: "/ecosystem",
  },
  {
    name: "Rollup Explorer",
    path: "/rollupscan",
    fullPath: "/rollupscan",
  },
  {
    name: "Rollup Explorer: Batch Details",
    path: "/rollupscan/batch/:batchIndex",
    fullPath: "/rollupscan/batch/:batchIndex",
  },
  {
    name: "Rollup Explorer: Chunk List",
    path: "/rollupscan/batch/:batchIndex/chunks",
    fullPath: "/rollupscan/batch/:batchIndex/chunks",
  },
  {
    name: "Rollup Explorer: Chunk Details",
    path: "/rollupscan/batch/:batchIndex/chunk/:chunkIndex",
    fullPath: "/rollupscan/batch/:batchIndex/chunk/:chunkIndex",
  },
  {
    name: "Rollup Explorer: Block Details",
    path: "/rollupscan/batch/:batchIndex/blocks",
    fullPath: "/rollupscan/batch/:batchIndex/blocks",
  },
  {
    name: "Rollup Explorer: Block Details",
    path: "/rollupscan/batch/:batchIndex/chunk/:chunkIndex/blocks",
    fullPath: "/rollupscan/batch/:batchIndex/chunk/:chunkIndex/blocks",
  },
  {
    name: "Scroll Origins NFT",
    path: "/developer-nft",
    fullPath: "/developer-nft",
  },
  {
    name: "Scroll Origins NFT",
    path: "/developer-nft/mint",
    fullPath: "/developer-nft/mint",
  },
]

const routes = isSepolia ? sepoliaRoutes : mainnetRoutes

export default routes
