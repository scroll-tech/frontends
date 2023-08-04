import { useEffect, useMemo, useState } from "react"
import { isMobileOnly } from "react-device-detect"
import { useLocation } from "react-router-dom"

const useCheckNoBg = () => {
  const { pathname } = useLocation()
  const isNoBgPage = useMemo(() => ["/story"].includes(pathname), [pathname])
  const [isNoBgSection, setIsNoBgSection] = useState(isNoBgPage)

  useEffect(() => {
    if (isNoBgPage) {
      const element = isMobileOnly ? document.body : document.documentElement
      const handleScroll = () => {
        const scrollTop = element.scrollTop
        const screenHeight = window.screen.height
        setIsNoBgSection(scrollTop < screenHeight)
      }
      element.addEventListener("scroll", handleScroll)
      return () => {
        element.removeEventListener("scroll", handleScroll)
      }
    }
  }, [isNoBgPage])

  return isNoBgPage && isNoBgSection
}

export default useCheckNoBg
