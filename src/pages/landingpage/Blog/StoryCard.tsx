import { makeStyles } from "tss-react/mui"

import { Box, Card, CardContent, CardMedia, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as ExternaLinkIcon } from "@/assets/svgs/refactor/external-link.svg"
import Link from "@/components/Link"

const useStyles = makeStyles<any>()((theme, { cover }) => ({
  card: {
    backgroundColor: theme.palette.themeBackground.normal,
    borderRadius: "2.5rem",
    cursor: "pointer",
    height: "100%",
    "&:hover": {
      backgroundColor: theme.palette.themeBackground.highlight,
    },
  },
  cardContent: {
    height: cover ? "calc(100% - 23rem)" : "100%",
    padding: cover ? "3.6rem 3rem 2.8rem 3rem" : "3rem",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      padding: cover ? "1.5rem 2rem 3rem" : "2rem",
    },
  },
  noCover: {
    flex: 1,
    display: "flex",
    flexDirection: "column-reverse",
    justifyContent: "space-between",
    minHeight: "10.6rem",
    ".building-story-card-icon": {
      alignSelf: "flex-end",
    },
  },
  withCover: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
}))

const StoryCard = props => {
  const { title, cover, content, icon, href, ...restProps } = props

  const { classes, cx } = useStyles({ cover })

  return (
    <Link href={href} external>
      <Card {...restProps} elevation={0} className={classes.card}>
        {cover && <CardMedia sx={{ height: 230, borderRadius: "2.5rem" }} image={cover} />}
        <CardContent className={classes.cardContent}>
          <Box className={cx(cover ? classes.withCover : classes.noCover)}>
            <Typography sx={[{ fontSize: ["1.6rem", "2.4rem"], fontWeight: 600 }, theme => theme.singleLineEllipsis]}>{title}</Typography>
            <SvgIcon sx={{ fontSize: ["1.3rem", "2rem"] }} className="building-story-card-icon" component={ExternaLinkIcon} inheritViewBox></SvgIcon>
          </Box>

          <Typography sx={[{ fontSize: ["1.6rem", "2rem"], mt: ["1.2rem", "2.4rem"] }, theme => theme.multilineEllipsis]}>{content}</Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

export default StoryCard
