import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { makeStyles } from "tss-react/mui"

import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { Accordion, AccordionDetails, AccordionSummary, Theme, Typography } from "@mui/material"

import Link from "@/components/Link"
import { NETWORKS, SITE_MAP } from "@/constants"

const useStyles = makeStyles()((theme: Theme) => {
  return {
    wrapper: {
      width: "92rem",
      margin: "14rem auto",
      "& *": {
        fontFamily: "var(--developer-page-font-family) !important",
      },
      "& a": {
        fontSize: "2rem",
      },
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: "6.4rem",
        padding: "0 1.6rem",
      },
    },
    title: {
      marginBottom: "6rem",
      [theme.breakpoints.down("md")]: {
        marginBottom: "3.4rem",
      },
    },
    specialParagraph: {
      marginTop: "2.6rem",
    },
    orderedParagraph: {
      marginLeft: "1.2em",
      textIndent: "-1.2em",
    },

    summary: {
      margin: "3.1rem 0",
      [theme.breakpoints.down("sm")]: {
        margin: "2.6rem 0",
      },
    },
  }
})

const FaqItem = props => {
  const { classes } = useStyles()

  const { id, title, children, expanded } = props
  return (
    <Accordion square sx={{ background: "transparent" }} defaultExpanded={expanded}>
      <AccordionSummary classes={{ content: classes.summary }} expandIcon={<ExpandMoreIcon sx={{ color: "text.primary" }} />} id={id}>
        <Typography variant="H4">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  )
}

const Faq = props => {
  const { backUrl, backText, children } = props

  const { classes } = useStyles()

  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const targetElement = document.querySelector(hash)
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: "smooth" })
        }, 200)
      }
    }
  }, [hash])

  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>
        <Typography variant="H1">FAQs</Typography>
      </div>
      <Link
        sx={{ fontSize: ["1.6rem", "2rem"], fontWeight: 500, color: "text.primary", lineHeight: 1, mb: ["1rem", "3.6rem"], display: "inline-block" }}
        underline="always"
        href={backUrl}
      >
        {backText}
      </Link>
      <FaqItem title="How do I get started?" id="start">
        <Typography variant="Body3" color="textSecondary">
          Welcome to {NETWORKS[1].name}.
        </Typography>
        <Typography variant="Body3" color="textSecondary">
          Here is how to explore the platform:
        </Typography>
        <Typography variant="Body3" color="textSecondary" className={classes.orderedParagraph}>
          1. Transfer and withdraw tokens in <Link href={SITE_MAP.Bridge}>Bridge</Link>.
        </Typography>
        <Typography variant="Body3" color="textSecondary" className={classes.orderedParagraph}>
          2. View the statuses of transactions and blocks in the{" "}
          <Link href={SITE_MAP.L2Explorer} external>
            Scroll Block Explorers{" "}
          </Link>
          and the <Link href={SITE_MAP.RollupExplorer}>Rollup Explorer</Link>.
        </Typography>
        <Typography variant="Body3" color="textSecondary">
          More instructions <Link href={SITE_MAP.Home}>here</Link>.
        </Typography>
      </FaqItem>
      {children}
      <FaqItem title="Where can I find the Scroll architecture overview?">
        <Typography variant="Body3" color="textSecondary">
          Check our <Link href={SITE_MAP.Architecture}>architecture blog article</Link>.
        </Typography>
      </FaqItem>
    </div>
  )
}
export { FaqItem }
export default Faq
