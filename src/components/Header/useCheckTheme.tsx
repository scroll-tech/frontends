import { usePathname } from "next/navigation"
import { useMemo } from "react"

const useCheckTheme = () => {
  const pathname = usePathname()
  const dark = useMemo(() => ["/developer-nft/check-eligibility", "/developer-nft/mint"].includes(pathname), [pathname])

  return dark
}

export default useCheckTheme
