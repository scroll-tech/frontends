import { Box } from "@mui/material"

// import LoadingPage from "@/components/LoadingPage"
import TOC from "./components/tableOfContents"
import AirdropFaqMdx from "./scroll-airdrop-faq.mdx"

const AirdropFaqDetail = () => {
  return (
    <Box>
      <Box
        className="wrapper"
        sx={{
          maxWidth: "140rem",
          padding: ["4rem 2rem", "4rem 2rem", "6rem 4rem 14rem"],
          overflow: ["hidden", "hidden", "visible"],
          display: ["block", "block", "flex"],
        }}
      >
        <Box sx={{ width: "32rem", flexShrink: 0, position: "relative" }}>
          <Box
            sx={{
              position: "sticky",
              top: "14rem",
              maxWidth: "32vw",
              display: ["none", "none", "block"],
            }}
          >
            <TOC />
          </Box>
        </Box>
        <Box className="markdown-body">
          <AirdropFaqMdx></AirdropFaqMdx>
        </Box>
      </Box>
    </Box>
  )
}

export default AirdropFaqDetail
