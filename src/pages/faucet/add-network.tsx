import { useEffect, useState } from "react"
import { Link as RouteLink } from "react-router-dom"

import Link from "@/components/Link"
import { Addresses, ChainId, SiteMap, TESTNET_NAME } from "@/constants"

import "./index.less"

function AddNetwork() {
  const [step, setStep] = useState(ChainId.SCROLL_LAYER_1)
  const [faucetInfo, setFaucetInfo] = useState({
    account: "0x0000000000000000000000000000000000000000",
    network: "Testnet",
    payoutEth: 1,
    payoutUsdc: 100,
    ethSymbol: "TSETH",
    usdcSymbol: "TSUSDC",
  })

  useEffect(() => {
    async function fetchInfo() {
      const res = await fetch("./api/info")
      const info = await res.json()
      setFaucetInfo(info)
      document.title = `Scroll ${faucetInfo.network} Faucet`
    }
    fetchInfo()
  }, [])

  const addTokenToMetaMask = async (address: string) => {
    await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: address,
          symbol: faucetInfo.usdcSymbol,
          decimals: 18,
        },
      },
    })
  }

  const addToMetaMask = async (autoconnect: any) => {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [autoconnect],
    })
  }
  return (
    <main className="faucet-app h-[90vh] flex justify-center items-center flex-col px-[16px]">
      <p className="text-[#333] text-center text-[28px]  leading-[32px] mb-[16px] font-display md:text-[34px]  md:leading-[40px]">
        Add Scroll L1 and L2 {TESTNET_NAME}
      </p>
      <p className="max-w-[746px] text-center text-[16px] text-[#595959] leading-[26px]">
        The Pre-Alpha Testnet consists of Scroll L1 and Scroll L2 test network, a fork of Ethereum utilizing a PoA-based consensus, and a
        zero-knowledge rollup testnet deployed on top of the former.
      </p>

      <div className="w-[80%] flex justify-between items-center mt-[67px] max-w-[500px] md:w-full">
        <div
          className={`w-[30px] flex justify-center items-center h-[30px] rounded-[15px] border l1-circle after:content['Add Scroll L1']
           ${step === ChainId.SCROLL_LAYER_1 ? "border-[#E8E8E8]" : "bg-[#00C331] border-[#00C331]"}`}
        >
          <img className="w-[13px]" alt="success" src="/imgs/faucet/success.png" />
        </div>
        <div className={`h-[1px] flex-1 ${step === ChainId.SCROLL_LAYER_1 ? "bg-[#E8E8E8]" : "bg-[#00C331]"}`} />
        <div className="w-[30px] h-[30px] rounded-[15px] bg-[#3333331A] l2-circle" />
      </div>

      <div className="flex mt-[65px] w-full max-w-[500px] justify-between">
        <div className="max-w-[180px] text-left text-[#333333]">Add {Addresses[step].autoconnect.chainName} to your Metamask networks</div>
        <button
          onClick={() => addToMetaMask(Addresses[step].autoconnect)}
          className="w-[260px] font-semibold h-[50px] border border-[#333333] rounded-[6px] text-[#333333] add-button"
        >
          Add {Addresses[step].autoconnect.chainName}
        </button>
      </div>
      <div className="flex mt-[40px] w-full max-w-[500px] justify-between">
        <div className="max-w-[180px] text-left text-[#333333]">
          Add the {faucetInfo.usdcSymbol} token to {Addresses[step].autoconnect.chainName}
        </div>
        <button
          onClick={() => addTokenToMetaMask(Addresses[step].usdcAddress as string)}
          className="w-[260px] font-semibold  h-[50px] border border-[#333333] rounded-[6px] text-[#333333] add-button"
        >
          Add {faucetInfo.usdcSymbol} to {Addresses[step].autoconnect.chainName}
        </button>
      </div>
      <div className="max-w-[746px] mb-[40px] flex justify-between items-center flex-row-reverse  w-full mt-[80px]">
        {step === ChainId.SCROLL_LAYER_2 ? (
          <>
            <Link component={RouteLink} to={SiteMap.Faucet}>
              Done. Request Tokens
              <img className="w-[15px] ml-[10px]" alt="right arrow" src="/imgs/faucet/right-arrow.png" />
            </Link>
            <Link component="button" onClick={() => setStep(ChainId.SCROLL_LAYER_1)}>
              <img className="w-[15px] mr-[10px]" alt="left arrow" src="/imgs/faucet/left-arrow.png" />
              Add Scroll L1 {TESTNET_NAME}
            </Link>
          </>
        ) : (
          <Link component="button" onClick={() => setStep(ChainId.SCROLL_LAYER_2)}>
            Done. Add Scroll L2 {TESTNET_NAME}
            <img className="w-[15px]  ml-[10px]" alt="right arrow" src="/imgs/faucet/right-arrow.png" />
          </Link>
        )}
      </div>
    </main>
  )
}

export default AddNetwork
