import { Stack } from "@mui/material";
import LogoIcon from "@/assets/images/logo.png";
import NameSvg from "@/assets/svgs/logo-name.svg";

const Logo = () => {
  return (
    <Stack direction="row" className="items-center" spacing="6px">
      <img src={LogoIcon} alt="logo" className="w-[26px]" />
      <img src={NameSvg} alt="scroll" className="h-[18px]"></img>
    </Stack>
  );
};

export default Logo;
