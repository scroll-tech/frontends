import { FC } from "react";
import classNames from "classnames";
import { makeStyles } from "tss-react/mui";
import ListItemIcon from "@mui/material/ListItemIcon";
import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transition: "all 0.15s ease-out",
    },
    listItemIcon: {
      display: "flex",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      minWidth: "unset !important",
    },
    icon: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      height: "100%",
    },
    label: {
      padding: "0 0.8rem",
    },
    disabledLabel: {
      color: "#B4B4B4",
    },
    image: {
      width: "auto",
      height: "3rem",
      objectFit: "contain",
      [theme.breakpoints.down("sm")]: {
        height: "1.6rem",
      },
    },
  };
});

type Props = {
  label?: string;
  icon?: string;
  disabled?: boolean;
};

const SelectOption: FC<Props> = (props) => {
  const { classes } = useStyles();
  const { label, icon, disabled } = props;

  if (!(icon || label)) {
    return null;
  }

  return (
    <div className={classes.root}>
      {icon && (
        <ListItemIcon className={classes.listItemIcon}>
          <Icon className={classes.icon}>
            <img src={icon} className={classes.image} alt="" />
          </Icon>
        </ListItemIcon>
      )}
      {label && (
        <Typography
          component="span"
          variant="h5"
          className={classNames(
            classes.label,
            disabled && classes.disabledLabel
          )}
        >
          {label}
        </Typography>
      )}
    </div>
  );
};

export default SelectOption;
