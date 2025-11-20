import Image from "next/image"

import { Box, Container, Stack, Typography } from "@mui/material"

import PrivateAccountImage from "@/assets/images/cloak/cloak-private.png"
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
    <SectionWrapper title="Private Account Management" backgroundColor="text.primary" color="background.default" paddingY="6rem">
      <Box
        sx={{
          display: "grid",
          width: "100%",
          gridTemplateColumns: ["max-content", "1fr", "max-content max-content max-content"],
          justifyContent: "center",
        }}
      >
        <PrivateCard
          sx={{
            marginTop: "-18%",
            alignSelf: "center",
          }}
          key={leftCard.key}
          Icon={iconMap[leftCard.key]}
          title={leftCard.title}
          content={leftCard.content}
        ></PrivateCard>

        <Image src={PrivateAccountImage} alt="Private Account Illustration" style={{ width: "auto", height: "100%", maxHeight: "380px" }} />

        <Stack sx={{ gap: ["2.4rem", "4rem"] }}>
          {rightCards.map(({ key, title, content }) => (
            <PrivateCard key={key} Icon={iconMap[key]} title={title} content={content}></PrivateCard>
          ))}
        </Stack>
      </Box>
    </SectionWrapper>
  )
}
export default PrivateAccount
