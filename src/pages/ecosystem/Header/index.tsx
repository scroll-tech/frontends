import useSWR from "swr"

import { Box, Stack, Typography } from "@mui/material"

import { fetchEcosystemMetricsData } from "@/apis/ecosystem"
import { fetchLastBatchIndexesUrl } from "@/apis/rollupscan"
import SectionWrapper from "@/components/SectionWrapper"
import { formatLargeNumber } from "@/utils"

import Statistic from "./Statistic"

const Header = () => {
  const { data, isLoading } = useSWR(fetchEcosystemMetricsData, () => scrollRequest(fetchEcosystemMetricsData), { refreshInterval: 18e4 })

  const { data: totalBatches, isLoading: isBatchesLoading } = useSWR(
    "totalBatches",
    async () => {
      const { finalized_index } = await scrollRequest(fetchLastBatchIndexesUrl)
      return formatLargeNumber(finalized_index)
    },
    { refreshInterval: 18e4 },
  )

  return (
    <>
      <SectionWrapper sx={{ pt: "6.4rem" }}>
        <Stack direction="column" alignItems="center">
          <Typography
            sx={{ fontSize: ["3.6rem", "6.4rem"], lineHeight: ["5rem", "8.8rem"], fontWeight: 600, maxWidth: "66rem", textAlign: "center" }}
          >
            An Ecosystem <br />
            Forever in Motion
          </Typography>
          <Stack direction="row" gap="2.4rem" sx={{ width: "94.8rem", maxWidth: "100%", mt: "4rem", mb: "5.2rem" }}>
            <Statistic label="Total value locked" loading={isLoading}>
              {data?.tvl}
            </Statistic>
            <Statistic label="Transaction count" loading={isLoading}>
              {data?.txCount}
            </Statistic>
            <Statistic label="Batches settled to L1" loading={isBatchesLoading}>
              {totalBatches}
            </Statistic>
          </Stack>
        </Stack>
      </SectionWrapper>
      <Box
        sx={{
          height: ["42.6rem", "37rem", "24vw"],
          background: [
            "url(/imgs/ecosystem/new-ecosystem-bg-mobile.svg) center / cover no-repeat",
            "url(/imgs/ecosystem/new-ecosystem-bg-tablet.svg) center / cover no-repeat",
            "url(/imgs/ecosystem/new-ecosystem-bg.svg) center / cover no-repeat",
          ],
          backgroundSize: "cover",
        }}
      ></Box>
    </>
  )
}
export default Header
