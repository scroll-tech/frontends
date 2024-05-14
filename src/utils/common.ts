import { isHexString } from "ethers"
import { isNil } from "lodash"
import find from "lodash/find"
import { DependencyList } from "react"

import { STORAGE_AVAILABLE } from "../constants/storageKey"

export const shallowEquals = (a?: DependencyList, b?: DependencyList) => {
  if (a?.length !== b?.length) return false
  if (a === undefined && b === undefined) return true
  if (a === undefined || b === undefined) return false

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false
  }

  return true
}

export function findNetworkBySlug(slug: string, networks: any[]) {
  return find(networks, ["slug", slug])
}

export function requireEnv(entry) {
  if (isNil(process.env[entry])) {
    throw new Error(`${entry} not defined in .env`)
  } else {
    return process.env[entry]!
  }
}

export const generateExploreLink = (explorer, hash, type = "tx") => {
  return `${explorer}/${type}/${hash}`
}

export const isProduction = requireEnv("REACT_APP_SCROLL_ENVIRONMENT") === requireEnv("REACT_APP_MAIN_ENVIRONMENT")
export const isSepolia = requireEnv("REACT_APP_SCROLL_ENVIRONMENT") === "Sepolia"
export const networkType = isProduction ? "mainnet" : "testnet"

export const isValidEmail = (email: string): boolean => {
  const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

export const storageAvailable = type => {
  let storage
  try {
    storage = window[type]
    const x = STORAGE_AVAILABLE
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    )
  }
}

export const convertDateToTimestamp = (dateString: string, isMilliseconds: boolean = true): number => {
  let date = new Date(dateString)
  let timestamp = date.getTime()

  if (!isMilliseconds) {
    timestamp = timestamp / 1000
  }
  return Math.floor(timestamp)
}

export const formatLargeNumber = (value: number, decimal: number = 1): string => {
  if (value.toString().length <= 6) {
    return new Intl.NumberFormat("en-US").format(value)
  }
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: decimal,
    notation: "compact",
  }).format(value)
}

export const formatAmount = (value: number | string): string => {
  return new Intl.NumberFormat("en-US").format(+value)
}

export function isValidTransactionHash(txHash: string): boolean {
  // A valid transaction hash is a hex string of length 66 characters (including the '0x' prefix)
  const isValidLength = txHash.length === 66
  return isValidLength && isHexString(txHash)
}

export const testAsyncFunc = value => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(value)
    }, 1000)
  })
}
