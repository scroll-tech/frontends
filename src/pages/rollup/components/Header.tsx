import { Container, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

const HeaderContainer = styled(Container)(({ theme }) => ({
  textAlign: "center",
}))

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "7.8rem",
  lineHeight: 1,
  fontWeight: 600,
  marginTop: "13.8rem",
  marginBottom: "1.3rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "4rem",
    marginTop: "6.8rem",
    marginBottom: "2rem",
  },
}))

const Summary = styled(Typography)(({ theme }) => ({
  fontSize: "2.6rem",
  maxWidth: "68rem",
  margin: "0 auto 12rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "2rem",
    margin: "0 auto 8rem",
  },
}))

const Header = () => {
  return (
    <HeaderContainer>
      <Title>Rollup Explorer</Title>
      <Summary>Track the status of blocks and transactions as they are committed and finalized.</Summary>
    </HeaderContainer>
  )
}

export default Header
