import { makeStyles } from "tss-react/mui";
import { Select } from "@mui/material";
import { ReactComponent as ArrowDownIcon } from "@/assets/svgs/arrow-down.svg";

const useStyles = makeStyles<any>()((theme, { value }) => ({
  raisedSelect: {
    border: "none",
    backgroundColor: "#C9CBCE33",
    borderRadius: "2rem",
    height: "4.4rem",
    fontSize: "1.8rem",
    fontWeight: 600,
    lineHeight: "4.4rem",
    cursor: "pointer",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
    [theme.breakpoints.down("sm")]: {
      paddingRight: "calc(12px + 1.2rem)",
      paddingLeft: "1rem",
      height: "3.8rem",
    },
    ".MuiSelect-select": {
      height: "100% !important",
      padding: "4px calc(12px + 1.6rem) 5px 1.4rem !important",
      "&:focus": {
        backgroundColor: "unset",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "4px 0 !important",
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
      [theme.breakpoints.down("sm")]: {
        right: "1.2rem",
      },
    },
    ".MuiTypography-root": {
      cursor: "pointer",
    },
  },
}));

const RaisedSelect = (props) => {
  const { classes } = useStyles(props);
  const isSingle = props?.children?.filter((x: any) => x).length <= 1;
  const icon = isSingle ? () => null : ArrowDownIcon;

  // TODO: Popover lack of getContentAnchorEl caused by the official team
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
