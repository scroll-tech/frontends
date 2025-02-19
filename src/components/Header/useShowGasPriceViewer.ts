"use client"

import { usePathname } from "next/navigation"

const useShowGasPriceViewer = () => {
  const pathname = usePathname()
  return pathname === "/"
}

export default useShowGasPriceViewer
