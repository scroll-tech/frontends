import { Accordion, AccordionSummary, AccordionDetails, Typography, Theme } from "@mui/material"
import { makeStyles } from "tss-react/mui"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Link from "@/components/Link"
import { SiteMap, TESTNET_NAME } from "@/constants"

const useStyles = makeStyles()((theme: Theme) => {
  return {
    wrapper: {
      width: "92rem",
      margin: "14rem auto",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        marginTop: "6.4rem",
        padding: "0 1.6rem",
      },
    },
    title: {
      marginBottom: "3.6rem",
      [theme.breakpoints.down("sm")]: {
        marginBottom: "1rem",
      },
    },
    specialParagraph: {
      marginTop: "2.6rem",
    },
    orderedParagraph: {
      marginLeft: "1.2em",
      textIndent: "-1.2em",
    },
  }
})

const FaqItem = props => {
  const { id, title, children } = props
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "text.primary" }} />} id={id}>
        <Typography variant="h6">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  )
}

const Faq = props => {
  const { children } = props
  const { classes } = useStyles()
  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>
        <Typography variant="h4">FAQs</Typography>
      </div>
      <FaqItem title="How do I get started?" id="start">
        <Typography variant="body1" color="textSecondary">
          Welcome to Scroll's Pre-Alpha Testnet.
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Here is how to explore the platform:
        </Typography>
        <Typography variant="body1" color="textSecondary" className={classes.orderedParagraph}>
          1. Receive test tokens from the <Link href={SiteMap.Faucet}>Faucet</Link>, to the Scroll L1 {TESTNET_NAME} network.
        </Typography>
        <Typography variant="body1" color="textSecondary" className={classes.orderedParagraph}>
          2. Transfer and withdraw test tokens in <Link href={SiteMap.Bridge}>Bridge</Link>.
        </Typography>
        <Typography variant="body1" color="textSecondary" className={classes.orderedParagraph}>
          3. Swap test tokens or provide liquidity in <Link href={SiteMap.Swap}>Swap</Link>.
        </Typography>
        <Typography variant="body1" color="textSecondary" className={classes.orderedParagraph}>
          4. View transactions’ and blocks’ statuses in the{" "}
          <Link href={SiteMap.L1Explorer} external>
            Scroll L1
          </Link>
          ,{" "}
          <Link href={SiteMap.L2Explorer} external>
            Scroll L2
          </Link>{" "}
          Block Explorers and the <Link href={SiteMap.RollupExplorer}>Rollup Explorer</Link>.
        </Typography>
        <Typography variant="body1" color="textSecondary">
          More instructions <Link href={SiteMap.Home}>here</Link>.
        </Typography>
      </FaqItem>
      {children}
      <FaqItem title="Where can I find Scroll architecture overview?" id="end">
        <Typography variant="body1" color="textSecondary">
          Click <Link href={SiteMap.Home}>here</Link> for Scroll architecture overview.
        </Typography>
      </FaqItem>
    </div>
  )
}
export { FaqItem }
export default Faq
