import { Addresses, ChainId, TESTNET_NAME } from "@/constants";
import React, { useEffect, useMemo, useState } from "react";
import { useWeb3Context } from "@/contexts/Web3ContextProvider";
import Countdown from "react-countdown";
import useStorage from "squirrel-gill";
import dayjs from "dayjs";
import Faq from "./components/faq";
import { Link, useSearchParams } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import TextButton from "@/components/TextButton";
import Button from "@/components/Button/Button";
import { getAddress } from "@ethersproject/address";
import WithTwitter from "./components/WithTwitter";
import { loginTwitter } from "./helper";
import {
  isProduction,
  requireEnv,
  truncateAddress,
  truncateHash,
} from "@/utils";
import "./index.less";
// import useSWR from 'swr'

const CAN_CLAIM_FROM = "canClaimFrom",
  TX_HASH_DATA = "TxHashData";

const L1_SCAN_URL = requireEnv("REACT_APP_EXTERNAL_EXPLORER_URI_L1");

export default function Home() {
  const {
    walletCurrentAddress,
    chainId,
    walletName,
    connectWallet,
  } = useWeb3Context();
  const [user, setUser] = useStorage(localStorage, "user");

  const [searchParams, setSearchParams] = useSearchParams();
  const [authorizationCode, setAuthorizationCode] = useState("");

  const [loginLoading, setLoginLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [canClaimFrom, setCanClaimFrom] = useState(
    localStorage.getItem(CAN_CLAIM_FROM) || Date.now()
  );

  const [faucetInfo, setFaucetInfo] = useState({
    account: "0x0000000000000000000000000000000000000000",
    network: "Testnet",
    payoutEth: 1,
    payoutUsdc: 100,
    ethSymbol: "TSETH",
    usdcSymbol: "TSUSDC",
  });

  const [TxHashData, setTxHashData] = useState(
    localStorage.getItem(TX_HASH_DATA) &&
      JSON.parse(localStorage.getItem(TX_HASH_DATA) as string)
  );

  const networkStatus = useMemo(() => {
    if (chainId === ChainId.SCROLL_LAYER_1) {
      return 1;
    } else if (chainId) {
      return 2;
    }
    return 3;
  }, [chainId]);

  useEffect(() => {
    const queryCode = searchParams.get("code");
    if (queryCode) {
      setAuthorizationCode(queryCode);
      setSearchParams({});
      return;
    }
    if (authorizationCode) {
      setLoginLoading(true);
      loginTwitter(authorizationCode)
        .then(({ username, token }) => {
          setUser({ name: username, token });
          setAuthorizationCode("");
        })
        .catch((err) => {
          setOpen(true);
          setErrorMessage(err.message);
        })
        .finally(() => {
          setLoginLoading(false);
        });
    }
  }, [searchParams, authorizationCode]);

  useEffect(() => {
    async function fetchInfo() {
      const res = await fetch(
        process.env.REACT_APP_FAUCET_BASE_API_URL + "/api/info"
      );
      const info = await res.json();
      setFaucetInfo(info);
      document.title = `Scroll ${faucetInfo.network} Faucet`;
    }
    fetchInfo();
  }, []);

  const switchNetwork = async () => {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [Addresses[ChainId.SCROLL_LAYER_1].autoconnect],
    });
  };

  const handleRequest = async () => {
    if (loading) return;

    let formData = new FormData();
    formData.append("address", getAddress(walletCurrentAddress as string));
    formData.append("token", user?.token);
    setLoading(true);
    const res = await fetch(
      process.env.REACT_APP_FAUCET_BASE_API_URL + "/api/claim",
      {
        method: "POST",
        body: formData,
      }
    );
    if (res.ok) {
      const TxHashData = await res.json();
      const canClaimFrom = isProduction
        ? dayjs()
            .add(1, "day")
            .format("YYYY-MM-DD H:m:s")
        : dayjs()
            .add(3, "minute")
            .format("YYYY-MM-DD H:m:s");
      setCanClaimFrom(canClaimFrom);
      setTxHashData(TxHashData);
      const token = res.headers.get("x-token");
      setUser({ ...user, token });
      localStorage.setItem(CAN_CLAIM_FROM, canClaimFrom);
      localStorage.setItem(TX_HASH_DATA, JSON.stringify(TxHashData));
    } else if (res.status === 401) {
      setUser(null);
      setErrorMessage("Login status is invalid, please sign in again");
      setOpen(true);
    } else {
      const token = res.headers.get("x-token");
      if (token) {
        setUser({ ...user, token });
      }
      const message = await res.text();
      //get hms
      const re = /((\d+)h)?((\d+)m)?((\d+)s)/i;
      const rateLimitDuration: any = message.match(re);
      if (rateLimitDuration) {
        const canClaimFrom = dayjs()
          .add(rateLimitDuration[2] ?? 0, "h")
          .add(rateLimitDuration[4], "m")
          .add(rateLimitDuration[6], "s")
          .format("YYYY-MM-DD H:m:s");
        setCanClaimFrom(canClaimFrom);
        localStorage.setItem(CAN_CLAIM_FROM, canClaimFrom);
      }
      setErrorMessage(message);
      setOpen(true);
    }
    setLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
    setErrorMessage("");
  };

  const renderer = ({ hours, minutes, seconds, completed }: any) => {
    if (completed) {
      // Render a completed state
      return (
        <WithTwitter
          loginLoading={loginLoading}
          requestLoading={loading}
          onRequest={handleRequest}
        />
      );
    } else {
      // Render a countdown
      return (
        <div className="w-full max-w-[473px] mx-auto ">
          <button className="mx-auto text-[14px] cursor-not-allowed py-[14px] px-[10px] flex justify-center items-center bg-[#3333331a] rounded-[6px]  text-[#333] mt-[30px] md:mt-[50px] md:text-base md:py-[18px] md:px-[28px] md:text-[16px] ">
            <img
              alt="warning logo"
              className="w-[23px] mr-[12px] md:mr-[15px]"
              src="/imgs/faucet/info.png"
            />
            <strong className="mr-[4px]">
              Wait {hours}h{minutes}m{seconds}s
            </strong>
            before requesting tokens.
          </button>
          {TxHashData ? (
            <div className="border rounded-[10px] border-[#C9CBCE] mt-[37px]">
              <table className="w-full max-w-[473px]">
                <thead className="bg-[#C9CBCE33]">
                  <tr>
                    <td>
                      <p className="td-title">Status</p>
                    </td>
                    <td>
                      <p className="td-title">Amount</p>
                    </td>
                    <td>
                      <p className="td-title">Tx Hash</p>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="font-medium py-[4px] px-[16px] bg-[#07C7761A] text-[14px] text-[#07C776] rounded-[64px] md:py-[9px] md:px-[30px] md:text-[16px]">
                        Success
                      </span>
                    </td>
                    <td>
                      <span className="text-[14px] md:text-[16px]">
                        {faucetInfo.payoutEth}
                        {faucetInfo.ethSymbol}
                      </span>
                    </td>
                    <td>
                      <a
                        className="text-[14px] font-semibold md:text-[16px]  text-[#00A6F2]"
                        href={`${L1_SCAN_URL}/tx/${TxHashData.eth_tx_hash}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {truncateHash(TxHashData.eth_tx_hash)}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="font-medium py-[4px] px-[16px] bg-[#07C7761A] text-[14px] text-[#07C776] rounded-[64px] md:py-[9px] md:px-[30px] md:text-[16px]">
                        Success
                      </span>
                    </td>
                    <td>
                      <span className="text-[14px] md:text-[16px]">
                        {faucetInfo.payoutUsdc}
                        {faucetInfo.usdcSymbol}
                      </span>
                    </td>
                    <td>
                      <a
                        className="text-[14px] font-semibold md:text-[16px] text-[#00A6F2]"
                        href={`${L1_SCAN_URL}/tx/${TxHashData.erc20_tx_hash}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {truncateHash(TxHashData.erc20_tx_hash)}
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      );
    }
  };

  return (
    <>
      <main className="px-[16px] faucet-app">
        <div className="w-full flex items-center flex-col mb-[120px] md:h-[630px]">
          <div className=" mt-[30px] mb-[80px] text-right max-w-[1268px] px-[8px] w-full">
            {walletCurrentAddress ? (
              <button className="w-[178px] h-[50px] text-[#333] border border-[#333] text-base rounded-[6px] cursor-text font-semibold">
                {truncateAddress(walletCurrentAddress as string)}
              </button>
            ) : (
              <Button onClick={connectWallet} variant="outlined">
                Connect Wallet
              </Button>
            )}
          </div>
          <p className="text-[#333] text-center text-[26px]  leading-[32px] mb-[16px] font-display md:text-[34px]  md:leading-[40px] capitalize">
            Request testnet Scroll tokens
          </p>
          <p className="max-w-[560px] text-center mx-[24px] text-[#595959] text-[16px] leading-[26px]">
            Funds you receive through the Scroll faucet are not real funds.
            Request tokens every 24h and receive {faucetInfo.payoutEth}{" "}
            {faucetInfo.ethSymbol} & {faucetInfo.payoutUsdc}
            {faucetInfo.usdcSymbol} per request.
          </p>
          {networkStatus === 1 ? (
            <Countdown
              key={canClaimFrom}
              date={canClaimFrom}
              renderer={renderer}
            />
          ) : (
            <>
              <div className="bg-[#FFF8CB] py-[18px] px-[34px] mx-[24px] rounded-[10px] max-w-[480px] text-center my-[28px] md:py-[24px] md:px-[32px]">
                <img
                  alt="warning logo"
                  className="w-[26px] mb-[8px] mx-auto"
                  src="/imgs/faucet/warning.svg"
                />
                {networkStatus === 2 ? (
                  <p className="text-[14px]  max-w-[400px] leading-[26px] text-[#C14800] md:text-[16px]">
                    Your wallet is connected to an unsupported network.{" "}
                    <TextButton onClick={switchNetwork}>
                      Click here to switch to Scroll L1 {TESTNET_NAME}.
                    </TextButton>
                  </p>
                ) : (
                  <p className="text-[14px]  max-w-[400px] leading-[26px] text-[#C14800] md:text-[16px]">
                    <TextButton onClick={connectWallet}>
                      Click here to connect wallet.
                    </TextButton>{" "}
                  </p>
                )}
              </div>
              <div className="flex flex-col text-[#595959] text-center text-[14px] md:flex-row md:text-[16px]">
                <p className="mb-[6px] md:mr-[6px]">
                  Scroll L1 and L2 not added yet?
                </p>
                <Link to="add-network">
                  <span className="text-[#00A6F2] cursor-pointer font-semibold">
                    Add Scroll L1{TESTNET_NAME} and L2{TESTNET_NAME}
                  </span>
                </Link>
              </div>
            </>
          )}
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </MuiAlert>
        </Snackbar>
        <Faq />
      </main>
    </>
  );
}
