import { useEffect, useState } from "react"
import { useLocalStorage } from "react-use"

import { APP_VERSION, BRIDGE_TRANSACTIONS } from "@/constants/storageKey"
import { requireEnv } from "@/utils"
import { clearState, getItem, setItem } from "@/utils/localStorage"

type Semver = {
  major: number
  minor: number
  patch: number
}

const parseSemver = (version: string = "0.0.0"): Semver => {
  const [major, minor, patch] = version.split(".").map(Number)
  return { major, minor, patch }
}

const isMajorOrMinorBumped = (oldVersion: string, newVersion: string): boolean => {
  const oldSemver = parseSemver(oldVersion)
  const newSemver = parseSemver(newVersion)

  return oldSemver.major !== newSemver.major || oldSemver.minor !== newSemver.minor
}

export const VersionChecker = ({ children }: any) => {
  const [versionMatched, setVersionMatched] = useState(false)
  const [oldVersion, setVersion] = useLocalStorage(APP_VERSION)

  useEffect(() => {
    const currentVersion = requireEnv("REACT_APP_VERSION")
    if (isMajorOrMinorBumped(oldVersion as string, currentVersion)) {
      const bridgeTxs = getItem(BRIDGE_TRANSACTIONS)
      clearState()
      if (bridgeTxs?.includes("orderedTxDB")) {
        setItem(BRIDGE_TRANSACTIONS, bridgeTxs)
      }
    }
    setVersion(currentVersion)
    setVersionMatched(true)
  }, [])

  if (!versionMatched) {
    return null
  }

  return children
}
