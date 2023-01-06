import { Box } from "@mui/material"
import { styled } from "@mui/system"

const WrapperBox = styled(Box)(
  ({ theme }) => `
      ${theme.breakpoints.down("md")} {
        padding: 0 4rem; 
      };
    `,
)

export default WrapperBox
