import { useContext } from "react"
import { ReactComponent as TransferIcon } from "src/assets/svgs/transfer.svg"
import { useStyles } from "tss-react/mui"

import IconButton from "@mui/material/IconButton"
import SvgIcon from "@mui/material/SvgIcon"

import { StyleContext } from "./useSendStyles"

const SendTranferButton = ({ disabled, onClick }) => {
  const styles = useContext(StyleContext)
  const { cx } = useStyles()
  return (
    <div className={cx("flex", "items-center", "justify-center", styles.sendTransfer)}>
      <IconButton
        sx={[
          theme => ({
            color: "link.main",
            padding: "1.2rem",
            backgroundColor: theme.palette.background.default,

            "&:hover": {
              backgroundColor: theme.palette.background.default,
              // mobile
              "@media (hover: none)": {
                backgroundColor: theme.palette.background.default,
              },
            },
            "&:disabled": {
              color: theme.palette.text.disabled,
              backgroundColor: theme.palette.scaleBackground.disabled,
              cursor: "not-allowed",
              pointerEvents: "all",
            },
          }),
        ]}
        disabled={disabled}
        disableRipple
        onClick={onClick}
      >
        <SvgIcon className={styles.sendTransferIcon} component={TransferIcon} />
      </IconButton>
    </div>
  )
}

export default SendTranferButton
