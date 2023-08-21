import { ReactNode, useState } from "react"

import { Alert, Snackbar } from "@mui/material"

import PageHeader from "@/components/PageHeader"
import { CHAIN_ID, DOCUMENTATION, NAVIGATIONS, NETWORKS } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { switchNetwork } from "@/utils"

import SectionTitle from "./components/sectionTitle"

/**
 * Returns button to add network to MetaMask
 * @param {temp: any} autoconnect details
 * @returns {ReactElement}
 */
function AddNetworkButton(props) {
  const { chainId, onReadd } = props

  const { walletName, chainId: currentChainId } = useRainbowContext()

  const addToMetaMask = async () => {
    if (currentChainId === chainId) {
      onReadd()
      return
    }
    await switchNetwork(chainId)
  }

  return (
    <a onClick={addToMetaMask} className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
      Add to {walletName}
    </a>
  )
}

function ConnectWalletButton() {
  const { connect } = useRainbowContext()

  return (
    <a onClick={connect} className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
      Connect Wallet
    </a>
  )
}

export default function Home() {
  const { walletName, chainId } = useRainbowContext()
  const [tip, setTip] = useState<ReactNode | null>(null)

  const handleReadd = () => {
    chainId &&
      setTip(
        <>
          You are already on <b>{NETWORKS.find(item => item.chainId === chainId)!.name}</b>.
        </>,
      )
  }

  const handleClose = () => {
    setTip(null)
  }

  return (
    <>
      <PageHeader title="Scroll Sepolia" subTitle="Get started with our testnet now!"></PageHeader>
      <div className="p-4 mx-[8px] mb-[40px] lg:p-8">
        <SectionTitle title={`Configure ${walletName || "wallet"} for our zkEVM testnet`} sx={{ mt: 0 }}>
          <div className="text-base px-4 py-5 grid grid-cols-1 gap-2 sm:gap-4 sm:px-6">
            Note: Please completely remove previous Scroll networks from your {walletName || "wallet"} before proceeding, then:
            <a
              className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
              target="_blank"
              href="https://docs.scroll.io/en/user-guide/common-errors/"
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
                      <span className="ml-2 flex-1 w-0 truncate">{NETWORKS[0].name}</span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {walletName ? <AddNetworkButton chainId={CHAIN_ID.L1} onReadd={handleReadd} /> : <ConnectWalletButton />}
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
                      <span className="ml-2 flex-1 w-0 truncate">{NETWORKS[1].name}</span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {walletName ? <AddNetworkButton chainId={CHAIN_ID.L2} onReadd={handleReadd} /> : <ConnectWalletButton />}
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
          </div>
        </SectionTitle>

        <SectionTitle title="Test the following">
          {NAVIGATIONS.slice(2).map((item, idx) => (
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
          {DOCUMENTATION.map((item, idx) => (
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
          <div className=" bg-white px-4 py-5 sm:grid sm:px-6">
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

          <div className="bg-gray-50 px-4 py-5 sm:grid sm:px-6">
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

          <div className=" bg-white px-4 py-5 sm:grid sm:px-6">
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