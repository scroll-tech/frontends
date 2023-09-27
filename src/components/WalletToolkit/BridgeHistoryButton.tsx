import { makeStyles } from "tss-react/mui"

import { ButtonBase, SvgIcon } from "@mui/material"

import { ReactComponent as HistorySvg } from "@/assets/svgs/refactor/bridge-history.svg"
import useCheckViewport from "@/hooks/useCheckViewport"
import useBridgeStore from "@/stores/bridgeStore"

const useStyles = makeStyles()(theme => ({
  button: {
    height: "3.6rem",
    padding: "0 1.2rem",
    backgroundColor: theme.palette.themeBackground.normal,
    color: "#473835",
    fontSize: "1.8rem",
    fontWeight: 500,
    borderRadius: "0.5rem",
    gap: "0.5rem",
  },
}))

const BridgeHistoryButton = props => {
  const { classes } = useStyles()
  const { changeHistoryVisible } = useBridgeStore()
  const { isMobile } = useCheckViewport()

  const handleOpenHistory = () => {
    changeHistoryVisible(true)
  }

  return (
    <ButtonBase classes={{ root: classes.button }} {...props} onClick={handleOpenHistory}>
      <SvgIcon sx={{ fontSize: "1.6rem" }} component={HistorySvg} inheritViewBox></SvgIcon>
      {!isMobile && "History"}
    </ButtonBase>
  )
}

export default BridgeHistoryButton
