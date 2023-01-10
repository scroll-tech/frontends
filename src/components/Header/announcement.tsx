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
      Scroll 2.2.0 upgrade is live. All users need to reset their wallet account for both Scroll networks.{" "}
      <ReadMoreLink
        href="https://guide.scroll.io/user-guide/common-errors#incorrect-nonce-error-when-sending-a-transaction-in-metamask"
        target="_blank"
      >
        Instructions
      </ReadMoreLink>
    </AnnouncementStack>
  )
}

export default Announcement
