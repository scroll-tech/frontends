import dayjs from "dayjs"
import { makeStyles } from "tss-react/mui"

import { Box, List, ListItem, Stack, SvgIcon, Typography } from "@mui/material"

import Link from "@/components/Link"
import ScrollLogo from "@/components/ScrollLogo"
import { requireEnv } from "@/utils"

import SectionWrapper from "../../SectionWrapper"
import { aboutList, mediaList, resourceList } from "../helper"
import RelativeLink from "./RelativeLink"

const useStyles = makeStyles()(theme => ({
  footerLayout: {
    display: "grid",
    width: "100%",
    gridTemplateColumns: "repeat(5, 1fr)",
    gridTemplateAreas: ` 
      "logo about resource follow version"
      `,

    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
      gridTemplateAreas: ` 
      "logo follow"
      "about resource"
      "version version";
      `,
      gridRowGap: "5rem",
    },
  },
  logo: {
    gridArea: "logo",
  },
  about: {
    gridArea: "about",
  },
  follow: {
    gridArea: "follow",
    [theme.breakpoints.down("md")]: {
      alignSelf: "center",
    },
  },
  followTitle: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  resource: {
    gridArea: "resource",
  },
  version: {
    gridArea: "version",
  },
}))

const Footer = () => {
  const { classes } = useStyles()
  return (
    <SectionWrapper full dark sx={{ p: ["6rem 2rem 8rem", "6rem 6rem 12rem"] }}>
      <Box className={classes.footerLayout}>
        <Link href="/" className={classes.logo}>
          <ScrollLogo light></ScrollLogo>
        </Link>
        <Box className={classes.about}>
          <Typography sx={{ fontSize: ["1.6rem", "1.8rem"], fontWeight: 600, lineHeight: "normal", color: "#FFF8F3" }}>About Scroll</Typography>
          <List sx={{ pt: ["0.9rem", "1.8rem"], pb: 0 }}>
            {aboutList.map(item => (
              <ListItem key={item.name} disablePadding>
                <RelativeLink {...item}></RelativeLink>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box className={classes.resource}>
          <Typography sx={{ fontSize: ["1.6rem", "1.8rem"], fontWeight: 600, lineHeight: "normal", color: "#FFF8F3" }}>Resources</Typography>
          <List sx={{ pt: ["0.9rem", "1.8rem"], pb: 0 }}>
            {resourceList.map(item => (
              <ListItem key={item.name} disablePadding>
                <RelativeLink {...item}></RelativeLink>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box className={classes.follow}>
          <Typography
            className={classes.followTitle}
            sx={{ fontSize: "1.8rem", fontWeight: 600, lineHeight: "normal", color: "#FFF8F3", mb: "3rem" }}
          >
            Follow Us
          </Typography>
          <Stack direction="row" spacing={"2.6rem"} sx={{ lineHeight: 1 }}>
            {mediaList.map(item => (
              <Link external href={item.href} key={item.name}>
                <SvgIcon
                  component={item.icon}
                  sx={{
                    width: "auto",
                    height: "auto",
                    verticalAlign: "middle",
                    color: theme => theme.palette.primary.contrastText,
                    "&:hover": {
                      color: theme => theme.palette.primary.dark,
                    },
                  }}
                  titleAccess={item.name}
                  inheritViewBox
                ></SvgIcon>
              </Link>
            ))}
          </Stack>
        </Box>
        <Typography
          className={classes.version}
          sx={{ color: "#FFF8F3", fontSize: "1.5rem", lineHeight: "2.5rem", textAlign: ["left", "left", "right"] }}
        >
          © Version {requireEnv("REACT_APP_VERSION")} Scroll Ltd {dayjs().year()}
        </Typography>
      </Box>
    </SectionWrapper>
  )
}

export default Footer
