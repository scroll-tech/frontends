import { motion } from "framer-motion"
import { makeStyles } from "tss-react/mui"

import { Avatar, Paper, Stack, Typography } from "@mui/material"

import useCheckViewport from "@/hooks/useCheckViewport"

const PARTNER_LIST = [
  "story-partener-1.svg",
  "story-partener-2.svg",
  "story-partener-3.svg",
  "story-partener-4.svg",
  "story-partener-5.png",
  "story-partener-6.svg",
]

const PARTNER_LOGO_PUBLIC_URL = "/imgs/story/"

const useStyles = makeStyles()(theme => ({
  cooperation: {
    position: "relative",
    borderRadius: "2.5rem",
    padding: "4.4rem 6rem 5.4rem",
    backgroundColor: theme.palette.themeBackground.normal,
    [theme.breakpoints.down("sm")]: {
      padding: "5.4rem 2rem 6rem",
      margin: "0 -2rem",
    },
  },
  logo: {
    backgroundColor: theme.palette.background.default,
    width: "6rem",
    height: "6rem",
    [theme.breakpoints.up("sm")]: {
      width: "8.8rem",
      height: "8.8rem",
    },
  },
}))

const Cooperation = () => {
  const { classes } = useStyles()

  const { isMobile } = useCheckViewport()

  const logos = [
    {
      hidden: {
        top: "100%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      },
      show: {
        top: 0,
        left: "20%",
        transform: "translateY(-50%)",
      },
    },
    {
      hidden: {
        top: "100%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      },
      show: {
        top: 0,
        left: "78%",
        transform: "translateY(-30%)",
      },
    },
    {
      hidden: {
        top: "100%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      },
      show: {
        top: "100%",
        left: "100%",
        transform: "translate(-80%, -80%)",
      },
    },
    {
      hidden: {
        top: "100%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      },
      show: {
        top: "100%",
        left: "65%",
        transform: "translateY(-30%)",
      },
    },
    {
      hidden: {
        top: "100%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      },
      show: {
        top: "100%",
        left: "26%",
        transform: "translateY(-10%)",
      },
    },
    {
      hidden: {
        top: "100%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      },
      show: {
        top: "50%",
        left: 0,
        transform: "translateX(-50%)",
      },
    },
  ]
  return (
    <Paper elevation={0} className={classes.cooperation}>
      <Typography sx={{ fontSize: ["2.6rem", "3.2rem"] }}>
        From day one,<br></br>Scroll prioritized transparency by choosing to be an open source project. Collaboration from various projects and active
        community participation make the Scroll platform more robust and battle-tested.
      </Typography>
      {isMobile ? (
        <Stack direction="row" justifyContent="space-between" sx={{ mt: "4rem" }}>
          {PARTNER_LIST.slice(0, 5).map(item => (
            <Avatar className={classes.logo} key={item} src={`${PARTNER_LOGO_PUBLIC_URL}${item}`}></Avatar>
          ))}
        </Stack>
      ) : (
        <>
          {PARTNER_LIST.map((item, index) => (
            <motion.div
              key={item}
              style={{ position: "absolute" }}
              initial="hidden"
              whileInView="show"
              variants={logos[index]}
              viewport={{ once: true, amount: "all" }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 1.2 }}
            >
              <Avatar className={classes.logo} key={item} src={`${PARTNER_LOGO_PUBLIC_URL}${item}`}></Avatar>
            </motion.div>
          ))}
        </>
      )}
    </Paper>
  )
}

export default Cooperation
