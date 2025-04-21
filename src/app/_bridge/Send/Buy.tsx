import { sendGAEvent } from "@next/third-parties/google"
import Image from "next/image"

import { Box, Stack, Typography } from "@mui/material"

import { ONRAMP_PLATFORMS } from "@/constants/bridge"

const ThirdParty = () => {
  return (
    <Stack direction="column" sx={{ height: "100%", gap: "1.6rem" }}>
      {ONRAMP_PLATFORMS.map(item => (
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
            sendGAEvent("event", "bridge_onramp_click", {
              label: item.name,
            })
          }}
          sx={{
            width: "100%",
            padding: "1.2rem 1.6rem",
            backgroundColor: "#FFF8F3",
            borderRadius: "1rem",
            "&:hover": {
              backgroundColor: "#FFFFFF",
            },
          }}
        >
          <Image src={item.icon} width={48} height={48} style={{ borderRadius: "0.8rem" }} alt={item.name} />
          <Box>
            <Typography sx={{ fontWeight: 600, cursor: "pointer", fontSize: ["1.6rem", "1.8rem"], lineHeight: ["2.8rem", "2.8rem"] }}>
              {item.name}
            </Typography>

            {item.description.map((item, idx) => (
              <Image
                style={{
                  width: "auto",
                  marginRight: "0.8rem",
                }}
                src={item}
                width={12}
                height={12}
                alt="thirdparty"
                key={idx}
              />
            ))}
          </Box>
        </Stack>
      ))}
    </Stack>
  )
}

export default ThirdParty
