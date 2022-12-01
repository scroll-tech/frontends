import { Routes, Route } from "react-router-dom";
import Web3Provider from "@/contexts/Web3ContextProvider";
import AppWrapper from "./contexts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "./pages/home";
import Faucet from "./pages/faucet";
import Bridge from "./pages/bridge";
import AddNetwork from "./pages/faucet/add-network";
import RollupScan from "./pages/rollup/index";
import Swap from "./pages/swap";
import RollupScanBatch from "./pages/rollup/batch";
import RollupScanBlock from "./pages/rollup/block";
import ScrollToTop from "@/hooks/useScrollToTop";

function App() {
  return (
    <div className="App bg-white min-h-[100vh]">
      <Web3Provider>
        <AppWrapper>
          <ScrollToTop>
            <Header />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/faucet" element={<Faucet />}></Route>
              <Route path="/bridge" element={<Bridge />}></Route>
              <Route
                path="/faucet/add-network"
                element={<AddNetwork />}
              ></Route>
              <Route path="/swap" element={<Swap />}></Route>
              <Route path="/rollupscan" element={<RollupScan />}></Route>
              <Route
                path="/rollupscan/batch/:batchIndex"
                element={<RollupScanBatch />}
              ></Route>
              <Route
                path="/rollupscan/block/:batchIndex"
                element={<RollupScanBlock />}
              ></Route>
            </Routes>
            <Footer />
          </ScrollToTop>
        </AppWrapper>
      </Web3Provider>
    </div>
  );
}

export default App;
