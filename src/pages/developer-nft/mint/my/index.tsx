import SectionWrapper from "@/components/SectionWrapper"
import NFTContextProvider from "@/contexts/NFTContextProvider"

import NFTDetail from "./NFTDetail"

const MyNFT = () => {
  return (
    <NFTContextProvider>
      <SectionWrapper
        dark
        sx={{
          pt: ["2.4rem", "3.2rem", "7.8rem"],
          pb: ["8rem", "32rem"],
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.6rem",
          "& .MuiTypography-root": {
            color: theme => theme.palette.primary.contrastText,
          },
          "@media (max-width: 1280px)": {
            gap: 0,
          },
          "@media (max-width: 1200px)": {
            display: "grid",
            gridTemplateColumns: "minmax(min-content, 1fr) 1fr",
            justifyItems: "center",
          },
          "@media (max-width: 900px)": {
            gridTemplateColumns: "1fr",
            justifyItems: "center",
          },
        }}
      >
        <NFTDetail></NFTDetail>
      </SectionWrapper>
    </NFTContextProvider>
  )
}

export default MyNFT
