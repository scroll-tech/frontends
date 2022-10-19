// import {  ComposedStyleProps } from 'src/utils';
import { styled } from "@mui/material/styles";
import Button from "./BaseButton";

interface StyleProps {
  highlighted?: boolean;
  large?: boolean;
  flat?: boolean;
  size?: number | string;
  borderRadius?: any;
  children?: any;
  onClick?: any;
  loading?: boolean;
  disabled?: boolean;
  secondary?: boolean;
  fullWidth?: boolean;
}

const StyledButton = styled(Button)<StyleProps>`
  text-transform: "none";
  transition: "all 0.15s ease-out";

  ${({ secondary, theme }: any) =>
    secondary && `color: ${theme.colors.secondary.main}`}
`;

export default StyledButton;
