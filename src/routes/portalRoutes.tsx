import Bridge from "@/pages/bridge"
import Ecosystem from "@/pages/ecosystem"
import Home from "@/pages/home"
import NFTBridge from "@/pages/nftBridge"
import NFTFaucet from "@/pages/nftFaucet"
import RollupScanBatch from "@/pages/rollup/batch"
import RollupScanBlock from "@/pages/rollup/block"
import RollupScan from "@/pages/rollup/index"
import { isProduction } from "@/utils"

const routes = [
  {
    name: "Portal",
    path: "/",
    fullPath: "/alpha",
    element: <Home />,
  },
  ...(isProduction
    ? []
    : [
        {
          name: "Faucet",
          path: "/faucet/nft",
          fullPath: "/alpha/faucet/nft",
          element: <NFTFaucet />,
        },
      ]),

  {
    name: "Bridge",
    path: "/bridge",
    fullPath: "/alpha/bridge",
    element: <Bridge />,
  },
  ...(isProduction
    ? []
    : [
        {
          name: "NFTBridge",
          path: "/bridge/nft",
          fullPath: "/alpha/bridge/nft",
          element: <NFTBridge />,
        },
      ]),

  {
    name: "Ecosystem",
    path: "/ecosystem",
    fullPath: "/alpha/ecosystem",
    element: <Ecosystem />,
  },
  {
    name: "Rollup Explorer",
    path: "/rollupscan",
    fullPath: "/alpha/rollupscan",
    element: <RollupScan />,
  },
  {
    name: "Rollup Explorer: Batch Details",
    path: "/rollupscan/batch/:batchIndex",
    fullPath: "/alpha/rollupscan/batch/:batchIndex",
    element: <RollupScanBatch />,
  },
  {
    name: "Rollup Explorer: Block Details",
    path: "/rollupscan/batch/:batchIndex/blocks",
    fullPath: "/alpha/rollupscan/batch/:batchIndex/blocks",
    element: <RollupScanBlock />,
  },
]

export default routes
