import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Web3Provider from "@/contexts/Web3ContextProvider"
import ScrollToTop from "@/hooks/useScrollToTop"
import { Route, Routes } from "react-router-dom"
import AppWrapper from "./contexts"
import Bridge from "./pages/bridge"
import Faucet from "./pages/faucet"
import AddNetwork from "./pages/faucet/add-network"
import Home from "./pages/home"
import RollupScanBatch from "./pages/rollup/batch"
import RollupScanBlock from "./pages/rollup/block"
import RollupScan from "./pages/rollup/index"
import Swap from "./pages/swap"

function App() {
  return (
    <div className="App bg-white min-h-[100vh]">
      <Web3Provider>
        <AppWrapper>
          <ScrollToTop>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/faucet" element={<Faucet />} />
              <Route path="/bridge" element={<Bridge />} />
              <Route
                path="/faucet/add-network"
                element={<AddNetwork />}
              />
              <Route path="/swap" element={<Swap />} />
              <Route path="/rollupscan" element={<RollupScan />} />
              <Route
                path="/rollupscan/batch/:batchIndex"
                element={<RollupScanBatch />}
              />
              <Route
                path="/rollupscan/block/:batchIndex"
                element={<RollupScanBlock />}
              />
            </Routes>
            <Footer />
          </ScrollToTop>
        </AppWrapper>
      </Web3Provider>
    </div>
  );
}

export default App;
