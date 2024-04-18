import { isEqual } from "lodash"
import { useEffect, useState } from "react"

import { Dialog, DialogContent, DialogTitle, IconButton, Stack, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as CloseSvg } from "@/assets/svgs/canvas/close.svg"
import useSnackbar from "@/hooks/useSnackbar"
import Button from "@/pages/canvas/components/Button"
import { customiseDisplay } from "@/services/canvasService"
// import { attachBadges, detachBadges, reorderBadges } from "@/services/canvasService"
import useCanvasStore from "@/stores/canvasStore"
import { isUserRejected } from "@/utils"

import Empty from "../../components/Empty"
import Transfer from "./Transfer"

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
  // justifyContent: "center",
}))
// TODO:
const BadgesDialog = props => {
  const { mintableBadgeCount } = props
  const {
    userBadges,
    attachedBadges,
    orderedAttachedBadges,
    badgeOrder,
    badgesDialogVisible,
    changeBadgesDialog,
    sortedBadges,
    profileContract,
    queryAttachedBadges,
    changeSortedBadges,
  } = useCanvasStore()
  const alertWarning = useSnackbar()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (badgesDialogVisible) {
      changeSortedBadges(orderedAttachedBadges)
    }
  }, [badgesDialogVisible])

  const handleClose = () => {
    changeBadgesDialog(false)
  }

  const handleSave = () => {
    updateDataAndOrder()
  }

  const simulateThenAttachedBadges = (attachedBadges, hiddenToDisplayed, displayedToHidden) => {
    const badgesAfterAttach = [...attachedBadges, ...hiddenToDisplayed]
    if (displayedToHidden) {
      displayedToHidden.forEach(id => {
        const deleteIndex = badgesAfterAttach.indexOf(id)
        if (deleteIndex < badgesAfterAttach.length - 1) {
          badgesAfterAttach.splice(deleteIndex, 1, badgesAfterAttach[badgesAfterAttach.length - 1])
        }
        badgesAfterAttach.pop()
      })
    }
    return badgesAfterAttach
  }

  const calculateBadgeOrder = (curAttachedBadges, preAttachedBadges) => {
    return preAttachedBadges.map((id, index) => {
      return BigInt(curAttachedBadges.indexOf(id) + 1)
    })
  }

  const handleTransferChange = value => {
    changeSortedBadges(value)
  }

  const updateDataAndOrder = async () => {
    setLoading(true)

    try {
      const displayedToHidden = attachedBadges.filter(id => !sortedBadges.includes(id))
      const hiddenToDisplayed = sortedBadges.filter(id => !attachedBadges.includes(id))

      const nextAttachedBadges = simulateThenAttachedBadges(attachedBadges, hiddenToDisplayed, displayedToHidden)
      const newBadgeOrder = calculateBadgeOrder(sortedBadges, nextAttachedBadges)
      console.log(newBadgeOrder, "newBadgeOrder")

      // if (hiddenToDisplayed.length > 0) {
      //   setLoading(true)

      //   const result = await attachBadges(profileContract, hiddenToDisplayed)
      //   if (result! !== true) {
      //     console.log("mintBadge failed", result)
      //   } else {
      //     queryAttachedBadges()
      //     // handleClose()
      //   }
      //   setLoading(false)
      // }

      // if (displayedToHidden.length > 0) {
      //   const result = await detachBadges(profileContract, displayedToHidden)
      //   if (result! !== true) {
      //     console.log("mintBadge failed", result)
      //   } else {
      //     queryAttachedBadges()
      //     // handleClose()
      //   }
      //   setLoading(false)
      // }

      // if (!isEqual(badgeOrder, newBadgeOrder)) {
      //   const result = await reorderBadges(profileContract, newBadgeOrder)
      //   if (result! !== true) {
      //     console.log("mintBadge failed", result)
      //   } else {
      //     queryAttachedBadges()
      //     // handleClose()
      //   }
      // }

      await customiseDisplay({
        profileContract: profileContract!,
        attachBadges: hiddenToDisplayed.length > 0 ? hiddenToDisplayed : null,
        detachBadges: displayedToHidden.length > 0 ? displayedToHidden : null,
        order: isEqual(badgeOrder, newBadgeOrder) ? null : newBadgeOrder,
      })

      changeBadgesDialog(false)
      queryAttachedBadges()
    } catch (error) {
      if (!isUserRejected(error)) {
        alertWarning(`Failed to customise display: ${error.message}`)
      }
    } finally {
      setLoading(false)
    }
  }

  if (!userBadges.length) {
    return (
      <StyledDialog
        sx={{
          [`& .MuiDialog-paper`]: {
            width: "64rem",
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
        <DialogContent sx={{ pt: "7.6rem", pb: "16rem" }}>
          <Empty title="No badges for customisation" mintableBadgeCount={mintableBadgeCount} />
        </DialogContent>
      </StyledDialog>
    )
  }

  return (
    <StyledDialog
      sx={{
        [`& .MuiDialog-paper`]: {
          width: "120rem",
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
          pt: ["3.2rem", "4.8rem"],
          pb: ["3rem", "4rem"],
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ flex: 1, fontSize: "4rem", fontWeight: 600, color: "primary.contrastText", textAlign: "center" }}>
          Drag badges to customize
        </Typography>
        <IconButton onClick={handleClose}>
          <SvgIcon sx={{ fontSize: ["1.6rem", "2.4rem"], color: "primary.contrastText" }} component={CloseSvg} inheritViewBox></SvgIcon>
        </IconButton>
      </DialogTitle>
      <StyledDialogContent>
        <Transfer
          sx={{ mb: "4.8rem" }}
          titles={["Not displayed", "Displayed"]}
          data={userBadges}
          value={sortedBadges}
          onChange={handleTransferChange}
        ></Transfer>
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
