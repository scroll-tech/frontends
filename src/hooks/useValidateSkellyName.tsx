import { useState } from "react"

import { CircularProgress, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as CheckSvg } from "@/assets/svgs/skelly/check.svg"
import { ReactComponent as WarningSvg } from "@/assets/svgs/skelly/warning.svg"
import { useSkellyContext } from "@/contexts/SkellyContextProvider"

const useValidateName = value => {
  const { profileRegistryContract } = useSkellyContext()

  const [helpText, setHelpText] = useState<string | null>(null)
  const [validating, setValidating] = useState(false)

  const handleValidateName = async () => {
    setValidating(true)
    const nextHelpText = await validateName(value)
    setHelpText(nextHelpText)
    setValidating(false)
    return nextHelpText
  }

  const clearHelpText = () => {
    setHelpText(null)
  }

  const validateName = async name => {
    let nextHelpText
    if (!name) {
      nextHelpText = "Please enter your name"
    } else if (!/^[\dA-Za-z_]{4,15}$/g.test(name)) {
      nextHelpText = "Must consist of 4-15 characters, including A-Z/a-z/0-9/_"
    } else {
      const isUsernameUsed = await profileRegistryContract.isUsernameUsed(name)
      if (isUsernameUsed) {
        nextHelpText = "This name is already taken"
      } else {
        nextHelpText = ""
      }
    }
    return nextHelpText
  }

  const renderValidation = () => {
    if (validating) {
      return (
        <>
          <CircularProgress sx={{ color: "#A5A5A5" }} size={18}></CircularProgress>
          <Typography sx={{ font: "500 1.8rem/2.8rem", color: "#A5A5A5" }}>Checking...</Typography>
        </>
      )
    } else if (helpText !== null) {
      return (
        <>
          <SvgIcon component={helpText ? WarningSvg : CheckSvg} inheritViewBox></SvgIcon>
          <Typography sx={{ font: "600 1.8rem/2.8rem", color: helpText ? "primary.main" : "#85E0D1", whiteSpace: "nowrap" }}>
            {helpText || "This name is available"}
          </Typography>
        </>
      )
    }
    return null
  }

  return { helpText, clearHelpText, validating, renderValidation, handleValidateName }
}

export default useValidateName
