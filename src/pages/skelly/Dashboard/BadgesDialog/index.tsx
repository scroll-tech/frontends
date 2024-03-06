import { isEqual } from "lodash"
import { useEffect, useMemo } from "react"
import { useState } from "react"

import { Dialog, DialogContent, DialogTitle, IconButton, Stack, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as CloseSvg } from "@/assets/svgs/bridge/close.svg"
import { BADGES_VISIBLE_TYPE } from "@/constants"
import { useSkellyContext } from "@/contexts/SkellyContextProvider"
import Button from "@/pages/skelly/components/Button"
// import { useSkellyContext } from "@/contexts/SkellyContextProvider"
import useSkellyStore from "@/stores/skellyStore"

import GridDragDrop from "./GridDragDrop"

const StyledDialog = styled(Dialog)(({ theme }) => ({
  borderRadius: "1.6rem",
  backgroundColor: "rgba(16, 16, 16, 0.60)",
  // backdropFilter: "blur(50px)",
  "& .MuiDialog-paper": {
    // background: "linear-gradient(114deg, #2A2A2A 0%, rgba(27, 27, 27, 0.60) 100%)",
    // backdropFilter: "blur(50px)",
    backgroundColor: "#101010",
    maxWidth: "120rem",
    width: "100%",
  },
}))

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: "3rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}))

const BadgesDialog = () => {
  const { userBadges, attachedBadges, detachBadges, attachBadges, getAttachedBadges, badgeOrder, reorderBadges } = useSkellyContext()
  const [loading, setLoading] = useState(false)

  const badgesInstance = useMemo(() => {
    return {
      [BADGES_VISIBLE_TYPE.INVISIBLE]: userBadges.filter(badge => !attachedBadges.includes(badge.id)),
      [BADGES_VISIBLE_TYPE.VISIBLE]: attachedBadges.map(badgeId => userBadges.find(badge => badge.id === badgeId)),
    }
  }, [userBadges, attachedBadges])

  const { badgesDialogVisible, changeBadgesDialog, sortedBadges } = useSkellyStore()

  useEffect(() => {
    // console.log("sortedBadges", sortedBadges)
    // console.log("badgeOrder", badgeOrder)
  }, [sortedBadges])

  const handleClose = () => {
    changeBadgesDialog(false)
  }

  const handleSave = () => {
    setLoading(true)
    updateDataAndOrder()
    // changeBadgesDialog(false)
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

    // const newOrder = displayedIds.map(id => data.Displayed.findIndex(item => item.id === id)).filter(index => index !== -1);
    const newArrayOrder: number[] = calculateRelativeOrder(originalIds, currentDisplayedIds)

    console.log("hiddle -> visible:", hiddenToDisplayed)
    console.log("visible -> hidden:", displayedToHidden)
    console.log("newArrayOrder:", newArrayOrder)
    // console.log('item order:', newOrder);

    // setData(updatedData)
    // setOrder(newOrder)
    if (hiddenToDisplayed.length > 0) {
      const result = await attachBadges(hiddenToDisplayed)
      if (result! !== true) {
        console.log("mintBadge failed", result)
      } else {
        getAttachedBadges()
        handleClose()
      }
      setLoading(false)
      // customiseDisplay(hiddenToDisplayed, displayedToHidden)
    }

    if (displayedToHidden.length > 0) {
      const result = await detachBadges(displayedToHidden)
      if (result! !== true) {
        console.log("mintBadge failed", result)
      } else {
        getAttachedBadges()
        handleClose()
      }
      setLoading(false)
    }

    if (!isEqual(badgeOrder, newArrayOrder)) {
      const result = await reorderBadges(newArrayOrder)
      if (result! !== true) {
        console.log("mintBadge failed", result)
      } else {
        getAttachedBadges()
        handleClose()
      }
    }
    setLoading(false)
  }

  return (
    <StyledDialog maxWidth={false} onClose={handleClose} open={badgesDialogVisible}>
      <DialogTitle
        sx={{
          m: 0,
          p: ["2rem", "3rem"],
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" sx={{ flexGrow: 1, color: "#ffffff", textAlign: "center" }}>
          Drag badges to cutomize
        </Typography>
        <IconButton sx={{ p: 0, "&:hover": { backgroundColor: "unset" } }}>
          <SvgIcon sx={{ fontSize: ["1.6rem", "1.8rem"] }} component={CloseSvg} inheritViewBox></SvgIcon>
        </IconButton>
      </DialogTitle>
      <StyledDialogContent>
        <GridDragDrop badgesInstance={badgesInstance} />
        <Stack direction="row" justifyContent="center" gap="1.6rem">
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button loading={loading} color="primary" variant="contained" onClick={handleSave}>
            {loading ? "Saving" : "Save Changes"}
          </Button>
        </Stack>
      </StyledDialogContent>
    </StyledDialog>
  )
}

export default BadgesDialog
