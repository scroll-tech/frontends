import dayjs from "dayjs"
import { makeStyles } from "tss-react/mui"

import { Box, List, ListItem, Stack, SvgIcon, Typography } from "@mui/material"

import Link from "@/components/Link"
import Logo from "@/components/ScrollLogo"
import { requireEnv } from "@/utils"

import RelativeLink from "./RelativeLink"
// import Subscribe from "./Subscribe"
import { aboutList, mediaList, resourceList } from "./helper"

const useStyles = makeStyles()(theme => ({
  footerLayout: {
    display: "grid",
    width: "100%",
    gridTemplateColumns: "repeat(5, 1fr)",

    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
  },
  logo: {
    [theme.breakpoints.down("md")]: {
      gridColumn: "1 / 3",
      marginBottom: "3.8rem",
    },
  },
  follow: {
    [theme.breakpoints.down("md")]: {
      gridColumn: "1 / 3",
      marginTop: "1.2rem",
    },
  },
  subscribe: {
    [theme.breakpoints.down("md")]: {
      gridColumn: "1 / 3",
      marginTop: "3rem",
    },
  },
}))

const Footer = () => {
  const { classes } = useStyles()
  return (
    <Box
      sx={{
        backgroundColor: "#101010",
      }}
    >
      <Box sx={{ p: "6rem 6rem 12rem" }}>
        <Box className={classes.footerLayout}>
          <Link href="/" className={classes.logo}>
            <Logo light></Logo>
          </Link>
          <Box>
            <Typography sx={{ fontSize: "1.8rem", fontWeight: 600, lineHeight: "normal", color: "#FFF8F3" }}>About Scroll</Typography>
            <List sx={{ pt: "1.8rem" }}>
              {aboutList.map(item => (
                <ListItem key={item.name} disablePadding>
                  <RelativeLink {...item}></RelativeLink>
                </ListItem>
              ))}
            </List>
          </Box>
          <Box>
            <Typography sx={{ fontSize: "1.8rem", fontWeight: 600, lineHeight: "normal", color: "#FFF8F3" }}>Resources</Typography>
            <List sx={{ pt: "1.8rem" }}>
              {resourceList.map(item => (
                <ListItem key={item.name} disablePadding>
                  <RelativeLink {...item}></RelativeLink>
                </ListItem>
              ))}
            </List>
          </Box>
          <Box className={classes.follow}>
            <Typography sx={{ fontSize: "1.8rem", fontWeight: 600, lineHeight: "normal", color: "#FFF8F3" }}>Follow Us</Typography>
            <Stack direction="row" spacing={"2.6rem"} sx={{ mt: "3rem", lineHeight: 1 }}>
              {mediaList.map(item => (
                <Link external href={item.href} key={item.name}>
                  <SvgIcon
                    component={item.icon}
                    sx={{
                      width: "auto",
                      height: "auto",
                      verticalAlign: "middle",
                      color: theme => theme.palette.text.secondary,
                      "&:hover": {
                        color: theme => theme.palette.primary.main,
                      },
                    }}
                    titleAccess={item.name}
                    inheritViewBox
                  ></SvgIcon>
                </Link>
              ))}
            </Stack>
          </Box>
          {/* <Box className={classes.subscribe}>
            <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: "2rem" }}>
              Subscribe
            </Typography>
            <Subscribe />
          </Box> */}
          <Typography sx={{ color: "#FFF8F3", fontSize: "1.5rem", lineHeight: "2.5rem", textAlign: "right" }}>
            © Version {requireEnv("REACT_APP_VERSION")} Scroll Ltd {dayjs().year()}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Footer
