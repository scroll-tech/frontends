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
    name: "Blog",
    path: "/blog",
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
    name: "Portal",
    path: "/portal",
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
  {
    name: "Scroll Sticker Winners",
    path: "/sticker-winners",
    description: "Congratulations to the winners of the sticker contest.",
  },
  {
    name: "Scroll Sessions",
    path: "/sessions",
    description: "Receive Marks for your engagement with Scroll. Join Sessions now!",
    ogImg: "/og_scroll_sessions.png",
    twitterImg: "/twitter_scroll_sessions.png",
  },
  {
    name: "Scroll Sessions Terms of Use",
    path: "/sessions-terms-of-use",
  },
  {
    name: "Scroll Sessions Restricted",
    path: "/sessions-restricted",
  },
  {
    name: "Canvas",
    path: "/canvas",
    description: "Earn attestation badges across the ecosystem.",
    isHiddenFooter: true,
    ogImg: "/og_canvas.png",
    twitterImg: "/twitter_canvas.png",
  },
  {
    name: "Canvas",
    path: "/canvas/mint",
    description: "Earn attestation badges across the ecosystem.",
    isHiddenFooter: true,
    ogImg: "/og_canvas.png",
    twitterImg: "/twitter_canvas.png",
  },

  {
    name: "Canvas",
    path: "/canvas/badge/:id",
    isHiddenFooter: true,
  },
  {
    name: "Canvas",
    path: "/canvas/badge-contract/:address",
    isHiddenFooter: true,
  },
  {
    name: "Canvas Invite",
    path: "/canvas/invite/:code",
    isHiddenFooter: true,
  },
  {
    name: "Canvas",
    path: "/canvas/:address",
    isHiddenFooter: true,
  },
  {
    name: "Canvas And Badges",
    path: "/canvas-and-badges",
    description: "Build your on-chain persona and collect badges across Scroll’s ecosystem",
    ogImg: "/og_canvas_and_badges.png",
    twitterImg: "/twitter_canvas_and_badges.png",
  },
  {
    name: "Community",
    path: "/community",
    ogImg: "/og_community.png",
    twitterImg: "/twitter_community.png",
  },
]

const routes = isSepolia ? sepoliaRoutes : mainnetRoutes

export default routes
