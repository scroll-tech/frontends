import { makeStyles } from "tss-react/mui";
import Select from "@mui/material/Select";
import { ReactComponent as ArrowDownIcon } from "@/assets/svgs/arrow-down.svg";

const useStyles = makeStyles<any>()((theme, { value }) => ({
  root: {
    backgroundColor: "#C9CBCE33",
    height: "4.4rem",
    borderRadius: "2rem",
    paddingTop: "0.0rem",
    paddingLeft: "1.4rem",
    paddingBottom: "0.0rem",
    "&.MuiSelect-select": {
      paddingRight: "calc(12px + 1.6rem)",
      [theme.breakpoints.down("xs")]: {
        paddingRight: "calc(12px + 1.2rem)",
      },
    },

    [theme.breakpoints.down("xs")]: {
      paddingLeft: "1rem",
    },

    "@global": {
      ".MuiList-root": {
        padding: 0,
        backgroundColor: "#fff",
      },
    },

    fontSize: "1.8rem",
    fontWeight: 600,
    lineHeight: "4.4rem",
    "&:focus": {
      borderRadius: "2.3rem",
    },
    boxShadow: theme.shadows[0],
  },
  select: {
    paddingRight: "calc(12px + 1.6rem)",
  },
  selectMenu: {
    paddingRight: "4.8rem",
    height: "4.4rem",
    [theme.breakpoints.down("xs")]: {
      height: "3.8rem",
    },
  },
  icon: {
    top: "50%",
    transform: "translateY(-50%)",
    right: "1.6rem",
    color: value === "default" ? "white" : theme.palette.text.primary,
    [theme.breakpoints.down("xs")]: {
      right: "1.2rem",
    },
  },
}));

const RaisedSelect = (props) => {
  const { classes } = useStyles(props);
  const isSingle = props?.children?.filter((x: any) => x).length <= 1;
  const icon = isSingle ? () => null : ArrowDownIcon;

  return <Select IconComponent={icon} {...props} classes={classes} />;
};

export default RaisedSelect;
