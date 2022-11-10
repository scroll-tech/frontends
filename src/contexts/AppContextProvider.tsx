import {
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
} from "react";
import { JsonRpcProvider } from "@ethersproject/providers";
import { ethers, providers } from "ethers";
import { ChainId, RPCUrl, GatewayRouterProxyAddr } from "@/constants";
import { networks } from "@/constants/networks";
import { useWeb3Context } from "@/contexts/Web3ContextProvider";
import L1_GATEWAY_ROUTER_PROXY_ABI from "@/assets/abis/L1_GATEWAY_ROUTER_PROXY_ADDR.json";
import L2_GATEWAY_ROUTER_PROXY_ABI from "@/assets/abis/L2_GATEWAY_ROUTER_PROXY_ADDR.json";
import useTxHistory, { TxHistory } from "@/hooks/useTxHistory";

type AppContextProps = {
  networks: any[];
  networksAndSigners: any;
  txHistory: TxHistory;
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

const AppContextProvider = ({ children }: any) => {
  const { provider, address, connectedNetworkId } = useWeb3Context();

  const [networksAndSigners, setNetworksAndSigners] = useState({
    [ChainId.SCROLL_LAYER_1]: {},
    [ChainId.SCROLL_LAYER_2]: {},
  });

  const txHistory = useTxHistory(networksAndSigners);

  const update = async (
    web3Provider: providers.Web3Provider,
    address: string
  ) => {
    const { chainId } = await web3Provider.getNetwork();

    let l1signer, l2signer, l1Gateway, l2Gateway, l1Provider, l2Provider;
    if (chainId === ChainId.SCROLL_LAYER_1) {
      l1Provider = web3Provider;
      l2Provider = await new JsonRpcProvider(RPCUrl.SCROLL_LAYER_2);
      l1signer = await web3Provider.getSigner(0);
      l2signer = await l2Provider.getSigner(address);
      l1Gateway = new ethers.Contract(
        GatewayRouterProxyAddr[ChainId.SCROLL_LAYER_1],
        L1_GATEWAY_ROUTER_PROXY_ABI,
        l1signer
      );
    } else {
      l1Provider = await new JsonRpcProvider(RPCUrl.SCROLL_LAYER_1);
      l2Provider = web3Provider;
      l1signer = await l1Provider.getSigner(address);
      l2signer = await web3Provider.getSigner(0);
      l2Gateway = new ethers.Contract(
        GatewayRouterProxyAddr[ChainId.SCROLL_LAYER_2],
        L2_GATEWAY_ROUTER_PROXY_ABI,
        l2signer
      );
    }

    setNetworksAndSigners({
      [ChainId.SCROLL_LAYER_1]: {
        network: networks[0],
        provider: l1Provider,
        signer: l1signer,
        gateway: l1Gateway,
      },
      [ChainId.SCROLL_LAYER_2]: {
        network: networks[1],
        provider: l2Provider,
        signer: l2signer,
        gateway: l2Gateway,
      },
    });
  };

  useEffect(() => {
    if (provider && address) {
      update(provider, address.toString());
    }
  }, [provider, address, connectedNetworkId]);

  return (
    <AppContext.Provider
      value={{
        networks,
        networksAndSigners,
        txHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp() {
  const ctx = useContext(AppContext);
  if (ctx === undefined) {
    throw new Error("useApp must be used within AppProvider");
  }
  return ctx;
}

export default AppContextProvider;
