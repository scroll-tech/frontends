import * as React from "react"
import Faq, { FaqItem } from "@/components/Faq"
import Link from "@/components/Link"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import { Addresses, ChainId, SiteMap } from "@/constants"

const addToMetaMask = async (autoconnect: any) => {
  await window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [autoconnect],
  })
}

const FAQ = () => {
  const { walletName } = useWeb3Context()
  return (
    <Faq>
      <FaqItem title="What is a testnet faucet?">
        <p className="text-[16px] leading-[26px] text-[#595959] max-w-[680px]">
          Testnets act like a sandbox, where developers can test out features before the mainnet launch. Users provide their wallet address and in
          exchange receive ‘’test tokens’’ (no real world value), to interact with the testnet and share feedback.
        </p>
      </FaqItem>
      <FaqItem title="How do I use the faucet?">
        <div className="text-[16px] leading-[26px] text-[#595959]">
          <ul className="pl-[20px] list-decimal">
            <li>
              <span onClick={() => addToMetaMask(Addresses[ChainId.SCROLL_LAYER_1].autoconnect)} className="link-button cursor-pointer">
                Add Scroll L1 network
              </span>{" "}
              and the USDC token to {walletName}.
            </li>
            <li>
              Transfer and withdraw test tokens in{" "}
              <Link className="link-button" href={SiteMap.Bridge}>
                Bridge
              </Link>
              .
            </li>
            <li>
              <span onClick={() => addToMetaMask(Addresses[ChainId.SCROLL_LAYER_2].autoconnect)} className="link-button cursor-pointer">
                Add Scroll L2 network
              </span>{" "}
              and the USDC token to {walletName}.
            </li>
            <li>
              Click on the button ‘’Request Testnet Scroll tokens’’ and receive your testnet Scroll tokens (1ETH & 100 USDC) within a few seconds.
            </li>
            <li>
              Check the transaction status in your wallet or on the{" "}
              <a className="link-button" href={SiteMap.L1Explorer}>
                Scroll L1 Block Explorer
              </a>
              .
            </li>
          </ul>
        </div>
      </FaqItem>
    </Faq>
  )
}

export default FAQ
