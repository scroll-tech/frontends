import dayjs from "dayjs"
import { makeStyles } from "tss-react/mui"

import { Box, Divider, List, ListItem, Stack, SvgIcon, Typography } from "@mui/material"

import Link from "@/components/Link"
import Logo from "@/components/Logo"
import { requireEnv } from "@/utils"

import RelativeLink from "./RelativeLink"
import Subscribe from "./Subscribe"
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
        backgroundColor: "#EB71060D",
        pt: ["3rem", "9rem"],
        pb: ["4rem", "11rem"],
      }}
    >
      <Box className="wrapper" sx={{ p: "0 2.4rem" }}>
        <Box className={classes.footerLayout}>
          <Link href="/" className={classes.logo}>
            <Logo></Logo>
          </Link>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: "2rem" }}>
              About Scroll
            </Typography>
            <List sx={{ py: "1.8rem" }}>
              {aboutList.map(item => (
                <ListItem disablePadding>
                  <RelativeLink {...item}></RelativeLink>
                </ListItem>
              ))}
            </List>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: "2rem" }}>
              Resources
            </Typography>
            <List sx={{ py: "1.8rem" }}>
              {resourceList.map(item => (
                <ListItem disablePadding>
                  <RelativeLink {...item}></RelativeLink>
                </ListItem>
              ))}
            </List>
          </Box>
          <Box className={classes.follow}>
            <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: "2rem" }}>
              Follow Us
            </Typography>
            <Stack direction="row" spacing={"1.5rem"} sx={{ mt: "2.4rem", lineHeight: "2rem" }}>
              {mediaList.map(item => (
                <Link external href={item.href} key={item.name}>
                  <SvgIcon
                    component={item.icon}
                    sx={{
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
          <Box className={classes.subscribe}>
            <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: "2rem" }}>
              Subscribe
            </Typography>
            <Subscribe />
          </Box>
        </Box>
      </Box>
      <Box sx={{ maxWidth: "130rem", mx: "auto", p: "0 2.4rem" }}>
        <Divider sx={{ mt: "3rem", mb: ["3rem", "3rem", "4rem"] }}></Divider>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ height: "1.4rem" }}>
          <Typography sx={{ color: "rgba(51, 51, 51, 0.5)", fontSize: "1.2rem" }}>© Version {requireEnv("REACT_APP_VERSION")}</Typography>
          <Divider orientation="vertical" sx={{ height: "1rem" }}></Divider>
          <Typography sx={{ color: "rgba(51, 51, 51, 0.5)", fontSize: "1.2rem" }}>Scroll Ltd {dayjs().year()}</Typography>
        </Stack>
      </Box>
    </Box>
  )
}

export default Footer
