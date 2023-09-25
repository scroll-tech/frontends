import dayjs from "dayjs"

import { Box, CardMedia, Divider, Stack, SvgIcon, Typography } from "@mui/material"

import StatementSvg from "@/assets/svgs/refactor/nft-statement.svg"
import { ReactComponent as CommunitySvg } from "@/assets/svgs/refactor/story-value-community.svg"
import { ReactComponent as NeutralitySvg } from "@/assets/svgs/refactor/story-value-neutrality.svg"
import LineToView from "@/components/Motion/LineToView"
import { DEVELOPER_NFT_STEPS } from "@/constants"
import useCheckViewport from "@/hooks/useCheckViewport"

import Statistic from "../../components/Statistic/StatisticReverse"

// Scroll Origins
const NFT_VALUES = [
  {
    icon: CommunitySvg,
    title: "Community-driven",
    content: "At Scroll, we seek to to reward and recognize all builders who contribute to the foundation and future of our ecosystem.",
  },
  {
    icon: NeutralitySvg,
    title: "Credible Neutrality",
    content: "Through this program, all early builders of Scroll will have an equal opportunity to be rewarded and recognized.",
  },
]

const MintNFT = () => {
  const { isPortrait } = useCheckViewport()
  return (
    <Box sx={{ maxWidth: "98rem", width: "100%", pt: ["4.8rem", "5.5rem", "8rem"] }}>
      <Typography sx={{ fontSize: ["2.4rem", "3.2rem"], lineHeight: ["3.2rem", "4.8rem"], textAlign: "center", mb: "3.2rem" }}>
        We are committed to growing the best developer community to scale Ethereum. This program aligns with Scroll’s values in important ways:
      </Typography>
      <Stack direction={isPortrait ? "column" : "row"} spacing={isPortrait ? "3.2rem" : "4.8rem"} alignItems="center">
        <CardMedia image={StatementSvg} sx={{ width: ["100%", "100%", "56.1rem"], aspectRatio: "562 / 324" }}></CardMedia>
        <Stack direction="column" sx={{ flex: 1, gap: ["4.8rem", "3.2rem", "4.8rem"] }}>
          {NFT_VALUES.map(({ icon, title, content }) => (
            <Stack direction="column" key={title}>
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
                  mt: "1.6rem",
                  mb: ["0.8rem", "0.8rem", "1.6rem"],
                }}
              >
                {title}
              </Typography>
              <Typography sx={{ fontSize: ["1.6rem", "2rem"], lineHeight: ["2.4rem", "3.2rem"] }}>{content}</Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
      <LineToView>
        <Divider
          orientation="vertical"
          sx={{
            height: "19.5rem",
            width: "50%",
            mt: ["4.8rem", "3.2rem", "4.8rem"],
            mb: ["4.8rem", "3.2rem", "8rem"],
            borderColor: theme => theme.palette.primary.contrastText,
          }}
          textAlign="center"
        />
      </LineToView>
      <Typography sx={{ fontSize: ["2.4rem", "3.2rem"], lineHeight: ["3.2rem", "4.8rem"], textAlign: "center" }}>
        To qualify for the Scroll Origins, you must deploy a project within{" "}
        <Typography
          component="span"
          sx={{ fontSize: "inherit", lineHeight: "inherit", fontWeight: 700, color: "#FF664D !important", whiteSpace: "nowrap" }}
        >
          45 days
        </Typography>{" "}
        of Genesis Block. Your NFT will be ready for Mint at the end of the program.
      </Typography>
      <Stack direction="row" justifyContent="center" alignItems="center" sx={{ mt: "4.8rem", gap: ["2rem", "1.6rem", "3.2rem"] }}>
        {DEVELOPER_NFT_STEPS.slice(-2).map(({ date, title }, index) => (
          <>
            <Statistic
              key={title}
              size="small"
              sx={{ width: ["12rem", "28rem", "41.8rem"] }}
              title={dayjs(date).format("MMM D, YYYY")}
              subTitle={title}
            ></Statistic>
            {index < DEVELOPER_NFT_STEPS.slice(-2).length - 1 && (
              <Divider sx={{ width: ["4rem", "6rem", "12rem"], borderWidth: 2, borderColor: theme => theme.palette.primary.contrastText }}></Divider>
            )}
          </>
        ))}
      </Stack>
    </Box>
  )
}

export default MintNFT
