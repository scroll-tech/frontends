import { useLocation, useNavigate } from "react-router-dom"
import { makeStyles } from "tss-react/mui"

import { Button } from "@mui/material"

const useStyles = makeStyles()(theme => {
  return {
    wrapper: {
      width: "100%",
      height: "calc(100vh - 44.6rem)",
      minHeight: "30rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        height: "31rem",
        padding: "0 3rem",
      },
    },

    content: {
      display: "grid",
      width: "70rem",
      gridTemplateColumns: "min-content 1fr",
      gridTemplateRows: "repeat(2, min-content)",
      gridColumnGap: "2.6rem",
      gridRowGap: "4rem",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "repeat(3, min-content)",
        gridRowGap: "1rem",
      },
    },
    status: {
      fontSize: "10rem",
      fontWeight: 600,
      lineHeight: 1,
      letterSpacing: "-4px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "6rem",
      },
    },
    message: {
      fontSize: "3.2rem",
      letterSpacing: "-1.4px",
      fontWeight: 500,
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.4rem",
        letterSpacing: "unset",
      },
    },
    action: {
      justifySelf: "center",
      gridColumn: "span 2",
      [theme.breakpoints.down("sm")]: {
        gridColumn: "unset",
        justifySelf: "flex-start",
        marginTop: "3.2rem",
      },
    },
  }
})

const NotFound = () => {
  const { classes } = useStyles()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const handleReturnHome = () => {
    if (pathname.startsWith("/alpha")) {
      navigate("/alpha/")
      return
    }
    navigate("/")
  }
  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <span className={classes.status}>404</span>
        <span className={classes.message}>Sorry, the page you are looking for is not found</span>
        <Button className={classes.action} variant="contained" onClick={handleReturnHome}>
          Home
        </Button>
      </div>
    </div>
  )
}

export default NotFound
