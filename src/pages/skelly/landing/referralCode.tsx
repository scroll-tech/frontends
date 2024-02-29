import React, { useEffect, useMemo, useRef, useState } from "react"

import { Box, InputBase, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { fetchSignByCode } from "@/apis/skelly"
import { ReactComponent as CheckSvg } from "@/assets/svgs/skelly/check.svg"
import { ReactComponent as ErrorSvg } from "@/assets/svgs/skelly/error.svg"
import { ReactComponent as LoadingSvg } from "@/assets/svgs/skelly/loading.svg"
import useSkellyStore from "@/stores/skellyStore"

const INVITE_CODE_LENGTH = 5

enum CodeStatus {
  VALID = "Valid",
  INVALID = "Invalid",
  UNKNOWN = "Unknown",
}

const Container = styled(Box)(({ theme }) => ({
  marginBottom: "4rem",
}))

const Title = styled(Typography)(({ theme }) => ({
  color: "#FFFFFF",
  textAlign: "center",
  fontSize: "2.4rem",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "3.2rem",
}))

const ReferralCodeBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: "1.6rem",
  marginBottom: "1.6rem",
  gap: "0.8rem",
}))

const ReferralCodeInput = styled(InputBase)(({ theme }) => ({
  backgroundColor: "#101010",
  color: "#FFFFFF",
  border: "1px solid #FFFFFF",
  borderRadius: "1rem",
  width: "7.2rem",
  height: "7.2rem",
  fontSize: "4rem",
  fontWeight: 600,
  textAlign: "center",
  "& input": {
    textAlign: "center",
  },
  "&::placeholder": {
    color: "#DCDCDC",
    opacity: 1,
  },
}))

const StatusBox = styled(Box)(({ theme }) => ({
  height: "3.2rem",
}))

const StatusContent = styled(Typography)(({ theme }) => ({
  fontSize: "1.8rem",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "2.8rem",
  letterSpacing: "0.18px",
  textAlign: "center",
  color: "#A5A5A5",
}))

const ReferralCode = ({ isChecking, setIsChecking, code }) => {
  const [codes, setCodes] = useState(Array(INVITE_CODE_LENGTH).fill(""))
  const [codeStatus, setCodeStatus] = useState(CodeStatus.UNKNOWN)
  const inputRefs = useRef<Array<HTMLInputElement | null>>(new Array(INVITE_CODE_LENGTH).fill(null))
  const { changeReferralCode, changeCodeSignature } = useSkellyStore()

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
    setIsChecking(true)
    const { signature } = await scrollRequest(fetchSignByCode(code))
    if (signature) {
      setCodeStatus(CodeStatus.VALID)
      changeCodeSignature(signature)
    } else {
      setCodeStatus(CodeStatus.INVALID)
    }
    setIsChecking(false)
  }

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCodeStatus(CodeStatus.UNKNOWN)
    changeReferralCode("")
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
    <Container>
      <Title>Enter a referral code to get 50% off mint fee (0.001ETH)</Title>
      <ReferralCodeBox>
        {codes.map((code, index) => (
          <ReferralCodeInput
            key={index}
            value={code}
            onPaste={handlePaste}
            autoFocus={index === 0}
            onChange={(e: any) => handleInputChange(index, e)}
            onKeyDown={(e: any) => handleBackspace(index, e)}
            inputProps={{ maxLength: 1 }}
            inputRef={el => (inputRefs.current[index] = el as HTMLInputElement | null)}
          />
        ))}
      </ReferralCodeBox>
      <StatusBox>
        {isChecking && (
          <StatusContent>
            <SvgIcon sx={{ fontSize: "2.4rem", marginRight: "0.5rem" }} component={LoadingSvg} inheritViewBox></SvgIcon>Checking...
          </StatusContent>
        )}
        {codeStatus === CodeStatus.INVALID && (
          <StatusContent sx={{ color: "#FF684B" }}>
            <SvgIcon sx={{ fontSize: "2.4rem", marginRight: "0.5rem" }} component={ErrorSvg} inheritViewBox></SvgIcon>
            Invalid code. Please try another one
          </StatusContent>
        )}
        {codeStatus === CodeStatus.VALID && (
          <StatusContent sx={{ color: "#85E0D1" }}>
            <SvgIcon sx={{ fontSize: "2.4rem", marginRight: "0.5rem" }} component={CheckSvg} inheritViewBox></SvgIcon>
            Valid code. You get 50% off mint fee
          </StatusContent>
        )}
      </StatusBox>
    </Container>
  )
}

export default ReferralCode
