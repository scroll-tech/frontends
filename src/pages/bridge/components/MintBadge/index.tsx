import React, { useEffect, useMemo, useState } from "react"

import Canvas from "@/components/Canvas"
import { CHAIN_ID } from "@/constants"
import { type Badge, ETHEREUM_YEAR_BADGE } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import BadgeDetailDialog from "@/pages/canvas/Dashboard/BadgeDetailDialog"
import { checkIfHasBadgeByAddress } from "@/services/canvasService"
import useCanvasStore, { BadgeDetailDialogType } from "@/stores/canvasStore"

// not in use, an example for third party badges
const MintBadge = () => {
  const { changeBadgeDetailDialog, changeSelectedBadge, profileMinted } = useCanvasStore()
  const badge: Badge = ETHEREUM_YEAR_BADGE
  const [canBeMint, setCanBeMint] = useState(false)
  const { chainId, provider, walletCurrentAddress } = useRainbowContext()

  const isL2 = useMemo(() => chainId === CHAIN_ID.L2, [chainId])

  useEffect(() => {
    if (isL2 && provider) {
      handleVisible()
    } else {
      setCanBeMint(false)
    }
  }, [isL2, provider])

  const handleVisible = async () => {
    const signer = await provider!.getSigner(0)
    const hasBadge = await checkIfHasBadgeByAddress(signer, walletCurrentAddress, badge.badgeContract)
    if (hasBadge) {
      setCanBeMint(false)
    } else {
      setCanBeMint(true)
    }
  }

  const handleMintBadge = async () => {
    changeSelectedBadge(badge)
    if (profileMinted) {
      changeBadgeDetailDialog(BadgeDetailDialogType.MINT)
    } else {
      changeBadgeDetailDialog(BadgeDetailDialogType.NO_CANVAS)
    }
  }

  return (
    <>
      <Canvas
        visible={canBeMint}
        buttonText="Mint badge"
        title={`Heya! Congratulations! You can mint ${badge.name} on Scroll Canvas.`}
        onClick={handleMintBadge}
        canvasId={`bridgeBadge_${walletCurrentAddress}`}
      />
      <BadgeDetailDialog />
    </>
  )
}

export default MintBadge
