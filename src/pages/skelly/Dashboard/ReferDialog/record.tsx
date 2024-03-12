import { formatEther } from "ethers"
import { useEffect, useState } from "react"

import { Box, Skeleton, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { useRainbowContext } from "@/contexts/RainbowProvider"
import { useSkellyContext } from "@/contexts/SkellyContextProvider"
import { getReferrerData } from "@/services/skellyService"

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
  justifyContent: "space-between",
  flex: 1,
}))

const Description = styled(Typography)(({ theme }) => ({
  color: "#FFFFFF",
  fontSize: "1.6rem",
  fontWeight: 500,
  lineHeight: "2.4rem",
  marginRight: "1.6rem",
}))

const Value = styled(Typography)(({ theme }) => ({
  color: "#FFFFFF",
  fontSize: "4.8rem",
  fontWeight: 600,
  lineHeight: "6.4rem",
}))

const Record = () => {
  const { walletCurrentAddress } = useRainbowContext()

  const { profileRegistryContract } = useSkellyContext()

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
        <Description variant="body1" color="#FFFFFF">
          Friends <br />
          Referred
        </Description>
        {loading ? (
          <Skeleton
            variant="rectangular"
            sx={{ my: "2.2rem", height: "2rem", flex: 1, backgroundColor: "rgba(255, 255, 255, 0.45)", borderRadius: "1rem" }}
          ></Skeleton>
        ) : (
          <Value variant="body1" color="#FFFFFF">
            {count}
          </Value>
        )}
      </Item>
      <Item>
        <Description variant="body1" color="#FFFFFF">
          ETH
          <br />
          Earned
        </Description>
        {loading ? (
          <Skeleton
            variant="rectangular"
            sx={{ my: "2.2rem", height: "2rem", flex: 1, backgroundColor: "rgba(255, 255, 255, 0.45)", borderRadius: "1rem" }}
          ></Skeleton>
        ) : (
          <Value variant="body1" color="#FFFFFF">
            {earnedETH}
          </Value>
        )}
      </Item>
    </RecordBox>
  )
}

export default Record
