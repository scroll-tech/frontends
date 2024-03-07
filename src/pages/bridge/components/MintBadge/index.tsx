import React, { useEffect, useMemo, useState } from "react"

import Skelly from "@/components/Skelly"
import { CHAIN_ID } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import BadgeDetailDialog from "@/pages/skelly/Dashboard/BadgeDetailDialog"
import Badges from "@/pages/skelly/Dashboard/UpgradeDialog/Badges"
import useSkellyStore, { BadgeDetailDialogTpye } from "@/stores/skellyStore"

const MintBadge = () => {
  const { changeBadgeDetailDialog, changeSelectedBadge, userBadges } = useSkellyStore()
  const badge: any = Badges[3]
  const [canBeMint, setCanBeMint] = useState(false)
  const { chainId } = useRainbowContext()
  //   const { hasMintedProfile } = useSkellyContext()

  const isL2 = useMemo(() => chainId === CHAIN_ID.L2, [chainId])

  useEffect(() => {
    if (isL2 && !userHasBadge) {
      setCanBeMint(true)
    } else {
      setCanBeMint(false)
    }
  }, [isL2])

  const userHasBadge = useMemo(() => {
    return userBadges.some(b => b.badgeContract === badge.badgeContract)
  }, [userBadges])

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
