// import useSWR from "swr"
import { Divider, Typography } from "@mui/material"

import { SESSIONS_SECTION_MAP } from "../AnchorNavigation"
// import { fetchTokensMarksUrl } from "@/apis/sessions"
// import { useRainbowContext } from "@/contexts/RainbowProvider"
// import useSessionsStore from "@/stores/sessionsStore"
// import { sentryDebug } from "@/utils"
// import MarkList, { MarksType } from "../SessionZeroMarks/List"
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
  // const { walletCurrentAddress } = useRainbowContext()
  // const { hasSignedTerms } = useSessionsStore()

  // const { data: marks, isLoading } = useSWR(
  //   [fetchTokensMarksUrl(walletCurrentAddress), walletCurrentAddress, hasSignedTerms],
  //   async ([url, walletAddress, signed]) => {
  //     try {
  //       if (!walletAddress || !signed) {
  //         throw new Error("Wallet address or signed terms missing.")
  //       }

  //       const list = await scrollRequest(url)
  //       const tokensMarks = tokenList.map(item => {
  //         const withMarks = list.filter(item => item.points).find(i => i.bridge_asset.toUpperCase() === item.key.toUpperCase())
  //         let marks = withMarks?.points ?? 0

  //         return {
  //           ...item,
  //           marks,
  //         }
  //       })
  //       const gasMarksResult = list.find(item => item.bridge_asset === "gas-points")
  //       const gasMarks = gasList.map(item => ({
  //         ...item,
  //         amount: gasMarksResult?.amount ?? 0,
  //         marks: gasMarksResult?.points ?? 0,
  //       }))

  //       return {
  //         tokensMarks,
  //         gasMarks,
  //       }
  //     } catch (e) {
  //       sentryDebug(`asset marks: ${walletCurrentAddress}-${e.message}`)
  //       return defaultMarks
  //     }
  //   },
  //   {
  //     fallbackData: defaultMarks,
  //     revalidateOnFocus: false,
  //     revalidateOnReconnect: false,
  //   },
  // )

  return (
    <Card bottomDiff="0rem">
      <Typography sx={{ fontSize: ["2rem", "2.4rem"], lineHeight: ["3.2rem"], marginBottom: ["2.4rem"], fontWeight: 600, textAlign: "center" }}>
        Session One
      </Typography>

      <MarkList
        id="session-1-dex"
        icon={SESSIONS_SECTION_MAP["1-dex"].icon}
        title={SESSIONS_SECTION_MAP["1-dex"].label}
        description="Marks are rewarded to all eligible bridged assets since Scroll's mainnet launch on October 10th, 2023, based on amount and time held on Scroll."
        data={projectList?.dex}
        // isLoading={isLoading}
      ></MarkList>
      <Divider sx={{ margin: "0 0 3.2rem 0" }}></Divider>
      <MarkList
        id="session-1-lending"
        icon={SESSIONS_SECTION_MAP["1-lending"].icon}
        title={SESSIONS_SECTION_MAP["1-lending"].label}
        description="Marks have been awarded to users with more than $5 total gas spent on Scroll from the mainnet launch on Oct 10th, 2023 to Apr 29th, 2024 12pm UTC."
        data={projectList?.lending}
        // isLoading={isLoading}
      ></MarkList>
      <Divider sx={{ margin: "0 0 3.2rem 0" }}></Divider>
      <MarkList
        id="session-1-activities"
        icon={SESSIONS_SECTION_MAP["1-activities"].icon}
        title={SESSIONS_SECTION_MAP["1-activities"].label}
        description="Marks have been awarded to users with more than $5 total gas spent on Scroll from the mainnet launch on Oct 10th, 2023 to Apr 29th, 2024 12pm UTC."
        data={projectList?.activities}
        // isLoading={isLoading}
      ></MarkList>
    </Card>
  )
}

export default SessionOneMarks
