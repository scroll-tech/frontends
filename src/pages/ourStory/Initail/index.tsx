import { useMemo } from "react"
import { isDesktop, isMobileOnly } from "react-device-detect"
import { makeStyles } from "tss-react/mui"

import { Box, Typography as MuiTypography, Stack } from "@mui/material"
import { styled } from "@mui/system"

import HaichenAvatar from "@/assets/svgs/refactor/haichen-avatar.svg"
import SandyAvatar from "@/assets/svgs/refactor/sandy-avatar.svg"
import StoryBucket from "@/assets/svgs/refactor/story-bucket.svg"
import StoryDiamond from "@/assets/svgs/refactor/story-diamond.svg"
import YeAvatar from "@/assets/svgs/refactor/ye-avatar.svg"
import OrientationToView from "@/components/Motion/OrientationToView"
import SectionWrapper from "@/components/SectionWrapper"
import WebpImage from "@/components/WebpImage"

import Cooperation from "./Cooperation"
import InlineAvater from "./InlineAvatar"
import Line from "./Line"

const Typography = styled(MuiTypography)(({ theme }) => ({
  fontSize: "3.2rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "2.6rem",
    lineHeight: "3.6rem",
  },
}))

const useStyles = makeStyles()(theme => ({
  divider: {
    height: "19.5rem",
    width: "50%",
    margin: "6rem 0",
    [theme.breakpoints.down("sm")]: {
      margin: "5.2rem 0",
    },
  },
}))

const Initail = () => {
  const { classes } = useStyles()

  const avatarSize = useMemo(() => (isMobileOnly ? "small" : "middle"), [isMobileOnly])

  return (
    <SectionWrapper maxWidth="127.5rem" sx={{ textAlign: "center", pt: ["11.2rem", "15.4rem"], pb: ["22rem", "49rem"] }}>
      <OrientationToView>
        <Typography>Founded in 2021,</Typography>
        <Typography sx={{ textIndent: "2em", whiteSpace: "pre-wrap" }}>
          our vision is to create an inclusive and infinite ecosystem for Ethereum. In 2020, as DeFi boomed and Ethereum faced network congestion, our
          founders—Ye <InlineAvater size={avatarSize} alt="Ye" src={YeAvatar} />, a mathematician fascinated by zero-knowledge proofs; Haichen{" "}
          <InlineAvater size={avatarSize} alt="Haichen" src={HaichenAvatar} />, a systems engineer drawn to cryptography; and Sandy{" "}
          <InlineAvater size={avatarSize} alt="Sandy" src={SandyAvatar} />, an experienced web3 researcher and investor—joined forces.
        </Typography>
      </OrientationToView>
      <Line orientation="vertical" textAlign="center" className={classes.divider} />
      <OrientationToView>
        <Typography sx={{ textIndent: "2em", whiteSpace: "pre-wrap" }}>
          The idea for Scroll was born during an in-depth discussion about the purpose of blockchain and the scalability trilemma. Understanding that
          Ethereum's deliberate trade-off for prioritizing security and decentralization resulted in slower transaction times, the founders saw an
          opportunity.
        </Typography>
      </OrientationToView>
      <Line orientation="vertical" textAlign="center" className={classes.divider} />
      <OrientationToView>
        <WebpImage src={StoryDiamond}></WebpImage>
        {isDesktop && <WebpImage src={StoryDiamond}></WebpImage>}
        {isDesktop && <WebpImage src={StoryDiamond}></WebpImage>}
      </OrientationToView>
      <Line orientation="vertical" textAlign="center" className={classes.divider} />
      <OrientationToView>
        <Typography>
          At the time, Ye <InlineAvater size={avatarSize} alt="Ye" src={YeAvatar} /> was a visionary PhD studentwith groundbreaking research on
          hardware provers and was inspired to build a byte-code-level compatible solution closely resembling theEthereum Virtual Machine (EVM),
          ensuring a seamless developer experience. 
        </Typography>
      </OrientationToView>
      <Line orientation="vertical" textAlign="center" className={classes.divider} />

      <Stack direction={isMobileOnly ? "column" : "row"} alignItems="center" spacing={isMobileOnly ? "12rem" : "13.6rem"}>
        <OrientationToView direction={isMobileOnly ? "up" : "right"}>
          <Typography sx={{ textAlign: ["center", "left"] }}>
            Realizing that Ethereum equivalence was the only viable path forward, the trio embarked on a mission to build something extraordinary: a
            community-first ecosystem built on native zkEVM capabilities. 
          </Typography>
        </OrientationToView>
        <OrientationToView direction={isMobileOnly ? "up" : "left"}>
          <img style={{ maxWidth: isMobileOnly ? "100%" : "unset" }} src={StoryBucket} alt=""></img>
        </OrientationToView>
      </Stack>
      <Line orientation="vertical" textAlign="center" className={classes.divider} />
      <OrientationToView>
        <Cooperation></Cooperation>
      </OrientationToView>
      <Line orientation="vertical" textAlign="center" className={classes.divider} />

      <Stack direction={isMobileOnly ? "column-reverse" : "row"} alignItems="center" spacing={isMobileOnly ? "12rem" : "13.6rem"}>
        <OrientationToView direction={isMobileOnly ? "up" : "right"}>
          <img style={{ maxWidth: isMobileOnly ? "100%" : "unset" }} src={StoryBucket} alt=""></img>
        </OrientationToView>
        <OrientationToView direction={isMobileOnly ? "up" : "left"}>
          <Typography sx={{ textAlign: "left" }}>
            What sets Scroll apart in the competitive zero knowledge rollup space is our commitment to EVM compatibility. By aiming for seamless
            integration with Ethereum and prioritizing an exceptional developer experience, we are determined to revolutionize Ethereum's scalability
            landscape.
          </Typography>
        </OrientationToView>
      </Stack>
      <Line orientation="vertical" textAlign="center" className={classes.divider} />
      <OrientationToView>
        <Typography>
          Today, Scroll thrives as a vibrant community, offering elegant technology that remains accessible to all while providing stability,
          security, and ownership to potentially billions of users and developers. 
        </Typography>
      </OrientationToView>
      <OrientationToView>
        <Box sx={{ mt: ["23rem", "36rem"] }}>
          <Typography sx={{ fontWeight: 700 }}>And we're only getting started.</Typography>
        </Box>
      </OrientationToView>
    </SectionWrapper>
  )
}

export default Initail
