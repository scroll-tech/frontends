import { useMatch } from "react-router-dom"

import { Stack } from "@mui/material"
import { styled } from "@mui/system"

const AnnouncementStack = styled(Stack)(
  ({ theme }) => `
    line-height: 2.6rem;
    background: rgb(235, 113, 6);
    text-align: center;
    color: ${theme.palette.background.default};
    font-size: 1.6rem;
    padding: 1.6rem;
    display: inline-block;
  `,
)

const ReadMoreLink = styled("a")(
  ({ theme }) => `
  font-weight: 700;
  `,
)

const Announcement = () => {
  const match = useMatch("/alpha/*")
  if (match) {
    return null
  }
  return (
    <AnnouncementStack>
      Scroll's Alpha Testnet is deprecated. Switch to <ReadMoreLink href="https://scroll.io">scroll.io</ReadMoreLink>
    </AnnouncementStack>
  )
}

export default Announcement
