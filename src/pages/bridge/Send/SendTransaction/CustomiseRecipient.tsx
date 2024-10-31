import { useEffect, useMemo, useState } from "react"
import { makeStyles } from "tss-react/mui"

import { Box, InputBase, Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as EditSvg } from "@/assets/svgs/bridge/edit.svg"
import { ReactComponent as RemoveSvg } from "@/assets/svgs/bridge/remove.svg"
import { ReactComponent as WarningSvg } from "@/assets/svgs/bridge/warning.svg"
import TextButton from "@/components/TextButton"
import useInputAddress from "@/hooks/useInputAddress"

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
  const [enableCustomRecipient, setEnableCustomRecipient] = useState(false)
  const {
    ens,
    inputValue: addressInputValue,
    isValidInput,
    isValidEns,
    isValidAddress,
    resolvingEns,
    ensServerError,
    setInputValue: setAddressInputValue,
  } = useInputAddress({
    onAddressChange: handleChangeRecipient,
  })

  useEffect(() => {
    if (!enableCustomRecipient) setAddressInputValue("")
  }, [enableCustomRecipient])

  const invalidUseInputAddressErrorMessage = useMemo(() => {
    if (isValidInput) return
    if (resolvingEns) return "Resolving ENS..."
    if (ensServerError) return ensServerError
    if (ens && !isValidEns) return "Invalid ENS name"
    if (!isValidAddress && !isValidEns) return "Invalid wallet address or ENS name"
    if (!isValidAddress) return "Invalid wallet address"
    if (!isValidEns) return "Invalid ENS name"
  }, [resolvingEns, isValidInput, isValidAddress, isValidEns, ensServerError])

  const showErrorMessage = useMemo(() => {
    return resolvingEns || (!isValidInput && !(!!bridgeWarning && bridgeWarning !== ">0"))
  }, [isValidInput, bridgeWarning, resolvingEns])

  return (
    <Box sx={{ width: "100%", opacity: !!bridgeWarning && bridgeWarning !== ">0" ? "0.3" : 1 }}>
      {enableCustomRecipient ? (
        <Box>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: "0.4rem" }}>
            <Typography className={classes.title} variant="h5">
              Customise recipient
            </Typography>
            <Typography onClick={() => setEnableCustomRecipient(false)} className={classes.title}>
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
              onChange={v => setAddressInputValue(v.target.value)}
              placeholder="Enter a different wallet address or ENS name"
              value={addressInputValue}
            />
          </Stack>
        </Box>
      ) : (
        <TextButton
          className={cx(disabled && classes.disabledButton, readOnly && classes.readOnlyButton, classes.title)}
          disabled={disabled}
          readOnly={readOnly}
          onClick={() => setEnableCustomRecipient(true)}
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
            {invalidUseInputAddressErrorMessage}
          </Stack>
        </Box>
      ) : null}
    </Box>
  )
}

export default CustomiseRecipient
