import { Box, MenuItem, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";

interface Props {
  network?: any;
  setNetwork?: (network: any) => void;
  onChange?: (e: any) => void;
  availableNetworks?: any[] | any[];
}

const useStyles = makeStyles()((theme) => {
  return {
    networkSelectionBox: {
      height: "4rem",
      transition: "all 0.15s ease-out",
      border: "1.5px solid #E8E8E8",
      borderRadius: "2rem",
      padding: "0px 2.2rem 0px 1rem",
    },
    networkLabel: {
      marginLeft: "0.4rem",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    networkIconContainer: {
      display: "flex",
      justifyContent: "center",
      // border: '1.5px solid #E8E8E8',
    },
    networkIcon: {
      display: "flex",
      height: "2.2rem",
      margin: "0.7rem",
      [theme.breakpoints.down("xs")]: {
        margin: "0.7rem 0",
      },
    },
  };
});

function NetworkSelector({
  network,
  setNetwork,
  availableNetworks,
  onChange,
}: Props) {
  const { classes, cx } = useStyles();

  return (
    <div className={cx("flex", "items-center", classes.networkSelectionBox)}>
      <Box className={classes.networkIconContainer}>
        <img
          src={network.imageUrl}
          className={classes.networkIcon}
          alt={network.name}
        />
      </Box>
      <Typography
        variant="subtitle1"
        color="textSecondary"
        className={classes.networkLabel}
      >
        {network.name}
      </Typography>
    </div>
  );
}

export default NetworkSelector;
