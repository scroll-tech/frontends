import Image from "next/image"

import { Box, Typography } from "@mui/material"

const ExternalBridge = ({ selectedToken, txType }: { selectedToken: Token; txType: "Deposit" | "Withdraw" }) => {
  const bridgeInfo = selectedToken.extensions?.bridgeInfo
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        sx={{
          fontSize: ["1.4rem", "1.8rem"],
          fontWeight: "500",
          textAlign: "left",
          width: "100%",
          lineHeight: ["2.4rem", "3.5rem"],
          mb: "0.8rem",
        }}
      >
        Use third party bridge to {txType === "Deposit" ? "deposit" : "withdraw"} {selectedToken.symbol} to{" "}
        {txType === "Deposit" ? "Scroll" : "Ethereum"}
      </Typography>
      <Box
        component="a"
        href={bridgeInfo?.bridgeUrl}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "1.6rem",
          p: "1.6rem",
          borderRadius: "0.8rem",
          backgroundColor: "#FFF8F3",
          cursor: "pointer",
          textDecoration: "none",
          color: "inherit",
          transition: "all 0.2s",
          "&:hover": {
            backgroundColor: "#FFFFFF",
          },
        }}
      >
        <Image width={48} height={48} src={bridgeInfo?.bridgeIcon!} alt="bridge" />
        <Typography sx={{ fontSize: ["1.6rem", "1.8rem"], fontWeight: "700" }}>{bridgeInfo?.bridgeName}</Typography>
      </Box>
    </Box>
  )
}

export default ExternalBridge
