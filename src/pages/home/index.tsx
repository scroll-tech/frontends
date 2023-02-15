import { ReactNode, useState } from "react"

import { Alert, Snackbar } from "@mui/material"

import { Addresses, addresses, documentation, navigation } from "@/constants/index"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"

import SectionTitle from "./components/sectionTitle"

/**
 * Returns button to add network to MetaMask
 * @param {temp: any} autoconnect details
 * @returns {ReactElement}
 */
function AddNetworkButton({ autoconnect, walletName, chainId, onReadd }: any) {
  /**
   * Adds network to MetaMask
   */
  const addToMetaMask = async () => {
    if (chainId === parseInt(autoconnect.chainId)) {
      onReadd()
      return
    }
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [autoconnect],
    })
  }

  return (
    <a onClick={addToMetaMask} className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
      Add to {walletName}
    </a>
  )
}

function ConnectWalletButton() {
  const { connectWallet } = useWeb3Context()
  return (
    <a onClick={connectWallet} className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
      Connect Wallet
    </a>
  )
}

export default function Home() {
  const { walletName, chainId } = useWeb3Context()
  const [tip, setTip] = useState<ReactNode | null>(null)

  const handleReadd = () => {
    setTip(
      <>
        You are already on <b>{Addresses[chainId as number].network}</b>.
      </>,
    )
  }

  const handleClose = () => {
    setTip(null)
  }

  return (
    <>
      <div className="p-4 mx-[8px] mb-[40px] lg:p-8">
        <SectionTitle title={`Configure ${walletName || "wallet"} for our testnet`}>
          <div className="text-base px-4 py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6">
            Note: Please completely remove previous Scroll networks from your {walletName || "wallet"} before proceeding, then:
            <a
              className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
              target="_blank"
              href="https://guide.scroll.io/user-guide/common-errors#incorrect-nonce-error-when-sending-a-transaction-in-metamask"
              rel="noreferrer"
            >
              Reset {walletName || "wallet"} for Scroll's L2
            </a>
          </div>
          <div className="text-left">
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-base font-medium text-black flex items-center">Layer 1</dt>
              <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-base">
                    <div className="w-0 flex-1 flex items-center">
                      <span className="ml-2 flex-1 w-0 truncate">{addresses[0].network}</span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {walletName ? (
                        <AddNetworkButton autoconnect={addresses[0].autoconnect} walletName={walletName} chainId={chainId} onReadd={handleReadd} />
                      ) : (
                        <ConnectWalletButton />
                      )}
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
            <div className="bg-white  px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-base font-medium text-black flex items-center">Layer 2</dt>
              <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
                <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-base">
                    <div className="w-0 flex-1 flex items-center">
                      <span className="ml-2 flex-1 w-0 truncate">{addresses[1].network}</span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {walletName ? (
                        <AddNetworkButton autoconnect={addresses[1].autoconnect} walletName={walletName} chainId={chainId} onReadd={handleReadd} />
                      ) : (
                        <ConnectWalletButton />
                      )}
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
          </div>
        </SectionTitle>

        <SectionTitle title="Test the following">
          {navigation.slice(2).map((item, idx) => (
            <div key={item.name} className={`${idx % 2 ? "bg-white" : "bg-gray-50"} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
              <dt className="text-base font-medium text-gray-500">
                <a className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer" href={item.subdomainOrPath}>
                  {item.name}
                </a>
              </dt>
              <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">{item.description}</dd>
            </div>
          ))}
        </SectionTitle>

        <SectionTitle title="Read the documentation">
          {documentation.map((item, idx) => (
            <div key={item.name} className={`${idx % 2 ? "bg-white" : "bg-gray-50"} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
              <dt className="text-base font-medium text-gray-500">
                <a className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer" href={item.link}>
                  {item.name}
                </a>
              </dt>
              <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">{item.description}</dd>
            </div>
          ))}
        </SectionTitle>

        <SectionTitle title="Send us feedback">
          <div className=" bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-base font-medium text-black flex items-center">
              <div className="mr-[4px] leading-none">
                <img alt="note" className="w-[20px] align-middle" src="/imgs/home/note.png" />
              </div>
              First, check our
              <a href="https://status.scroll.io" className="ml-[4px] font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                system status
              </a>
            </dt>
            <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2" />
          </div>

          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-base font-medium text-black flex items-center">
              <div className="mr-[4px] leading-none">
                <img alt="discord logo" className="w-[20px] align-middle" src="/imgs/home/discord.png" />
              </div>
              Chat with us on
              <a href="https://discord.gg/scroll" className="ml-[4px] font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                Discord
              </a>
            </dt>
            <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2" />
          </div>

          <div className=" bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-base font-medium text-black flex items-center">
              <div className="mr-[4px] leading-none">
                <img alt="github logo" className="w-[20px] align-middle" src="/imgs/home/github.png" />
              </div>
              Open an issue/PR
              <a href="https://github.com/scroll-tech" className="ml-[4px] font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                in our GitHub
              </a>
            </dt>
            <dd className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2" />
          </div>
        </SectionTitle>
      </div>
      <Snackbar open={!!tip} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="info" onClose={handleClose}>
          {tip}
        </Alert>
      </Snackbar>
    </>
  )
}
