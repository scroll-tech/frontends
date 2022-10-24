import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Theme,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "@/components/Link";
import { SiteMap } from "@/constants";

const useStyles = makeStyles()((theme: Theme) => {
  return {
    wrapper: {
      width: "92rem",
      margin: "14rem auto",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        marginTop: "6.4rem",
      },
      "@global": {
        ".MuiTypography-root": {
          [theme.breakpoints.up("sm")]: {
            width: "52.6rem",
          },
        },
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
  };
});

const FAQ = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>
        <Typography variant="h4">FAQs</Typography>
      </div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color="secondary" />}
          id="1"
        >
          <Typography variant="h6">What is a blockchain Bridge?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color="textSecondary">
            All blockchains develop in isolated environments, this means they
            cannot natively communicate, and tokens cannot move freely between
            blockchains.
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.specialParagraph}
          >
            A blockchain bridge is a tool connecting two blockchains to enable
            interactions between them.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color="secondary" />}
          id="2"
        >
          <Typography variant="h6">How do I get started?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color="textSecondary">
            Welcome to Scroll's Pre-Alpha Testnet.
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Here is how to explore the platform:
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.orderedParagraph}
          >
            1. Receive test tokens from the{" "}
            <Link href={SiteMap.Faucet}>Faucet</Link>, to the Scroll L1 network.
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.orderedParagraph}
          >
            2. Transfer and withdraw test tokens in{" "}
            <Link href={SiteMap.Bridge}>Bridge</Link>.
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.orderedParagraph}
          >
            3. Swap test tokens or provide liquidity in{" "}
            <Link href={SiteMap.Swap}>Swap</Link>.
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.orderedParagraph}
          >
            4. View transactions’ and blocks’ statuses in the{" "}
            <Link href={SiteMap.L1Explorer} external>
              Scroll L1
            </Link>
            ,{" "}
            <Link href={SiteMap.L2Explorer} external>
              Scroll L2
            </Link>{" "}
            Block Explorers and the{" "}
            <Link href={SiteMap.RollupExplorer}>Rollup Explorer</Link>.
          </Typography>
          <Typography variant="body1" color="textSecondary">
            More instructions <Link href={SiteMap.Home}>here</Link>.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color="secondary" />}
          id="3"
        >
          <Typography variant="h6">
            How to send tokens using the Bridge?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.orderedParagraph}
          >
            1. Select the network you wish to transfer to. For example from
            Scroll L1 (on top) to Scroll L2 (at the bottom). You can click the
            "↓" button to switch positions.
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.orderedParagraph}
          >
            2. Select the token (ETH or USDC) you wish to transfer.
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.orderedParagraph}
          >
            3. Click on Send. A pop up window from MetaMask will ask you for the
            transfer confirmation. If this is your first time transferring USDC,
            MetaMask will ask you to Approve the Scroll Bridge contract to
            access your USDC token.
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.orderedParagraph}
          >
            4. Once the transaction is confirmed, the token will be deducted
            from your Scroll L1 or Scroll L2 wallet.
          </Typography>
          <Typography variant="body1" color="textSecondary">
            More instructions <Link href={SiteMap.Home}>here</Link>.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion square>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color="secondary" />}
          id="4"
        >
          <Typography variant="h6">
            Where can I find Scroll architecture overview?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color="textSecondary">
            Click <Link href={SiteMap.Home}>here</Link> for Scroll architecture
            overview.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FAQ;
