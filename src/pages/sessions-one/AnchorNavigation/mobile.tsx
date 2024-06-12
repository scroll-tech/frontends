import { useEffect, useMemo, useState } from "react"
import { makeStyles } from "tss-react/mui"

import { Box, Button, ClickAwayListener, Fade, Popper, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as DownTriangleSvg } from "@/assets/svgs/sessions/downTriangle.svg"
import useCheckViewport from "@/hooks/useCheckViewport"
// import { NORMAL_HEADER_HEIGHT } from "@/constants"
import useSessionsStore from "@/stores/sessionsStore"

import { default as AnchorNavigation, SESSIONS_SECTION_MAP } from "./index"

const useStyles = makeStyles()(theme => ({
  button: {
    width: "100%",
    height: "4.8rem",
    borderRadius: "0.8rem",
    padding: "0 1.6rem !important",
    backgroundColor: theme.palette.themeBackground.normal,
    border: "none",
    fontWeight: 400,
    justifyContent: "flex-start",
    "&:hover": {
      backgroundColor: theme.palette.themeBackground.normal,
      border: "none",
      color: theme.palette.text.primary,
    },
    [theme.breakpoints.down("sm")]: {
      borderRadius: "0.8rem",
    },
  },
  openButton: {
    borderRadius: "0.8rem 0.8rem 0 0",
  },
  startIcon: {
    marginLeft: 0,
  },
  endIcon: {
    position: "absolute",
    right: "1.6rem",
    willChange: "transform",
    transition: "transform .2s ease-in-out",
  },
  reverseEndIcon: {
    transform: "rotate(180deg)",
  },
}))

const MobileAnchorNavigation = () => {
  const { classes, cx } = useStyles()
  const { selectedSection, changeSelectedSection } = useSessionsStore()

  const { isPortrait } = useCheckViewport()

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>()
  const [popoverWidth, setPopoverWidth] = useState("auto")

  const seletedNavigation = useMemo(() => {
    const item = SESSIONS_SECTION_MAP[selectedSection]
    return item
  }, [selectedSection])

  useEffect(() => {
    const callback: IntersectionObserverCallback = entries => {
      for (const entry of entries) {
        if (entry.intersectionRatio === 1 || entry.isIntersecting) {
          changeSelectedSection(entry.target.id)
          break
        }
      }
    }
    const observerOptions: IntersectionObserverInit = {
      rootMargin: "0px 0px -50%",
    }

    const sectionObserver = new IntersectionObserver(callback, observerOptions)
    document.querySelectorAll(".session-section").forEach(section => {
      sectionObserver.observe(section)
    })
    return () => sectionObserver.disconnect()
  }, [])

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
    setPopoverWidth(event.currentTarget.getBoundingClientRect().width + "px")
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSeleted = () => {
    handleClose()
  }
  return (
    <Box
      sx={{ position: "sticky", zIndex: "appBar", top: "6.2rem", py: "0.8rem", my: ["0.8rem", "1.6rem"], backgroundColor: "themeBackground.light" }}
    >
      <Button
        classes={{
          root: cx(classes.button, Boolean(anchorEl) && classes.openButton),
          startIcon: classes.startIcon,
          endIcon: cx(classes.endIcon, Boolean(anchorEl) && classes.reverseEndIcon),
        }}
        startIcon={
          <Typography sx={{ fontSize: ["1.6rem !important", "1.8rem !important"], lineHeight: "2.4rem", fontWeight: 600 }}>Go to</Typography>
        }
        endIcon={<SvgIcon sx={{ fontSize: ["1.6rem !important", "1.8rem !important"] }} component={DownTriangleSvg} inheritViewBox></SvgIcon>}
        onClick={handleClick}
      >
        <SvgIcon sx={{ fontSize: ["1.6rem", "2rem"], mr: "0.8rem" }} component={seletedNavigation?.icon} inheritViewBox></SvgIcon>
        <Typography sx={{ fontSize: ["1.6rem", "1.8rem"] }}>{seletedNavigation?.label}</Typography>
      </Button>
      <Popper
        open={Boolean(anchorEl)}
        sx={{ zIndex: theme => theme.zIndex.appBar + 1 }}
        anchorEl={anchorEl}
        transition
        disablePortal={isPortrait}
        popperOptions={{
          modifiers: [
            {
              name: "flip",
              enabled: false,
            },
            {
              name: "preventOverflow",
              options: {
                padding: 0,
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Fade {...TransitionProps} timeout={300}>
              <Box sx={{ width: popoverWidth, backgroundColor: "themeBackground.light", pb: "0.8rem" }}>
                <AnchorNavigation mobile onSeleted={handleSeleted}></AnchorNavigation>
              </Box>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
    </Box>
  )
}

export default MobileAnchorNavigation
