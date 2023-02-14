import Bridge from "@/pages/bridge"
import Faucet from "@/pages/faucet"
import AddNetwork from "@/pages/faucet/add-network"
import Home from "@/pages/home"
import NFTFaucet from "@/pages/nftFaucet"
import RollupScanBatch from "@/pages/rollup/batch"
import RollupScanBlock from "@/pages/rollup/block"
import RollupScan from "@/pages/rollup/index"
import Swap from "@/pages/swap"
import { isProduction } from "@/utils"

const routes = [
  {
    name: "Portal",
    path: "/",
    fullPath: "/prealpha/",
    element: <Home />,
  },
  {
    name: "Faucet",
    path: "/faucet",
    fullPath: "/prealpha/faucet",
    element: <Faucet />,
  },
  ...(isProduction
    ? []
    : [
        {
          name: "Faucet",
          path: "/faucet/nft",
          fullPath: "/prealpha/faucet/nft",
          element: <NFTFaucet />,
        },
      ]),

  {
    name: "Bridge",
    path: "/bridge",
    fullPath: "/prealpha/bridge",
    element: <Bridge />,
  },
  {
    name: "Swap",
    path: "/swap",
    fullPath: "/prealpha/swap",
    element: <Swap />,
  },

  {
    name: "Rollup Explorer",
    path: "/rollupscan",
    fullPath: "/prealpha/rollupscan",
    element: <RollupScan />,
  },
  {
    name: "RollupScanBatch",
    path: "/rollupscan/batch/:batchIndex",
    fullPath: "/prealpha/rollupscan/batch/:batchIndex",
    element: <RollupScanBatch />,
  },
  {
    name: "RollupScanBlock",
    path: "/rollupscan/batch/:batchIndex/blocks",
    fullPath: "/prealpha/rollupscan/batch/:batchIndex/blocks",
    element: <RollupScanBlock />,
  },

  {
    name: "AddNetwork",
    path: "/faucet/add-network",
    fullPath: "/prealpha/faucet/add-network",
    element: <AddNetwork />,
  },
]

export default routes
