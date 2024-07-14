import { isEqual } from "lodash"
import { useEffect, useState } from "react"

import { Box, Dialog, DialogContent, DialogTitle, IconButton, Stack, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as CloseSvg } from "@/assets/svgs/canvas/close.svg"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useSnackbar from "@/hooks/useSnackbar"
import Button from "@/pages/canvas/components/Button"
import { default as CanvasDialog } from "@/pages/canvas/components/Dialog"
import { customiseDisplay } from "@/services/canvasService"
// import { attachBadges, detachBadges, reorderBadges } from "@/services/canvasService"
import useCanvasStore from "@/stores/canvasStore"
import { isUserRejected, sentryDebug, trimErrorMessage } from "@/utils"

import Empty from "../../components/Empty"
import Transfer from "./Transfer"

const StyledDialog = styled(Dialog)(({ theme }) => ({
  borderRadius: "1.6rem",
  "& .MuiBackdrop-root": {
    backgroundColor: "rgba(16, 16, 16, 0.60)",
  },
  "& .MuiDialog-paper": {
    background: "linear-gradient(127deg, #2A2A2A 0.6%, #101010 100%)",
    width: "112rem",
    [theme.breakpoints.down("sm")]: {
      margin: 0,
      borderRadius: 0,
      maxHeight: "unset",
      maxWidth: "unset",
      height: "100%",
      width: "100%",
    },
  },
}))

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: "0 3.2rem 4.8rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  // justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    // flexDirection: "row",
    padding: "0 2rem 2.4rem",
  },
}))
// TODO:
const CustomizeDisplayDialog = props => {
  // const { mintableBadgeCount } = props
  const { walletCurrentAddress } = useRainbowContext()
  const {
    userBadges,
    attachedBadges,
    orderedAttachedBadges,
    badgeOrder,
    customizeDisplayDialogVisible,
    changeCustomizeDisplayDialogVisible,
    sortedBadges,
    profileContract,
    queryAttachedBadges,
    changeSortedBadges,
    mintableBadges,
  } = useCanvasStore()
  const alertWarning = useSnackbar()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (customizeDisplayDialogVisible) {
      changeSortedBadges(orderedAttachedBadges)
    }
  }, [customizeDisplayDialogVisible])

  const handleClose = () => {
    changeCustomizeDisplayDialogVisible(false)
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
      // console.log(newBadgeOrder, "newBadgeOrder")

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

      changeCustomizeDisplayDialogVisible(false)
      queryAttachedBadges()
    } catch (error) {
      if (!isUserRejected(error)) {
        sentryDebug(`customise display:${walletCurrentAddress}-${error.message}`)
        alertWarning(trimErrorMessage(error.message))
      }
    } finally {
      setLoading(false)
    }
  }

  if (!userBadges.length) {
    return (
      <CanvasDialog onClose={handleClose} open={customizeDisplayDialogVisible}>
        <Box sx={{ my: [0, "8rem"] }}>
          <Empty title="No badges for customisation" mintableBadgeCount={mintableBadges.length} />
        </Box>
      </CanvasDialog>
    )
  }

  return (
    <StyledDialog maxWidth={false} onClose={handleClose} open={customizeDisplayDialogVisible}>
      <DialogTitle
        sx={{
          m: 0,
          p: ["2rem", "3rem"],
          pt: ["1.2rem", "4rem"],
          pb: ["1.2rem", "4rem"],
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ flex: 1, fontSize: ["2rem", "2.4rem"], fontWeight: 600, color: "primary.contrastText", textAlign: "center" }}>
          Drag badges to customize
        </Typography>
        <IconButton onClick={handleClose}>
          <SvgIcon sx={{ fontSize: "2.4rem", mr: "-0.8rem", color: "primary.contrastText" }} component={CloseSvg} inheritViewBox></SvgIcon>
        </IconButton>
      </DialogTitle>
      <StyledDialogContent>
        <Transfer
          sx={{ mb: [0, "4rem"] }}
          titles={["Not displayed", "Displayed"]}
          data={userBadges}
          value={sortedBadges}
          onChange={handleTransferChange}
        ></Transfer>
        <Stack
          direction="row"
          justifyContent="center"
          gap="1.6rem"
          sx={theme => ({
            [theme.breakpoints.down("sm")]: {
              position: "fixed",
              bottom: 0,
              width: "100%",
              p: "2.4rem 2rem",
              "& > *": {
                width: "50%",
              },
            },
          })}
        >
          <Button color="secondary" sx={{ borderColor: "#fff !important" }} onClick={handleClose}>
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

export default CustomizeDisplayDialog
