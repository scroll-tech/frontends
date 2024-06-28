import { isUndefined } from "lodash"
import useSWR from "swr"

import { Divider, Typography } from "@mui/material"

import { fetchTokensMarksUrl } from "@/apis/sessions"
import { SESSIONS_ZERO_ASSETS, SESSIONS_ZERO_GAS } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useSessionsStore from "@/stores/sessionsStore"
import { sentryDebug } from "@/utils"

import { SESSIONS_SECTION_MAP } from "../AnchorNavigation"
import Card from "../components/Card"
import MarkList, { MarksType } from "./List"
import { gasList, tokenList } from "./tokenList"

const defaultMarks = {
  tokensMarks: tokenList.map(item => ({ ...item, marks: -1 })),
  gasMarks: gasList.map(item => ({
    ...item,
    amount: null,
    marks: -1,
  })),
}

const BridgePoints = () => {
  const { walletCurrentAddress } = useRainbowContext()
  const { hasSignedTerms } = useSessionsStore()

  const { data: marks, isLoading } = useSWR(
    [fetchTokensMarksUrl(walletCurrentAddress), walletCurrentAddress, hasSignedTerms],
    async ([url, walletAddress, signed]) => {
      try {
        if (!walletAddress || !signed) {
          throw new Error("Wallet address or signed terms missing.")
        }

        const list = await scrollRequest(url)
        const tokensMarks = tokenList.map(item => {
          const withMarks = list
            .filter(item => Object.keys(item).includes("points"))
            .find(i => i.bridge_asset.toUpperCase() === item.key.toUpperCase())
          let marks = isUndefined(withMarks?.points) ? 0 : withMarks?.points

          return {
            ...item,
            marks,
          }
        })
        const gasMarksResult = list.find(item => item.bridge_asset === "gas-points")
        const gasMarks = gasList.map(item => ({
          ...item,
          amount: gasMarksResult?.amount ?? 0,
          marks: gasMarksResult?.points ?? 0,
        }))

        return {
          tokensMarks,
          gasMarks,
        }
      } catch (e) {
        sentryDebug(`asset marks: ${walletCurrentAddress}-${e.message}`)
        return defaultMarks
      }
    },
    {
      fallbackData: defaultMarks,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  return (
    <Card bottomDiff="0rem">
      <Typography sx={{ fontSize: ["2rem", "2.4rem"], lineHeight: ["3.2rem"], marginBottom: ["2.4rem"], fontWeight: 600, textAlign: "center" }}>
        Session Zero
      </Typography>

      <MarkList
        id={SESSIONS_ZERO_ASSETS}
        type={MarksType.ELIGIBLE_ASSETS}
        icon={SESSIONS_SECTION_MAP[SESSIONS_ZERO_ASSETS].icon}
        title={SESSIONS_SECTION_MAP[SESSIONS_ZERO_ASSETS].label}
        description="Marks are given to all eligible bridged assets since Scroll's mainnet launch on October 10th, 2023, based on amount and time held on Scroll."
        data={marks?.tokensMarks}
        isLoading={isLoading}
      ></MarkList>
      <Divider sx={{ margin: ["0 0 2.4rem 0", "0 0 3.2rem 0"] }}></Divider>

      <MarkList
        id={SESSIONS_ZERO_GAS}
        type={MarksType.GAS_SPENT}
        icon={SESSIONS_SECTION_MAP[SESSIONS_ZERO_GAS].icon}
        title={SESSIONS_SECTION_MAP[SESSIONS_ZERO_GAS].label}
        description="Marks have been given to users with more than $5 total gas spent on Scroll from the mainnet launch on Oct 10th, 2023 to Apr 29th, 2024 12pm UTC."
        data={marks?.gasMarks}
        isLoading={isLoading}
      ></MarkList>
    </Card>
  )
}

export default BridgePoints
