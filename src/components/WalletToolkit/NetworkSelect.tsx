import { useMemo, useState } from "react"
import { makeStyles } from "tss-react/mui"

import { ButtonBase, Fade, ListItemIcon, ListItemText, Menu, MenuItem, SvgIcon } from "@mui/material"

import { ReactComponent as DownTriangleSvg } from "@/assets/svgs/refactor/wallet-connector-down-triangle.svg"
import { NETWORKS } from "@/constants"

// TODO: logic

const useStyles = makeStyles<any>()((theme, { dark }) => ({
  button: {
    height: "3.6rem",
    padding: "0 1.2rem",
    border: dark ? `1px solid ${theme.palette.primary.contrastText}` : "none",
    backgroundColor: dark ? "unset" : theme.palette.themeBackground.normal,
    color: "#473835",
    borderRadius: "0.5rem",
  },
  endIcon: {
    fontSize: "1.6rem",
    marginLeft: "0.8rem",
  },
  reverseEndIcon: {
    transform: "rotateX(180deg)",
  },
  paper: {
    marginTop: "0.6rem",
    borderRadius: "0.5rem",
    border: dark ? `1px solid ${theme.palette.primary.contrastText}` : "none",
    backgroundColor: dark ? theme.palette.themeBackground.dark : theme.palette.themeBackground.normal,
    borderTop: "none",
  },
  list: {
    padding: "0.8rem 0",
  },
  listItem: {
    padding: "0.8rem 1.2rem",
    gap: "0.8rem",
  },
  listItemIcon: {
    minWidth: "unset !important",
  },

  listItemText: {
    fontSize: "1.6rem",
    fontFamily: "var(--developer-page-font-family)",
    cursor: "pointer",
    color: dark ? theme.palette.primary.contrastText : "#473835",
  },
}))

const WalletConnector = props => {
  const { sx, dark } = props
  const { classes, cx } = useStyles({ dark })

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = useMemo(() => Boolean(anchorEl), [anchorEl])

  const handleClick = e => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelectNetwork = () => {}

  return (
    <>
      <ButtonBase classes={{ root: classes.button }} sx={sx} onClick={handleClick}>
        <SvgIcon sx={{ fontSize: "2.4rem" }} component={NETWORKS[0].icon} inheritViewBox></SvgIcon>
        <SvgIcon className={cx(classes.endIcon, open && classes.reverseEndIcon)} component={DownTriangleSvg} inheritViewBox></SvgIcon>
      </ButtonBase>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} TransitionComponent={Fade} classes={{ paper: classes.paper, list: classes.list }}>
        {NETWORKS.map(({ icon, name }) => (
          <MenuItem key={name} classes={{ root: classes.listItem }} onClick={handleSelectNetwork}>
            <ListItemIcon classes={{ root: classes.listItemIcon }}>
              <SvgIcon sx={{ fontSize: "2.4rem" }} component={icon} inheritViewBox></SvgIcon>
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.listItemText }}>{name}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default WalletConnector
