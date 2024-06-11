import useSWR from "swr"

import { Divider, Typography } from "@mui/material"

import { fetchProjectsMarksUrl } from "@/apis/sessions"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useSessionsStore from "@/stores/sessionsStore"
import { sentryDebug } from "@/utils"

import { SESSIONS_SECTION_MAP } from "../AnchorNavigation"
import Card from "../components/Card"
import MarkList from "./List"
import { projectList } from "./projectList"

// const defaultMarks = {
//   tokensMarks: tokenList.map(item => ({ ...item, marks: null })),
//   gasMarks: gasList.map(item => ({
//     ...item,
//     amount: null,
//     marks: null,
//   })),
// }

// console.log(SESSIONS_SECTION_MAP["1-dex"])

const SessionOneMarks = () => {
  const { walletCurrentAddress } = useRainbowContext()
  const { hasSignedTerms } = useSessionsStore()

  const { data: marks, isLoading } = useSWR(
    [fetchProjectsMarksUrl(walletCurrentAddress), walletCurrentAddress, hasSignedTerms],
    async ([url, walletAddress, signed]) => {
      try {
        if (!walletAddress || !signed) {
          throw new Error("Wallet address or signed terms missing.")
        }

        const result = await scrollRequest(url)
        // const { dex, lending } = result
        return result
      } catch (e) {
        sentryDebug(`project marks: ${walletCurrentAddress}-${e.message}`)
        return {}
      }
    },
    {
      fallbackData: {},
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  console.log(marks, "marks")

  return (
    <Card bottomDiff="0rem">
      <Typography sx={{ fontSize: ["2rem", "2.4rem"], lineHeight: ["3.2rem"], marginBottom: ["2.4rem"], fontWeight: 600, textAlign: "center" }}>
        Session One
      </Typography>

      <MarkList
        id="session-1-dex"
        icon={SESSIONS_SECTION_MAP["1-dex"].icon}
        title={SESSIONS_SECTION_MAP["1-dex"].label}
        description="Marks are rewarded to users who deposit eligible assets into selected DEXs’ liquidity pools. Liquidity deposits with tighter ranges or more market depth are awarded Marks at a higher rate. "
        data={projectList?.dex}
        isLoading={isLoading}
      ></MarkList>
      <Divider sx={{ margin: "0 0 3.2rem 0" }}></Divider>
      <MarkList
        id="session-1-lending"
        icon={SESSIONS_SECTION_MAP["1-lending"].icon}
        title={SESSIONS_SECTION_MAP["1-lending"].label}
        description="Marks are rewarded to users who deposit eligible assets into selected lending markets. Marks are not rewarded for recursive supplying/borrowing."
        data={projectList?.lending}
        isLoading={isLoading}
      ></MarkList>
      <Divider sx={{ margin: "0 0 3.2rem 0" }}></Divider>
      <MarkList
        id="session-1-activities"
        icon={SESSIONS_SECTION_MAP["1-activities"].icon}
        title={SESSIONS_SECTION_MAP["1-activities"].label}
        description="Marks are rewarded to users who participate in Scroll native projects."
        data={projectList?.activities}
        isLoading={isLoading}
      ></MarkList>
    </Card>
  )
}

export default SessionOneMarks
