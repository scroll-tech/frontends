import { makeStyles } from "tss-react/mui"

import { Typography } from "@mui/material"

import Faq, { FaqItem } from "@/components/Faq"
import Link from "@/components/Link"
import { SiteMap } from "@/constants"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"

const useStyles = makeStyles()(() => {
  return {
    specialParagraph: {
      marginTop: "2.6rem",
    },
    orderedParagraph: {
      marginLeft: "1.2em",
      textIndent: "-1.2em",
    },
  }
})

const FAQ = () => {
  const { walletName } = useWeb3Context()
  const { classes } = useStyles()
  return (
    <Faq>
      <FaqItem title="What is a blockchain Bridge?" id="2">
        <Typography variant="body1" color="textSecondary">
          All blockchains develop in isolated environments, this means they cannot natively communicate, and tokens cannot move freely between
          blockchains.
        </Typography>
        <Typography variant="body1" color="textSecondary" className={classes.specialParagraph}>
          A blockchain bridge is a tool connecting two blockchains to enable interactions between them.
        </Typography>
      </FaqItem>
      <FaqItem title="How to send tokens using the Bridge?" id="3">
        <Typography variant="body1" color="textSecondary" className={classes.orderedParagraph}>
          1. Select the network you wish to transfer to. For example from Scroll L1 (on top) to Scroll L2 (at the bottom). You can click the "↓"
          button to switch positions.
        </Typography>
        <Typography variant="body1" color="textSecondary" className={classes.orderedParagraph}>
          2. Select the token (ETH or USDC) you wish to transfer.
        </Typography>
        <Typography variant="body1" color="textSecondary" className={classes.orderedParagraph}>
          3. Click on Send. A pop up window from {walletName} will ask you for the transfer confirmation. If this is your first time transferring
          USDC,
          {walletName} will ask you to Approve the Scroll Bridge contract to access your USDC token.
        </Typography>
        <Typography variant="body1" color="textSecondary" className={classes.orderedParagraph}>
          4. Once the transaction is confirmed, the token will be deducted from your Scroll L1 or Scroll L2 wallet.
        </Typography>
        <Typography variant="body1" color="textSecondary">
          More instructions <Link href={SiteMap.Home}>here</Link>.
        </Typography>
      </FaqItem>
    </Faq>
  )
}

export default FAQ
