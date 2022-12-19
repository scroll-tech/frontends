import { styled } from "@mui/system";
import { Box } from "@mui/material";

const WrapperBox = styled(Box)(
  ({ theme }) => `
      ${theme.breakpoints.down("md")} {
        padding: 0 4rem; 
      };
    `
);

export default WrapperBox;
