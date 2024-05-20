import React, { useEffect, useMemo, useRef, useState } from "react"

import { Box, InputBase, Stack, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { checkCodeValidation } from "@/apis/canvas"
import { ReactComponent as CheckSvg } from "@/assets/svgs/canvas/check.svg"
import { ReactComponent as ErrorSvg } from "@/assets/svgs/canvas/error.svg"
import { ReactComponent as LoadingSvg } from "@/assets/svgs/canvas/loading.svg"
import useCanvasStore from "@/stores/canvasStore"

const INVITE_CODE_LENGTH = 5

export enum CodeStatus {
  VALID = "Valid",
  INVALID = "Invalid",
  UNKNOWN = "Unknown",
}

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  textAlign: "center",
  fontSize: "1.8rem",
  fontWeight: 600,
  lineHeight: "2.8rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.6rem",
    lineHeight: "2.4rem",
  },
}))

const ReferralCodeBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: "1.6rem",
  marginBottom: "4rem",
  gap: "0.8rem",
  [theme.breakpoints.down("sm")]: {
    marginBottom: 0,
  },
}))

const ReferralCodeInput = styled(InputBase)(({ theme }) => ({
  backgroundColor: "#101010",
  color: theme.palette.primary.contrastText,
  border: "1px solid #5b5b5b",
  borderRadius: "1rem",
  width: "7.2rem",
  height: "7.2rem",

  fontSize: "4rem",
  fontWeight: 600,
  textAlign: "center",
  "& input": {
    textAlign: "center",
    padding: 0,
  },
  "&.Mui-focused": {
    borderColor: theme.palette.primary.contrastText,
  },
  "&::placeholder": {
    color: "#DCDCDC",
    opacity: 1,
  },
  [theme.breakpoints.down("sm")]: {
    width: "5.6rem",
    height: "5.6rem",
    fontSize: "3.2rem",
  },
}))

const StatusBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "1rem",
  left: "50%",
  transform: "translateX(-50%)",
  [theme.breakpoints.down("sm")]: {
    bottom: "-4.2rem",
  },
}))

const StatusContent = styled(Typography)(({ theme }) => ({
  fontSize: "1.6rem",
  fontWeight: 500,
  lineHeight: "2.8rem",
  color: "#A5A5A5",
  whiteSpace: "nowrap",
  [theme.breakpoints.down("sm")]: {
    lineHeight: "2.4rem",
  },
}))

const ReferralCode = ({ isChecking, setIsChecking, code, codeStatus, setCodeStatus }) => {
  const [codes, setCodes] = useState(Array(INVITE_CODE_LENGTH).fill(""))
  // const [codeStatus, setCodeStatus] = useState(CodeStatus.UNKNOWN)
  const inputRefs = useRef<Array<HTMLInputElement | null>>(new Array(INVITE_CODE_LENGTH).fill(null))
  const { changeReferralCode } = useCanvasStore()

  useEffect(() => {
    if (code) {
      setCodes(code.split(""))
      inputRefs.current[INVITE_CODE_LENGTH - 1]?.focus()
    }
  }, [code])

  const referralCode = useMemo(() => {
    return codes.join("")
  }, [codes])

  useEffect(() => {
    // Check if all codes are filled and then validate
    if (codes.every(code => code.length === 1)) {
      validateCode(referralCode)
    }
  }, [codes])

  const validateCode = async (code: string) => {
    try {
      setIsChecking(true)
      const { active } = await scrollRequest(checkCodeValidation(code))
      if (active) {
        changeReferralCode(code)
        setCodeStatus(CodeStatus.VALID)
      } else {
        changeReferralCode("")
        setCodeStatus(CodeStatus.INVALID)
      }
    } catch (e) {
      changeReferralCode("")
      setCodeStatus(CodeStatus.INVALID)
    } finally {
      setIsChecking(false)
    }
  }

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCodeStatus(CodeStatus.UNKNOWN)
    // changeReferralCode("")
    const newCodes = [...codes]
    newCodes[index] = (event.target as HTMLInputElement).value
    setCodes(newCodes)

    if (event.target.value && index < INVITE_CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleBackspace = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !codes[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = event => {
    event.preventDefault()
    const paste = event.clipboardData.getData("text")
    if (paste.length) {
      const pasteArray = paste.split("").slice(0, INVITE_CODE_LENGTH)
      setCodes(prevCodes => pasteArray.map((char, index) => pasteArray[index] || prevCodes[index]))
    }
  }
  return (
    <Box sx={{ position: "relative" }}>
      <Stack direction="row" gap="0.8rem" alignItems="center">
        <Title>
          Canvas has a mint fee of 0.001 ETH to fight spam.<br></br>Enter an invite code to get 50% off!
        </Title>
      </Stack>

      <ReferralCodeBox>
        {codes.map((code, index) => (
          <ReferralCodeInput
            key={index}
            value={code}
            onPaste={handlePaste}
            // autoFocus={index === 0}
            onChange={(e: any) => handleInputChange(index, e)}
            onKeyDown={(e: any) => handleBackspace(index, e)}
            inputProps={{ maxLength: 1 }}
            inputRef={el => (inputRefs.current[index] = el as HTMLInputElement | null)}
          />
        ))}
      </ReferralCodeBox>
      <StatusBox>
        {isChecking && (
          <Stack direction="row" gap="0.5rem" alignItems="center">
            <SvgIcon component={LoadingSvg} inheritViewBox></SvgIcon>
            <StatusContent>Checking...</StatusContent>
          </Stack>
        )}
        {codeStatus === CodeStatus.INVALID && (
          <Stack direction="row" gap="0.5rem" alignItems="center">
            <SvgIcon sx={{ fontSize: "2.4rem" }} component={ErrorSvg} inheritViewBox></SvgIcon>
            <StatusContent sx={{ color: "#FF684B" }}>Invalid code. Please try another one</StatusContent>
          </Stack>
        )}
        {codeStatus === CodeStatus.VALID && (
          <Stack direction="row" gap="0.5rem" alignItems="center">
            <SvgIcon sx={{ fontSize: "2.4rem" }} component={CheckSvg} inheritViewBox></SvgIcon>
            <StatusContent sx={{ color: "#85E0D1" }}>Valid code. You get 50% off mint fee</StatusContent>
          </Stack>
        )}
      </StatusBox>
    </Box>
  )
}

export default ReferralCode
