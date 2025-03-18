import { Box, Container, Stack } from "@mui/material"

import GlobalSvg from "@/assets/svgs/landingpage/global.svg?url"
import OpenSvg from "@/assets/svgs/landingpage/open.svg?url"
import SecureSvg from "@/assets/svgs/landingpage/secure.svg?url"
import Button from "@/components/Button"
import { VISION_URL } from "@/constants/link"

import VisionCard from "./VisionCard"

const VISION_LIST = [
  {
    icon: SecureSvg,
    key: "secure",
    title: "Secure Without \n Sacrifice",
    content:
      "Our mission is to remove the trade offs between scalability and security. Fast finality, full Ethereum compatibility, and uncompromising security.",
  },
  {
    icon: OpenSvg,
    key: "open",
    title: "Open \n Access",
    content: "Scroll is for founders. Scale your ideas, build faster, and grow larger by accessing the shared knowledge of the Open Economy.",
  },
  {
    icon: GlobalSvg,
    key: "global",
    title: "Built for \n Everyone",
    content: "We provide the open-source infrastructure designed for how real people actually use onchain services.",
  },
]

const Vision = () => {
  return (
    <Box sx={{ backgroundColor: "background.default" }}>
      <Container sx={{ py: "10.3rem" }}>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(33rem, 1fr))", gap: "2.8rem", mb: "6rem" }}>
          {VISION_LIST.map(({ key, ...vision }) => (
            <VisionCard key={key} {...vision} />
          ))}
        </Box>
        <Button color="primary" href={VISION_URL} className="!w-[250px] mx-auto">
          View vision details
        </Button>
      </Container>
    </Box>
  )
}

export default Vision
