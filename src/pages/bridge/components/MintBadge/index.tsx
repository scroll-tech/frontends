import React, { useEffect, useMemo, useState } from "react"

import Skelly from "@/components/Skelly"
import { CHAIN_ID } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import BadgeDetailDialog from "@/pages/skelly/Dashboard/BadgeDetailDialog"
import Badges from "@/pages/skelly/Dashboard/UpgradeDialog/Badges"
import { checkIfHasBadgeByAddress } from "@/services/skellyService"
import useSkellyStore, { BadgeDetailDialogTpye } from "@/stores/skellyStore"

const MintBadge = () => {
  const { changeBadgeDetailDialog, changeSelectedBadge } = useSkellyStore()
  const badge: any = Badges[3]
  const [canBeMint, setCanBeMint] = useState(false)
  const { chainId, provider, walletCurrentAddress } = useRainbowContext()
  //   const { hasMintedProfile } = useSkellyContext()

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
    changeSelectedBadge(Badges[3])
    if (isL2) {
      changeBadgeDetailDialog(BadgeDetailDialogTpye.MINT)
    } else {
      changeBadgeDetailDialog(BadgeDetailDialogTpye.NO_PROFILE)
    }
  }

  return (
    <>
      <Skelly
        visible={canBeMint}
        buttonText="Mint badge"
        title={`Heya! Congratulations! You can mint ${badge.name} on Scroll Skelly.`}
        onClick={handleMintBadge}
      />
      <BadgeDetailDialog />
    </>
  )
}

export default MintBadge
