import { Stack, Typography } from "@mui/material"

const StepItem = props => {
  const { title, icon: IconSvg } = props
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing="1.6rem"
      sx={{
        p: "0.8rem 2.4rem",
        backgroundColor: "#FFFFFFCC",
        borderRadius: "1.6rem",
        width: "100%",
        "&:hover": {
          backgroundColor: "#FFFFFF",
        },
      }}
    >
      <Typography sx={{ fontSize: ["1.6rem", "1.8rem"], lineHeight: ["2.4rem", "2.8rem"], flex: 1 }}>{title}</Typography>
      <Typography sx={{ fontSize: ["1.6rem", "1.8rem"], lineHeight: ["2.4rem", "2.8rem"], fontWeight: 500 }}>Press</Typography>
      <IconSvg className="w-[3.2rem] h-auto" />
    </Stack>
  )
}

export default StepItem
