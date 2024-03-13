import { makeStyles } from "tss-react/mui";
import { Alert as MuiAlert, SvgIcon } from "@mui/material";
import { ReactComponent as ErrorSvg } from "@/assets/svgs/bridge/alert-error.svg";
import { ReactComponent as SuccessSvg } from "@/assets/svgs/bridge/alert-success.svg";


const useStyles = makeStyles()(theme => ({
  root: {
    borderRadius: "1rem",
    padding: "1.2rem 1.6rem",
  },
  icon: {
    marginRight: 8,
  },
  message: {
    fontFamily: "var(--default-font-family) !important",
    lineHeight: 1.5,
    fontWeight: 600,
  },
  alert: {
    "& .MuiAlert-icon": {
      fontSize: "3.2rem",
    },
    "&.MuiAlert-standardError": {
      backgroundColor: "#FFE1DB",
      color: "#FF684B",
    },
    "&.MuiAlert-standardSuccess": {
      backgroundColor: "#DFFCF8",
      color: "#0F8E7E",
    },
  },
}));

const Alert = ({ children, ...restProps }) => {
  const classes = useStyles();

  return (
    <MuiAlert
      iconMapping={{
        success: <SvgIcon component={SuccessSvg} />,
        error: <SvgIcon component={ErrorSvg} />,
      }}
      classes={{
        root: classes.root,
        icon: classes.icon,
        message: classes.message,
        standardError: classes.standardError,
        standardSuccess: classes.standardSuccess,
      }}
      className={classes.alert}
      {...restProps}
    >
      {children}
    </MuiAlert>
  );
};

export default Alert;
