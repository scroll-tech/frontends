import { useEffect, useMemo, useState } from "react"
import { isMobileOnly } from "react-device-detect"
import { useLocation } from "react-router-dom"

const useCheckNoBg = () => {
  const { pathname } = useLocation()
  const isNoBgPage = useMemo(() => ["/story"].includes(pathname), [pathname])
  const [isNoBgSection, setIsNoBgSection] = useState(isNoBgPage)

  useEffect(() => {
    setIsNoBgSection(isNoBgPage)
    if (isNoBgPage) {
      const element = isMobileOnly ? document.body : document.documentElement
      const elementListener = isMobileOnly ? document.body : window
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

  return isNoBgPage && isNoBgSection
}

export default useCheckNoBg
