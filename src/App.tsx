import { Routes, Route } from "react-router-dom";
import { MetaMaskProvider } from "metamask-react";
import { WhitelistContextProvider } from "./hooks/useWhitelist";
import AppWrapper from "./contexts";
import Login from "./pages/login";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IframeEmbedding from "@/components/IframeEmbedding";
import Home from "./pages/home";
import Faucet from "./pages/faucet";
import Bridge from "./pages/bridge";
import AddNetwork from "./pages/faucet/add-network";
import RollupScan from "./pages/rollup";
import ScrollToTop from "@/hooks/useScrollToTop";

function App() {
  return (
    <div className="App bg-white min-h-[100vh]">
      <MetaMaskProvider>
        <AppWrapper>
          <WhitelistContextProvider
            fallback={(hasPermission: boolean, loading: boolean) => (
              <Login hasPermission={hasPermission} loading={loading} />
            )}
          >
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
                <Route
                  path="/swap"
                  element={
                    <IframeEmbedding url="https://staging-prealpha.scroll.io/swap" />
                  }
                ></Route>
                <Route path="/rollupscan" element={<RollupScan />}></Route>
              </Routes>
              <Footer />
            </ScrollToTop>
          </WhitelistContextProvider>
        </AppWrapper>
      </MetaMaskProvider>
    </div>
  );
}

export default App;
