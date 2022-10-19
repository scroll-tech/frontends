import Typography from "@mui/material/Typography";

function SendHeader(props) {
  const { classes, from, to } = props;
  return (
    <div className={classes.header}>
      <div className="flex flex-col items-center">
        <Typography variant="h4" className={classes.sendLabel}>
          Scroll Bridge
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          className={classes.sendDesc}
        >
          Send tokens from and to {from} and {to}.
        </Typography>
      </div>
    </div>
  );
}

export default SendHeader;
