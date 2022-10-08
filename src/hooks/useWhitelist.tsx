import React, {
  useCallback,
  useEffect,
  useState,
  useContext,
  createContext,
} from "react";
import { useMetaMask } from "metamask-react";
import LC from "leancloud-storage";

export const WalletConnectedStatus = {
  INITIALIZING: "initializing",
  UNAVAILABLE: "unavailable",
  NOT_CONNECTED: "notConnected",
  CONNECTING: "connecting",
  CONNECTED: "connected",
};

export interface WhitelistContextProps {
  hasPermission: boolean;
  loading: boolean;
}
interface Props {
  fallback: (hasPermission: boolean, loading: boolean) => React.ReactElement;
  children: React.ReactNode;
}

const WhitelistContext = createContext<WhitelistContextProps>({
  hasPermission: false,
  loading: false,
});

export const WhitelistContextProvider = (props: Props) => {
  const { status, connect, account, chainId, ethereum } = useMetaMask();
  const [hasPermission, setHasPermission] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    LC.init({
      appId: "hvIeDclG2pt2nzAdbKWM0qms-MdYXbMMI",
      appKey: "lKObgvpdxLT2JK839oxSM4Fn",
      serverURL: "https://leancloud.scroll.io",
      serverURLs: "https://leancloud.scroll.io",
    });
  }, []);

  useEffect(() => {
    if (status === WalletConnectedStatus.CONNECTED && account) {
      setLoading(true);
      const query = new LC.Query(process.env.REACT_APP_LEANCLOUD_DB as string);
      query.equalTo("walletAddress", account.toString().toLowerCase());
      query
        .find()
        .then((res) => {
          if (res.length) {
            setHasPermission(true);
          } else {
            setHasPermission(false);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setHasPermission(false);
    }
  }, [status, account]);
  if (!hasPermission) {
    return props.fallback(hasPermission, loading);
  }

  return (
    <WhitelistContext.Provider value={{ hasPermission, loading }}>
      {props.children}
    </WhitelistContext.Provider>
  );
};

export const useFaucet = () => useContext(WhitelistContext);
