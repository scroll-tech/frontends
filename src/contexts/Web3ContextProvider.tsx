/* eslint-disable */
// import Onboard from 'bnc-onboard';
import { ReactNode } from "react";
import {
  Web3OnboardProvider,
  init,
  useConnectWallet,
  useSetChain,
  useWallets,
} from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import walletConnectModule from "@web3-onboard/walletconnect";
// import {
//   WalletCheckInit,
//   WalletSelectModuleOptions,
// } from 'bnc-onboard/dist/src/interfaces';
import {
  createContext,
  FC,
  useContext,
  useEffect,
  useCallback,
  useMemo,
  useState,
} from "react";
import { ethers, BigNumber, providers } from "ethers";
import LogRocket from "logrocket";

import mmLogo from "@/assets/images/metamask.png";
// import { blocknativeDappid } from 'src/config';
import logger from "@/utils/logger";
import { convertHexadecimal } from "@/utils";
import { loadState, saveState } from "@/utils/localStorage";
// import './onboardStyles.css';
// import { ChainId, ChainSlug } from '@hop-protocol/sdk'

// import { ChainId } from '@/constants';
import { networks } from "@/constants";

// TODO: modularize
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
const walletConnect = walletConnectModule();
// TODO: modularize
// const walletSelectOptions: WalletSelectModuleOptions = {
//   heading: 'Connect Wallet',
//   description: '',
//   wallets: [{ walletName: 'metamask', preferred: true, iconSrc: mmLogo }],
// };

// // TODO: modularize
// const walletChecks: WalletCheckInit[] = [
//   { checkName: 'derivationPath' },
//   { checkName: 'accounts' },
//   { checkName: 'connect' },
//   { checkName: 'network' },
//   { checkName: 'balance' },
// ];

const INFURA_ID = "84842078b09946638c03157f83405213";
const cacheKey = "connectedWallets";

const web3Onboard = init({
  wallets: [injected],
  chains: [
    {
      id: "0x1",
      token: "ETH",
      label: "Ethereum Mainnet",
      rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
    },
  ],
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
    console.log(connectedWallets, "connectedWallets");
    if (!connectedWallets.length) return;

    const connectedWalletsLabelArray = connectedWallets.map(
      ({ label }) => label
    );
    window.localStorage.setItem(
      cacheKey,
      JSON.stringify(connectedWalletsLabelArray)
    );
  }, [connectedWallets]);

  useEffect(() => {
    if (!wallet?.provider) {
      setProvider(undefined);
    } else {
      const ethersProvider = new ethers.providers.Web3Provider(
        wallet.provider,
        "any"
      );
      // if (wallet.provider.enable && !wallet.provider.isMetaMask) {
      //   // needed for WalletConnect and some wallets
      //   await wallet.provider.enable();
      // } else {
      //   try {
      //     await ethersProvider.send('eth_requestAccounts', []);
      //   } catch (error) {
      //     console.error(error);
      //   }
      // }
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
    console.log("connectWallet");
    try {
      localStorage.clear();
      connect();
    } catch (err) {
      logger.error(err);
    }
  };

  const disconnectWallet = () => {
    try {
      localStorage.clear();
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
