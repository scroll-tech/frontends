"use client"

import Link from "next/link"
import { useParams } from "next/navigation"

import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCanvasStore from "@/stores/canvasStore"

import LoadingPage from "../loading"
import ReadyToMint from "./home"

const CanvasMint = () => {
  const { code } = useParams()

  const { walletCurrentAddress } = useRainbowContext()
  const { profileMinted, profileMintedChecking, mintFlowVisible } = useCanvasStore()

  const renderMint = () => {
    if (!mintFlowVisible && walletCurrentAddress && (profileMintedChecking || profileMinted === null)) {
      return <LoadingPage></LoadingPage>
    } else if (!mintFlowVisible && profileMinted) {
      return <Link href="/canvas" replace></Link>
    }
    return <ReadyToMint code={code}></ReadyToMint>
  }

  return <>{renderMint()}</>
}

export default CanvasMint
