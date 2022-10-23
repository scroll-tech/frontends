import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useState,
} from "react";
import {
  init,
  useConnectWallet,
  useSetChain,
  useWallets,
} from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import { ethers, BigNumber, providers } from "ethers";
import LogRocket from "logrocket";

import logger from "@/utils/logger";
import { convertHexadecimal, toHexadecimal } from "@/utils";
import { loadState, saveState, clearState } from "@/utils/localStorage";
import { networks } from "@/constants";

type Props = {
  onboard: any;
  provider: providers.Web3Provider | undefined;
  address: any;
  balance?: BigNumber;
  connectedNetworkId: number | undefined;
  connectWallet: () => void;
  disconnectWallet: () => void;
  walletName: string | undefined;
  checkConnectedNetworkId: (networkId: number) => Promise<boolean>;
};

const Web3Context = createContext<Props | undefined>(undefined);

const injected = injectedModule();

// const INFURA_ID = "84842078b09946638c03157f83405213";
const cacheKey = "connectedWallets";

const web3Onboard = init({
  wallets: [injected],
  chains: networks.map(
    ({ networkId, nativeTokenSymbol, name, rpcUrl, imageUrl }) => ({
      id: toHexadecimal(networkId),
      token: nativeTokenSymbol as string,
      label: name,
      rpcUrl: rpcUrl as string,
    })
  ),
  appMetadata: {
    name: "Scroll",
    icon: "https://scroll.io/img/logo.png",
    description: "Scroll Prealpha",
  },
  // i18n: {
  //   en: {
  //     connect: {
  //       selectingWallet: {
  //         header: "select Wallet",
  //       },
  //     },
  //   },
  // },
  connect: {
    showSidebar: false,
  },
  accountCenter: {
    desktop: {
      enabled: false,
    },
    mobile: {
      enabled: false,
    },
  },
});

const Web3ContextProvider = ({ children }: any) => {
  const [provider, setProvider] = useState<
    providers.Web3Provider | undefined
  >();
  const [onboard, setOnboard] = useState<any>(null);

  const [{ wallet }, connect, disconnect] = useConnectWallet();
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain();
  const connectedWallets = useWallets();

  useEffect(() => {
    setOnboard(web3Onboard);
  }, []);

  useEffect(() => {
    if (!connectedWallets.length) return;

    const connectedWalletsLabelArray = connectedWallets.map(
      ({ label }) => label
    );
    saveState(cacheKey, connectedWalletsLabelArray);
  }, [connectedWallets]);

  useEffect(() => {
    if (!wallet?.provider) {
      setProvider(undefined);
    } else {
      const ethersProvider = new ethers.providers.Web3Provider(
        wallet.provider,
        "any"
      );
      setProvider(ethersProvider);
    }

    if (wallet?.accounts[0]?.address) {
      LogRocket.identify(wallet.accounts[0].address, {
        platform: "Scroll Bridge",
      });
    }
  }, [wallet]);

  useEffect(() => {
    const previouslyConnectedWallets = loadState(cacheKey);
    if (previouslyConnectedWallets?.length) {
      const setWalletFromLocalStorage = async () => {
        await connect({ autoSelect: previouslyConnectedWallets[0] });
      };
      setWalletFromLocalStorage();
    }
  }, [onboard, connect]);

  const connectWallet = () => {
    try {
      clearState();
      connect();
    } catch (err) {
      logger.error(err);
    }
  };

  const disconnectWallet = () => {
    try {
      clearState();
      wallet && disconnect(wallet);
    } catch (error) {
      logger.error(error);
    }
  };

  const checkConnectedNetworkId = useCallback(
    async (networkId: number): Promise<boolean> => {
      if (
        connectedChain &&
        networkId === convertHexadecimal(connectedChain.id)
      ) {
        return true;
      }
      return false;
    },
    [connectedChain]
  );

  return (
    <Web3Context.Provider
      value={{
        onboard,
        provider,
        address: wallet?.accounts[0]?.address,
        connectedNetworkId: connectedChain
          ? convertHexadecimal(connectedChain.id)
          : undefined,
        connectWallet,
        disconnectWallet,
        walletName: wallet?.label,
        checkConnectedNetworkId,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export function useWeb3Context() {
  const ctx = useContext(Web3Context);
  if (ctx === undefined) {
    throw new Error("useApp must be used within Web3Provider");
  }
  return ctx;
}

export default Web3ContextProvider;
