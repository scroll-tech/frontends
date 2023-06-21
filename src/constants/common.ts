import { requireEnv } from "@/utils"

export const ChainId = {
  SCROLL_LAYER_1: parseInt(requireEnv("REACT_APP_CHAIN_ID_L1") as string),
  SCROLL_LAYER_2: parseInt(requireEnv("REACT_APP_CHAIN_ID_L2") as string),
}

export const RPCUrl = {
  SCROLL_LAYER_1: requireEnv("REACT_APP_EXTERNAL_RPC_URI_L1"),
  SCROLL_LAYER_2: requireEnv("REACT_APP_EXTERNAL_RPC_URI_L2"),
}

export const BLOCK_EXPLORER = {
  [ChainId.SCROLL_LAYER_1]: requireEnv("REACT_APP_EXTERNAL_EXPLORER_URI_L1"),
  [ChainId.SCROLL_LAYER_2]: requireEnv("REACT_APP_EXTERNAL_EXPLORER_URI_L2"),
}

export const ETH_SYMBOL = requireEnv("REACT_APP_ETH_SYMBOL")
