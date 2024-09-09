import { usePathname } from "next/navigation"
import { useMemo } from "react"

const useShowLanguageSelect = () => {
  const pathname = usePathname()

  const showLanguageSelect = useMemo(() => pathname.startsWith("/blog"), [pathname])

  return showLanguageSelect
}

export default useShowLanguageSelect
