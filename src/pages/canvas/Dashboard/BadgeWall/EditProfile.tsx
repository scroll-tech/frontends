import { useRef } from "react"

import { Box, IconButton, Menu, MenuItem, Stack, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import { ReactComponent as EditProfileSvg } from "@/assets/svgs/canvas/edit-profile.svg"
import { ReactComponent as LockSvg } from "@/assets/svgs/canvas/lock.svg"
import Link from "@/components/Link"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { useAsyncMemo } from "@/hooks"
import { checkHasBadge } from "@/services/canvasService"
import useCanvasProfileStore from "@/stores/canvasProfileStore"
import useCanvasStore from "@/stores/canvasStore"

import Tooltip from "../../components/Tooltip"

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
})

const EditMenu = styled<any>(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "0.5rem",
    padding: "0 0.8rem",
    marginTop: "0.6rem",
  },
  "& .MuiMenu-list": {
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
}))

const EditProfile = props => {
  const { sx } = props

  const { walletCurrentAddress, provider } = useRainbowContext()

  const { changeProfileDialog } = useCanvasStore()
  const { changePreviewAvatarURL, changeCropAvatarDialogVisible, changeNFTsDialogVisible, editProfileVisible, changeEditProfileVisible } =
    useCanvasProfileStore()

  const editButtonRef = useRef<null | HTMLButtonElement>(null)

  const isNFTEligible = useAsyncMemo(() => {
    return checkHasBadge(provider, walletCurrentAddress, "0x3dacAd961e5e2de850F5E027c70b56b5Afa5DfeD")
  }, [walletCurrentAddress, provider])

  const handleOpenEditMenu = e => {
    changeEditProfileVisible(true)
  }
  const handleCloseEditMenu = () => {
    changeEditProfileVisible(false)
  }
  const handleOpenNameDialog = () => {
    changeProfileDialog(true)
    handleCloseEditMenu()
  }
  const handlePickPicture = event => {
    const reader = new FileReader()
    reader.addEventListener(
      "load",
      () => {
        changePreviewAvatarURL(reader.result)
        changeCropAvatarDialogVisible(true)
      },
      false,
    )
    const file = event.target.files[0]
    if (file) {
      reader.readAsDataURL(file)
    }
  }
  const handleOpenPickNFTDialog = () => {
    changeNFTsDialogVisible(true)
    handleCloseEditMenu()
  }

  const editMenuItems = [
    {
      label: "Edit name",
      action: handleOpenNameDialog,
    },
    {
      label: "Upload a profile picture",
      upload: true,
      // action: handleCloseEditMenu,
    },
    { label: "Set an NFT as profile", disabled: !isNFTEligible, action: handleOpenPickNFTDialog },
  ]
  return (
    <>
      <IconButton ref={editButtonRef} sx={{ backgroundColor: "#262626 !important", ...sx }} onClick={handleOpenEditMenu}>
        <SvgIcon sx={{ fontSize: "2.4rem" }} component={EditProfileSvg} inheritViewBox></SvgIcon>
      </IconButton>
      <EditMenu
        anchorEl={editButtonRef.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={editProfileVisible}
        onClose={handleCloseEditMenu}
      >
        {editMenuItems.map(({ label, action, upload, disabled }) => (
          <Tooltip
            disableHoverListener={!disabled}
            disableFocusListener={!disabled}
            disableTouchListener={!disabled}
            // leaveDelay={500}
            title={
              <Box sx={{ width: "24.4rem" }}>
                <Typography sx={{ fontSize: "1.6rem", lineHeight: "2.4rem", fontWeight: 500, color: "primary.contrastText" }}>
                  Unlock{" "}
                  <Link sx={{ color: "inherit" }} underline="always" href="/canvas/badge-contract/0x3dacAd961e5e2de850F5E027c70b56b5Afa5DfeD">
                    Ethereum year badge
                  </Link>{" "}
                  to unlock this perk.
                </Typography>
              </Box>
            }
            // PopperProps={{
            //   popperOptions: {
            //     modifiers: [
            //       {
            //         name: "offset",
            //         options: {
            //           offset: ({ placement, reference, popper }) => {
            //             return [(reference.width - popper.width) / 2, 12]
            //           },
            //         },
            //       },
            //     ],
            //   },
            // }}
          >
            <MenuItem
              component={upload ? "label" : "li"}
              sx={{
                p: "0.8rem",
                fontSize: "1.6rem",
                lineHeight: "2.4rem",
                fontWeight: 600,
                cursor: disabled ? "default" : "pointer",
                "&:hover": {
                  color: disabled ? "inherit" : "primary.main",
                  backgroundColor: "unset",
                },
                "&.Mui-disabled": {
                  opacity: 1,
                },
              }}
              onClick={disabled ? () => void 0 : action}
            >
              {label}
              {!!upload && <VisuallyHiddenInput id="canvas-avatar" name="file" type="file" accept="image/*" onChange={handlePickPicture} />}
              {disabled && (
                <Stack
                  direction="row"
                  alignItems="center"
                  gap="0.4rem"
                  sx={{ ml: "1.6rem", px: "0.8rem", height: "2rem", borderRadius: "0.4rem", backgroundColor: "#B5F5EC" }}
                >
                  <SvgIcon sx={{ fontSize: "1.2rem" }} component={LockSvg} inheritViewBox></SvgIcon>
                  <Typography sx={{ fontSize: "1.2rem", fontWeight: 600, cursor: "inherit" }}>Scroll Perk</Typography>
                </Stack>
              )}
            </MenuItem>
          </Tooltip>
        ))}
      </EditMenu>
    </>
  )
}

export default EditProfile
