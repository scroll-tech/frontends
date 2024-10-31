import { isAddress } from "ethers"
import { identity } from "lodash"
import { useEffect } from "react"
import { namehash, normalize } from "viem/ens"
import { create } from "zustand"

import { getEnsAddressURL } from "@/apis/ens"

/**
 * Fetches Ethereum address for an ENS name
 * @param ens ENS name to resolve
 * @returns Resolved Ethereum address or null if not found
 */
async function getEnsAddress(ens: string): Promise<string | null> {
  return await scrollRequest(getEnsAddressURL(ens)).then(data => data?.address)
}

interface InputAddressStore {
  inputValue: string
  isValidInput: boolean
  address: string | null
  isValidAddress: boolean
  ens: string | null
  isValidEns: boolean
  resolvingEns: boolean
  ensServerError: string | null
  validateAddress: () => void
  validateEnsFormat: () => void
  resolveEnsAddress: () => Promise<void>
  validateEns: () => Promise<void>
  setInputValue: (v: string) => void
  setValidationStatus: () => void
}

const useInputAddressStore = create<InputAddressStore>((set, get) => ({
  inputValue: "",
  isValidInput: true,
  address: null,
  isValidAddress: false,
  ens: null,
  isValidEns: false,
  resolvingEns: false,
  ensServerError: null,
  validateAddress() {
    const addr = get().inputValue.trim()
    if (isAddress(addr)) set({ address: addr })
    else set({ address: null })
  },
  validateEnsFormat() {
    set({ ens: null })
    const ens = get().inputValue.trim()
    if (!ens.endsWith(".eth")) return
    try {
      namehash(normalize(ens))
    } catch (err) {
      return
    }
    set({ ens })
  },
  async resolveEnsAddress() {
    const { ens } = get()
    if (!ens) return
    set({ resolvingEns: true })
    const address = await getEnsAddress(ens).catch(() => set({ ensServerError: "Failed to fetch ENS address" }))
    set({ resolvingEns: false })
    if (address !== undefined) return set({ ens, address, ensServerError: null })
  },
  async validateEns() {
    set({ ensServerError: null, resolvingEns: false })

    get().validateEnsFormat()
    await get().resolveEnsAddress()
  },
  async setInputValue(v) {
    if (v === get().inputValue) return
    set({ inputValue: v || "" })

    get().validateAddress()
    await get().validateEns()
    get().setValidationStatus()
  },
  setValidationStatus() {
    const { inputValue, address, ens } = get()
    // Empty input is valid
    if (!inputValue) return set({ isValidAddress: false, isValidEns: false, isValidInput: true })
    // Valid address + ENS is valid
    if (address && ens) return set({ isValidAddress: true, isValidEns: true, isValidInput: true })
    // Valid address but invalid ENS
    if (address && !ens) return set({ isValidAddress: true, isValidEns: false, isValidInput: true })
    return set({ isValidAddress: false, isValidEns: false, isValidInput: false })
  },
}))

/**
 * Hook for managing and validating Ethereum address/ENS input
 * @param options.onValidAddress Callback when valid address is resolved
 * @param options.onValidEnsName Callback when valid ENS name is resolved
 * @returns Input address store state and methods
 */
export default function useInputAddress({
  onValidAddress = identity,
  onValidEnsName = identity,
  onAddressChange = identity,
  onEnsChange = identity,
} = {}) {
  const store = useInputAddressStore()

  useEffect(() => {
    try {
      if (store.address) {
        onValidAddress(store.address)
        onAddressChange(store.address)
      } else {
        onAddressChange(null)
      }
    } catch (err) {}
  }, [store.address])

  useEffect(() => {
    try {
      if (store.ens) {
        onValidEnsName(store.ens)
        onEnsChange(store.ens)
      } else {
        onEnsChange(null)
      }
    } catch (err) {}
  }, [store.ens])

  return store
}
