"use client"

import { Box, Container, Stack, Typography } from "@mui/material"
import { styled } from "@mui/system"

import Button from "@/components/Button"
import OrientationToView from "@/components/Motion/OrientationToView"
import useCheckViewport from "@/hooks/useCheckViewport"

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "6.4rem",
  lineHeight: "8.8rem",
  fontWeight: 600,
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    fontSize: "4rem",
    lineHeight: "5.6rem",
    marginBottom: "0.4rem",
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
  const { isMobile, isLandscape } = useCheckViewport()
  return (
    <>
      <Box
        sx={[
          {
            position: "relative",
          },
          theme => ({
            [theme.breakpoints.up("md")]: {
              background: "url(/imgs/homepage/landing-bg.webp) center / cover no-repeat",
              aspectRatio: "16 / 9",
              marginTop: "-6.5rem",
            },
          }),
        ]}
      >
        {isLandscape && (
          <Box>
            <video style={{ width: "100vw", objectFit: "cover" }} autoPlay muted loop playsInline preload="none">
              <source src="/videos/home-header-bg.mp4" type="video/mp4" />
              <source src="/videos/home-header-bg-264.mp4" type="video/mp4" />
              Not support video
            </video>
          </Box>
        )}
        <Container
          sx={theme => ({
            [theme.breakpoints.down("md")]: { paddingTop: "7.2rem" },
            [theme.breakpoints.up("md")]: {
              position: "absolute",
              top: "10rem",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1,
            },
            "@media (min-width: 1680px)": {
              top: "calc(100vw*0.06 + 6.5rem)",
            },
          })}
        >
          <OrientationToView>
            <Stack direction="column" alignItems="center" gap={isMobile ? "2.4rem" : "3.2rem"}>
              <Title data-aos="fade-up">
                We are building the<br></br> Open Economy
              </Title>
              <Typography sx={{ fontSize: ["1.8rem", "2.4rem"], lineHeight: ["2.8rem", "3.6rem"], textAlign: "center", mt: "-1.8rem" }}>
                Scroll is the leading zero-knowledge rollup.<br></br>Scaling Ethereum for good.{" "}
              </Typography>
              <ButtonContainer>
                <Button sx={{ backgroundColor: "#FFF8F3 !important" }} href="/bridge" color="primary">
                  Bridge into Scroll
                </Button>
                <Button sx={{ backgroundColor: "#FFF8F3 !important" }} target="_blank" href="https://docs.scroll.io/en/home/">
                  Start building
                </Button>
              </ButtonContainer>
            </Stack>
          </OrientationToView>
        </Container>
      </Box>
      {!isLandscape && (
        <Box sx={{ width: "100%", aspectRatio: "909/589", background: "url(/imgs/homepage/landing-bg-mobile.webp) center / cover no-repeat" }}></Box>
      )}
    </>
  )
}

export default Header
