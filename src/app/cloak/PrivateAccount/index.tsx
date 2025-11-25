import Image from "next/image"

import { Box, Stack } from "@mui/material"

import PrivateAccountMobileImage from "@/assets/images/cloak/cloak-private-mobile.webp"
import PrivateAccountImage from "@/assets/images/cloak/cloak-private.webp"
import BalanceSvg from "@/assets/svgs/cloak/balance.svg"
import DepositSvg from "@/assets/svgs/cloak/deposit.svg"
import HistorySvg from "@/assets/svgs/cloak/history.svg"
import { CLOAK_PRIVATE_DESCS } from "@/constants"

import SectionWrapper from "../SectionWrapper"
import PrivateCard from "./PrivateCard"

const iconMap = {
  history: HistorySvg,
  balance: BalanceSvg,
  deposit: DepositSvg,
}

const PrivateAccount = () => {
  const [leftCard, ...rightCards] = CLOAK_PRIVATE_DESCS

  return (
    <SectionWrapper title="Private Account Management" backgroundColor="text.primary" color="background.default">
      <Box
        sx={{
          pt: [0, 0, "1.8rem"],
          display: "grid",
          width: ["100%", "max-content", "100%"],
          mx: "auto",
          gridTemplateColumns: ["1fr", "1fr", "repeat(2, max-content)", "max-content max-content max-content"],
          gridTemplateAreas: [
            `
            "leftCard"
            "image"
            "rightCards"
          `,
            `
            "leftCard"
            "image"
            "rightCards"
          `,
            `
            "leftCard image"
            "rightCards image"
          `,
            `
            "leftCard image rightCards"
          `,
          ],
          alignItems: "center",
          justifyContent: "center",
          gap: ["2rem", "2rem", "3.4rem", "4px"],
        }}
      >
        <PrivateCard
          sx={{
            alignSelf: "center",
            height: ["unset", "unset", "unset", "21.6rem"],
            gridArea: "leftCard",
          }}
          key={leftCard.key}
          Icon={iconMap[leftCard.key]}
          title={leftCard.title}
          content={leftCard.content}
        ></PrivateCard>

        <Image src={PrivateAccountImage} alt="Private Account" className="!hidden lg:!block max-h-[500px] w-auto" />
        <Image
          src={PrivateAccountMobileImage}
          alt="Private Account"
          style={{ gridArea: "image" }}
          className="block lg:!hidden w-full max-w-[400px]"
        />

        <Stack sx={{ gap: ["2rem", "3.4rem"], alignSelf: "center", gridArea: "rightCards" }}>
          {rightCards.map(({ key, title, content }) => (
            <PrivateCard
              key={key}
              sx={{
                height: ["unset", "unset", "unset", "16.8rem"],
              }}
              Icon={iconMap[key]}
              title={title}
              content={content}
            ></PrivateCard>
          ))}
        </Stack>
      </Box>
    </SectionWrapper>
  )
}
export default PrivateAccount
