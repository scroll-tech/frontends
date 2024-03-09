import { isAddress } from "ethers"
import { useEffect, useMemo, useState } from "react"
import { makeStyles } from "tss-react/mui"

import { Box, InputBase, Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as EditSvg } from "@/assets/svgs/bridge/edit.svg"
import { ReactComponent as RemoveSvg } from "@/assets/svgs/bridge/remove.svg"
import { ReactComponent as WarningSvg } from "@/assets/svgs/bridge/warning.svg"
import TextButton from "@/components/TextButton"

const useStyles = makeStyles()(theme => ({
  title: {
    fontSize: "1.8rem",
    lineHeight: "3.6rem",
    fontWeight: 500,
    textAlign: "left",
    cursor: "pointer",
    color: "#101010",
    [theme.breakpoints.down("md")]: {
      lineHeight: "1",
    },
  },
  disabledButton: {
    pointerEvents: "none",
    color: "#EBC28E",
  },
  readOnlyButton: {
    pointerEvents: "none",
  },
}))

const CustomiseRecipient = props => {
  const { handleChangeRecipient, bridgeWarning, disabled, readOnly } = props
  const { classes, cx } = useStyles()

  const [isEditing, setIsEditing] = useState(false)

  const [recipient, setRecipient] = useState("")
  const [isValidate, setIsValidate] = useState(false)

  const handleChangeAddress = recipient => {
    setRecipient(recipient.trim())
  }

  useEffect(() => {
    if (isAddress(recipient)) {
      handleChangeRecipient(recipient)
      setIsValidate(true)
    } else {
      handleChangeRecipient(null)
      setIsValidate(false)
    }
  }, [recipient])

  useEffect(() => {
    if (!isEditing) {
      setRecipient("")
    }
  }, [isEditing])

  const showErrorMessage = useMemo(() => {
    return recipient && !isValidate && !(!!bridgeWarning && bridgeWarning !== ">0")
  }, [isValidate, recipient, bridgeWarning])
  return (
    <Box sx={{ width: "100%", opacity: !!bridgeWarning && bridgeWarning !== ">0" ? "0.3" : 1 }}>
      {isEditing ? (
        <Box>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: "0.4rem" }}>
            <Typography className={classes.title} variant="h5">
              Customise recipient
            </Typography>
            <Typography onClick={() => setIsEditing(false)} className={classes.title}>
              <SvgIcon sx={{ fontSize: "1.6rem", marginRight: "0.4rem" }} component={RemoveSvg} inheritViewBox />
              <span style={{ color: "#FF684B" }}>Remove</span>
            </Typography>
          </Stack>
          <Stack spacing={2}>
            <InputBase
              sx={{
                width: "100%",
                padding: "0.8rem 1.6rem",
                fontSize: "2rem",
                lineHeight: "2.4rem",
                fontWeight: 500,
                background: "#ffffff",
                border: showErrorMessage ? "2px solid #FF684B" : "1px solid #473835",
                borderRadius: "1rem",
              }}
              disabled={disabled}
              onChange={v => handleChangeAddress(v.target.value)}
              placeholder="Enter a different wallet address"
              value={recipient}
            />
          </Stack>
        </Box>
      ) : (
        <TextButton
          className={cx(disabled && classes.disabledButton, readOnly && classes.readOnlyButton, classes.title)}
          disabled={disabled}
          readOnly={readOnly}
          onClick={() => setIsEditing(true)}
        >
          Customise recipient
          <SvgIcon sx={{ fontSize: "1.6rem", marginLeft: "0.4rem" }} component={EditSvg} inheritViewBox></SvgIcon>
        </TextButton>
      )}
      {showErrorMessage ? (
        <Box sx={{ mt: "0.4rem" }}>
          <SvgIcon
            sx={{ fontSize: "1.6rem", mr: "0.8rem", verticalAlign: "middle", color: "#FF684B" }}
            component={WarningSvg}
            inheritViewBox
          ></SvgIcon>
          <Stack
            component="span"
            direction="row"
            style={{ fontSize: "1.6rem", display: "inline-flex", verticalAlign: "middle", alignItems: "center", color: "#FF684B" }}
          >
            Invalid wallet address
          </Stack>
        </Box>
      ) : null}
    </Box>
  )
}

export default CustomiseRecipient
