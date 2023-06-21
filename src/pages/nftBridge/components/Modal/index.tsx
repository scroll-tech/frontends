import CloseIcon from "@mui/icons-material/Close"
import { CircularProgress, Dialog, DialogContent, DialogTitle, Icon, IconButton, Typography } from "@mui/material"

import { ReactComponent as SuccessSvg } from "@/assets/svgs/success.svg"

const Modal = props => {
  const { open, title, variant, children, onClose } = props
  const renderIndicator = () => {
    if (variant === "loading") {
      return (
        <CircularProgress
          size={50}
          thickness={3}
          sx={{
            color: "tagSuccess.main",
            mb: "2.4rem",
          }}
        ></CircularProgress>
      )
    } else if (variant === "success") {
      return <Icon sx={{ fontSize: "9rem" }} component={SuccessSvg}></Icon>
    }
    return null
  }

  return (
    <Dialog open={open} disableScrollLock>
      <DialogTitle sx={{ p: "2.4rem 2.8rem", display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          sx={[
            theme => ({
              color: "text.primary",
            }),
          ]}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "50rem", textAlign: "center" }}>
        {renderIndicator()}
        <Typography variant="h4" sx={{ mt: "0.8rem" }}>
          {title}
        </Typography>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default Modal
