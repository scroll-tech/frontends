import { motion } from "framer-motion"
import { makeStyles } from "tss-react/mui"

import { Box, Card, Stack, SvgIcon, Typography } from "@mui/material"

import { ECOSYSTEM_SOCIAL_LIST } from "@/constants"

const useStyles = makeStyles<any>()((theme, { name }) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "1.5rem",
    borderRadius: "2.5rem",
    [theme.breakpoints.down("sm")]: {
      height: "29.4rem",
    },
  },
  imgWrapper: {
    display: "flex",
    height: "25rem",
    justifyContent: "center",
    alignItems: "center",
    background: name === "Aave" ? "linear-gradient(251deg, #B6509E 4.86%, #2EBAC6 94.85%)" : theme.palette.themeBackground.dark,
    borderRadius: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      aspectRatio: "360 / 132",
    },
  },
  content: {
    display: "grid",
    flex: 1,
    gridTemplateRows: "min-content 1fr min-content",
    gridTemplateAreas: ` 
    "name"
    "description"
    "media"
    `,
    [theme.breakpoints.down("sm")]: {
      gridTemplateRows: "min-content 1fr",
      gridTemplateAreas: ` 
      "name media"
      "description description"
      `,
    },
  },
  name: {
    gridArea: "name",
  },
  description: {
    gridArea: "description",
    ...theme.multilineEllipsis,
  },
  media: {
    gridArea: "media",
  },
}))
const FeaturedCard = props => {
  const { name, ext, desc, hash, logo, website, twitterHandle, ...restProps } = props
  const { classes } = useStyles({ name })
  // const { isMobile } = useCheckViewport()

  const handleOpenTab = (e, item, { website, twitterHandle }) => {
    e.stopPropagation()
    const { name, prefixLink } = item
    if (name === "Twitter") {
      window.open(prefixLink + twitterHandle)
      return
    }
    window.open(website)
  }
  return (
    <Card {...restProps} elevation={0} classes={{ root: classes.card }}>
      <Box className={classes.imgWrapper}>
        <SvgIcon sx={{ width: "auto", height: "auto", transform: ["scale(0.7)", "scale(1)"] }} component={logo} inheritViewBox></SvgIcon>
      </Box>
      <Box className={classes.content} sx={{ px: ["0.4rem", "1.5rem"], pb: [0, "1.5rem"], pt: ["1.5rem", "2.4rem"] }}>
        <Typography className={classes.name} sx={{ fontSize: ["1.6rem", "2.2rem"], fontWeight: 600 }}>
          {name}
        </Typography>
        <Typography
          className={classes.description}
          sx={{
            mt: ["0.9rem", "2.4rem"],
            mb: "2rem",
            fontSize: ["1.6rem", "2rem"],
          }}
        >
          {desc}
        </Typography>
        <Stack className={classes.media} direction="row" spacing="1.8rem" justifyContent="flex-end" alignItems="end" flex={1} sx={{ width: "100%" }}>
          {ECOSYSTEM_SOCIAL_LIST.map(social => (
            <motion.span key={social.name} whileHover={{ scale: 1.1 }}>
              <SvgIcon
                onClick={e => handleOpenTab(e, social, { website, twitterHandle })}
                component={social.icon}
                sx={{ fontSize: "1.8rem", verticalAlign: "middle" }}
                inheritViewBox
              ></SvgIcon>
            </motion.span>
          ))}
        </Stack>
      </Box>
    </Card>
  )
}

export default FeaturedCard
