import { Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

const ENSName = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontSize: "2.4rem",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "3.2rem",
  alignSelf: "center",
  flexShrink: 0,
  background: "linear-gradient(90deg, #FF684B, #FCE595, #4BFFE7, #45099d)",
  backgroundSize: "400%",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  animation: "gradientAnimation 5s infinite",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
    lineHeight: "1.8rem",
  },
  "@keyframes gradientAnimation": {
    "0%": {
      backgroundPosition: "0% 50%",
    },
    "50%": {
      backgroundPosition: "100% 50%",
    },
    "100%": {
      backgroundPosition: "0% 50%",
    },
  },
}))

const ENSSubdomain = props => {
  const { children, ...restProps } = props
  return <ENSName {...restProps}>{children}</ENSName>
}

export default ENSSubdomain
