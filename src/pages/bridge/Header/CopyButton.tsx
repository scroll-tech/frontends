import { useState, SyntheticEvent } from "react";
import { Tooltip } from "@mui/material";
import copy from "copy-to-clipboard";
import { ReactComponent as CopyIcon } from "@/assets/svgs/copy.svg";
import MiniButton from "../components/Button/MiniButton";

const CopyButton = (props: any) => {
  const { value, ...restProps } = props;
  const [text, setText] = useState<string>("");

  const handleClick = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!value) {
      return;
    }
    copy(value);
    setText("copied!");
    setTimeout(() => {
      setText("");
    }, 3 * 1e3);
  };

  return (
    <Tooltip title={text} open={!!text} placement="top" arrow>
      <>
        <MiniButton
          icon={CopyIcon}
          viewBox="0 0 21 20"
          label="Copy Address"
          onClick={handleClick}
          {...restProps}
        ></MiniButton>
      </>
    </Tooltip>
  );
};
export default CopyButton;
