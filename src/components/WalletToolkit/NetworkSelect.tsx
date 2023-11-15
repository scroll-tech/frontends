import { useMemo, useState } from "react"
import { makeStyles } from "tss-react/mui"

import { ButtonBase, Fade, ListItemIcon, ListItemText, Menu, MenuItem, SvgIcon, Tooltip } from "@mui/material"

import { ReactComponent as DownTriangleSvg } from "@/assets/svgs/wallet-connector/down-triangle.svg"
import { ReactComponent as WrongNetworkSvg } from "@/assets/svgs/wallet-connector/wrong-network.svg"
import { NETWORKS } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { switchNetwork } from "@/utils"

const useStyles = makeStyles<any>()((theme, { dark }) => ({
  button: {
    height: "3.6rem",
    padding: "0 1.2rem",
    border: dark ? `1px solid ${theme.palette.primary.contrastText}` : "none",
    backgroundColor: dark ? "unset" : theme.palette.themeBackground.normal,
    color: dark ? theme.palette.primary.contrastText : "#473835",
    borderRadius: "0.5rem",
  },
  endIcon: {
    fontSize: "1.6rem",
    marginLeft: "0.8rem",
    willChange: "transform",
    transition: "transform .3s ease-in-out",
  },
  reverseEndIcon: {
    transform: "rotate(180deg)",
  },
  tooltip: {
    color: "#756A67",
    backgroundColor: "#F1F0F0",
    fontSize: "1.2rem",
    padding: "0.8rem 1.6rem",
    lineHeight: "1.6rem",
    marginRight: "0.8rem !important",
  },
  arrow: {
    color: "#F1F0F0",
  },
  paper: {
    marginTop: "0.5rem",
    borderRadius: "0.5rem",
    border: dark ? `1px solid ${theme.palette.primary.contrastText}` : "none",
    backgroundColor: dark ? theme.palette.themeBackground.dark : theme.palette.themeBackground.normal,
  },
  list: {
    padding: 0,
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

const NetworkSelect = props => {
  const { sx, dark } = props
  const { classes, cx } = useStyles({ dark })

  const { chainId } = useRainbowContext()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = useMemo(() => Boolean(anchorEl), [anchorEl])

  const isThirdPartyNetwork = useMemo(() => !NETWORKS.find(item => item.chainId === chainId), [chainId])

  const currentNetworkIcon = useMemo(() => NETWORKS.find(item => item.chainId === chainId)?.icon ?? WrongNetworkSvg, [chainId])

  const handleClick = e => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSwitchNetwork = chainId => {
    switchNetwork(chainId).then(() => {
      handleClose()
    })
  }

  return (
    <>
      {isThirdPartyNetwork ? (
        <Tooltip title="The current network is not supported" classes={{ tooltip: classes.tooltip, arrow: classes.arrow }} placement="left" arrow>
          <ButtonBase classes={{ root: classes.button }} sx={sx} onClick={handleClick}>
            <SvgIcon sx={{ fontSize: "1.8rem", color: "inherit" }} component={currentNetworkIcon} inheritViewBox></SvgIcon>
            <SvgIcon className={cx(classes.endIcon, open && classes.reverseEndIcon)} component={DownTriangleSvg} inheritViewBox></SvgIcon>
          </ButtonBase>
        </Tooltip>
      ) : (
        <ButtonBase classes={{ root: classes.button }} sx={sx} onClick={handleClick}>
          <SvgIcon sx={{ fontSize: isThirdPartyNetwork ? "1.8rem" : "2.4rem" }} component={currentNetworkIcon} inheritViewBox></SvgIcon>
          <SvgIcon className={cx(classes.endIcon, open && classes.reverseEndIcon)} component={DownTriangleSvg} inheritViewBox></SvgIcon>
        </ButtonBase>
      )}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} TransitionComponent={Fade} classes={{ paper: classes.paper, list: classes.list }}>
        {NETWORKS.map(({ icon, name, chainId }) => (
          <MenuItem key={name} classes={{ root: classes.listItem }} onClick={() => handleSwitchNetwork(chainId)}>
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

export default NetworkSelect
