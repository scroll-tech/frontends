import { Stack, Typography } from "@mui/material"

import Button from "@/components/Button"
import SectionWrapper from "@/components/SectionWrapper"
import useCheckViewport from "@/hooks/useCheckViewport"

import BadgeList from "./BadgeList"

const Skelly = () => {
  const { isMobile, isTablet } = useCheckViewport()

  return (
    <SectionWrapper dark sx={{ pt: ["4rem", "5.5rem", "6rem"], background: "#101010" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" gap="2rem">
        <Typography
          className="ecosystem-protocols-title"
          sx={{ color: "#fff", fontSize: ["2.4rem", "4.4rem"], lineHeight: ["3.6rem", "5.6rem"], fontWeight: [600, 500], flex: 1 }}
        >
          Earn badges for Scroll Skelly
        </Typography>
        <Button width={isMobile ? "15.4rem" : isTablet ? "21.5rem" : "25rem"} href="/skelly" target="_blank" color="primary">
          Go to Scroll Skelly
        </Button>
      </Stack>
      <BadgeList
        items={[
          {
            title: "Scroll Skelly",
            description: `Lorem ipsum dolor sit amet,  adipiscing elit. Donec dictum auctor sem et mauris, ac viverra risus tellus eget diam.
            mauris, ac viverra risus tellus eget diam.`,
          },
          {
            title: "Scroll Skelly",
            description: `Lorem ipsum dolor sit amet,  adipiscing elit. Donec dictum auctor sem et mauris, ac viverra risus tellus eget diam.
            mauris, ac viverra risus tellus eget diam.`,
          },
          {
            title: "Scroll Skelly",
            description: `Lorem ipsum dolor sit amet,  adipiscing elit. Donec dictum auctor sem et mauris, ac viverra risus tellus eget diam.
            mauris, ac viverra risus tellus eget diam.`,
          },
        ]}
      />
    </SectionWrapper>
  )
}
export default Skelly
