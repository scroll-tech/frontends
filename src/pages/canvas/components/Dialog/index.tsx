import { Dialog, DialogContent, DialogTitle, IconButton, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as BackSvg } from "@/assets/svgs/canvas/back.svg"
import { ReactComponent as CloseSvg } from "@/assets/svgs/canvas/close.svg"

const ScrollDialog = props => {
  const { title, fullWidth, allowBack, onClose, onBack, children, extra, ...restProps } = props
  return (
    <Dialog
      maxWidth={false}
      sx={{
        backgroundColor: "rgba(16, 16, 16, 0.60)",
        "& .MuiDialog-paper": {
          backgroundColor: "#101010",
          // // width: "64rem",
          width: fullWidth ? "100%" : "auto",
          maxWidth: "120rem",
          padding: "3rem 3.2rem 3.2rem",
          borderRadius: "1.6rem",
        },
      }}
      onClose={onClose}
      {...restProps}
    >
      <DialogTitle sx={{ padding: 0, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {allowBack && (
          <IconButton sx={{ p: 0, "&:hover": { backgroundColor: "unset" } }} onClick={onBack}>
            <SvgIcon
              sx={{ fontSize: ["1.6rem", "1.8rem"], color: "primary.contrastText", marginRight: "1.2rem" }}
              component={BackSvg}
              inheritViewBox
            ></SvgIcon>
            <Typography component="span" sx={{ fontSize: "1.8rem", color: "primary.contrastText", cursor: "pointer" }}>
              Back
            </Typography>
          </IconButton>
        )}

        <Typography sx={{ fontSize: "2.4rem", lineHeight: "4.8rem", color: "primary.contrastText", fontWeight: 600 }}>{title}</Typography>
        <IconButton sx={{ marginRight: "-0.8rem", "&:hover": { backgroundColor: "unset" } }} onClick={onClose}>
          <SvgIcon sx={{ fontSize: ["1.6rem", "2.4rem"], color: "primary.contrastText" }} component={CloseSvg} inheritViewBox></SvgIcon>
        </IconButton>
      </DialogTitle>
      {/* <Stack direction="row" alignItems="center" sx={{ position: "absolute" }}></Stack> */}
      <DialogContent sx={{ padding: 0 }}>{children}</DialogContent>
      {extra}
    </Dialog>
  )
}

export default ScrollDialog
