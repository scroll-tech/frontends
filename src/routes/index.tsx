// import Bridge from "@/pages/bridge"
import Bridge from "@/pages/new-bridge"
import BridgeFAQ from "@/pages/new-bridge/FAQ"
import RollupScanBatch from "@/pages/rollup/batch"
import RollupScanBlock from "@/pages/rollup/block"
import RollupScanChunk from "@/pages/rollup/chunk"
import RollupScanChunkDetail from "@/pages/rollup/chunk/detail"
import RollupScan from "@/pages/rollup/index"

const routes = [
  {
    name: "Bridge",
    path: "/bridge",
    fullPath: "/bridge",
    element: <Bridge />,
  },
  {
    name: "Bridge FAQ",
    path: "/bridge/faq",
    fullPath: "/bridge/faq",
    element: <BridgeFAQ />,
  },
  {
    name: "Rollup Explorer",
    path: "/rollupscan",
    fullPath: "/rollupscan",
    element: <RollupScan />,
  },
  {
    name: "Rollup Explorer: Batch Details",
    path: "/rollupscan/batch/:batchIndex",
    fullPath: "/rollupscan/batch/:batchIndex",
    element: <RollupScanBatch />,
  },
  {
    name: "Rollup Explorer: Chunk List",
    path: "/rollupscan/batch/:batchIndex/chunks",
    fullPath: "/rollupscan/batch/:batchIndex/chunks",
    element: <RollupScanChunk />,
  },
  {
    name: "Rollup Explorer: Chunk Details",
    path: "/rollupscan/batch/:batchIndex/chunk/:chunkIndex",
    fullPath: "/rollupscan/batch/:batchIndex/chunk/:chunkIndex",
    element: <RollupScanChunkDetail />,
  },
  {
    name: "Rollup Explorer: Block Details",
    path: "/rollupscan/batch/:batchIndex/blocks",
    fullPath: "/rollupscan/batch/:batchIndex/blocks",
    element: <RollupScanBlock />,
  },
  {
    name: "Rollup Explorer: Block Details",
    path: "/rollupscan/batch/:batchIndex/chunk/:chunkIndex/blocks",
    fullPath: "/rollupscan/batch/:batchIndex/chunk/:chunkIndex/blocks",
    element: <RollupScanBlock />,
  },
]

export default routes
