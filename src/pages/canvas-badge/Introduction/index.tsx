import { Stack, SvgIcon, Typography } from "@mui/material"

import Button from "@/components/Button"
import SuccessionToView, { SuccessionItem } from "@/components/Motion/SuccessionToView"
import SectionHeader from "@/components/SectionHeader"
import SectionWrapper from "@/components/SectionWrapper"
import { CANVAS_BADGE_INTRODUCTIONS } from "@/constants"

const Introduction = () => {
  return (
    <SectionWrapper dark>
      <SectionHeader
        dark
        title="Attested Badges, Not Tokens"
        content="Unlike NFTs, badges are non-transferable proofs of your unique traits, status and achievements, thanks to integration with Ethereum Attestation Service."
      ></SectionHeader>
      <Stack direction="row" gap="11.2rem" sx={{ mt: "6.4rem", "& p": { color: "primary.contrastText" } }}>
        {CANVAS_BADGE_INTRODUCTIONS.map(({ key, icon, label, items }) => (
          <Stack direction="column" gap="3.2rem" key={key}>
            <Typography sx={{ fontSize: "4rem", lineHeight: "4rem" }}>{icon}</Typography>
            <Typography sx={{ fontSize: "2.4rem", lineHeight: "3.6rem", fontWeight: 600 }}>{label}</Typography>
            <SuccessionToView>
              {items.map(({ icon, title, content }, index) => (
                <SuccessionItem key={index} sx={{ "&:nth-of-type(n+2)": { mt: "3.2rem" } }}>
                  <Stack direction="row" gap="0.8rem">
                    <SvgIcon component={icon} inheritViewBox sx={{ color: "primary.contrastText", fontSize: "3.2rem" }}></SvgIcon>
                    <Typography sx={{ fontSize: "2rem", lineHeight: "3.2rem", fontWeight: 600 }}>{title}</Typography>
                  </Stack>
                  <Typography sx={{ fontSize: "2rem", lineHeight: "3.2rem", minHeight: "6.4rem", mt: "0.8rem" }}>{content}</Typography>
                </SuccessionItem>
              ))}
              <SuccessionItem sx={{ mt: "3.2rem" }}>
                {key === "user" ? <Button color="primary">Visit Canvas</Button> : <Button color="primary">Issue a Badge</Button>}
              </SuccessionItem>
            </SuccessionToView>
          </Stack>
        ))}
      </Stack>
    </SectionWrapper>
  )
}

export default Introduction
