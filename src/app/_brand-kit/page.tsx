import { Box } from "@mui/material"

import { genMeta } from "@/utils/route"

import Assets from "./Assets"
import Header from "./Header"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Brand Kit",
  relativeURL: "/brand-kit",
  description: "Explore and download Scroll brand assets and media kit, including logos, banners, and brand guidelines.",
  ogImg: "/og_scroll_brand.png",
  twitterImg: "/og_scroll_brand.png",
}))

const BrandKit = () => {
  return (
    <Box sx={{ overflow: "hidden", backgroundColor: "themeBackground.brand" }}>
      <Header />
      <Assets />
    </Box>
  )
}

export default BrandKit
