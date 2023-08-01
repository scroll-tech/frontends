import { isMobileOnly } from "react-device-detect"
import { makeStyles } from "tss-react/mui"

import { Avatar, Paper, Stack, Typography } from "@mui/material"

const PARTNER_LIST = ["NEST Protocol", "LI.FI", "QuestN", "Owlto Finance", "JOJO Exchange", "Carrot"]

const PARTNER_LOGO_PUBLIC_URL = "https://scroll-eco-list.netlify.app/logos/"

const useStyles = makeStyles()(theme => ({
  cooperation: {
    position: "relative",
    borderRadius: "2.5rem",
    padding: "4.4rem 4rem 5.4rem",
    backgroundColor: theme.palette.themeBackground.normal,
    [theme.breakpoints.down("sm")]: {
      padding: "5.4rem 2rem 6rem",
      margin: "0 -2rem",
    },
  },
  logo: {
    width: "6rem",
    height: "6rem",
    [theme.breakpoints.up("sm")]: {
      width: "8.8rem",
      height: "8.8rem",
      position: "absolute",
      "&:nth-of-type(1)": {
        top: 0,
        left: "20%",
        transform: "translateY(-50%)",
      },
      "&:nth-of-type(2)": {
        top: 0,
        right: "18%",
        transform: "translateY(-30%)",
      },
      "&:nth-of-type(3)": {
        bottom: 0,
        right: 0,
        transform: "translate(20%, 20%)",
      },
      "&:nth-of-type(4)": {
        bottom: 0,
        right: "30%",
        transform: "translateY(70%)",
      },
      "&:nth-of-type(5)": {
        bottom: 0,
        left: "26%",
        transform: "translateY(90%)",
      },
      "&:nth-of-type(6)": {
        top: "50%",
        left: 0,
        transform: "translateX(-50%)",
      },
    },
  },
}))

const Cooperation = () => {
  const { classes } = useStyles()
  return (
    <Paper elevation={0} className={classes.cooperation}>
      <Typography sx={{ fontSize: ["2.6rem", "3.2rem"] }}>
        From Day One,<br></br>Scroll embraced openness by choosing to be an open-source project. Collaboration from various projects and active
        community participation make our platform more robust and battle-tested. 
      </Typography>
      {isMobileOnly ? (
        <Stack direction="row" justifyContent="space-between" sx={{ mt: "5.4rem" }}>
          {PARTNER_LIST.slice(0, 5).map(item => (
            <Avatar className={classes.logo} key={item} src={`${PARTNER_LOGO_PUBLIC_URL}${item}.png`}></Avatar>
          ))}
        </Stack>
      ) : (
        <>
          {PARTNER_LIST.map(item => (
            <Avatar className={classes.logo} key={item} src={`${PARTNER_LOGO_PUBLIC_URL}${item}.png`}></Avatar>
          ))}
        </>
      )}
    </Paper>
  )
}

export default Cooperation
