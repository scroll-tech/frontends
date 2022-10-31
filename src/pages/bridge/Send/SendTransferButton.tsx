import { useContext } from "react";
import classNames from "classnames";
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";
import { StyleContext } from "./useSendStyles";
import { ReactComponent as TransferIcon } from "src/assets/svgs/transfer.svg";

const SendTranferButton = ({ onClick }) => {
  const styles = useContext(StyleContext);
  return (
    <div
      className={classNames(
        "flex",
        "items-center",
        "justify-center",
        "cursor-pointer",
        styles.sendTransfer
      )}
      onClick={onClick}
    >
      <IconButton className="bg-white" disableRipple>
        <SvgIcon className={styles.sendTransferIcon} component={TransferIcon} />
      </IconButton>
    </div>
  );
};

export default SendTranferButton;
