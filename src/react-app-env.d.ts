/// <reference types="react-scripts" />
interface Window {
  ethereum: any
}

declare module "react-mailchimp-subscribe"

declare module "fortmatic"

declare module "react-router-dom"

interface Window {
  ethereum?: {
    isMetaMask?: true
    on?: (...args: any[]) => void
    removeListener?: (...args: any[]) => void
  }
  web3?: {}
  okxwallet?: {
    isOKExWallet?: boolean
    isOkxWallet?: boolean
  }
}

declare module "content-hash" {
  declare function decode(x: string): string
  declare function getCodec(x: string): string
}

declare module "dayjs"
