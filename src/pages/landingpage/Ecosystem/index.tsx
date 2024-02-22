import useSWR from "swr"

import { Stack } from "@mui/material"

import { ecosystemActivityUrl, ecosystemTVLUrl, ecosystemUniqueWalletCountUrl } from "@/apis/ecosystem"
import { fetchLastBatchIndexesUrl } from "@/apis/rollupscan"
import { formatLargeNumber } from "@/utils"

import Statistic from "./Statistic"

const Ecosystem = () => {
  const { data: totalTVL, isLoading: isTVLLoading } = useSWR(
    "totalTVL",
    async () => {
      const {
        hourly: { data },
      } = await scrollRequest(ecosystemTVLUrl)
      return formatLargeNumber(data[data.length - 1][1])
    },
    { refreshInterval: 18e4 },
  )

  const { data: totalUniqueWalletCount, isLoading: isUniqueWalletCountLoading } = useSWR(
    "totalUniqueWalletCount",
    async () => {
      const {
        result: {
          data: { json },
        },
      } = await scrollRequest(ecosystemUniqueWalletCountUrl)
      return formatLargeNumber(json)
    },
    { refreshInterval: 18e4 },
  )

  const { data: totalTxCount, isLoading: isTxCountLoading } = useSWR(
    "totalTxCount",
    async () => {
      const {
        daily: { data },
      } = await scrollRequest(ecosystemActivityUrl)
      const totalTxCount = data
        // .slice(-30)
        .map(item => item[1])
        .reduce((a, b) => a + b)
      return formatLargeNumber(totalTxCount)
    },
    { refreshInterval: 18e4 },
  )
  const { data: totalBatches, isLoading: isBatchesLoading } = useSWR(
    "totalBatches",
    async () => {
      const { finalized_index } = await scrollRequest(fetchLastBatchIndexesUrl)
      return formatLargeNumber(finalized_index)
    },
    { refreshInterval: 18e4 },
  )

  return (
    <Stack direction="row" gap="10rem" sx={{ width: "100%", backgroundColor: "#fff", justifyContent: "center" }}>
      <Statistic label="Total value locked" loading={isTVLLoading}>
        {totalTVL}
      </Statistic>
      <Statistic label="Active accounts" loading={isUniqueWalletCountLoading}>
        {totalUniqueWalletCount}
      </Statistic>
      <Statistic label="Transaction counts" loading={isTxCountLoading}>
        {totalTxCount}
      </Statistic>
      <Statistic label="Batches settled to L1" loading={isBatchesLoading}>
        {totalBatches}
      </Statistic>
    </Stack>
  )
}
export default Ecosystem
