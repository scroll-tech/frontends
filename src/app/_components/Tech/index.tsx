import Image from "next/image"

import { Box, Container, Stack, Typography } from "@mui/material"

import TechSvg from "@/assets/svgs/landingpage/tech.svg?url"
import Button from "@/components/Button"
import { TECH_URL } from "@/constants/link"

const TECH_LIST = [
  { label: "<18m", desc: "Time to finality" },
  { label: "100%", desc: "EVM-Compatible" },
  { label: "<$0.01", desc: "Gas fees" },
  { label: "100+", desc: "dApps Built" },
  { label: "110M+", desc: "Total transactions" },
  { label: "700+", desc: "Active builders" },
]

const Tech = () => {
  return (
    <Box sx={{ backgroundColor: "themeBackground.light" }}>
      <Container sx={{ py: "10.4rem", display: "grid", gridTemplateColumns: "minmax(400px, 1fr) minmax(500px, 1fr)", gap: "6rem" }}>
        <Stack direction="column" sx={{}}>
          {TECH_LIST.map(({ label, desc }) => (
            <Stack
              key={label}
              direction="row"
              spacing="32px"
              sx={{
                py: "2.4rem",
                "&:first-of-type": {
                  pt: 0,
                },
                "&:nth-of-type(n+2)": {
                  borderTop: "1px solid #10101033",
                },
              }}
            >
              <Typography sx={{ fontSize: "3.2rem", lineHeight: "4rem", fontWeight: 600, width: "12rem" }}>{label}</Typography>
              <Typography sx={{ fontSize: "2.4rem", lineHeight: "4rem" }}>{desc}</Typography>
            </Stack>
          ))}
        </Stack>
        <Image src={TechSvg} alt="tech"></Image>
        <Button color="primary" href={TECH_URL} className="!w-[250px] mx-auto col-span-2">
          View tech details
        </Button>
      </Container>
    </Box>
  )
}

export default Tech
