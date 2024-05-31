import { Stack } from "@mui/material"

const Card = props => {
  const { sx, bottomDiff, ...restProps } = props
  return (
    <Stack
      sx={{
        backgroundColor: "themeBackground.normal",
        p: ["2.4rem", "3.2rem"],
        pb: bottomDiff ? [`${bottomDiff} !important`, `${bottomDiff} !important`] : "auto",
        borderRadius: "1.6rem",
      }}
      {...restProps}
    ></Stack>
  )
}

export default Card
