import useSWR from "swr"

import { Box, Stack, Typography } from "@mui/material"

import SectionWrapper from "@/components/SectionWrapper"

import Statistic from "./Statistic"

const Header = () => {
  const { data: totalTVL, isLoading: isTVLLoading } = useSWR(
    "totalTVL",
    () => {
      return "40.17M"
    },
    { refreshInterval: 1e4 },
  )
  const { data: totalTxCount, isLoading: isTxCountLoading } = useSWR(
    "totalTxCount",
    () => {
      return "6.27M"
    },
    { refreshInterval: 1e4 },
  )
  const { data: totalBatches, isLoading: isBatchesLoading } = useSWR(
    "totalBatches",
    () => {
      return "24354"
    },
    { refreshInterval: 1e4 },
  )

  return (
    <>
      <SectionWrapper sx={{ pt: "6.4rem" }}>
        <Stack direction="column" alignItems="center">
          <Typography sx={{ fontSize: ["4rem", "7.8rem"], lineHeight: ["5rem", "8.8rem"], fontWeight: 600, maxWidth: "66rem", textAlign: "center" }}>
            An Ecosystem Forever in Motion
          </Typography>
          <Stack direction="row" gap="2.4rem" sx={{ width: "94.8rem", maxWidth: "100%", mt: "4rem", mb: "5.2rem" }}>
            <Statistic label="Total TVL" loading={isTVLLoading}>
              {totalTVL}
            </Statistic>
            <Statistic label="Transaction count" loading={isTxCountLoading}>
              {totalTxCount}
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
