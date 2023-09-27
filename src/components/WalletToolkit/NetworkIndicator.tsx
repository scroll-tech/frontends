import { useMemo, useState } from "react"
import { makeStyles } from "tss-react/mui"

import { ButtonBase, Fade, ListItemIcon, ListItemText, Menu, MenuItem, SvgIcon } from "@mui/material"

import { ReactComponent as DownTriangleSvg } from "@/assets/svgs/refactor/wallet-connector-down-triangle.svg"
import { NETWORKS } from "@/constants"

const useStyles = makeStyles()(theme => ({
  button: {
    fontFamily: "var(--developer-page-font-family)",
    fontSize: "1.6rem",
    padding: "0.5rem 1.6rem",
    borderRadius: "1rem",
    lineHeight: 1.5,
    border: `1px solid ${theme.palette.primary.contrastText}`,
  },
  openButton: {
    borderRadius: "1rem 1rem 0 0",
    borderBottomColor: "transparent",
  },
  endIcon: {
    fontSize: "1.6rem",
    marginLeft: "0.8rem",
  },
  reverseEndIcon: {
    transform: "rotateX(180deg)",
  },
  paper: {
    borderRadius: "0 0 1rem 1rem",
    border: `1px solid ${theme.palette.primary.contrastText}`,
    backgroundColor: theme.palette.themeBackground.dark,
    borderTop: "none",
    marginTop: -1.5,
  },
  list: {
    padding: 0,
  },
  listItem: {
    height: "3.6rem",
    padding: "0 1.6rem",
    gap: "0.9rem",
  },
  listItemIcon: {
    minWidth: "unset !important",
  },

  listItemText: {
    fontSize: "1.6rem",
    fontFamily: "var(--developer-page-font-family)",
    cursor: "pointer",
    color: theme.palette.primary.contrastText,
  },
}))

const WalletConnector = props => {
  const { sx } = props
  const { classes, cx } = useStyles()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [anchorWidth, setAnchorWidth] = useState(0)

  const open = useMemo(() => Boolean(anchorEl), [anchorEl])

  const handleClick = e => {
    setAnchorEl(e.currentTarget)
    setAnchorWidth(e.currentTarget.offsetWidth)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <ButtonBase classes={{ root: cx(classes.button, open && classes.openButton) }} sx={sx} onClick={handleClick}>
        <SvgIcon></SvgIcon>
        <SvgIcon className={cx(classes.endIcon, open && classes.reverseEndIcon)} component={DownTriangleSvg} inheritViewBox></SvgIcon>
      </ButtonBase>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        sx={{ ".MuiMenu-paper": { width: anchorWidth } }}
        classes={{ paper: classes.paper, list: classes.list }}
      >
        {NETWORKS.map(({ icon, name }) => (
          <MenuItem key={name} classes={{ root: classes.listItem }}>
            <ListItemIcon classes={{ root: classes.listItemIcon }}>
              <SvgIcon sx={{ fontSize: "1.6rem" }} component={icon} inheritViewBox></SvgIcon>
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.listItemText }}>{name}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default WalletConnector
