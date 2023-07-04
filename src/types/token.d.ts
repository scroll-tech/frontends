type BaseToken = {
  chainId: number
  name: string
  symbol: string
  decimals: bigint
  logoURI: string
}

type NativeToken = BaseToken & {
  native: boolean
}

type ERC20Token = BaseToken & {
  address: string
}

type Token = NativeToken | ERC20Token
