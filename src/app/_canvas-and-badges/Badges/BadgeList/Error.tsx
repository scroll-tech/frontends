import { Stack, Typography } from "@mui/material"

import ErrorSvg from "@/assets/svgs/ecosystem/error.svg"
import useCheckViewport from "@/hooks/useCheckViewport"

const Error = props => {
  const { dark, title, action, ...restProps } = props
  const { isMobile } = useCheckViewport()
  return (
    <Stack direction="column" alignItems="center" justifyContent="center" spacing={isMobile ? "0.4rem" : "0.8rem"} {...restProps}>
      <ErrorSvg className={`w-[3.2rem] text-[${dark ? "#FFDEB5" : "#5B5B4B"}]`}></ErrorSvg>
      <Typography sx={{ fontSize: "1.6rem", fontWeight: 600, lineHeight: "2.4rem", color: dark ? "themeBackground.highlight" : "#5B5B4B" }}>
        {title}
      </Typography>
      {action}
    </Stack>
  )
}

export default Error
