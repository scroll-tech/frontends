"use client"

import Link from "next/link"
import { useMemo } from "react"

import { CHAIN_ID } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useMatch from "@/hooks/useMatch"
import useCanvasStore from "@/stores/canvasStore"

import Dashboard from "./Dashboard"
import LoadingPage from "./loading"
import WrongNetwork from "./wrongNetwork"

const CanvasIndex = () => {
  const isOthersCanvas = useMatch("/canvas/:address")
  const isBadgeDetail = useMatch("/canvas/badge/:id")

  const { walletCurrentAddress, chainId } = useRainbowContext()
  const { profileMintedChecking, profileMinted } = useCanvasStore()
  const isWrongNetwork = useMemo(() => {
    return !isOthersCanvas && !isBadgeDetail && chainId !== CHAIN_ID.L2
  }, [chainId, isOthersCanvas, isBadgeDetail])

  const renderCanvas = () => {
    if (!walletCurrentAddress) {
      return <Link href="/canvas/mint" replace={true}></Link>
    } else if (profileMintedChecking || profileMinted === null) {
      return <LoadingPage></LoadingPage>
    } else if (profileMinted) {
      // if connected user views the invite link, then redirect to canvas
      return <Dashboard />
    }
    return <Link href="/canvas/mint" replace={true}></Link>
  }

  return (
    <>
      {renderCanvas()}
      {isWrongNetwork && <WrongNetwork></WrongNetwork>}
    </>
  )
}

export default CanvasIndex
