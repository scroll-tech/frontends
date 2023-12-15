import dayjs from "dayjs"
import { makeStyles } from "tss-react/mui"

import { Box, List, ListItem, Stack, SvgIcon, Typography } from "@mui/material"

import Link from "@/components/Link"
import ScrollLogo from "@/components/ScrollLogo"
import { requireEnv } from "@/utils"

import SectionWrapper from "../../SectionWrapper"
import { aboutList, mediaList } from "../helper"
import RelativeLink from "./RelativeLink"

const useStyles = makeStyles()(theme => ({
  footerLayout: {
    display: "grid",
    width: "100%",
    gridTemplateColumns: " minmax(auto, 24rem) minmax(auto, 24rem) 1fr minmax(auto, 24rem)",
    gridTemplateAreas: ` 
      "logo about follow version"
      `,

    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
      gridTemplateAreas: ` 
      "logo version"
      "about follow";
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
  version: {
    gridArea: "version",
  },
}))

const Footer = () => {
  const { classes } = useStyles()
  return (
    <SectionWrapper dark sx={{ pt: "6rem", pb: ["3rem"] }}>
      <Box className={classes.footerLayout}>
        <Link href="/" className={classes.logo}>
          <ScrollLogo light></ScrollLogo>
        </Link>
        <Box className={classes.about}>
          <List sx={{ py: 0 }}>
            {aboutList.map(item => (
              <ListItem key={item.name} disablePadding>
                <RelativeLink {...item}></RelativeLink>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box className={classes.follow}>
          <Typography sx={{ fontSize: "1.8rem", fontWeight: 600, lineHeight: "normal", color: "#FFF8F3", mb: "3rem" }}>Follow Us</Typography>
          <Stack direction="row" spacing={"2.6rem"} sx={{ lineHeight: 1, marginBottom: "3rem" }}>
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
