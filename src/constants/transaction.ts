export const WAIT_CONFIRMATIONS = 10

export const BRIDGE_PAGE_SIZE = 3

export const MAX_CACHE_NUMBER = 18

export enum GasLimit {
  DEPOSIT_ETH = 4e4,
  DEPOSIT_ERC20 = 8e4,
  WITHDRAW_ETH = 16e4,
  WITHDRAW_ERC20 = 32e4,
  WITHDRAW_ERC721 = 4e5,
  WITHDRAW_ERC1155 = 8e5,
}

export enum TxStatus {
  success = "Success",
  pending = "Pending",
  failed = "Failed",
  canceled = "Canceled",
  empty = "N/A",
}
