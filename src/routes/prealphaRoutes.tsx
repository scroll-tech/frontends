import Bridge from "@/pages/bridge"
import Faucet from "@/pages/faucet"
import AddNetwork from "@/pages/faucet/add-network"
import Home from "@/pages/home"
import RollupScanBatch from "@/pages/rollup/batch"
import RollupScanBlock from "@/pages/rollup/block"
import RollupScan from "@/pages/rollup/index"
import Swap from "@/pages/swap"

const routes = [
  {
    name: "A native zkEVM layer 2 solution for Ethereum",
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
    name: "Rollupscan",
    path: "/rollupscan",
    fullPath: "/prealpha/rollupscan",
    element: <RollupScan />,
  },
  {
    name: "RollupScanBatch",
    path: "/rollupscan/batch/:batchIndex",
    element: <RollupScanBatch />,
  },
  {
    name: "RollupScanBlock",
    path: "/rollupscan/block/:batchIndex",
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
