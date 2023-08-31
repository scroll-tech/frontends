import { useEffect, useMemo, useState } from "react"
import { useLocation } from "react-router-dom"

import useCheckViewport from "@/hooks/useCheckViewport"

const useCheckNoBg = () => {
  const { pathname } = useLocation()
  const { isMobile } = useCheckViewport()
  const isNoBgPage = useMemo(() => ["/story"].includes(pathname), [pathname])
  const [isNoBgSection, setIsNoBgSection] = useState(isNoBgPage)

  useEffect(() => {
    setIsNoBgSection(isNoBgPage)
    if (isNoBgPage) {
      const element = isMobile ? document.body : document.documentElement
      const elementListener = isMobile ? document.body : window
      const handleScroll = () => {
        const scrollTop = element.scrollTop
        setIsNoBgSection(scrollTop < 10)
      }
      elementListener.addEventListener("scroll", handleScroll)
      return () => {
        setIsNoBgSection(true)
        elementListener.removeEventListener("scroll", handleScroll)
      }
    }
  }, [isNoBgPage])
  return isNoBgPage && isNoBgSection ? "transparent" : ""
}

export default useCheckNoBg
