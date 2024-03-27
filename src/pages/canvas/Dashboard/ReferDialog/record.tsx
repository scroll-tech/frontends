import { formatEther } from "ethers"
import { useEffect, useState } from "react"

import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

import Skeleton from "@/components/Skeleton"
import { useCanvasContext } from "@/contexts/CanvasContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { getReferrerData } from "@/services/canvasService"

const RecordBox = styled(Box)(({ theme }) => ({
  borderRadius: "0.8rem",
  background: "#3B3B3B",
  padding: "0.8rem 2.4rem",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  maxWidth: "40rem",
  width: "100%",
  margin: "0 auto 8.5rem",
  gap: "4rem",
}))

const Item = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "1.6rem",
  flex: 1,
}))

const Description = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontSize: "1.6rem",
  fontWeight: 500,
  lineHeight: "2.4rem",
}))

const Value = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontSize: "4.8rem",
  fontWeight: 600,
  lineHeight: "6.4rem",
}))

const Record = () => {
  const { walletCurrentAddress } = useRainbowContext()

  const { profileRegistryContract } = useCanvasContext()

  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)
  const [earnedETH, setEarnedETH] = useState("0")

  useEffect(() => {
    if (profileRegistryContract && walletCurrentAddress) {
      setLoading(true)
      getReferrerData(profileRegistryContract, walletCurrentAddress)
        .then(data => {
          setCount(Number(data[0]))
          setEarnedETH(formatEther(data[1]))
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [profileRegistryContract, walletCurrentAddress])

  return (
    <RecordBox>
      <Item>
        <Description variant="body1">
          Friends <br />
          Referred
        </Description>
        {loading ? <Skeleton size="small" sx={{ my: "1.7rem", height: "3rem" }}></Skeleton> : <Value variant="body1">{count}</Value>}
      </Item>
      <Item>
        <Description variant="body1">
          ETH
          <br />
          Earned
        </Description>
        {loading ? <Skeleton size="small" sx={{ my: "1.7rem", height: "3rem" }}></Skeleton> : <Value variant="body1">{earnedETH}</Value>}
      </Item>
    </RecordBox>
  )
}

export default Record
