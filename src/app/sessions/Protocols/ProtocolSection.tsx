import { Box, BoxProps, Chip, Stack, Typography } from "@mui/material"

import QaSvg from "@/assets/svgs/sessions/qa.svg"

import QATooltip from "../components/QATooltip"
import ProtocolCard from "./ProtocolCard"
import { type Protocol, type ProtocolData } from "./protocolList"

type ProtocolSectionProps = ProtocolData & BoxProps

const PROTOCOL_MARKS_TOOLTIP_MAP = {
  "Decentralized Exchanges": (
    <ul className="pl-[16px] [&>*:nth-of-type(n+2)]:mt-[24px]">
      <li className="list-disc">Volatile pairs are awarded proportionally more Marks</li>
      <li className="list-disc">More concentrated positions around current asset prices are awarded proportionally more Marks</li>
    </ul>
  ),
}

const ProtocolSection = (props: ProtocolSectionProps) => {
  const { title, description, tag, data, sx } = props

  return (
    <Box
      sx={{
        py: ["1.6rem", "3.2rem"],
        "&:nth-of-type(n + 2)": {
          borderTop: "1px solid #E9E9E9",
        },
        "&:nth-last-of-type(1)": {
          pb: 0,
        },
        ...sx,
      }}
    >
      <Stack direction="row" justifyContent="space-between" spacing="1.6rem" alignItems="center">
        <Typography sx={{ fontSize: ["1.6rem", "1.8rem"], lineHeight: ["2.4rem", "2.8rem"], fontWeight: 600 }}>{title}</Typography>

        <Chip
          label={
            <Stack direction="row" spacing="0.8rem" alignItems="center">
              <span>{tag}</span>
              {!!PROTOCOL_MARKS_TOOLTIP_MAP[title] && (
                <QATooltip disabled={!PROTOCOL_MARKS_TOOLTIP_MAP[title]} title={PROTOCOL_MARKS_TOOLTIP_MAP[title]}>
                  <span className="text-[0] cursor-pointer">
                    <QaSvg className="w-[1.6rem]"></QaSvg>
                  </span>
                </QATooltip>
              )}
            </Stack>
          }
          sx={{
            p: "0.4rem 1.6rem",
            height: "auto",
            borderRadius: "0.8rem",
            backgroundColor: "themeBackground.light",
            "& .MuiChip-label": {
              fontSize: ["1.6rem", "1.8rem"],
              lineHeight: ["2.4rem", "2.8rem"],
              fontWeight: 500,
              p: 0,
            },
          }}
        ></Chip>
      </Stack>
      <Typography sx={{ fontSize: ["1.4rem", "1.6rem"], lineHeight: "2.4rem", mt: ["1.6rem", "0.8rem"] }}>{description}</Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: [
            "repeat(auto-fill, minmax(14rem, 1fr))",
            "repeat(auto-fill, minmax(16rem, 1fr))",
            "repeat(auto-fill, minmax(19rem, 1fr))",
          ],
          gap: "1.6rem",
          mt: ["1.6rem", "3.2rem"],
        }}
      >
        {data.map((item: Protocol) => (
          <ProtocolCard key={item.project} {...item}></ProtocolCard>
        ))}
      </Box>
    </Box>
  )
}

export default ProtocolSection
