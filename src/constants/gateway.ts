// import { ChainId } from "./index";
const ChainId = {
  SCROLL_LAYER_1: parseInt(process.env.REACT_APP_CHAIN_ID_L1 as string),
  SCROLL_LAYER_2: parseInt(process.env.REACT_APP_CHAIN_ID_L2 as string),
};
const StandardERC20GatewayProxyAddr = {
  [ChainId.SCROLL_LAYER_1]: "0x7F5148aa06E5073cF1577B065152390fe5f3f05b",
  [ChainId.SCROLL_LAYER_2]: "0x48235a4b7D02F5874dc82F7419cbeaeb0043eF2f",
};
const GatewayRouterProxyAddr = {
  [ChainId.SCROLL_LAYER_1]: "0x94Cf11667B017e9Fef7Ab557E2eF9EFf6fdfeDc3",
  [ChainId.SCROLL_LAYER_2]: "0x8318ed43dD6760dA6A01B7605C408841e7062419",
};

export { StandardERC20GatewayProxyAddr, GatewayRouterProxyAddr };
