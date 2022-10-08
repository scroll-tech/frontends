import { Routes, Route } from "react-router-dom";
// import "./App.css";
import { MetaMaskProvider } from "metamask-react";
import { WhitelistContextProvider } from "./hooks/useWhitelist";
import Login from "./pages/login";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import Home from "./pages/home";
import Faucet from "./pages/faucet";
import AddNetwork from "./pages/faucet/add-network";

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
    <div className="App bg-body-bg">
      <MetaMaskProvider>
        <WhitelistContextProvider
          fallback={(hasPermission: boolean, loading: boolean) => (
            <Login hasPermission={hasPermission} loading={loading} />
          )}
        >
          <Header backgroundColor="#fff" activeTab="Faucet" type="path" />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/faucet" element={<Faucet />}></Route>
            <Route path="/faucet/add-network" element={<AddNetwork />}></Route>
          </Routes>
        </WhitelistContextProvider>
      </MetaMaskProvider>
    </div>
  );
}

export default App;
