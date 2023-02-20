import { Box, Typography } from "@mui/material"

import Link from "@/components/Link"

const Header = () => {
  return (
    <Box>
      <Typography
        variant="h1"
        sx={{
          fontSize: "6.4rem",
          lineHeight: 1.2,
          fontWeight: 500,
        }}
      >
        Scroll Ecosystem
      </Typography>
      <Typography variant="h5">
        a curation of apps on our testnet,{" "}
        <Link href="/" external underline="always" sx={{ color: "primary.main", fontSize: "inherit" }}>
          add your app
        </Link>{" "}
        today!
      </Typography>
    </Box>
  )
}

export default Header
