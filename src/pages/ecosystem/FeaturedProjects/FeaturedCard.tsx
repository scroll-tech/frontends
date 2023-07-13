import { motion } from "framer-motion"
import Img from "react-cool-img"
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
    [theme.breakpoints.down("sm")]: {},
  },
  imgWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.themeBackground.dark,
    borderRadius: "1.5rem",
    aspectRatio: "414/ 250",
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
        <Img alt={name} src={ecosystemListLogoUrl + name + ext} placeholder={hash} width={136} height={136}></Img>
      </Box>
      <Stack direction="column" sx={{ px: "1.5rem", pb: "1.5rem", flex: 1 }}>
        <Typography sx={{ fontSize: "2.2rem", lineHeight: "normal", fontWeight: 600, mt: "2.4rem" }}>{name}</Typography>
        <Typography
          sx={{
            mt: "2.4rem",
            lineHeight: "normal",
            fontSize: "2rem",
          }}
        >
          {desc}
        </Typography>
        <Stack direction="row" spacing="1.8rem" justifyContent="flex-end" alignItems="end" flex={1} sx={{ width: "100%" }}>
          {ECOSYSTEM_SOCIAL_LIST.map(social => (
            <motion.span key={social.name} whileHover={{ scale: 1.1 }}>
              <SvgIcon
                onClick={e => handleOpenTab(e, social, { website, twitterHandle })}
                component={social.icon}
                sx={{ width: ["2.2rem", "2rem"], height: ["2.2rem", "2rem"], verticalAlign: "middle" }}
                inheritViewBox
              ></SvgIcon>
            </motion.span>
          ))}
        </Stack>
      </Stack>
    </Card>
  )
}

export default FeaturedCard
