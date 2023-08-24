import { useMatch } from "react-router-dom"

import { Stack } from "@mui/material"
import { styled } from "@mui/system"

const AnnouncementStack = styled(Stack)(
  ({ theme }) => `
    line-height: 2.6rem;
    background: #62e6d4;
    text-align: center;
    color: ${theme.palette.text.primary};
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
  const isHome = useMatch("/")
  if (!isHome) {
    return null
  }
  return (
    <AnnouncementStack>
      Scroll Sepolia is now live. <ReadMoreLink href="/portal">Try it!</ReadMoreLink>
    </AnnouncementStack>
  )
}

export default Announcement
