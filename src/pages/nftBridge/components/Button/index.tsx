import { Button } from "@mui/material"
import { styled } from "@mui/system"

const NFTButton = styled(Button)(
  ({ theme }: any) => `
  height: 3.5rem;
  font-size: 1.4rem;
  border: none;
  box-shadow: ${theme.boxShadows.sharp};
`,
)

export default NFTButton
