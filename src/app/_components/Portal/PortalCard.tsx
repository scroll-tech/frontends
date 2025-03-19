import { Stack, Typography } from "@mui/material"

const PortalCard = props => {
  const { label, content, icon: Icon } = props

  return (
    <Stack direction="column" sx={{ p: "2.4rem", pt: "4rem", backgroundColor: "background.default", borderRadius: "2rem" }}>
      <Icon></Icon>
      <Typography sx={{ typography: "title", fontSize: "2rem", lineHeight: "4rem", mt: "1.6rem" }}>{label}</Typography>
      <Typography sx={{ fontSize: "1.8rem", lineHeight: ["2.4rem", "2.8rem"], height: ["4.8rem", "5.6rem"] }}>{content}</Typography>
    </Stack>
  )
}
export default PortalCard
