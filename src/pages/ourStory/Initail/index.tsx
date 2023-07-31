import { makeStyles } from "tss-react/mui"

import { Box, Divider, Stack, Typography } from "@mui/material"

import HaichenAvatar from "@/assets/svgs/refactor/haichen-avatar.svg"
import SandyAvatar from "@/assets/svgs/refactor/sandy-avatar.svg"
import StoryBucket from "@/assets/svgs/refactor/story-bucket.svg"
import StoryDiamond from "@/assets/svgs/refactor/story-diamond.svg"
import YeAvatar from "@/assets/svgs/refactor/ye-avatar.svg"
import SectionWrapper from "@/components/SectionWrapper"
import WebpImage from "@/components/WebpImage"

import Cooperation from "./Cooperation"
import InlineAvater from "./InlineAvatar"

const useStyles = makeStyles()(theme => ({
  bg: {
    width: "100vw",
    height: "100vh",
    marginTop: "-6.5rem",
    background: "url(/imgs/story/story-bg.png) no-repeat center",
    backgroundSize: "cover",
    textAlign: "center",
  },
  mask: {
    width: "84rem",
    height: "26rem",
    padding: "5rem 0",
    position: "relative",
    top: "50%",
    transform: "translateY(-50%)",
    margin: "0 auto",
    background: `radial-gradient(50% 50% at 50% 50%, ${theme.palette.primary.contrastText} 44%, transparent 100%)`,
  },
  divider: {
    height: "19.5rem",
    width: "50%",
    margin: "6rem 0",
  },
}))

const Initail = () => {
  const { classes } = useStyles()
  return (
    <SectionWrapper maxWidth="127.5rem" sx={{ textAlign: "center" }}>
      <Box>
        <Typography sx={{ fontSize: "3.2rem" }}>Founded in 2021,</Typography>
        <Typography sx={{ fontSize: "3.2rem", textIndent: "2em", whiteSpace: "pre-wrap" }}>
          our vision is to create an inclusive and infinite ecosystem for Ethereum. In 2020, as DeFi boomed and Ethereum faced network congestion, our
          founders—Ye <InlineAvater fontSize="3.2rem" alt="Ye" src={YeAvatar} />, a mathematician fascinated by zero-knowledge proofs; Haichen{" "}
          <InlineAvater fontSize="3.2rem" alt="Haichen" src={HaichenAvatar} />, a systems engineer drawn to cryptography; and Sandy{" "}
          <InlineAvater fontSize="3.2rem" alt="Sandy" src={SandyAvatar} />, an experienced web3 researcher and investor—joined forces.
        </Typography>
      </Box>
      <Divider orientation="vertical" textAlign="center" className={classes.divider} />
      <Box>
        <Typography sx={{ fontSize: "3.2rem", textIndent: "2em", whiteSpace: "pre-wrap" }}>
          The idea for Scroll was born during an in-depth discussion about the purpose of blockchain and the scalability trilemma. Understanding that
          Ethereum's deliberate trade-off for prioritizing security and decentralization resulted in slower transaction times, the founders saw an
          opportunity.
        </Typography>
      </Box>
      <Divider orientation="vertical" textAlign="center" className={classes.divider} />
      <Box>
        <WebpImage src={StoryDiamond}></WebpImage>
        <WebpImage src={StoryDiamond}></WebpImage>
        <WebpImage src={StoryDiamond}></WebpImage>
      </Box>
      <Divider orientation="vertical" textAlign="center" className={classes.divider} />
      <Box>
        <Typography sx={{ fontSize: "3.2rem" }}>
          At the time, Ye <InlineAvater fontSize="3.2rem" alt="Ye" src={YeAvatar} /> was a visionary PhD studentwith groundbreaking research on
          hardware provers and was inspired to build a byte-code-level compatible solution closely resembling theEthereum Virtual Machine (EVM),
          ensuring a seamless developer experience. 
        </Typography>
      </Box>
      <Divider orientation="vertical" textAlign="center" className={classes.divider} />
      <Stack direction="row" alignItems="center" spacing="13.6rem">
        <Typography sx={{ fontSize: "3.2rem", textAlign: "left" }}>
          Realizing that Ethereum equivalence was the only viable path forward, the trio embarked on a mission to build something extraordinary: a
          community-first ecosystem built on native zkEVM capabilities. 
        </Typography>
        <img src={StoryBucket} alt=""></img>
      </Stack>
      <Divider orientation="vertical" textAlign="center" className={classes.divider} />
      <Cooperation></Cooperation>
      <Divider orientation="vertical" textAlign="center" className={classes.divider} />
      <Stack direction="row" alignItems="center" spacing="13.6rem">
        <img src={StoryBucket} alt=""></img>
        <Typography sx={{ fontSize: "3.2rem", textAlign: "left" }}>
          What sets Scroll apart in the competitive zero knowledge rollup space is our commitment to EVM compatibility. By aiming for seamless
          integration with Ethereum and prioritizing an exceptional developer experience, we are determined to revolutionize Ethereum's scalability
          landscape.
        </Typography>
      </Stack>
      <Divider orientation="vertical" textAlign="center" className={classes.divider} />
      <Box>
        <Typography sx={{ fontSize: "3.2rem" }}>
          Today, Scroll thrives as a vibrant community, offering elegant technology that remains accessible to all while providing stability,
          security, and ownership to potentially billions of users and developers. 
        </Typography>
      </Box>
      <Box sx={{ mt: "36rem", mb: "49rem" }}>
        <Typography sx={{ fontSize: "3.2rem", fontWeight: 700 }}>And we're only getting started.</Typography>
      </Box>
    </SectionWrapper>
  )
}

export default Initail
