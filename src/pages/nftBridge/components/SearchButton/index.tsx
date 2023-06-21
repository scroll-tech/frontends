import { styled } from "@mui/system"

import LoadingButton from "@/components/LoadingButton"

const SearchButton = styled(LoadingButton)(
  ({ theme }: any) => `
  height: 3.5rem;
  font-size: 1.4rem;
  box-shadow: ${theme.boxShadows.sharp};
  background-color: ${theme.palette.background.default};
  color: ${theme.palette.text.primary};
  :hover{
    color: ${theme.palette.primary.main};
    background-color: ${theme.palette.background.default};
    box-shadow: ${theme.boxShadows.sharp};
  }
`,
)

export default SearchButton
