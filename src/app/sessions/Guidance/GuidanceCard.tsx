import Link from "next/link"

import { Card, Stack, Typography } from "@mui/material"

import ExternaLinkIcon from "@/assets/svgs/common/external-link.svg"

const GuidanceCard = props => {
  const { title, content, icon: IconSvg, href, ...restProps } = props

  return (
    <Link href={href} target={href.includes("http") ? "_blank" : "_self"} rel="noopener noreferrer">
      <Card
        {...restProps}
        elevation={0}
        sx={{
          backgroundColor: "background.default",
          height: "100%",
          borderRadius: "1.6rem",
          cursor: "pointer",
          p: ["1.6rem 1.6rem 3.2rem 1.6rem", "1.6rem 1.6rem 3.2rem 1.6rem", "2.4rem"],
          "&:hover": {
            backgroundColor: "themeBackground.normal",
          },
        }}
      >
        <Stack direction="column">
          <Stack direction="row" justifyContent="flex-end">
            <ExternaLinkIcon className="w-[1.6rem]"></ExternaLinkIcon>
          </Stack>
          <Typography
            sx={{
              fontSize: ["1.8rem", "2rem"],
              fontWeight: 600,
              lineHeight: [1.6, "2.8rem"],
              mt: ["0.4rem", "2.4rem"],
              mb: ["0.4rem", "0.8rem"],
              cursor: "inherit",
            }}
          >
            <IconSvg className="w-[2.2rem] sm:w-[2.4rem] mr-[0.8rem]"></IconSvg>
            <span>{title}</span>
          </Typography>
          <Typography
            sx={{
              fontSize: ["1.4rem", "1.6rem", "2rem"],
              lineHeight: [1.5, "normal"],
              cursor: "inherit",
            }}
          >
            {content}
          </Typography>
        </Stack>
      </Card>
    </Link>
  )
}

export default GuidanceCard
