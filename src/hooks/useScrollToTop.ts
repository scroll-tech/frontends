import { useLocation } from "react-router-dom"
import { useLayoutEffect } from "react"

function ScrollToTop({ children }: any) {
  const location = useLocation()
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0)
  }, [location.pathname])
  return children
}

export default ScrollToTop
