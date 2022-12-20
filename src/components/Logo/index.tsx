import { Stack } from "@mui/material"
import LogoIcon from "@/assets/images/logo_with_text.png"

const Logo = () => {
  return (
    <Stack direction="row" className="items-center" spacing="6px">
      <img src={LogoIcon} className="h-[26px]" alt="logo" />
    </Stack>
  )
}

export default Logo
