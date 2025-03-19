import { Box, Container, Typography } from "@mui/material"

import Bridge from "@/assets/svgs/landingpage/bridge.svg"
import Doc from "@/assets/svgs/landingpage/doc.svg"
import Ecosystem from "@/assets/svgs/landingpage/ecosystem.svg"
import Levelup from "@/assets/svgs/landingpage/levelup.svg"
import ScrollOpen from "@/assets/svgs/landingpage/scroll-open.svg"
import Sessions from "@/assets/svgs/landingpage/sessions.svg"
import { BRIDGE_URL, DOC_URL, ECOSYSTEM_URL, LEVEL_UP_URL, SCROLL_OPEN_URL, SESSIONS_URL } from "@/constants/link"

import PortalCard from "./PortalCard"

const BUILDER_LIST = [
  {
    title: "For builders",
    items: [
      { icon: Doc, label: "Developer Docs", content: "Everything you need to start building", href: DOC_URL },
      { icon: Levelup, label: "Level Up", content: "Learn ZK and test your dev skills", href: LEVEL_UP_URL },
      { icon: ScrollOpen, label: "Scroll open", content: "A six-week builder program with a $100,000 prize pool", href: SCROLL_OPEN_URL },
    ],
  },
  {
    title: "For users",
    items: [
      { icon: Bridge, label: "Bridge", content: "Deposit your assets to Scroll", href: BRIDGE_URL },
      { icon: Ecosystem, label: "Projects", content: "Explore the dApps on Scroll", href: ECOSYSTEM_URL },
      { icon: Sessions, label: "Session 2", content: "Receive Marks for your contributions", href: SESSIONS_URL },
    ],
  },
]

const Portal = () => {
  return (
    <Box sx={{ backgroundColor: "themeBackground.light" }}>
      <Container sx={{ py: ["5.6rem", "10.6rem"] }}>
        {BUILDER_LIST.map(({ title, items }) => (
          <>
            <Typography
              sx={{
                typography: "title",
                fontSize: ["2.8rem", "3.6rem"],
                lineHeight: ["4.4rem", "5.6rem"],
                mb: ["2.4rem", "4rem"],
                "&:nth-of-type(n+2)": { mt: ["3.2rem", "7.2rem"] },
              }}
            >
              {title}
            </Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(33rem, 1fr))", gap: ["2.4rem", "2.8rem"] }}>
              {items.map(({ icon, label, content }) => (
                <PortalCard key={label} icon={icon} label={label} content={content}></PortalCard>
              ))}
            </Box>
          </>
        ))}
        <Box></Box>
      </Container>
    </Box>
  )
}

export default Portal
