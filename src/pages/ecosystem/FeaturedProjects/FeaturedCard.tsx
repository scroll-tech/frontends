import { motion } from "framer-motion"
import Img from "react-cool-img"
import { isMobileOnly } from "react-device-detect"
import { makeStyles } from "tss-react/mui"

import { Box, Card, Stack, SvgIcon, Typography } from "@mui/material"

import { ecosystemListLogoUrl } from "@/apis/ecosystem"
import { ECOSYSTEM_SOCIAL_LIST } from "@/constants"

const useStyles = makeStyles()(theme => ({
  card: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    aspectRatio: "4 / 5",
    padding: "1.5rem",
    borderRadius: "2.5rem",
    [theme.breakpoints.down("sm")]: {
      aspectRatio: "unset",
      height: "29.4rem",
    },
  },
  imgWrapper: {
    aspectRatio: "414 / 250",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.themeBackground.dark,
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
  },
  media: {
    gridArea: "media",
  },
}))
const FeaturedCard = props => {
  const { name, ext, desc, hash, website, twitterHandle, ...restProps } = props
  const { classes } = useStyles()
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
        <Img
          alt={name}
          src={ecosystemListLogoUrl + name + ext}
          placeholder={hash}
          width={isMobileOnly ? 80 : 136}
          height={isMobileOnly ? 80 : 136}
        ></Img>
      </Box>
      <Box className={classes.content} sx={{ px: ["0.4rem", "1.5rem"], pb: [0, "1.5rem"], pt: ["1.5rem", "2.4rem"] }}>
        <Typography className={classes.name} sx={{ fontSize: ["1.6rem", "2.2rem"], lineHeight: "normal", fontWeight: 600 }}>
          {name}
        </Typography>
        <Typography
          className={classes.description}
          sx={{
            mt: ["0.9rem", "2.4rem"],
            lineHeight: "normal",
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
                sx={{ fontSize: "2rem", verticalAlign: "middle" }}
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
