import { BrowserRouter, Route, Routes } from "react-router-dom"

import Documentation from "./Components/Documentation"
import Home from "./Components/Home"
import IframeEmbedding from "./Components/IframeEmbedding"
import Layout from "./Components/Layout"
import NotFound from "./Components/NotFound"
import {
  l1ExplorerUrl,
  l2ExplorerUrl,
  pathL1Explorer,
  pathL2Explorer,
  pathRollupExplorer,
  rollupExplorerUrl,
} from "./Constants"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* TODO: Constant strings for URLs */}
          <Route path="documentation" element={<Documentation />} />
          <Route
            path={pathL1Explorer}
            element={<IframeEmbedding url={l1ExplorerUrl} />}
          />
          <Route
            path={pathL2Explorer}
            element={<IframeEmbedding url={l2ExplorerUrl} />}
          />
          <Route
            path={pathRollupExplorer}
            element={<IframeEmbedding url={rollupExplorerUrl} />}
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
