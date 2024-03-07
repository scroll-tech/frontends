import { isEqual } from "lodash"
import { useEffect, useMemo } from "react"
import { useState } from "react"

import { Dialog, DialogContent, DialogTitle, IconButton, Stack, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as CloseSvg } from "@/assets/svgs/skelly/close.svg"
import { BADGES_VISIBLE_TYPE } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
// import { useSkellyContext } from "@/contexts/SkellyContextProvider"
import Button from "@/pages/skelly/components/Button"
import { customiseDisplay } from "@/services/skellyService"
import useSkellyStore from "@/stores/skellyStore"

import Empty from "../../components/Empty"
import GridDragDrop from "./GridDragDrop"

const StyledDialog = styled(Dialog)(({ theme }) => ({
  borderRadius: "1.6rem",
  backgroundColor: "rgba(16, 16, 16, 0.60)",
  "& .MuiDialog-paper": {
    backgroundColor: "#101010",
    width: "100%",
  },
}))

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: "0 3.2rem 4.8rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}))

const BadgesDialog = () => {
  const { provider, walletCurrentAddress } = useRainbowContext()
  const { userBadges, attachedBadges, badgeOrder, badgesDialogVisible, changeBadgesDialog, sortedBadges, profileContract, queryVisibleBadges } =
    useSkellyStore()
  const [loading, setLoading] = useState(false)

  const badgesInstance = useMemo(() => {
    return {
      [BADGES_VISIBLE_TYPE.INVISIBLE]: userBadges.filter(badge => !attachedBadges.includes(badge.id)),
      [BADGES_VISIBLE_TYPE.VISIBLE]: attachedBadges.map(badgeId => userBadges.find(badge => badge.id === badgeId)),
    }
  }, [userBadges, attachedBadges])

  useEffect(() => {
    // console.log("sortedBadges", sortedBadges)
    // console.log("badgeOrder", badgeOrder)
  }, [sortedBadges])

  const handleClose = () => {
    changeBadgesDialog(false)
  }

  const handleSave = () => {
    updateDataAndOrder()
  }

  const calculateRelativeOrder = (original, frontend) => {
    const indexesInOriginal = frontend.map(element => original.indexOf(element))
    const sortedIndexes = [...indexesInOriginal].sort((a, b) => a - b)
    const relativeOrder = indexesInOriginal.map(index => BigInt(sortedIndexes.indexOf(index) + 1))
    return relativeOrder
  }

  const updateDataAndOrder = async () => {
    const originalIds = userBadges.map(item => item.id)
    const displayedIds = badgesInstance[BADGES_VISIBLE_TYPE.VISIBLE].map(item => item.id)
    const currentDisplayedIds = sortedBadges[BADGES_VISIBLE_TYPE.VISIBLE].map(item => item.id)
    const displayedSet = new Set(displayedIds)
    const currentDisplayedSet = new Set(currentDisplayedIds)
    const hiddenToDisplayed: any = []
    const displayedToHidden: any = []

    displayedIds.forEach(id => {
      if (!currentDisplayedSet.has(id)) {
        displayedToHidden.push(id)
      }
    })

    currentDisplayedIds.forEach(id => {
      if (!displayedSet.has(id)) {
        hiddenToDisplayed.push(id)
      }
    })

    const newArrayOrder: number[] = calculateRelativeOrder(originalIds, currentDisplayedIds)

    // if (hiddenToDisplayed.length > 0) {
    //   const result = await attachBadges(profileContract, hiddenToDisplayed)
    //   if (result! !== true) {
    //     console.log("mintBadge failed", result)
    //   } else {
    //     queryAttachedBadges()
    //     handleClose()
    //   }
    //   setLoading(false)
    // }

    // if (displayedToHidden.length > 0) {
    //   const result = await detachBadges(profileContract, displayedToHidden)
    //   if (result! !== true) {
    //     console.log("mintBadge failed", result)
    //   } else {
    //     queryAttachedBadges()
    //     handleClose()
    //   }
    //   setLoading(false)
    // }

    // if (!isEqual(badgeOrder, newArrayOrder)) {
    //   const result = await reorderBadges(profileContract, newArrayOrder)
    //   if (result! !== true) {
    //     console.log("mintBadge failed", result)
    //   } else {
    //     queryAttachedBadges()
    //     handleClose()
    //   }
    // }

    setLoading(true)
    await customiseDisplay({
      profileContract: profileContract!,
      attachBadges: hiddenToDisplayed.length > 0 ? hiddenToDisplayed : null,
      detachBadges: displayedToHidden.length > 0 ? displayedToHidden : null,
      order: isEqual(badgeOrder, newArrayOrder) ? null : newArrayOrder,
    })
    setLoading(false)
    changeBadgesDialog(false)
    queryVisibleBadges(provider, walletCurrentAddress)
  }

  return (
    <StyledDialog
      sx={{
        [`& .MuiDialog-paper`]: {
          width: userBadges.length ? "120rem" : "64rem",
        },
      }}
      maxWidth={false}
      onClose={handleClose}
      open={badgesDialogVisible}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: ["2rem", "3rem"],
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <IconButton onClick={handleClose}>
          <SvgIcon sx={{ fontSize: ["1.6rem", "2.4rem"], color: "primary.contrastText" }} component={CloseSvg} inheritViewBox></SvgIcon>
        </IconButton>
      </DialogTitle>
      <StyledDialogContent>
        <Typography variant="h3" sx={{ flexGrow: 1, color: "#ffffff", textAlign: "center" }}>
          Drag badges to cutomize
        </Typography>
        {userBadges.length ? (
          <>
            <GridDragDrop badgesInstance={badgesInstance} />
            <Stack direction="row" justifyContent="center" gap="1.6rem">
              <Button color="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button loading={loading} color="primary" variant="contained" onClick={handleSave}>
                {loading ? "Saving" : "Save Changes"}
              </Button>
            </Stack>
          </>
        ) : (
          <Empty title="No eligible badges for customize" />
        )}
      </StyledDialogContent>
    </StyledDialog>
  )
}

export default BadgesDialog
