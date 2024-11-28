import { useEffect, useRef, useState } from "react"
import { usePrevious } from "react-use"
import { useDebouncedCallback } from "use-debounce"
import { namehash, normalize } from "viem/ens"

import { CircularProgress, SvgIcon, Typography } from "@mui/material"

import { fetchIsNameTakenURL } from "@/apis/canvas-profile"
import SensitiveWord from "@/assets/files/sensitive-word.json"
import { ReactComponent as CheckSvg } from "@/assets/svgs/canvas/check.svg"
import { ReactComponent as WarningSvg } from "@/assets/svgs/canvas/warning.svg"

const useValidateENSSubdomain = value => {
  const preValue = usePrevious(value)
  const [helpText, setHelpText] = useState<string | JSX.Element | null>(null)
  const [validating, setValidating] = useState(false)
  const controller = useRef<any>()

  useEffect(() => {
    if (preValue !== undefined) {
      handleValidateName(value)
    }
  }, [value])

  const handleValidateName = useDebouncedCallback(async value => {
    setValidating(true)
    const nextHelpText: string | JSX.Element = await validateENSSubdomain(value)
    setHelpText(nextHelpText)
    setValidating(false)
    return nextHelpText
  }, 300)

  const clearHelpText = () => {
    setHelpText(null)
  }

  const validateENSSubdomain = async name => {
    let nextHelpText: string | JSX.Element = ""
    if (controller.current) {
      controller.current.abort("user input")
    }

    if (!name) {
      nextHelpText = "Please enter your subdomain name"
    } else if (name.length < 4 || name.length > 15) {
      nextHelpText = <>The subdomain name must consist of 4 to 15 characters.</>
    } else if (/[/]+/g.test(name) || SensitiveWord.some(word => name.toLowerCase().includes(word.toLowerCase()))) {
      nextHelpText = "This subdomain name is not allowed"
    } else {
      const ensSubdomain = name + ".scroll.eth"
      try {
        namehash(normalize(ensSubdomain))
      } catch (err) {
        nextHelpText = "This subdomain name is not allowed"
      } finally {
        controller.current = new AbortController()

        const { taken } = await scrollRequest(fetchIsNameTakenURL(name), {
          signal: controller.current.signal,
        })
        if (taken) {
          nextHelpText = "This subdomain name is already taken"
        }
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
            {helpText || "This subdomain name is available"}
          </Typography>
        </>
      )
    }
    return null
  }

  return { helpText, clearHelpText, validating, renderValidation, handleValidateName }
}

export default useValidateENSSubdomain
