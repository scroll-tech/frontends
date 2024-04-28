import { useState } from "react"

import { Divider, Typography } from "@mui/material"

import { useRainbowContext } from "@/contexts/RainbowProvider"
import { useAsyncMemo } from "@/hooks"
import useSessionsStore from "@/stores/sessionsStore"
// import useCheckViewport from "@/hooks/useCheckViewport"
import { testAsyncFunc } from "@/utils"

import Card from "../components/Card"
import BridgeTokenList from "./List"
import { MarksType } from "./List"
import tokenList, { gasMetricsMark, tokenListWithMasks, tokenMap } from "./tokenList"

const BridgePoints = () => {
  const { walletCurrentAddress } = useRainbowContext()
  const [isLoading, setIsLoading] = useState(false)
  const { hasSignedTerms } = useSessionsStore()
  // const { isMobile } = useCheckViewport()

  const eligibleList = useAsyncMemo(async () => {
    console.log("eligibleList", walletCurrentAddress, hasSignedTerms)
    if (!walletCurrentAddress || !hasSignedTerms) {
      return tokenList
    }
    setIsLoading(true)
    const listWithMasks = await testAsyncFunc(tokenListWithMasks)
    console.log("eligibleList2", walletCurrentAddress, hasSignedTerms)

    setIsLoading(false)
    return (listWithMasks as Array<any>).map(item => ({ ...item, ...tokenMap[item.tokenSymbol] }))
  }, [walletCurrentAddress, hasSignedTerms])

  const gasMetricsList = useAsyncMemo(async () => {
    if (!walletCurrentAddress || !hasSignedTerms) {
      return [
        {
          logoURI: "/imgs/sessions/gas.svg",
          tokenSymbol: "ETH",
        },
      ]
    }
    const mark = await testAsyncFunc(gasMetricsMark)
    return [
      {
        ...(mark as any),
        logoURI: "/imgs/sessions/gas.svg",
        tokenSymbol: "ETH",
      },
    ]
  }, [walletCurrentAddress, hasSignedTerms])

  return (
    <Card
      // marginTop="24px"
      bottomDiff="0.8rem"
    >
      <Typography sx={{ fontSize: ["2rem", "2.4rem"], lineHeight: ["3.2rem"], marginBottom: ["2.4rem"], fontWeight: 600, textAlign: "center" }}>
        Session Zero
      </Typography>

      <BridgeTokenList
        type={MarksType.ELIGIBLE_ASSETS}
        title="Marks for eligible assets"
        description="Marks are rewarded to all eligible bridged assets since Scroll's mainnet launch on October 10th, 2023, based on amount and time on Scroll."
        data={eligibleList}
        isLoading={isLoading}
      ></BridgeTokenList>
      <Divider sx={{ margin: "0 0 2.4rem 0" }}></Divider>

      <BridgeTokenList
        type={MarksType.GAS_SPENT}
        title="Marks for gas spent"
        description="Marks have been awarded for all gas-consuming activities since Scroll's mainnet launch on October 10th, 2023."
        data={gasMetricsList}
        isLoading={isLoading}
      ></BridgeTokenList>
    </Card>
  )
}

export default BridgePoints
