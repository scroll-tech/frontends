type EmptyNetwork = ValidNetwork<string, never>

type ValidNetwork = {
  name: string
  slug: string
  icon: any
  rpcUrl: string
  explorer: string
  chainId: number
  nativeTokenSymbol: string
  isL1: boolean
}

type Network = EmptyNetwork & ValidNetwork
