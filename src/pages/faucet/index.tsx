import { getAddress } from "@ethersproject/address"
import dayjs from "dayjs"
import React, { useEffect, useMemo, useState } from "react"
import Countdown from "react-countdown"
import { Link as RouteLink } from "react-router-dom"
import useStorage from "squirrel-gill"

import { Button, Alert as MuiAlert, Snackbar, Typography } from "@mui/material"

import { claimUrl, fetchInfoUrl } from "@/apis/faucet"
import Link from "@/components/Link"
import TextButton from "@/components/TextButton"
import { Addresses, ChainId, TESTNET_NAME } from "@/constants"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import { isProduction, requireEnv, truncateAddress, truncateHash } from "@/utils"

import WithHCaptcha from "./components/WithHCaptcha"
import Faq from "./components/faq"
import "./index.less"

const L1_SCAN_URL = requireEnv("REACT_APP_EXTERNAL_EXPLORER_URI_L1")

const ETH_SYMBOL = requireEnv("REACT_APP_ETH_SYMBOL")
const USDC_SYMBOL = requireEnv("REACT_APP_USDC_SYMBOL")

export default function Home() {
  const { walletCurrentAddress, chainId, connectWallet } = useWeb3Context()
  const [canClaimFrom, setCanClaimFrom] = useStorage(localStorage, "canClaimFrom")
  const [TxHashData, setTxHashData] = useStorage(localStorage, "TxHashData")

  const [loading, setLoading] = useState(false)
  const [open, setOpen] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState("")

  const [faucetInfo, setFaucetInfo] = useState({
    account: "0x0000000000000000000000000000000000000000",
    network: "Testnet",
    payoutEth: 1,
    payoutUsdc: 100,
  })

  const networkStatus = useMemo(() => {
    if (chainId === ChainId.SCROLL_LAYER_1) {
      return 1
    } else if (chainId) {
      return 2
    }
    return 3
  }, [chainId])

  useEffect(() => {
    async function fetchInfo() {
      const res = await fetch(fetchInfoUrl)
      const info = await res.json()
      setFaucetInfo(info)
      document.title = `Scroll ${faucetInfo.network} Faucet`
    }
    fetchInfo()
  }, [])

  const switchNetwork = async () => {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [Addresses[ChainId.SCROLL_LAYER_1].autoconnect],
    })
  }

  const handleRequest = async captchaToken => {
    if (loading) return

    let formData = new FormData()
    formData.append("address", getAddress(walletCurrentAddress as string))
    formData.append("h-captcha-response", captchaToken)
    setLoading(true)
    scrollRequest(claimUrl, {
      method: "POST",
      body: formData,
    })
      .then(data => {
        const canClaimFrom = isProduction ? dayjs().add(1, "day").format("YYYY-MM-DD H:m:s") : dayjs().add(3, "minute").format("YYYY-MM-DD H:m:s")
        setCanClaimFrom(canClaimFrom)
        setTxHashData(data)
      })
      .catch(err => {
        const { message, status } = err
        if (!message && status === 429) {
          setErrorMessage("hCaptcha: too many requests!")
          setOpen(true)
          return
        }
        //get hms
        const re = /((\d+)h)?((\d+)m)?((\d+)s)/i
        const rateLimitDuration: any = message.match(re)
        if (rateLimitDuration) {
          const canClaimFrom = dayjs()
            .add(rateLimitDuration[2] ?? 0, "h")
            .add(rateLimitDuration[4] ?? 0, "m")
            .add(rateLimitDuration[6], "s")
            .format("YYYY-MM-DD H:m:s")
          setCanClaimFrom(canClaimFrom)
        }
        setErrorMessage(message)
        setOpen(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleClose = () => {
    setOpen(false)
    setErrorMessage("")
  }

  const renderer = ({ hours, minutes, seconds, completed }: any) => {
    if (completed) {
      // Render a completed state
      return <WithHCaptcha requestLoading={loading} onRequest={handleRequest} />
    } else {
      // Render a countdown
      return (
        <div className="w-full">
          <button className="mx-auto text-[14px] cursor-not-allowed py-[14px] px-[10px] flex justify-center items-center bg-[#3333331a] rounded-[6px]  text-[#333] mt-[30px] md:mt-[50px] md:text-base md:py-[18px] md:px-[28px] md:text-[16px] ">
            <img alt="warning logo" className="w-[23px] mr-[12px] md:mr-[15px]" src="/imgs/faucet/info.png" />
            <strong className="mr-[4px]">
              Wait {hours}h{minutes}m{seconds}s
            </strong>
            before requesting tokens.
          </button>
          {TxHashData ? (
            <div className="w-max mx-auto border rounded-[10px] border-[#C9CBCE] mt-[37px]">
              <table>
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
                      <Typography
                        component="span"
                        sx={{
                          fontWeight: 500,
                          color: "tagSuccess.main",
                          bgcolor: "tagSuccess.light",
                          fontSize: ["1.4rem", "1.6rem"],
                          py: ["4px", "9px"],
                          px: ["1.6rem", "3rem"],
                          borderRadius: "6.4rem",
                        }}
                      >
                        Success
                      </Typography>
                    </td>
                    <td>
                      <span className="text-[14px] md:text-[16px]">
                        {faucetInfo.payoutEth} {ETH_SYMBOL}
                      </span>
                    </td>
                    <td>
                      <Link href={`${L1_SCAN_URL}/tx/${TxHashData.eth_tx_hash}`} external sx={{ fontSize: ["1.4rem", "1.6rem"], mr: "3rem" }}>
                        {truncateHash(TxHashData.eth_tx_hash)}
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Typography
                        component="span"
                        sx={{
                          fontWeight: 500,
                          color: "tagSuccess.main",
                          bgcolor: "tagSuccess.light",
                          fontSize: ["1.4rem", "1.6rem"],
                          py: ["4px", "9px"],
                          px: ["1.6rem", "3rem"],
                          borderRadius: "6.4rem",
                        }}
                      >
                        Success
                      </Typography>
                    </td>
                    <td>
                      <span className="text-[14px] md:text-[16px]">
                        {faucetInfo.payoutUsdc} {USDC_SYMBOL}
                      </span>
                    </td>
                    <td>
                      <Link href={`${L1_SCAN_URL}/tx/${TxHashData.erc20_tx_hash}`} external sx={{ fontSize: ["1.4rem", "1.6rem"], mr: "3rem" }}>
                        {truncateHash(TxHashData.erc20_tx_hash)}
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      )
    }
  }

  return (
    <>
      <main className="px-[16px] faucet-app">
        <div className="w-full flex items-center flex-col mb-[120px] md:h-[630px]">
          <div className=" mt-[30px] mb-[80px] text-right max-w-[1268px] px-[8px] w-full">
            {walletCurrentAddress ? (
              <Button className="w-[178px] p-[unset] pointer-events-none">{truncateAddress(walletCurrentAddress as string)}</Button>
            ) : (
              <Button onClick={connectWallet}>Connect Wallet</Button>
            )}
          </div>
          <Typography variant="h3" align="center" sx={{ marginBottom: "1.6rem" }}>
            Request Testnet Scroll Tokens
          </Typography>
          <Typography
            color="textSecondary"
            align="center"
            sx={{
              maxWidth: "56rem",
              mx: "2.4rem",
            }}
          >
            Funds you receive through the Scroll faucet are not real funds. Request tokens every 24h and receive {faucetInfo.payoutEth} {ETH_SYMBOL} &{" "}
            {faucetInfo.payoutUsdc} {USDC_SYMBOL} per request.
          </Typography>
          {networkStatus === 1 ? (
            <Countdown key={canClaimFrom} date={canClaimFrom || dayjs().format("YYYY-MM-DD H:m:s")} renderer={renderer} />
          ) : (
            <>
              <div className="bg-[#FFF8CB] py-[18px] px-[34px] mx-[24px] rounded-[10px] max-w-[480px] text-center my-[28px] md:py-[24px] md:px-[32px]">
                <img alt="warning logo" className="w-[26px] mb-[8px] mx-auto" src="/imgs/faucet/warning.svg" />
                {networkStatus === 2 ? (
                  <p className="text-[14px]  max-w-[400px] leading-[26px] text-[#C14800] md:text-[16px]">
                    Your wallet is connected to an unsupported network.{" "}
                    <TextButton onClick={switchNetwork}>Click here to switch to Scroll L1 {TESTNET_NAME}.</TextButton>
                  </p>
                ) : (
                  <p className="text-[14px]  max-w-[400px] leading-[26px] text-[#C14800] md:text-[16px]">
                    <TextButton onClick={connectWallet}>Click here to connect wallet.</TextButton>{" "}
                  </p>
                )}
              </div>
              {networkStatus === 2 && (
                <div className="flex flex-col items-center text-center md:flex-row">
                  <Typography color="textSecondary" sx={{ fontSize: ["1.4rem", "1.6rem"], mb: ["0.6rem", 0], mr: [0, "0.6rem"] }}>
                    Scroll L1 and L2 not added yet?
                  </Typography>
                  <Link component={RouteLink} to="add-network" sx={{ fontSize: ["1.4rem", "1.6rem"] }}>
                    Add Scroll L1 {TESTNET_NAME} and L2 {TESTNET_NAME}
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {errorMessage}
          </MuiAlert>
        </Snackbar>
        <Faq />
      </main>
    </>
  )
}
