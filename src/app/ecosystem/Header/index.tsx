"use client"

import useSWR from "swr"

import { Box, Container, Stack, Typography } from "@mui/material"

import { fetchEcosystemMetricsData } from "@/apis/ecosystem"
import { fetchLastBatchIndexesUrl } from "@/apis/rollupscan"
import Button from "@/components/Button"
import { GET_IN_TOUCH_LINK } from "@/constants"
import useCheckViewport from "@/hooks/useCheckViewport"
import { formatLargeNumber } from "@/utils"
import { scrollRequest } from "@/utils/request"

import Statistic from "./Statistic"

const Header = () => {
  const { isPortrait } = useCheckViewport()
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
    <Box
      sx={[
        {
          position: "relative",
          height: ["calc(100vh - 6.4rem)", "72rem", "auto"],
        },
        theme => ({
          [theme.breakpoints.up("md")]: {
            background: "url(/imgs/ecosystem/ecosystem-bg.webp) bottom / cover no-repeat",
            aspectRatio: "16 / 9",
            marginTop: "-6.5rem",
          },
          [theme.breakpoints.down("md")]: {
            background: "url(/imgs/ecosystem/ecosystem-bg-mobile.webp) bottom / contain no-repeat",
          },
        }),
      ]}
    >
      <Container
        sx={{
          position: "absolute",
          top: ["calc(24% - 5rem)", "5.8rem", "calc(100vw*0.05 + 6.5rem)"],
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
        }}
      >
        <Stack direction="column" alignItems="center" gap="4rem">
          <Typography
            sx={{ fontSize: ["4rem", "6.4rem"], lineHeight: ["5rem", "8.8rem"], fontWeight: 600, maxWidth: ["30rem", "unset"], textAlign: "center" }}
          >
            Ecosystem projects
          </Typography>
          <Stack
            direction="row"
            gap={["0.8rem", "2.4rem"]}
            sx={{
              maxWidth: "100%",
            }}
          >
            <Statistic label={isPortrait ? "TVL" : "Total value locked"} loading={isLoading}>
              {data?.tvl ?? "--"}
            </Statistic>
            <Statistic label="Transaction count" loading={isLoading}>
              {data?.txAll ?? "--"}
            </Statistic>
            <Statistic label="Batches settled to L1" loading={isBatchesLoading}>
              {totalBatches ?? "--"}
            </Statistic>
          </Stack>
          <Button
            width={isPortrait ? "18.5rem" : "25rem"}
            sx={{ backgroundColor: "#FFF8F3 !important" }}
            href={GET_IN_TOUCH_LINK}
            target="_blank"
            color="primary"
          >
            Get in touch
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}
export default Header
