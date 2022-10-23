import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles()((theme) => {
  return {
    title: {
      padding: "2.4rem 2.8rem",
    },
    closeButton: {
      padding: 0,
    },
    loadingIcon: {
      color: "#2FCE74",
      marginBottom: "2.4rem",
    },
    content: {
      textAlign: "center",
    },
    section: {
      padding: "0.8rem 6.2rem 5rem",
      [theme.breakpoints.up("sm")]: {
        padding: "0.8rem 4.2rem 4rem",
      },
    },
    subTitle: {
      fontWeight: 600,
    },
  };
});

const SendLoading = (props) => {
  const { value, from, to, open, onClose } = props;
  const { classes } = useStyles();

  return (
    <Dialog open={open} disableScrollLock>
      <DialogTitle className={classes.title}>
        <div className="flex justify-end">
          {onClose ? (
            <IconButton className={classes.closeButton} onClick={onClose}>
              <CloseIcon />
            </IconButton>
          ) : null}
        </div>
      </DialogTitle>
      <DialogContent className={classes.content}>
        <CircularProgress
          size={50}
          thickness={3}
          className={classes.loadingIcon}
        ></CircularProgress>
        <Typography variant="h4" gutterBottom>
          Pending Confirmation
        </Typography>
        <div className={classes.section}>
          <Typography variant="body1" gutterBottom className={classes.subTitle}>
            Sending {value} from {from} to {to}
          </Typography>
          <Typography variant="body1">
            Confirm this transaction on your Metamask wallet
          </Typography>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SendLoading;
