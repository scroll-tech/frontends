import { sendGAEvent } from "@next/third-parties/google"
import Image from "next/image"

import { Box, Stack, Typography } from "@mui/material"

import { CROSS_CHAIN_BRIDGES } from "@/constants/bridge"
import useCheckViewport from "@/hooks/useCheckViewport"

const ThirdParty = () => {
  const { isMobile } = useCheckViewport()
  return (
    <Stack direction="column" sx={{ height: "100%", gap: "1.6rem" }}>
      {CROSS_CHAIN_BRIDGES.map(item => (
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
            sendGAEvent("event", "bridge_dex_click", {
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
          <Image src={item.icon} width={48} height={48} style={{ borderRadius: "0.8rem" }} alt={item.name} />
          <Box
            sx={{
              display: "flex",
              alignItems: ["flex-start", "center"],
              justifyContent: "space-between",
              width: "100%",
              flexDirection: ["column", "row"],
            }}
          >
            <Typography sx={{ fontWeight: 600, cursor: "pointer", fontSize: ["1.6rem", "1.8rem"], lineHeight: "2.4rem" }}>{item.name}</Typography>

            <Box>
              {item.description.map((item, idx) => (
                <Image
                  style={{
                    borderRadius: "50%",
                    marginLeft: idx !== 0 ? "-0.2rem" : "0",
                    width: isMobile ? "1.6rem" : "2.4rem",
                    height: isMobile ? "1.6rem" : "2.4rem",
                  }}
                  src={item}
                  width={16}
                  height={16}
                  alt="thirdparty"
                  key={idx}
                />
              ))}
            </Box>
          </Box>
        </Stack>
      ))}
    </Stack>
  )
}

export default ThirdParty
