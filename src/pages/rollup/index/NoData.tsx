import { Typography, Theme, Box } from "@mui/material"
import Header from "../components/Header"
import { styled } from "@mui/material/styles"

const Container = styled(Box)(({ theme }) => ({
  marginTop: "12rem",
  marginBottom: "60rem",
  textAlign: "center",
}))

const NoResultsTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Pulp Display",
  fontSize: "2rem",
  lineHeight: "2.4rem",
  marginTop: "1rem",
  marginBottom: "1rem",
  color: theme.palette.text.primary,
}))

const TryAgain = styled("a")(({ theme }) => ({
  color: theme.palette.action.active,
  textDecoration: "underline",
  fontWeight: 600,
}))

const NoData = () => {
  return (
    <Container>
      <img className="w-[100px]" src="/imgs/rollup/nodata.png" />
      <NoResultsTypography>No results found</NoResultsTypography>
      <Typography variant="body1">We couldn’t find any result matching your search.</Typography>
      {/* <TryAgain> Try Again</TryAgain> */}
    </Container>
  )
}

export default NoData
