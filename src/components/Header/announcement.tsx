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
      Due to some changes that are incompatible with the previous version, we have reset the network state. We kindly ask all users to reset their
      wallets for both networks.{" "}
      <ReadMoreLink
        href="https://guide.scroll.io/user-guide/common-errors#incorrect-nonce-error-when-sending-a-transaction-in-metamask"
        target="_blank"
      >
        Read more
      </ReadMoreLink>
    </AnnouncementStack>
  )
}

export default Announcement
