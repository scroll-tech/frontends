import { Box, Typography } from "@mui/material"

import Link from "@/components/Link"

const Header = () => {
  return (
    <Box sx={{ position: "relative" }}>
      <Typography
        variant="h1"
        sx={{
          fontSize: ["3rem", "5rem", "6.4rem"],
          lineHeight: 1.2,
          fontWeight: 500,
          fontFamily: "Inter",
        }}
      >
        Build with Scroll
      </Typography>
      <Typography sx={{ fontSize: ["1.2rem", "2rem", "2.4rem"], fontWeight: 500, fontFamily: "Inter", mt: [0, "1rem"] }}>
        Want to join the Scroll ecosystem?{" "}
        <Link href="https://scrollzkp.typeform.com/buildwithscroll" external underline="always" sx={{ color: "primary.main", fontSize: "inherit" }}>
          Contact us
        </Link>
      </Typography>
    </Box>
  )
}

export default Header
