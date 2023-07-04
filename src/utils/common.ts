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
  if (process.env[entry]) {
    return process.env[entry]!
  } else {
    throw new Error(`${entry} not defined in .env`)
  }
}

export const generateExploreLink = (explorer, hash) => {
  return `${explorer}/tx/${hash}`
}

export const isProduction = requireEnv("REACT_APP_SCROLL_ENVIRONMENT") === requireEnv("REACT_APP_MAIN_ENVIRONMENT")
export const getPrettyTestnetName = () => "Scroll " + (isProduction ? "Sepolia" : requireEnv("REACT_APP_SCROLL_ENVIRONMENT") + " Testnet")

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
