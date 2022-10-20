import { Routes, Route } from "react-router-dom";
// import "./App.css";
import { MetaMaskProvider } from "metamask-react";
import { WhitelistContextProvider } from "./hooks/useWhitelist";
import AppWrapper from "./contexts";
import Login from "./pages/login";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import Home from "./pages/home";
import Faucet from "./pages/faucet";
import AddNetwork from "./pages/faucet/add-network";
import RollupScan from "./pages/rollup";

const DOMAIN_STAGING = "staging-prealpha.scroll.io";

function App() {
  const [headerType, setHeaderType] = useState("path");

  useEffect(() => {
    const pathHeaderDomains = [DOMAIN_STAGING, "localhost"];
    const isPath = pathHeaderDomains.some(
      (path) => ~window.location.href.indexOf(path)
    );
    if (isPath) {
      setHeaderType("path");
    } else {
      setHeaderType("subdomain");
    }
  }, []);

  return (
    <div className="App bg-white min-h-[100vh]">
      <MetaMaskProvider>
        <AppWrapper>
          <WhitelistContextProvider
            fallback={(hasPermission: boolean, loading: boolean) => (
              <Login hasPermission={hasPermission} loading={loading} />
            )}
          >
            <Header />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/faucet" element={<Faucet />}></Route>
              <Route
                path="/faucet/add-network"
                element={<AddNetwork />}
              ></Route>
              <Route path="/rollupscan" element={<RollupScan />}></Route>
            </Routes>
            <Footer />
          </WhitelistContextProvider>
        </AppWrapper>
      </MetaMaskProvider>
    </div>
  );
}

export default App;
