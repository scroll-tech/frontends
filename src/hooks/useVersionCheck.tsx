import { useEffect, useState } from "react"
import { useLocalStorage } from "react-use"

const APP_VERSION = "appVersion"

export const VersionChecker = ({ children }: any) => {
  const [versionMatched, setVersionMatched] = useState(false)
  const [version, setVersion] = useLocalStorage(APP_VERSION)

  useEffect(() => {
    const currentVersion = process.env.REACT_APP_VERSION
    if (version !== currentVersion) {
      localStorage.clear()
      setVersion(currentVersion)
    }
    setVersionMatched(true)
  }, [])

  if (!versionMatched) {
    return null
  }

  return children
}
