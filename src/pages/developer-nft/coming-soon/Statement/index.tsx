import dayjs from "dayjs"

import { Box, CardMedia, Divider, Stack, SvgIcon, Typography } from "@mui/material"

import StatementSvg from "@/assets/svgs/refactor/nft-statement.svg"
import { ReactComponent as CommunitySvg } from "@/assets/svgs/refactor/story-value-community.svg"
import { ReactComponent as NeutralitySvg } from "@/assets/svgs/refactor/story-value-neutrality.svg"
import LineToView from "@/components/Motion/LineToView"
import { DEVELOPER_NFT_STEPS } from "@/constants"

import Statistic from "../../components/Statistic/StatisticReverse"

const NFT_VALUES = [
  {
    icon: CommunitySvg,
    title: "Community-driven",
    content: "At Scroll, we seek to to reward and recognize all builders who are contributing to the foundation and future of our ecosystem",
  },
  {
    icon: NeutralitySvg,
    title: "Credible Neutrality",
    content: "Through this program, all early builders of Scroll will have an equal opportunity to be rewarded and recognized",
  },
]

const MintNFT = () => {
  return (
    <Box sx={{ maxWidth: "98rem", pt: "8rem" }}>
      <Typography sx={{ fontSize: "3.2rem", lineHeight: "4.8rem", textAlign: "center", mb: "3.2rem" }}>
        We are committed to growing the best developer community to scale the Ethereum Ecosystem. The program aligns with Scroll’s values:
      </Typography>
      <Stack direction="row" spacing="4.8rem" alignItems="center">
        <CardMedia image={StatementSvg} sx={{ width: "56.1rem", height: "32.3rem" }}></CardMedia>
        <Stack direction="column" spacing="4.8rem" sx={{ flex: 1 }}>
          {NFT_VALUES.map(({ icon, title, content }) => (
            <Stack direction="column" key={title} spacing="1.6rem">
              <SvgIcon
                sx={{ width: "min-content", height: "min-content", transform: ["scale(0.8)", "scale(0.9698)"] }}
                component={icon}
                inheritViewBox
              ></SvgIcon>

              <Typography
                sx={{
                  fontSize: ["2rem", "2.4rem"],
                  fontWeight: 600,
                  lineHeight: "3.2rem",
                }}
              >
                {title}
              </Typography>
              <Typography sx={{ fontSize: ["1.6rem", "2rem"], lineHeight: "3.2rem" }}>{content}</Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
      <LineToView>
        <Divider
          orientation="vertical"
          sx={{ height: "19.5rem", width: "50%", mt: "4.8rem", mb: "8rem", borderColor: theme => theme.palette.primary.contrastText }}
          textAlign="center"
        />
      </LineToView>
      <Typography sx={{ fontSize: "3.2rem", lineHeight: "4.8rem", textAlign: "center" }}>
        To qualify for the Scroll Early Developer NFT, you must deploy a <br></br>project within{" "}
        <Typography component="span" sx={{ fontSize: "3.2rem", lineHeight: "4.8rem", fontWeight: 700, color: "#FF664D !important" }}>
          45 days
        </Typography>{" "}
        of Genesis Block. Your NFT will be ready for Mint at the end of the program.
      </Typography>
      <Stack direction="row" alignItems="center" spacing="10.9rem" sx={{ mt: "4.8rem" }}>
        {DEVELOPER_NFT_STEPS.slice(-2).map(({ date, title }, index) => (
          <>
            <Statistic key={title} size="small" title={dayjs(date).format("MMM D, YYYY")} subTitle={title}></Statistic>
            {index < DEVELOPER_NFT_STEPS.slice(-2).length - 1 && (
              <Divider sx={{ width: "12rem", borderWidth: 2, borderColor: theme => theme.palette.primary.contrastText }}></Divider>
            )}
          </>
        ))}
      </Stack>
    </Box>
  )
}

export default MintNFT
