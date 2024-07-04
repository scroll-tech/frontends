import { useMemo } from "react"
import { useLocation } from "react-router-dom"

const useShowLanguageSelect = () => {
  const { pathname } = useLocation()

  const showLanguageSelect = useMemo(() => pathname.startsWith("/blog"), [pathname])

  return showLanguageSelect
}

export default useShowLanguageSelect
