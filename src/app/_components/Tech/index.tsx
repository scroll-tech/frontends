import { Box, Container, Stack, Typography } from "@mui/material"

import Button from "@/components/Button"
import { TECH_URL } from "@/constants/link"

const TECH_LIST = [
  { label: "100%", desc: "EVM-Compatible" },
  { label: "<$0.005", desc: "Gas fees" },
  { label: "100+", desc: "dApps Built" },
  { label: "110M+", desc: "Total transactions" },
  { label: "700+", desc: "Active builders" },
]

const Tech = () => {
  return (
    <Box sx={{ backgroundColor: "themeBackground.light" }}>
      <Container
        sx={{
          py: ["5.6rem", "10.4rem"],
          display: "grid",
          gridTemplateColumns: ["1fr", "1fr", "4fr 5fr", "minmax(min-content, 640px) 563px"],
          justifyContent: ["center", "center", "space-between"],
          alignItems: "center",
          gap: ["4rem", "6rem"],
        }}
      >
        <Stack direction="column" sx={{}}>
          {TECH_LIST.map(({ label, desc }) => (
            <Stack
              key={label}
              direction="row"
              spacing="32px"
              sx={{
                pb: "2.4rem",
                pt: ["4rem", "2.4rem"],
                borderBottom: "1px solid #10101033",

                "&:first-of-type": {
                  pt: 0,
                },
              }}
            >
              <Typography sx={{ fontSize: ["2.8rem", "3.2rem"], lineHeight: "4rem", fontWeight: 600, width: ["10rem", "12rem"] }}>{label}</Typography>
              <Typography sx={{ fontSize: ["2rem", "2.4rem"], lineHeight: "4rem", typography: "title", fontWeight: 400 }}>{desc}</Typography>
            </Stack>
          ))}
        </Stack>
        <video className="max-sm:w-full max-md:w-[563px]" autoPlay loop muted playsInline>
          <source media="(min-width: 1200px)" src="/videos/landing-tech.webm" type="video/webm" />
          <source src="/videos/landing-tech.mp4" type="video/mp4" />
        </video>
        <Button
          color="primary"
          href={TECH_URL}
          target="_blank"
          className="!w-[24rem] md:!w-[25rem] justify-self-start md:justify-self-center col-span-1 md:col-span-2"
          gaEvent={{ event: "click_landing", label: "View tech details" }}
        >
          View tech details
        </Button>
      </Container>
    </Box>
  )
}

export default Tech
