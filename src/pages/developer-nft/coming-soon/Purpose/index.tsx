import { Box, CardMedia, Divider, Stack, SvgIcon, Typography } from "@mui/material"

import StatementSvg from "@/assets/svgs/refactor/nft-statement.svg"
import { ReactComponent as CommunitySvg } from "@/assets/svgs/story/value-community.svg"
import { ReactComponent as NeutralitySvg } from "@/assets/svgs/story/value-neutrality.svg"
import LineToView from "@/components/Motion/LineToView"
import useCheckViewport from "@/hooks/useCheckViewport"
import useNFTStore from "@/stores/nftStore"

const NFT_VALUES = [
  {
    icon: CommunitySvg,
    title: "Community-driven",
    content: "Scroll is community-first and we are eager to give back to everyone who helped build Scroll from the ground up.",
  },
  {
    icon: NeutralitySvg,
    title: "Credible Neutrality",
    content: "Scroll is credibly neutral and aims to offer all early builders of Scroll an equal opportunity to participate.",
  },
]

const Purpose = () => {
  const { isPortrait } = useCheckViewport()
  const { phrase } = useNFTStore()

  return (
    <Box sx={{ width: "100%", pt: phrase === "in-progress" ? ["4.8rem", "5.5rem", "8rem"] : ["3.2rem", "4.8rem"] }}>
      <Typography sx={{ fontSize: ["2.4rem", "3.2rem"], lineHeight: ["3.2rem", "4.8rem"], textAlign: "center", mb: ["4.8rem", "7.2rem"] }}>
        To celebrate the builders who are here with us at this important moment in our journey to scale Ethereum, we are offering a soulbound Scroll
        Origins NFT. This makes a permanent onchain record of your support and aligns with core Scroll values: 
      </Typography>
      <Stack direction={isPortrait ? "column" : "row"} spacing={isPortrait ? "3.2rem" : "4.8rem"} alignItems="center">
        <CardMedia image={StatementSvg} sx={{ width: ["100%", "calc(100% - 4rem)", "56.1rem"], aspectRatio: "562 / 324" }}></CardMedia>
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
    </Box>
  )
}

export default Purpose
