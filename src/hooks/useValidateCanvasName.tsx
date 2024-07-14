import { useEffect, useState } from "react"
import { usePrevious } from "react-use"
import { useDebouncedCallback } from "use-debounce"

import { CircularProgress, SvgIcon, Typography } from "@mui/material"

import SensitiveWord from "@/assets/files/sensitive-word.json"
import { ReactComponent as CheckSvg } from "@/assets/svgs/canvas/check.svg"
import { ReactComponent as WarningSvg } from "@/assets/svgs/canvas/warning.svg"
import { useCanvasContext } from "@/contexts/CanvasContextProvider"
import useCanvasStore from "@/stores/canvasStore"

const useValidateName = value => {
  const { unsignedProfileRegistryContract } = useCanvasContext()
  const { username } = useCanvasStore()

  const preValue = usePrevious(value)
  const [helpText, setHelpText] = useState<string | null>(null)
  const [validating, setValidating] = useState(false)

  useEffect(() => {
    if ((preValue && !value) || value !== username) {
      handleValidateName(value)
    }
  }, [value, username])

  const handleValidateName = useDebouncedCallback(async value => {
    setValidating(true)
    const nextHelpText = await validateName(value)
    setHelpText(nextHelpText)
    setValidating(false)
    return nextHelpText
  }, 300)

  const clearHelpText = () => {
    setHelpText(null)
  }

  const validateName = async name => {
    let nextHelpText
    if (!name) {
      nextHelpText = "Please enter your name"
    } else if (!/^[\dA-Za-z_]{4,15}$/g.test(name)) {
      nextHelpText = (
        <>
          Your name must consist of 4 to 15 characters,<br></br>comprising only letters, numbers or underline.
        </>
      )
    } else if (SensitiveWord.some(word => name.toLowerCase().includes(word.toLowerCase()))) {
      nextHelpText = "This name is not allowed"
    } else {
      const isUsernameUsed = await unsignedProfileRegistryContract.isUsernameUsed(name)
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
          <Typography sx={{ fontSize: ["1.6rem", "1.8rem"], lineHeight: ["2.4rem", "2.8rem"], fontWeight: 500, color: "#A5A5A5 !important" }}>
            Checking...
          </Typography>
        </>
      )
    } else if (helpText !== null) {
      return (
        <>
          <SvgIcon component={helpText ? WarningSvg : CheckSvg} inheritViewBox></SvgIcon>
          <Typography
            sx={{
              fontSize: ["1.6rem", "1.8rem"],
              lineHeight: ["2.4rem", "2.8rem"],
              fontWeight: 500,
              color: helpText ? "#FF684B !important" : "#85E0D1 !important",
              whiteSpace: "nowrap",
            }}
          >
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
