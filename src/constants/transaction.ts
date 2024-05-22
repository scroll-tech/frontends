export const WAIT_CONFIRMATIONS = 10

export const BRIDGE_PAGE_SIZE = 3

export const WITHDRAW_TABLE_PAGE_SIZE = 5

export const CLAIM_TABLE_PAGE_SIZE = 5

export const MAX_CACHE_NUMBER = 18

export enum TX_TYPE {
  ALL,
  DEPOSIT,
  WITHDRAW,
  CLAIM,
}

export enum TX_STATUS {
  Unknown = -1,
  Sent,
  SentFailed,
  Relayed,
  FailedRelayed,
  RelayedReverted,
  Skipped,
  Dropped,
  BatchDepositSent,
  BatchDepositRelayed,
  BatchDepositFailed,
}

export const BATCH_DEPOSIT_TOKENS = [""]
