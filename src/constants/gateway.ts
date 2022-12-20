// import { ChainId } from "./index";
import { requireEnv } from "@/utils"

const ChainId = {
  SCROLL_LAYER_1: parseInt(process.env.REACT_APP_CHAIN_ID_L1 as string),
  SCROLL_LAYER_2: parseInt(process.env.REACT_APP_CHAIN_ID_L2 as string),
}
const StandardERC20GatewayProxyAddr = {
  [ChainId.SCROLL_LAYER_1]: requireEnv("REACT_APP_L1_STANDARD_ERC20_GATEWAY_PROXY_ADDR"),
  [ChainId.SCROLL_LAYER_2]: requireEnv("REACT_APP_L2_STANDARD_ERC20_GATEWAY_PROXY_ADDR"),
}
const GatewayRouterProxyAddr = {
  [ChainId.SCROLL_LAYER_1]: requireEnv("REACT_APP_L1_GATEWAY_ROUTER_PROXY_ADDR"),
  [ChainId.SCROLL_LAYER_2]: requireEnv("REACT_APP_L2_GATEWAY_ROUTER_PROXY_ADDR"),
}

export { StandardERC20GatewayProxyAddr, GatewayRouterProxyAddr }
