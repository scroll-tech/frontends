import { Dialog, DialogContent, DialogTitle, IconButton, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as BackSvg } from "@/assets/svgs/canvas/back.svg"
import { ReactComponent as CloseSvg } from "@/assets/svgs/canvas/close.svg"

const ScrollDialog = props => {
  const { title, sx, fullWidth, allowBack, noClose, onClose, onBack, children, extra, ...restProps } = props

  return (
    <Dialog
      maxWidth={false}
      sx={[
        {
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(16, 16, 16, 0.60)",
          },
          "& .MuiDialog-paper": {
            backgroundColor: theme => theme.palette.themeBackground.dark,
            // // width: "64rem",
            width: fullWidth ? "100%" : "auto",
            minWidth: "64rem",
            maxWidth: "120rem",
            padding: "3rem 3.2rem 3.2rem",
            borderRadius: "1.6rem",
          },
        },
        sx ?? {},
        theme => ({
          [theme.breakpoints.down("sm")]: {
            "& .MuiDialog-paper": {
              margin: 0,
              borderRadius: 0,
              height: "calc(var(--vh, 1vh) * 100)",
              maxHeight: "unset",
              minWidth: "unset",
              width: "100%",
              padding: "1.1rem 2rem 2.4rem",
            },
          },
        }),
      ]}
      onClose={onClose}
      {...restProps}
    >
      <DialogTitle sx={{ padding: 0, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {allowBack && (
          <IconButton sx={{ p: 0, "&:hover": { backgroundColor: "unset" } }} onClick={onBack}>
            <SvgIcon sx={{ fontSize: "2.4rem", color: "primary.contrastText", marginRight: "1.2rem" }} component={BackSvg} inheritViewBox></SvgIcon>
            <Typography component="span" sx={{ fontSize: ["1.6rem", "1.8rem"], fontWeight: 600, color: "primary.contrastText", cursor: "pointer" }}>
              Back
            </Typography>
          </IconButton>
        )}

        <Typography sx={{ fontSize: ["1.8rem", "2.4rem"], lineHeight: ["2.8rem", "4.8rem"], color: "primary.contrastText", fontWeight: 600 }}>
          {title}
        </Typography>
        {!noClose && (
          <IconButton sx={{ marginRight: "-0.8rem", "&:hover": { backgroundColor: "unset" } }} onClick={onClose}>
            <SvgIcon sx={{ fontSize: ["2.4rem"], color: "primary.contrastText" }} component={CloseSvg} inheritViewBox></SvgIcon>
          </IconButton>
        )}
      </DialogTitle>
      {/* <Stack direction="row" alignItems="center" sx={{ position: "absolute" }}></Stack> */}
      <DialogContent
        sx={[
          {
            padding: 0,
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(209, 205, 204, 0.30)",
              borderRadius: "8px",
            },
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            // Firefox
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(209, 205, 204, 0.30) transparent",
          },
          theme => ({
            [theme.breakpoints.down("sm")]: {
              display: "flex",
              alignItems: "center",
            },
          }),
        ]}
      >
        {children}
      </DialogContent>

      {extra}
    </Dialog>
  )
}

export default ScrollDialog
