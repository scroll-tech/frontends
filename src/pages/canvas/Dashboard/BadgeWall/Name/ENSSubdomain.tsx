import emojiRegex from "emoji-regex"
import { useEffect } from "react"

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
    fontSize: "1.4rem",
    lineHeight: "2rem",
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

  useEffect(() => {
    const element = document.querySelector(".ens-subdomain")
    if (!element) return
    element.innerHTML = element.textContent?.replace(emojiRegex(), match => `<span style="-webkit-text-fill-color:white;">${match}</span>`) as string
  }, [])

  return (
    <ENSName className="ens-subdomain" {...restProps}>
      {children}
    </ENSName>
  )
}

export default ENSSubdomain
