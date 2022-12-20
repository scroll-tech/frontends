import SelectOption from "../components/RaisedSelect/SelectOption"
import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()(theme => {
  return {
    seletedLabel: {
      boxSizing: "border-box",
      padding: "0 calc(12px + 1.6rem) 0 1.4rem",
      height: "4.4rem",
      lineHeight: "4.4rem",
      borderRadius: "2rem",
      backgroundColor: "#EBEBEB",
      [theme.breakpoints.down("sm")]: {
        height: "3.8rem",
        lineHeight: "3.8rem",
        padding: "0 calc(12px + 1.2rem) 0 1rem",
      },
    },
  }
})

const SelectedToken = ({ icon, children }) => {
  const { classes } = useStyles()

  return (
    <div className={classes.seletedLabel}>
      <SelectOption label={children} icon={icon} disabled />
    </div>
  )
}

export default SelectedToken
