// import { Fade } from "react-awesome-reveal"
import { useEffect, useRef, useState } from "react"
import { makeStyles } from "tss-react/mui"

import { Box, Tooltip, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { FadeInUp } from "@/components/Animation"
import Button from "@/components/Button"
import Link from "@/components/Link"

import TextMarquee from "./components/TextMarquee"

const useStyles = makeStyles()(theme => ({
  tooltip: {
    padding: "1.6rem 2.4rem",
    backgroundColor: "#90F8EA",
    marginTop: "1.8rem",
  },
  arrow: {
    color: "#90F8EA",
  },
}))

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  paddingTop: "13.8rem",
  paddingBottom: "15.5rem",
  [theme.breakpoints.down("md")]: {
    padding: "6.8rem 2rem 10rem",
  },
}))

const FixedTooltip = styled(Tooltip)(({ theme }) => ({
  ".MuiTooltip-tooltip": {
    padding: "1.6rem",
  },
}))

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: "1rem",
  [theme.breakpoints.down("md")]: {
    marginBottom: "0.4rem",
  },
}))

const SubTitle = styled(Typography)(({ theme }) => ({
  marginTop: "2rem",
  marginBottom: "5rem",
  maxWidth: "77rem",
  [theme.breakpoints.down("md")]: {
    marginBottom: "4rem",
  },
}))

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "3rem",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "2rem",
  },
}))

const Header = () => {
  const { classes } = useStyles()

  const [isEventVisible, setIsEventVisible] = useState(false)
  const buttonRef = useRef()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEventVisible(true)
    }, 2000)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <Container>
      <FadeInUp duration={700} sx={{ display: "flex" }}>
        <Title variant="H1" data-aos="fade-up">
          Scroll is
        </Title>

        <TextMarquee />
        <SubTitle variant="Body1" textAlign="center">
          Scroll seamlessly extends Ethereum’s capabilities through zero knowledge tech and EVM compatibility. The L2 network built by Ethereum devs
          for Ethereum devs.
        </SubTitle>
        <ButtonContainer>
          <Button href="/bridge" color="primary">
            Bridge into Scroll
          </Button>
          <FixedTooltip
            open={isEventVisible}
            classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
            PopperProps={{
              container: buttonRef.current,
            }}
            title={
              <Typography sx={{ fontSize: ["1.6rem", "1.8rem"], lineHeight: "2.4rem" }}>
                Mint your{" "}
                <Link href="/developer-nft" sx={{ fontSize: "inherit", color: "inherit" }} underline="always">
                  Scroll Origins
                </Link>
              </Typography>
            }
            arrow
          >
            <Box ref={buttonRef}>
              <Button target="_blank" href="https://docs.scroll.io/en/home/">
                Start building
              </Button>
            </Box>
          </FixedTooltip>
        </ButtonContainer>
      </FadeInUp>
    </Container>
  )
}

export default Header
