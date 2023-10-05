import { makeStyles } from "tss-react/mui"

import { Box, Divider, Stack, Typography } from "@mui/material"

import { DEVELOPER_NFT_STEPS, EndDate, Stage2StartDate, Stage3StartDate, StartDate } from "@/constants"
import useCheckViewport from "@/hooks/useCheckViewport"
import { formatDate, formatUTCDate } from "@/utils"

import Statistic from "../../components/Statistic/StatisticReverse"

const NFT_STAGES = [
  { title: "Quintic", duration: Stage2StartDate.diff(StartDate, "day"), endData: formatUTCDate(Stage2StartDate, true) },
  {
    title: "Quartic",
    duration: `${Stage2StartDate.diff(StartDate, "day")}-${Stage3StartDate.diff(StartDate, "day")}`,
    endData: formatUTCDate(Stage3StartDate, true),
  },
  {
    title: "Cubic",
    duration: `${Stage3StartDate.diff(StartDate, "day")}-${EndDate.diff(StartDate, "day") + 1}`,
    endData: formatUTCDate(EndDate),
  },
]

const useStyles = makeStyles()(theme => ({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(29rem, 1fr))",
    justifyContent: "space-between",
    gap: "3rem",
    marginTop: "2.4rem",

    [theme.breakpoints.down("sm")]: {
      marginTop: "1.6rem",
      gap: "1.6rem",
    },
  },
  specialStatement: {
    textAlign: "center",

    "@media (min-width: 1030px)": {
      whiteSpace: "nowrap",
      alignSelf: "center",
    },
  },
}))

const Stage = () => {
  const { classes } = useStyles()
  const { isMobile } = useCheckViewport()

  return (
    <Stack direction="column" sx={{ width: "100%" }} spacing={isMobile ? "3.2rem" : "4.8rem"}>
      <Typography sx={{ fontSize: ["2.4rem", "3.2rem"], lineHeight: ["3.2rem", "4.8rem"], textAlign: "center" }}>
        To qualify for the Scroll Origins, you must deploy a project within{" "}
        <Typography
          component="span"
          sx={{ fontSize: "inherit", lineHeight: "inherit", fontWeight: 700, color: "#FF664D !important", whiteSpace: "nowrap" }}
        >
          {EndDate.diff(StartDate, "day")} days
        </Typography>{" "}
        of Genesis Block. Your NFT will be available for minting at the end of the program.
      </Typography>
      <Stack direction="row" justifyContent="center" alignItems="center" sx={{ gap: ["2rem", "1.6rem", "3.2rem"] }}>
        {DEVELOPER_NFT_STEPS.slice(-2).map(({ date, title }, index) => (
          <>
            <Statistic key={title} size="small" sx={{ width: ["12rem", "28rem", "41.8rem"] }} title={formatDate(date)} subTitle={title}></Statistic>
            {index < DEVELOPER_NFT_STEPS.slice(-2).length - 1 && (
              <Divider sx={{ width: ["4rem", "6rem", "12rem"], borderWidth: 2, borderColor: theme => theme.palette.primary.contrastText }}></Divider>
            )}
          </>
        ))}
      </Stack>
      <Stack direction="column">
        <Typography className={classes.specialStatement} sx={{ fontSize: ["2.4rem", "3.2rem"], lineHeight: ["3.2rem", "4.8rem"] }}>
          There will be different stages corresponding to the time of deployment:
        </Typography>
        <Box className={classes.grid}>
          {NFT_STAGES.map(item => (
            <Stack direction="column" spacing="0.8rem">
              <Typography sx={{ fontSize: ["2rem", "2.4rem"], lineHeight: "3.2rem" }}>{item.title}</Typography>
              <Typography sx={{ fontSize: ["1.6rem", "2rem"], lineHeight: ["2.4rem", "3.2rem"] }}>
                Deploy to Scroll Mainnet within Day {item.duration} of Genesis Block:
                <br /> Before {item.endData}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Stack>
    </Stack>
  )
}
export default Stage
