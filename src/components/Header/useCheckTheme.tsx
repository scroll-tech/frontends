import { usePathname } from "next/navigation"
import { useMemo } from "react"

import useMatch from "@/hooks/useMatch"

const useCheckTheme = () => {
  const pathname = usePathname()
  // TODO:
  const isCanvas = useMatch("/canvas(.*)")
  const dark = useMemo(() => {
    return ["/developer-nft/check-eligibility", "/developer-nft/mint"].includes(pathname) || isCanvas
  }, [pathname])

  return dark
}

export default useCheckTheme
