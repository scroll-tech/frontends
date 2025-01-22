import Image from "next/image"

import { Button, Stack, Typography } from "@mui/material"

import ArrowSvg from "@/assets/svgs/ecosystem/arrow.svg"

const GetSCRItem = props => {
  const { name, logoURL, href } = props
  return (
    <Stack sx={{ mt: ["2.4rem", "3.2rem"] }} direction="row" justifyContent="space-between" alignItems="center">
      <Stack direction="row" spacing="1.6rem" alignItems="center">
        <Image alt={name} src={logoURL} width={48} height={48} className="rounded-[7px]" />
        <Typography sx={{ fontSize: ["1.8rem", "2rem"], lineHeight: ["2.4rem", "3.2rem"], fontWeight: 600 }}>{name}</Typography>
      </Stack>
      <Button
        href={href}
        sx={{
          borderRadius: "0.8rem",
          fontSize: ["1.6rem", "1.8rem"],
          height: ["4rem", "4rem"],
          px: ["2.4rem"],
          fontWeight: 600,
        }}
        target="_blank"
      >
        Visit <ArrowSvg className="ml-[8px]"></ArrowSvg>
      </Button>
    </Stack>
  )
}

export default GetSCRItem
