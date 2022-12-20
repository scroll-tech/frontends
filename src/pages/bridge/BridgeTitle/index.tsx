import Typography from "@mui/material/Typography"
import { makeStyles } from "tss-react/mui"
import { networks } from "@/constants"

const useStyles = makeStyles()(theme => ({
  header: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    marginTop: "8rem",
    transition: "all 0.15s ease-out",
    [theme.breakpoints.down("sm")]: {
      marginTop: "4rem",
    },
  },
  sendLabel: {
    marginBottom: "1.2rem",
  },
  sendDesc: {
    width: "calc(56.8rem - 8rem)",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 12rem)",
    },
    letterSpacing: "0.025rem",
  },
}))

function BridgeTitle(props) {
  const { classes } = useStyles()
  return (
    <div className={classes.header}>
      <div className="flex flex-col items-center">
        <Typography variant="h4" className={classes.sendLabel}>
          Scroll Bridge
        </Typography>
        <Typography variant="body1" color="textSecondary" className={classes.sendDesc}>
          Send tokens from and to {networks[0].name} and {networks[1].name}.
        </Typography>
      </div>
    </div>
  )
}

export default BridgeTitle
