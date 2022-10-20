import { makeStyles } from "tss-react/mui";
import Select from "@mui/material/Select";
import { ReactComponent as ArrowDownIcon } from "@/assets/svgs/arrow-down.svg";

const useStyles = makeStyles<any>()((theme, { value }) => ({
  raisedSelect: {
    // "&.MuiSelect-select": {
    //   paddingRight: "calc(12px + 1.6rem)",
    // },
    border: "none",
    backgroundColor: "#C9CBCE33",
    borderRadius: "2rem",
    paddingTop: "0.0rem",
    paddingLeft: "1.4rem",
    paddingBottom: "0.0rem",
    paddingRight: "calc(12px + 1.6rem) !important",
    height: "4.4rem",
    fontSize: "1.8rem",
    fontWeight: 600,
    lineHeight: "4.4rem",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
    [theme.breakpoints.down("xs")]: {
      paddingRight: "calc(12px + 1.2rem)",
      paddingLeft: "1rem",
      height: "3.8rem",
    },
    ".MuiSelect-select": {
      padding: "0 !important",
      "&:focus": {
        backgroundColor: "unset",
      },
    },
    ".MuiList-root": {
      padding: 0,
      backgroundColor: "#fff",
    },
    ".MuiSelect-icon": {
      top: "50%",
      transform: "translateY(-50%)",
      right: "1.6rem",
      color: value === "default" ? "white" : theme.palette.text.primary,
      [theme.breakpoints.down("xs")]: {
        right: "1.2rem",
      },
    },
  },
}));

const RaisedSelect = (props) => {
  const { classes } = useStyles(props);
  const isSingle = props?.children?.filter((x: any) => x).length <= 1;
  const icon = isSingle ? () => null : ArrowDownIcon;

  return (
    <Select
      IconComponent={icon}
      className={classes.raisedSelect}
      variant="standard"
      {...props}
      disableUnderline
    />
  );
};

export default RaisedSelect;
