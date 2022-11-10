// the Uniswap Default token list lives here
export const DEFAULT_TOKEN_LIST_URL = "tokens.uniswap.eth";

export const DEFAULT_LIST_OF_LISTS: string[] = [
  window.location.origin +
    "/swap/token-list-" +
    process.env.REACT_APP_SCROLL_ENVIRONMENT +
    ".json",
];
