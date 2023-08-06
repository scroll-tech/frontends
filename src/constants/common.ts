import { requireEnv } from "@/utils"

export const ETH_SYMBOL = requireEnv("REACT_APP_ETH_SYMBOL")
export const WETH_SYMBOL = "WETH"

export const CHAIN_ID = {
  L1: parseInt(requireEnv("REACT_APP_CHAIN_ID_L1") as string),
  L2: parseInt(requireEnv("REACT_APP_CHAIN_ID_L2") as string),
}

export const RPC_URL = {
  L1: requireEnv("REACT_APP_EXTERNAL_RPC_URI_L1"),
  L2: requireEnv("REACT_APP_EXTERNAL_RPC_URI_L2"),
}

export const EXPLORER_URL = {
  L1: requireEnv("REACT_APP_EXTERNAL_EXPLORER_URI_L1"),
  L2: requireEnv("REACT_APP_EXTERNAL_EXPLORER_URI_L2"),
}

export const STANDARD_ERC20_GATEWAY_PROXY_ADDR = {
  [CHAIN_ID.L1]: requireEnv("REACT_APP_L1_STANDARD_ERC20_GATEWAY_PROXY_ADDR"),
  [CHAIN_ID.L2]: requireEnv("REACT_APP_L2_STANDARD_ERC20_GATEWAY_PROXY_ADDR"),
}

export const GATEWAY_ROUTE_PROXY_ADDR = {
  [CHAIN_ID.L1]: requireEnv("REACT_APP_L1_GATEWAY_ROUTER_PROXY_ADDR"),
  [CHAIN_ID.L2]: requireEnv("REACT_APP_L2_GATEWAY_ROUTER_PROXY_ADDR"),
}

export const WETH_GATEWAY_PROXY_ADDR = {
  [CHAIN_ID.L1]: requireEnv("REACT_APP_L1_WETH_GATEWAY_PROXY_ADDR"),
  [CHAIN_ID.L2]: requireEnv("REACT_APP_L2_WETH_GATEWAY_PROXY_ADDR"),
}
