import { useEffect, useState } from "react"
import { useLocalStorage } from "react-use"

import { requireEnv } from "@/utils"
import { APP_VERSION } from "@/utils/storageKey"

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
      localStorage.clear()
    }
    setVersion(currentVersion)
    setVersionMatched(true)
  }, [])

  if (!versionMatched) {
    return null
  }

  return children
}
