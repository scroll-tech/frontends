import { useMemo, useState } from "react"

import { Box, InputBase } from "@mui/material"
import { styled } from "@mui/system"

import Button from "@/components/Button"
import { useSkellyContext } from "@/contexts/SkellyContextProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import useSkellyStore, { MintStep } from "@/stores/skellyStore"

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  minHeight: "calc(100vh - 6.2rem)", // "100vh" - "header height"
  padding: "15rem 0",
  backgroundColor: "#101010",
  [theme.breakpoints.down("sm")]: {
    padding: "0 1rem",
  },
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#FFFFFF",
  textAlign: "center",
  fontSize: "7.2rem",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "8.8rem",
  maxWidth: "51rem",
  width: "100%",
  marginBottom: "17rem",
}))

const Mint = () => {
  const { isMobile } = useCheckViewport()
  const [isMinting, setIsMinting] = useState(false)
  const [name, setName] = useState("")

  const { mintProfileNFT } = useSkellyContext()

  const { referralCode, changeMintStep } = useSkellyStore()

  const handleMint = async () => {
    setIsMinting(true)
    await mintProfileNFT(name, referralCode)
    setIsMinting(false)
    changeMintStep(MintStep.REFERRAL_CODE)
  }

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const isInvalidName = useMemo(() => {
    return !name
  }, [name])

  return (
    <Container>
      <StyledInputBase
        inputProps={{
          maxLength: 15,
        }}
        value={name}
        onChange={handleChangeName}
        autoFocus
        placeholder="Enter your name"
      />
      <Button gloomy={isInvalidName} color="primary" loading={isMinting} width={isMobile ? "23rem" : "28.2rem"} onClick={handleMint}>
        {isMinting ? "Minting" : "Mint now"}
      </Button>
    </Container>
  )
}

export default Mint
