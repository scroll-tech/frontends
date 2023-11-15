import { Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as DisconnectedSvg } from "@/assets/svgs/bridge/history-disconnected.svg"
import Button from "@/components/Button"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"

const NotConnected = props => {
  const { description, ...restProps } = props
  const { connect } = useRainbowContext()
  const { isMobile } = useCheckViewport()
  return (
    <Stack direction="column" alignItems="center" justifyContent="center" spacing={isMobile ? "0.4rem" : "0.8rem"} {...restProps}>
      <SvgIcon sx={{ fontSize: "3.2rem" }} component={DisconnectedSvg} inheritViewBox></SvgIcon>
      <Typography sx={{ fontSize: "1.6rem", fontWeight: 600, lineHeight: "2.4rem", color: "#5B5B5B" }}>Wallet not connected</Typography>
      <Typography
        sx={{ fontSize: "1.6rem", lineHeight: "2.4rem", color: "#5B5B5B", textAlign: "center", mb: ["1rem !important", "1.6rem !important"] }}
      >
        {description}
      </Typography>
      <Button whiteButton color="primary" width={isMobile ? "100%" : "22rem"} onClick={connect}>
        Connect wallet
      </Button>
    </Stack>
  )
}

export default NotConnected
