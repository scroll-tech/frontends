import { usePathname } from "next/navigation"
import { useMemo } from "react"

const useHideFooter = () => {
  const pathname = usePathname()

  const hidden = useMemo(
    // () => pathname.startsWith("/developer-nft") || pathname.startsWith("/bridge") || pathname.startsWith("/sessions") || isCanvas,
    () => pathname.match(/^\/canvas(\/\w*)?$/g),
    [pathname],
  )
  return hidden
}

export default useHideFooter
