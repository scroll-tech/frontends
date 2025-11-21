"use client"

import useHideFooter from "@/hooks/useHideFooter"
import { isSepolia } from "@/utils"

import PureFooter from "./PureFooter"
import Support from "./Support"

const Footer = () => {
  const { hideSupport } = useHideFooter()

  if (isSepolia) {
    return null
  }
  return (
    <>
      {!hideSupport && <Support />}
      <PureFooter></PureFooter>
    </>
  )
}

export default Footer
