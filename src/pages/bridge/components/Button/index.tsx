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

  ${({ large }: any) => {
    if (large) {
      return `
        font-size: 2.2rem;
        padding: 1.6rem 2.8rem;
        height: 5rem;
        `;
    }
    return `
        font-size: 1.5rem;
        padding: 0.8rem 2.8rem;
        height: 4.0rem;
      `;
  }};

  ${({ secondary, theme }: any) =>
    secondary && `color: ${theme.colors.secondary.main}`}
  ${({ fullWidth, theme }: any) => fullWidth && "width: 100%"}
`;

export default StyledButton;
