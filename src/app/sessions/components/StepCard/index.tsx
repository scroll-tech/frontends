import { Box, Stack, Typography } from "@mui/material"

const Card = props => {
  const { sx, title, children, ...restProps } = props
  return (
    <Stack
      sx={{
        backgroundColor: "background.default",
        p: ["2rem 1.6rem", "3.2rem"],
        borderRadius: "1.6rem",
        ...sx,
      }}
      {...restProps}
    >
      <Typography sx={{ fontSize: ["1.6rem", "2rem"], lineHeight: ["2.4rem", "3.2rem"], fontWeight: 600, textAlign: "center" }}>{title}</Typography>
      <Box>{children}</Box>
    </Stack>
  )
}

export default Card
