import { useMemo } from "react"
import { makeStyles } from "tss-react/mui"

import { Box, Typography as MuiTypography, Stack } from "@mui/material"
import { styled } from "@mui/system"

import HaichenAvatar from "@/assets/svgs/members/Haichen-avatar.svg"
import SandyAvatar from "@/assets/svgs/members/Sandy-avatar.svg"
import YeAvatar from "@/assets/svgs/members/Ye-avatar.svg"
import OrientationToView from "@/components/Motion/OrientationToView"
import SectionWrapper from "@/components/SectionWrapper"
import useCheckViewport from "@/hooks/useCheckViewport"

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

const CoFounder = styled("span")(() => ({
  whiteSpace: "nowrap",
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
  twoSidesSection: {
    flexDirection: "row",
    gap: "6rem",
    [theme.breakpoints.between("md", "lg")]: {
      "& > *": {
        flex: 1,
      },
    },
    [theme.breakpoints.down("lg")]: {
      gap: "3rem",
    },
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      gap: "8rem",
    },
    [theme.breakpoints.down("sm")]: {
      gap: "10rem",
    },
  },
  mobileReverse: {
    [theme.breakpoints.down("md")]: {
      flexDirection: "column-reverse",
    },
  },
  centerImg: {
    maxWidth: "unset",
    [theme.breakpoints.down("lg")]: {
      maxWidth: "80%",
      minWidth: "48rem",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      minWidth: "unset",
    },
  },
  sideImg: {
    maxWidth: "unset",
    [theme.breakpoints.down("lg")]: {
      maxWidth: "100%",
    },
  },
}))

const Initail = () => {
  const { classes, cx } = useStyles()
  const { isMobile, isLandscape } = useCheckViewport()

  const avatarSize = useMemo(() => (isMobile ? "small" : "middle"), [isMobile])

  return (
    <SectionWrapper maxWidth="127.5rem" sx={{ textAlign: "center", pb: "22rem" }}>
      <OrientationToView>
        <Typography>Founded in 2021,</Typography>
        <Typography sx={{ whiteSpace: "pre-wrap" }}>
          our vision is to create an inclusive and infinite ecosystem for Ethereum. In 2020, as DeFi boomed and Ethereum faced network congestion, our
          founders—
          <CoFounder>
            Ye <InlineAvater size={avatarSize} alt="Ye" src={YeAvatar} />
          </CoFounder>
          , a mathematician fascinated by zero knowledge proofs;{" "}
          <CoFounder>
            Haichen <InlineAvater size={avatarSize} alt="Haichen" src={HaichenAvatar} />
          </CoFounder>
          , a systems engineer drawn to cryptography; and{" "}
          <CoFounder>
            Sandy <InlineAvater size={avatarSize} alt="Sandy" src={SandyAvatar} />
          </CoFounder>
          , an experienced web3 researcher and investor—joined forces.
        </Typography>
      </OrientationToView>
      <Line orientation="vertical" textAlign="center" className={classes.divider} />
      <OrientationToView>
        <Typography sx={{ whiteSpace: "pre-wrap" }}>
          An in-depth discussion about the purpose of blockchain and the scalability trilemma ensued. Understanding that Ethereum's deliberate
          trade-off for prioritizing security and decentralization resulted in slower transaction times, the founders saw an opportunity: a scaling
          solution nearly identical to Ethereum with lower costs, faster speeds, and infinite scaling. 
        </Typography>
        <Typography sx={{ mt: ["3rem", "5rem"] }}>And thus, Scroll was born.</Typography>
      </OrientationToView>
      <Line orientation="vertical" textAlign="center" className={classes.divider} />
      <OrientationToView>
        <img className={classes.centerImg} src="/imgs/story/story-initial-1.svg" alt=""></img>
      </OrientationToView>
      <Line orientation="vertical" textAlign="center" className={classes.divider} />
      <OrientationToView>
        <Typography>
          At the time,{" "}
          <CoFounder>
            Ye <InlineAvater size={avatarSize} alt="Ye" src={YeAvatar} />
          </CoFounder>{" "}
          was a visionary PhD student <br></br>with groundbreaking research on hardware provers. The huge potential for efficiency improvements using
          zero knowledge hardware and cryptographic technology inspired him to build a bytecode-level compatible solution closely resembling the EVM
          (Ethereum Virtual Machine). Only through such an improvement in efficiency could the concept of the zkEVM (zero knowledge Ethereum Virtual
          Machine) come to life, enabling a seamless developer experience.
        </Typography>
      </OrientationToView>
      <Line orientation="vertical" textAlign="center" className={classes.divider} />

      <Stack alignItems="center" className={classes.twoSidesSection}>
        <OrientationToView direction={isLandscape ? "right" : "up"}>
          <Typography sx={{ textAlign: ["center", "center", "left"] }}>
            Realizing that Ethereum compatibility was the only viable path forward, the trio embarked on a mission to build an open-source, scalable
            ecosystem leveraging the native capabilities of a zkEVM, while maintaining Ethereum’s L1 security and upholding the community’s commitment
            to decentralization.
          </Typography>
        </OrientationToView>
        <OrientationToView direction={isLandscape ? "left" : "up"}>
          <img className={classes.sideImg} src="/imgs/story/story-initial-2.svg" alt=""></img>
        </OrientationToView>
      </Stack>
      <Line orientation="vertical" textAlign="center" className={classes.divider} />
      <OrientationToView>
        <Cooperation></Cooperation>
      </OrientationToView>
      <Line orientation="vertical" textAlign="center" className={classes.divider} />

      <Stack className={cx(classes.twoSidesSection, classes.mobileReverse)} alignItems="center">
        <OrientationToView direction={isLandscape ? "right" : "up"}>
          <img className={classes.sideImg} src="/imgs/story/story-initial-3.svg" alt=""></img>
        </OrientationToView>
        <OrientationToView direction={isLandscape ? "left" : "up"}>
          <Typography sx={{ textAlign: ["center", "center", "left"] }}>
            What sets Scroll apart in the competitive zero knowledge rollup space is our commitment to EVM compatibility. By aiming for seamless
            integration with Ethereum and prioritizing an exceptional developer experience, we are determined to revolutionize Ethereum's scalability
            potential. 
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
        <Box sx={{ mt: "20rem" }}>
          <Typography sx={{ fontWeight: 700 }}>And we're only getting started.</Typography>
        </Box>
      </OrientationToView>
    </SectionWrapper>
  )
}

export default Initail
