export const WAIT_CONFIRMATIONS = 10

export const BRIDGE_PAGE_SIZE = 3

export const MAX_CACHE_NUMBER = 18

export enum GAS_LIMIT {
  DEPOSIT_ETH = 4e5,
  DEPOSIT_ERC20 = 8e5,
  WITHDRAW_ETH = 16e5,
  WITHDRAW_ERC20 = 32e5,
}

export enum TX_STATUS {
  success = "Success",
  pending = "Pending",
  failed = "Failed",
  canceled = "Canceled",
  empty = "N/A",
}
