import { useRef } from "react"

import { Box, Button as MuiButton, Stack, Typography } from "@mui/material"
import { styled } from "@mui/system"

import Link from "@/components/Link"
import useIsMobile from "@/hooks/useIsMobile"

const Button = styled(MuiButton)<any>(
  ({ theme }) => `
    width: 20.8rem;
    height: 5rem;
    padding: 0;
  `,
)

const Header = () => {
  const isMobile = useIsMobile()

  const typeformLinkRef = useRef("https://scrollzkp.typeform.com/buildwithscroll")
  return (
    <Box
      sx={{
        height: ["16.6rem", "36.8rem"],
        background:
          "linear-gradient(0deg, rgba(255, 246, 235, 0.2), rgba(255, 246, 235, 0.2)), linear-gradient(180deg, rgba(255, 232, 203, 0.74) 0%, rgba(255, 255, 255, 0) 100%);",
      }}
    >
      <Box
        sx={{
          maxWidth: "1160px",
          mx: "auto",
          px: [0, "3rem"],
          pt: ["3.6rem", "9.3rem"],
          textAlign: ["center", "left"],
        }}
      >
        <Typography
          sx={{
            fontSize: ["3rem", "5rem", "6.2rem"],
            lineHeight: 1.2,
            fontWeight: 600,
            fontFamily: "Inter",
          }}
        >
          Scroll Ecosystem
        </Typography>
        {isMobile ? (
          <>
            <Typography color="textSecondary" sx={{ fontSize: "1.2rem", lineHeight: "1.4rem", fontFamily: "Inter", mt: "2rem" }}>
              A curation of Apps on our testnet,{" "}
              <Link external href={typeformLinkRef.current} sx={{ color: "primary.main", fontSize: "inherit" }}>
                Add Your App Today
              </Link>
            </Typography>
            {/* <Typography color="textSecondary" sx={{ fontSize: "1.2rem", lineHeight: "1.4rem", fontFamily: "Inter", mt: "2rem" }}>
              Stay up to date with our{" "}
              <Link external href="" sx={{ color: "primary.main", fontSize: "inherit" }}>
                Ecosystem Roadmap
              </Link>
            </Typography> */}
          </>
        ) : (
          <>
            <Typography color="textSecondary" sx={{ fontSize: "2.2rem", fontFamily: "Inter", mt: "2rem" }}>
              Want to join the Scroll ecosystem?
            </Typography>
            <Stack direction="row" spacing={4} sx={{ mt: "3rem" }}>
              <Button variant="contained" href={typeformLinkRef.current} target="_blank">
                Contact us
              </Button>
              {/* <Button
                color="secondary"
                href=""
                sx={{
                  backgroundColor: "transparent",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                Ecosystem Roadmap
              </Button> */}
            </Stack>
          </>
        )}
      </Box>
    </Box>
  )
}

export default Header
