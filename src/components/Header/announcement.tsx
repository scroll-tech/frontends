import { Stack } from "@mui/material"
import { styled } from "@mui/system"

const AnnouncementStack = styled(Stack)(
  ({ theme }) => `
    line-height: 2.6rem;
    background: #00A6F2;
    text-align: center;
    color: #FFFFFF;
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
  return (
    <AnnouncementStack>
      Scroll's Alpha Testnet is now live. <ReadMoreLink href="/alpha">Try it!</ReadMoreLink>
    </AnnouncementStack>
  )
}

export default Announcement
