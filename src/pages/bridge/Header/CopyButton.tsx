import copy from "copy-to-clipboard"
import { SyntheticEvent, useState } from "react"

import { Tooltip, Zoom } from "@mui/material"

import { ReactComponent as CopyIcon } from "@/assets/svgs/copy.svg"

import MiniButton from "../components/Button/MiniButton"

const CopyButton = (props: any) => {
  const { value, ...restProps } = props
  const [text, setText] = useState<string>("")

  const handleClick = (event: SyntheticEvent) => {
    event.preventDefault()
    if (!value) {
      return
    }
    copy(value)
    setText("copied!")
    setTimeout(() => {
      setText("")
    }, 3 * 1e3)
  }

  return (
    <Tooltip title={text} open={!!text} TransitionComponent={Zoom} placement="top" arrow>
      <span>
        <MiniButton icon={CopyIcon} viewBox="0 0 21 20" label="Copy Address" onClick={handleClick} {...restProps} />
      </span>
    </Tooltip>
  )
}
export default CopyButton
