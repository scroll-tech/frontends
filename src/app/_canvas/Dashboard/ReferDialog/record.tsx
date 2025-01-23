import { formatEther } from "ethers"
import { useEffect, useState } from "react"

import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

import Skeleton from "@/components/Skeleton"
import { useCanvasContext } from "@/contexts/CanvasContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useSnackbar from "@/hooks/useSnackbar"
import { getReferrerData } from "@/services/canvasService"

const RecordBox = styled(Box)(({ theme }) => ({
  borderRadius: "0.8rem",
  background: "#3B3B3B",
  padding: "0.8rem 2.4rem",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "max-content",
  margin: "0 auto 6rem",
  gap: "4rem",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "1.8rem",
    margin: "0 0 2.4rem",
    width: "100%",
  },
}))

const Item = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "1.6rem",
  flex: 1,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
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
  [theme.breakpoints.down("sm")]: {
    fontSize: "3.2rem",
    lineHeight: "4.8rem",
    textAlign: "center",
    width: "100%",
  },
}))

const Record = () => {
  const { walletCurrentAddress } = useRainbowContext()

  const { profileRegistryContract } = useCanvasContext()
  const alertWarning = useSnackbar()

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
        .catch(() => {
          alertWarning("Falied to get referrer data")
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
        {loading ? (
          <Skeleton size="small" sx={{ my: ["1rem", "1.7rem"], height: ["2.4rem", "3rem"], width: "3em" }}></Skeleton>
        ) : (
          <Value variant="body1">{count}</Value>
        )}
      </Item>
      <Item>
        <Description variant="body1">
          ETH
          <br />
          Received
        </Description>
        {loading ? (
          <Skeleton size="small" sx={{ my: ["1rem", "1.7rem"], height: ["2.4rem", "3rem"], width: "3em" }}></Skeleton>
        ) : (
          <Value variant="body1">{earnedETH}</Value>
        )}
      </Item>
    </RecordBox>
  )
}

export default Record
