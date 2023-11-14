import { useEffect, useMemo, useState } from "react"
import { useLocation } from "react-router-dom"

const useCheckNoBg = () => {
  const { pathname } = useLocation()
  const isNoBgPage = useMemo(() => ["/story", "/join-us"].includes(pathname), [pathname])
  const [isNoBgSection, setIsNoBgSection] = useState(isNoBgPage)

  useEffect(() => {
    setIsNoBgSection(isNoBgPage)
    if (isNoBgPage) {
      const element = document.documentElement
      const elementListener = window
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
