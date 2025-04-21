import { sendGAEvent } from "@next/third-parties/google"
import Image from "next/image"

import { Box, Stack, Typography } from "@mui/material"

import { EXCHANGES } from "@/constants/bridge"

const Exchanges = () => {
  return (
    <Box sx={{ height: "100%", gap: "1.6rem" }}>
      <Typography sx={{ mb: "2.4rem" }}>
        Choose
        <Image src="/imgs/logo/scroll.svg" width={32} height={32} style={{ margin: "0 0.4rem" }} alt="thirdparty" />
        <Box component="span" sx={{ fontWeight: 600 }}>
          Scroll{" "}
        </Box>
        as the withdrawal network on supported exchange.
      </Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: ["repeat(2, 1fr)", "repeat(3, 1fr)"], gap: "1.6rem" }}>
        {EXCHANGES.map(item => (
          <Stack
            component="a"
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            direction="row"
            gap="1.2rem"
            alignItems="center"
            key={item.name}
            onClick={() => {
              sendGAEvent("event", "bridge_exchange_click", {
                label: item.name,
              })
            }}
            sx={{
              width: "100%",
              padding: "1.2rem 1.6rem",
              backgroundColor: "#FFF8F3",
              borderRadius: "1rem",
              cursor: "pointer",
              textDecoration: "none",
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor: "#FFFFFF",
              },
            }}
          >
            <Box
              sx={{
                "& img": {
                  width: { xs: "32px", sm: "48px" },
                  height: { xs: "32px", sm: "48px" },
                },
              }}
            >
              <Image src={item.icon} width={48} height={48} alt={item.name} className="rounded-[0.8rem]" />
            </Box>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: ["1.6rem", "1.8rem"],
                lineHeight: ["2rem", "2.4rem"],
                color: "inherit",
                cursor: "pointer",
              }}
            >
              {item.name}
            </Typography>
          </Stack>
        ))}
      </Box>
    </Box>
  )
}

export default Exchanges
