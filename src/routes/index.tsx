import ArchiveTerms from "@/pages/archive/20230308/terms"
import Blog from "@/pages/blog"
import BlogDetail from "@/pages/blog/detail"
import BrandKit from "@/pages/brand-kit"
import Bridge from "@/pages/bridge"
import BridgeFAQ from "@/pages/bridge/FAQ"
import Career from "@/pages/career"
// import ComingSoon from "@/pages/developer-nft/coming-soon"
import DeveloperNFT from "@/pages/developer-nft/index"
import MintNFT from "@/pages/developer-nft/mint"
import Ecosystem from "@/pages/ecosystem"
import Home from "@/pages/landingpage"
import Portal from "@/pages/portal"
import PrivacyPolicy from "@/pages/privacyPolicy"
import RollupScanBatch from "@/pages/rollup/batch"
import RollupScanBlock from "@/pages/rollup/block"
import RollupScanChunk from "@/pages/rollup/chunk"
import RollupScanChunkDetail from "@/pages/rollup/chunk/detail"
import RollupScan from "@/pages/rollup/index"
import Sessions from "@/pages/sessions-one"
import SessionsRestricted from "@/pages/sessions-restricted"
import SessionsTerms from "@/pages/sessions-terms"
import StickerVote from "@/pages/sticker-vote"
import StickerWinners from "@/pages/sticker-winners"
import Terms from "@/pages/terms"
import { isSepolia } from "@/utils"

const sepoliaRoutes = [
  {
    name: "Native zkEVM Layer 2 for Ethereum",
    path: "/",
    element: <Portal />,
  },
  {
    name: "Terms and Conditions[Archive]",
    path: "/archive/20230308/terms-and-conditions",
    element: <ArchiveTerms />,
  },
  {
    name: "Terms of Service",
    path: "/terms-of-service",
    element: <Terms />,
  },
  {
    name: "Privacy Policy",
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    name: "Resources",
    path: "portal",
    element: <Portal />,
  },
  {
    name: "Bridge",
    path: "/bridge",
    element: <Bridge />,
  },
  {
    name: "Bridge FAQ",
    path: "/bridge/faq",
    element: <BridgeFAQ />,
  },
  {
    name: "Join Us",
    path: "/join-us",
    element: <Career />,
  },
  {
    name: "Rollup Explorer",
    path: "/rollupscan",
    element: <RollupScan />,
  },
  {
    name: "Rollup Explorer: Batch Details",
    path: "/rollupscan/batch/:batchIndex",
    element: <RollupScanBatch />,
  },
  {
    name: "Rollup Explorer: Chunk List",
    path: "/rollupscan/batch/:batchIndex/chunks",
    element: <RollupScanChunk />,
  },
  {
    name: "Rollup Explorer: Chunk Details",
    path: "/rollupscan/batch/:batchIndex/chunk/:chunkIndex",
    element: <RollupScanChunkDetail />,
  },
  {
    name: "Rollup Explorer: Block Details",
    path: "/rollupscan/batch/:batchIndex/blocks",
    element: <RollupScanBlock />,
  },
  {
    name: "Rollup Explorer: Block Details",
    path: "/rollupscan/batch/:batchIndex/chunk/:chunkIndex/blocks",
    element: <RollupScanBlock />,
  },
]

const mainnetRoutes = [
  {
    name: "Native zkEVM Layer 2 for Ethereum",
    path: "/",
    element: <Home />,
  },
  { name: "Blog", path: "/blog", element: <Blog /> },
  {
    name: "Join Us",
    path: "/join-us",
    element: <Career />,
  },
  {
    name: "Brand Kit",
    path: "/brand-kit",
    element: <BrandKit />,
    description: "Explore and download Scroll brand assets and media kit, including logos, banners, and brand guidelines.",
  },
  {
    name: "Blog Detail",
    path: "/blog/:blogId",
    element: <BlogDetail />,
  },
  // Avoid references from other places and retain temporarily.
  {
    name: "Terms and Conditions",
    path: "/terms-and-conditions",
    element: <ArchiveTerms />,
  },
  {
    name: "Terms and Conditions[Archive]",
    path: "/archive/20230308/terms-and-conditions",
    element: <ArchiveTerms />,
  },
  {
    name: "Terms of Service",
    path: "/terms-of-service",
    element: <Terms />,
  },
  {
    name: "Privacy Policy",
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    name: "Resources",
    path: "portal",
    element: <Portal />,
  },
  {
    name: "Bridge",
    path: "/bridge",
    element: <Bridge />,
  },
  {
    name: "Bridge FAQ",
    path: "/bridge/faq",
    element: <BridgeFAQ />,
  },
  {
    name: "Ecosystem",
    path: "/ecosystem",
    element: <Ecosystem />,
  },
  {
    name: "Rollup Explorer",
    path: "/rollupscan",
    element: <RollupScan />,
  },
  {
    name: "Rollup Explorer: Batch Details",
    path: "/rollupscan/batch/:batchIndex",
    element: <RollupScanBatch />,
  },
  {
    name: "Rollup Explorer: Chunk List",
    path: "/rollupscan/batch/:batchIndex/chunks",
    element: <RollupScanChunk />,
  },
  {
    name: "Rollup Explorer: Chunk Details",
    path: "/rollupscan/batch/:batchIndex/chunk/:chunkIndex",
    element: <RollupScanChunkDetail />,
  },
  {
    name: "Rollup Explorer: Block Details",
    path: "/rollupscan/batch/:batchIndex/blocks",
    element: <RollupScanBlock />,
  },
  {
    name: "Rollup Explorer: Block Details",
    path: "/rollupscan/batch/:batchIndex/chunk/:chunkIndex/blocks",
    element: <RollupScanBlock />,
  },
  {
    name: "Scroll Origins NFT",
    path: "/developer-nft",
    element: <DeveloperNFT />,
  },
  {
    name: "Scroll Origins NFT",
    path: "/developer-nft/mint",
    element: <MintNFT />,
  },
  {
    name: "Scroll Sticker Vote",
    path: "/sticker-vote",
    element: <StickerVote />,
    description: "Vote for your favourite sticker designs.",
  },
  {
    name: "Scroll Sticker Winners",
    path: "/sticker-winners",
    element: <StickerWinners />,
    description: "Congratulations to the winners of the sticker contest.",
  },
  {
    name: "Scroll Sessions",
    path: "/sessions",
    element: <Sessions />,
    description: "Receive Marks for your engagement with Scroll. Join Sessions now!",
  },
  {
    name: "Scroll Sessions Terms of Use",
    path: "/sessions-terms-of-use",
    element: <SessionsTerms />,
  },
  {
    name: "Scroll Sessions Restricted",
    path: "/sessions-restricted",
    element: <SessionsRestricted />,
  },
]

const routes = isSepolia ? sepoliaRoutes : mainnetRoutes

export default routes
