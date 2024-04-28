import { Container, Stack } from "@mui/material"

const Card = props => {
  const { sx, bottomDiff, ...restProps } = props
  return (
    <Container
      sx={{
        maxWidth: ["unset", "108rem !important"],
        ...sx,
      }}
    >
      <Stack
        sx={{
          backgroundColor: "themeBackground.normal",
          p: ["2.4rem", "3.2rem"],
          pb: bottomDiff ? [`${bottomDiff} !important`, `${bottomDiff} !important`] : "auto",
          borderRadius: "1.6rem",
        }}
        {...restProps}
      ></Stack>
    </Container>
  )
}

export default Card
