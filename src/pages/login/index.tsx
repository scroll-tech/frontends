import { useMetaMask } from "metamask-react";
import { useEffect, useState } from "react";
import { TESTNET_NAME } from "@/constants";
import {
  WalletConnectedStatus,
  WhitelistContextProps,
} from "@/hooks/useWhitelist";
import { Box, Link, Button, Stack, Fade, Container } from "@mui/material";

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
    <main className="h-[100vh] flex justify-center items-center flex-col px-[16px]">
      <img
        alt="logo"
        className="w-[160px] mb-[26px]"
        src="/imgs/login/logo_with_text.png"
      />
      <p className="text-charcoal text-center text-[28px]  leading-[32px] mb-[16px] font-display md:text-[34px]  md:leading-[40px]">
        Welcome to Scroll’s Pre-Apha Testnet
      </p>
      <p className="max-w-[380px] text-center text-[16px] text-[#595959] leading-[26px] ">
        Scroll is a zkEVM-based zkRollup on Ethereum which enables native
        compatibility for existing Ethereum applications and tools.
      </p>
      {account ? (
        <div className="bg-[#FFF8CB] rounded-[10px] py-[18px] px-[28px] max-w-[390px] text-center mt-[24px] md:py-[24px] md:px-[32px]">
          <img
            alt="warning logo"
            className="w-[26px] mb-[8px] mx-auto"
            src="/imgs/login/warning.svg"
          />
          <p className="text-[16px] max-w-[375px] leading-[26px] text-[#C14800]">
            Your wallet address is not whitelisted yet.{" "}
            <a
              href="https://signup.scroll.io/"
              className="underline font-semibold"
            >
              Sign Up
            </a>{" "}
            to Scroll testnet.
          </p>
        </div>
      ) : (
        <>
          {status === WalletConnectedStatus.UNAVAILABLE ? (
            <Button
              onClick={() => {
                window.location.href = "https://metamask.io/download/";
              }}
              color="primary"
              variant="contained"
              sx={{ marginTop: "25px" }}
            >
              Download MetaMask here
            </Button>
          ) : (
            <Button
              onClick={() => connect()}
              color="primary"
              variant="contained"
              sx={{ marginTop: "25px" }}
            >
              Connect Metamask Wallet
            </Button>
          )}

          <p className=" mt-[18px] text-[#595959]">
            Address not whitelisted yet?{" "}
            <a
              href="https://signup.scroll.io/"
              className="text-[#00A6F2] font-semibold"
            >
              Sign Up
            </a>
          </p>
        </>
      )}

      {/* <Loading /> */}
    </main>
  );
};

export default Login;
