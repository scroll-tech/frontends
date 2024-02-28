import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

// import { ReactComponent as BackgroundSvg } from "@/assets/svgs/career/join-us.svg"
import { FadeInUp } from "@/components/Animation"
import Button from "@/components/Button"
import useCheckViewport from "@/hooks/useCheckViewport"

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: "4.8rem",
  marginTop: "12rem",
  fontSize: "4rem",
  fontWeight: 500,
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    marginBottom: "3.2rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "3.2rem",
    marginBottom: "2.8rem",
    padding: "0 2rem",
    marginTop: "4rem",
  },
}))

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  //   paddingTop: "15.3rem",
  paddingBottom: "12rem",
  borderRadius: "40px 40px 0px 0px",
  background: "#FFF0DD",
  [theme.breakpoints.down("md")]: {
    // paddingTop: "8.4rem",
    // paddingBottom: "9rem",
  },
  [theme.breakpoints.down("sm")]: {
    paddingBottom: "4rem",
  },
}))

const Positions = () => {
  const { isMobile } = useCheckViewport()

  return (
    <Container>
      {/* <Box sx={{ maxHeight: "85rem", width: "100%", overflow: "hidden", display: "flex", justifycontent: "center", alignItems: "center" }}>
        <SvgIcon sx={{ width: "100%", height: "auto" }} component={BackgroundSvg} inheritViewBox></SvgIcon>
      </Box> */}
      <img alt="background" style={{ width: "100%" }} src={isMobile ? "/imgs/career/join-us-m.png" : "/imgs/career/join-us.png"} />
      <FadeInUp>
        <Title>
          Join Scroll and contribute in <br /> building the best L2 product in the web3 world.
        </Title>
      </FadeInUp>
      <Button href="https://boards.greenhouse.io/scrollio" target="_blank" color="primary" width={isMobile ? "21rem" : "25rem"}>
        View open positions
      </Button>
    </Container>
  )
}

export default Positions
