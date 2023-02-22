import { Box, Typography } from "@mui/material"

import Link from "@/components/Link"

const Header = () => {
  return (
    <Box sx={{ position: "relative" }}>
      <Typography
        variant="h1"
        sx={{
          fontSize: "6.4rem",
          lineHeight: 1.2,
          fontWeight: 500,
          fontFamily: "Inter",
        }}
      >
        Scroll Ecosystem
      </Typography>
      <Typography sx={{ fontSize: ["1.2rem", "2.4rem"], fontWeight: 500, fontFamily: "Inter", mt: [0, "1rem"] }}>
        Join our ecosystem today by{" "}
        <Link href="https://scrollzkp.typeform.com/scroll-add-app" external underline="always" sx={{ color: "primary.main", fontSize: "inherit" }}>
          Adding Your App
        </Link>
        !
      </Typography>
    </Box>
  )
}

export default Header
