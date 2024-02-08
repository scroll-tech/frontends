import { isSepolia } from "@/utils"

export interface PageMetadata {
  name: string
  path: string
  description?: string
  ogImg?: string
  twitterImg?: string
}

export const DEFAULT_METADATA = {
  name: "",
  description: "Native zkEVM Layer 2 for Ethereum",
  ogImg: "/og_scroll.png",
}

const sepoliaRoutes: PageMetadata[] = [
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
  },
  {
    name: "Bridge",
    path: "/bridge",
  },
  {
    name: "Bridge FAQ",
    path: "/bridge/faq",
  },
  {
    name: "Join Us",
    path: "/join-us",
  },
  {
    name: "Rollup Explorer",
    path: "/rollupscan",
  },
  {
    name: "Rollup Explorer: Batch Details",
    path: "/rollupscan/batch/:batchIndex",
  },
  {
    name: "Rollup Explorer: Chunk List",
    path: "/rollupscan/batch/:batchIndex/chunks",
  },
  {
    name: "Rollup Explorer: Chunk Details",
    path: "/rollupscan/batch/:batchIndex/chunk/:chunkIndex",
  },
  {
    name: "Rollup Explorer: Block Details",
    path: "/rollupscan/batch/:batchIndex/blocks",
  },
  {
    name: "Rollup Explorer: Block Details",
    path: "/rollupscan/batch/:batchIndex/chunk/:chunkIndex/blocks",
  },
]

const mainnetRoutes: PageMetadata[] = [
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
    name: "Brand Kit",
    path: "/brand-kit",
    description: "Explore and download Scroll brand assets and media kit, including logos, banners, and brand guidelines.",
    ogImg: "/og_scroll_brand.png",
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
  },
  {
    name: "Bridge",
    path: "/bridge",
  },
  {
    name: "Bridge FAQ",
    path: "/bridge/faq",
  },
  {
    name: "Ecosystem",
    path: "/ecosystem",
  },
  {
    name: "Rollup Explorer",
    path: "/rollupscan",
  },
  {
    name: "Rollup Explorer: Batch Details",
    path: "/rollupscan/batch/:batchIndex",
  },
  {
    name: "Rollup Explorer: Chunk List",
    path: "/rollupscan/batch/:batchIndex/chunks",
  },
  {
    name: "Rollup Explorer: Chunk Details",
    path: "/rollupscan/batch/:batchIndex/chunk/:chunkIndex",
  },
  {
    name: "Rollup Explorer: Block Details",
    path: "/rollupscan/batch/:batchIndex/blocks",
  },
  {
    name: "Rollup Explorer: Block Details",
    path: "/rollupscan/batch/:batchIndex/chunk/:chunkIndex/blocks",
  },
  {
    name: "Scroll Origins NFT",
    path: "/developer-nft",
  },
  {
    name: "Scroll Origins NFT",
    path: "/developer-nft/mint",
    ogImg: "/og_scroll_origins_nft.png",
    twitterImg: "/twitter_scroll_origins_nft.png",
  },
  {
    name: "Scroll Sticker Vote",
    path: "/sticker-vote",
    description: "Vote for your favourite sticker designs.",
    ogImg: "/og_sticker_vote.png",
    twitterImg: "/twitter_sticker_vote.png",
  },
  // {
  //   name: "Scroll Sticker Winners",
  //   path: "/sticker-winners",
  //   description: "Congratulations to the winners of the sticker contest.",
  // },
]

const routes = isSepolia ? sepoliaRoutes : mainnetRoutes

export default routes
