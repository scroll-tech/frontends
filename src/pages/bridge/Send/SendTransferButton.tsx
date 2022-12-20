import { useContext } from "react"
import classNames from "classnames"
import IconButton from "@mui/material/IconButton"
import SvgIcon from "@mui/material/SvgIcon"
import { StyleContext } from "./useSendStyles"
import { ReactComponent as TransferIcon } from "src/assets/svgs/transfer.svg"

const SendTranferButton = ({ disabled, onClick }) => {
  const styles = useContext(StyleContext)
  return (
    <div className={classNames("flex", "items-center", "justify-center", styles.sendTransfer)}>
      <IconButton className="bg-white text-[#00A6F2]" disabled={disabled} disableRipple onClick={onClick}>
        <SvgIcon className={styles.sendTransferIcon} component={TransferIcon} />
      </IconButton>
    </div>
  )
}

export default SendTranferButton
