import { requireEnv } from "@/utils"

export const ChainId = {
  SCROLL_LAYER_1: parseInt(process.env.REACT_APP_CHAIN_ID_L1 as string),
  SCROLL_LAYER_2: parseInt(process.env.REACT_APP_CHAIN_ID_L2 as string),
}

export const RPCUrl = {
  SCROLL_LAYER_1: process.env.REACT_APP_EXTERNAL_RPC_URI_L1,
  SCROLL_LAYER_2: process.env.REACT_APP_EXTERNAL_RPC_URI_L2,
}

export const ETH_SYMBOL = requireEnv("REACT_APP_ETH_SYMBOL")
