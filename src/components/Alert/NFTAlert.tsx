// TODO: to be unified, prefer this
import { makeStyles } from "tss-react/mui";
import { Alert, SvgIcon } from "@mui/material";
import { ReactComponent as ErrorSvg } from "@/assets/svgs/nft/alert-error.svg";
import { ReactComponent as SuccessSvg } from "@/assets/svgs/nft/alert-success.svg";

const useStyles = makeStyles()((theme) => ({
  root: {
    borderRadius: theme => theme.type === "compact" ? 10 : 5,
    padding: theme => theme.type === "compact" ? "0.8rem 1.6rem" : "1.6rem",
    [theme.breakpoints.down("sm")]: {
      padding: "1.2rem 1.6rem",
    },
  },
  standardError: {
    backgroundColor: "#FF684B",
    color: "#FFEBD7",
  },
  standardSuccess: {
    backgroundColor: "#62E3D1",
    color: theme.palette.text.primary,
  },
  standardInfo: {
    backgroundColor: theme.palette.themeBackground.highlight,
    color: theme.palette.text.primary,
  },
  icon: {
    marginRight: 8,
  },
  message: {
    lineHeight: 1.5,
    fontWeight: theme => theme.type === "compact" ? 500 : 600,
  },
}));

const CheckAlert = ({ type, children, ...restProps }) => {
  const classes = useStyles({ type });

  return (
    <Alert
      iconMapping={{
        success: <SvgIcon sx={{ fontSize: "2.4rem", color: theme => theme.palette.text.primary }} component={SuccessSvg} />,
        error: <SvgIcon sx={{ fontSize: "2.4rem", color: "#FFEBD7" }} component={ErrorSvg} />,
        info: <SvgIcon sx={{ fontSize: "2.4rem", color: theme => theme.palette.text.primary }} component={ErrorSvg} />,
      }}
      classes={{
        root: classes.root,
        icon: classes.icon,
        standardError: classes.standardError,
        standardSuccess: classes.standardSuccess,
        standardInfo: classes.standardInfo,
        message: classes.message,
      }}
      {...restProps}
    >
      {children}
    </Alert>
  );
};

export default CheckAlert;
