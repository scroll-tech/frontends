import { makeStyles } from "tss-react/mui"

import { Box, Card, Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as ExternaLinkIcon } from "@/assets/svgs/refactor/external-link.svg"
import Link from "@/components/Link"

const useStyles = makeStyles()(theme => ({
  card: {
    backgroundColor: theme.palette.themeBackground.normal,
    padding: "3rem",
    borderRadius: "2.5rem",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      padding: "2rem",
    },

    "&:hover": {
      backgroundColor: theme.palette.themeBackground.highlight,
    },
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "6.2rem",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row-reverse",
      justifyContent: "space-between",
    },
  },
}))

const ExplorerCard = props => {
  const { title, content, icon, href, ...restProps } = props

  const { classes } = useStyles()

  return (
    <Link href={href} external>
      <Card {...restProps} elevation={0} classes={{ root: classes.card }}>
        <Stack direction="column">
          <Box className={classes.header}>
            <SvgIcon sx={{ fontSize: ["1.3rem", "2.3rem"], alignSelf: ["center", "flex-end"] }} component={ExternaLinkIcon} inheritViewBox></SvgIcon>
            <SvgIcon sx={{ fontSize: ["2.6rem", "3.5rem"] }} component={icon} inheritViewBox></SvgIcon>
          </Box>

          <Typography
            sx={{ fontSize: ["1.6rem", "2.4rem"], fontWeight: 600, lineHeight: "normal", mt: ["1.5rem", "2.6rem"], mb: ["0.9rem", "0.6rem"] }}
          >
            {title}
          </Typography>
          <Typography sx={{ fontSize: ["1.6rem", "2rem"], lineHeight: "normal" }}>{content}</Typography>
        </Stack>
      </Card>
    </Link>
  )
}

export default ExplorerCard
