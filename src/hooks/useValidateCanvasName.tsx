import { useEffect, useRef, useState } from "react"
import { usePrevious } from "react-use"
import { useDebouncedCallback } from "use-debounce"
import { hexToBool } from "viem"

import { CircularProgress, SvgIcon, Typography } from "@mui/material"

import SensitiveWord from "@/assets/files/sensitive-word.json"
import { ReactComponent as CheckSvg } from "@/assets/svgs/canvas/check.svg"
import { ReactComponent as WarningSvg } from "@/assets/svgs/canvas/warning.svg"
import { RPC_URL } from "@/constants"
import { useCanvasContext } from "@/contexts/CanvasContextProvider"
import useCanvasStore from "@/stores/canvasStore"

const useValidateName = value => {
  const { unsignedProfileRegistryContract } = useCanvasContext()
  const { username } = useCanvasStore()

  const preValue = usePrevious(value)
  const [helpText, setHelpText] = useState<string | JSX.Element | null>(null)
  const [validating, setValidating] = useState(false)
  const controller = useRef<any>()

  useEffect(() => {
    if ((preValue && !value) || value !== username) {
      handleValidateName(value)
    }
  }, [value, username])

  const handleValidateName = useDebouncedCallback(async value => {
    setValidating(true)
    const nextHelpText: string | JSX.Element = await validateName(value)
    setHelpText(nextHelpText)
    setValidating(false)
    return nextHelpText
  }, 300)

  const clearHelpText = () => {
    setHelpText(null)
  }

  const validateName = async name => {
    let nextHelpText: string | JSX.Element = ""
    if (controller.current) {
      controller.current.abort("user input")
    }

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
      // const isUsernameUsedCallData = encodeFunctionData({
      //   abi: ProfileRegistryABI,
      //   functionName: "isUsernameUsed",
      //   args: [name],
      // })
      // const callParams = {
      //   to: requireEnv("REACT_APP_PROFILE_REGISTRY_ADDRESS"),
      //   data: isUsernameUsedCallData,
      // }
      //
      // TODO: viem will implement request cancellation
      const callParams = await unsignedProfileRegistryContract.isUsernameUsed.populateTransaction(name)
      const data = {
        jsonrpc: "2.0",
        method: "eth_call",
        params: [callParams, "latest"],
        id: 123,
      }
      controller.current = new AbortController()
      const result = await scrollRequest(RPC_URL.L2, {
        method: "POST",
        body: JSON.stringify(data),
        signal: controller.current.signal,
      })
      const isUsernameUsed = hexToBool(result.result)
      if (isUsernameUsed) {
        nextHelpText = "This name is already taken"
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
