import { useMetaMask } from "metamask-react";
import { useEffect, useState } from "react";
import { TESTNET_NAME } from "@/constants";
import {
  WalletConnectedStatus,
  WhitelistContextProps,
} from "@/hooks/useWhitelist";

import CircularProgress from "@mui/material/CircularProgress";
import Community from "./community";

const Login = ({ hasPermission, loading }: WhitelistContextProps) => {
  const { status, connect, account, chainId, ethereum } = useMetaMask();
  const [autoConnect, setAutoConnect] = useState(false);
  useEffect(() => {
    // if (ethereum === null) {
    //   setAutoConnect(true);
    // }
    // if (status === WalletConnectedStatus.NOT_CONNECTED && autoConnect) {
    //   connect();
    // }
  }, [ethereum]);

  return (
    <div className="min-h-[100vh] flex flex-col  items-center justify-center">
      <div className="card w-auto mt-[24px] bg-white  px-16 py-32 shadow-md rounded ">
        <p className="text-[26px]  leading-[30px] font-medium text-center">
          Welcome to Scroll’s Pre-Alpha {TESTNET_NAME}
        </p>
        <p className="text-center mx-auto mt-[16px]">
          A native zkEVM Layer 2 solution for Ethereum
        </p>
        <div
          onClick={() => {
            if (status === WalletConnectedStatus.UNAVAILABLE || account) return;
            connect();
          }}
          className={`w-full py-[16px] px-[24px] flex justify-center items-center rounded border  my-[20px] relative ${
            status === WalletConnectedStatus.UNAVAILABLE || account
              ? "cursor-not-allowed  opacity-50"
              : "cursor-pointer hover:shadow-md"
          }`}
        >
          {loading && <CircularProgress className="absolute left-[20px]" />}
          <img className="w-[60px]" src="/imgs/login/metamask-fox.png" />
          <div className="ml-[16px]">
            <p className="text-[18px] font-bold">Connect MetaMask</p>
          </div>
        </div>
        {status === WalletConnectedStatus.UNAVAILABLE && (
          <>
            <p className="text-[14px] text-center">Don't have a wallet?</p>
            <p className="text-center">
              <a
                className="text-[14px] underline"
                target="_blank"
                href="https://metamask.io/download/"
              >
                Download MetaMask here
              </a>
            </p>
          </>
        )}

        {account && !hasPermission && !loading ? (
          <p className="text-center">
            You're not authorized yet. Join our{" "}
            <a href="https://signup.scroll.io/" className="underline">
              waitlist
            </a>{" "}
            now!
          </p>
        ) : null}
      </div>
      <Community />
    </div>
  );
};

export default Login;
