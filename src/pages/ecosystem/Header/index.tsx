import { isMobileOnly } from "react-device-detect"

import { Box, Stack, Typography } from "@mui/material"

import Button from "@/components/Button"
import OrientationToView from "@/components/Motion/OrientationToView"
import SectionWrapper from "@/components/SectionWrapper"
import { LIST_YOUR_DAPP_LINK } from "@/constants"

const Header = () => {
  return (
    <>
      <SectionWrapper
        full
        sx={{
          pt: ["7.3rem", "7.3rem", "15.4rem"],
          pb: ["4rem", "4rem", "15.4rem"],
          display: "flex",
          flexDirection: ["column", "column", "row"],
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <OrientationToView>
          <Typography
            sx={{
              fontSize: ["4rem", "7.8rem"],
              lineHeight: ["5rem", "8.5rem"],
              fontWeight: 600,
              textAlign: ["center", "left"],
              width: ["100%", "66rem"],
            }}
          >
            An Ecosystem Forever in Motion
          </Typography>
        </OrientationToView>
        <Stack direction="column" justifyContent="space-between" spacing={isMobileOnly ? "3.8rem" : "2.5rem"} sx={{ maxWidth: ["100%", "68rem"] }}>
          <OrientationToView>
            <Typography
              sx={{
                fontSize: ["2rem", "2.6rem"],
                lineHeight: "normal",
                mt: ["2rem", "2rem", 0],
                textAlign: ["center", "left"],
              }}
            >
              Join a supportive, collaborative ecosystem with a greater purpose – permissionless, flexible, and dedicated to defining the future of
              Ethereum.
            </Typography>
          </OrientationToView>
          <OrientationToView delay={0.3}>
            <Stack direction={isMobileOnly ? "column" : "row"} spacing={isMobileOnly ? "2rem" : "3rem"} alignItems="center">
              <Button href="/bridge" color="primary" width={isMobileOnly ? "18.4rem" : "25rem"}>
                Bridge into Scroll
              </Button>
              <Button href={LIST_YOUR_DAPP_LINK} target="_blank" width={isMobileOnly ? "18.4rem" : "25rem"}>
                List your Dapp
              </Button>
            </Stack>
          </OrientationToView>
        </Stack>
      </SectionWrapper>
      <Box sx={{ backgroundColor: theme => theme.palette.themeBackground.light }}>
        <Box
          sx={{
            borderRadius: "4rem 4rem 0 0",
            height: ["50.8rem", "37rem"],
            background: "no-repeat bottom center url(/imgs/ecosystem/ecosystem-bg.png)",
            backgroundSize: "cover",
          }}
        ></Box>
      </Box>
    </>
  )
}

export default Header
