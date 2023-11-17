import { makeStyles } from "tss-react/mui"

import { Box, Card, CardContent, CardMedia, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as ExternaLinkIcon } from "@/assets/svgs/common/external-link.svg"
import Link from "@/components/Link"
import ScrollLogo from "@/components/ScrollLogo"
import useCheckViewport from "@/hooks/useCheckViewport"

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
  cardMediaWrapper: {
    position: "relative",
  },

  cardMediaTitle: {
    position: "absolute",
    top: "2.4rem",
    left: "3rem",
    color: theme.palette.primary.contrastText,
    fontWeight: 600,
    fontSize: "5rem",
    lineHeight: 1,
    [theme.breakpoints.down("sm")]: {
      fontSize: "3.2rem",
      top: "1.6rem",
      left: "2rem",
    },
  },
  cardMediaLogo: {
    position: "absolute",
    bottom: "2.4rem",
    left: "3rem",
    width: "10rem",
    [theme.breakpoints.down("sm")]: {
      width: "7rem",
      bottom: "1.6rem",
      left: "2rem",
    },
  },
  cardMedia: {
    borderRadius: "2.5rem",
    backgroundColor: theme.palette.text.primary,
    position: "relative",
    [theme.breakpoints.between("md", "lg")]: {
      backgroundPosition: "right",
    },
  },
  cardContent: {
    height: cover ? "calc(100% - 23rem)" : "100%",
    padding: cover ? "3.6rem 3rem 2.8rem 3rem" : "3rem",
    display: "grid",
    gridTemplateColumns: "1fr min-content",
    rowGap: "2.4rem",
    columnGap: "6.8rem",
    [theme.breakpoints.down("sm")]: {
      padding: cover ? "1.5rem 2rem 3rem" : "2rem",
      rowGap: "1.2rem",
      columnGap: "2rem",
    },
  },
  noCover: {
    gridTemplateAreas: ` 
    "title title"
    "content content"
    ". icon";
    `,
    gridTemplateRows: "repeat(2, min-content) 1fr",

    ".building-story-card-icon": {
      alignSelf: "flex-end",
    },
  },
  withCover: {
    gridTemplateAreas: ` 
    "title icon"
    "content content"
    `,
    gridTemplateRows: "min-content 1fr",
    ".building-story-card-icon": {
      alignSelf: "flex-start",
      marginTop: "8px",
      [theme.breakpoints.down("sm")]: {
        marginTop: "5px",
      },
    },
  },
  icon: {
    gridArea: "icon",
  },
  title: {
    gridArea: "title",
  },
  content: {
    gridArea: "content",
  },
}))

const StoryCard = props => {
  const { title, imageTitle, cover, content, icon, href, ...restProps } = props

  const { classes, cx } = useStyles({ cover })

  const { isPortrait } = useCheckViewport()

  return (
    <Link href={href} external>
      <Card {...restProps} elevation={0} className={classes.card}>
        {cover && (
          <Box className={classes.cardMediaWrapper}>
            <CardMedia sx={{ height: ["13rem", "23rem"] }} classes={{ root: classes.cardMedia }} image={cover} />
            <Typography className={classes.cardMediaTitle}>{imageTitle}</Typography>
            <ScrollLogo light className={classes.cardMediaLogo}></ScrollLogo>
          </Box>
        )}

        <CardContent className={cx(classes.cardContent, cover || isPortrait ? classes.withCover : classes.noCover)}>
          {href ? (
            <SvgIcon
              sx={{ fontSize: ["1.3rem", "2rem"] }}
              className={cx(classes.icon, "building-story-card-icon")}
              component={ExternaLinkIcon}
              inheritViewBox
            ></SvgIcon>
          ) : null}

          <Typography sx={{ fontSize: ["1.6rem", "2.4rem"], fontWeight: 600, cursor: "inherit" }} className={classes.title}>
            {title}
          </Typography>
          <Typography sx={{ fontSize: ["1.6rem", "2rem"], cursor: "inherit" }} className={classes.content}>
            {content}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

export default StoryCard
