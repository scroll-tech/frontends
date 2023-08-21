import copy from "copy-to-clipboard"
import { useCallback, useMemo, useState } from "react"
import { makeStyles } from "tss-react/mui"

import { Button, ListItemIcon, ListItemText, Menu, MenuItem, SvgIcon } from "@mui/material"
import Fade from "@mui/material/Fade"

import { ReactComponent as ArrowDownSvg } from "@/assets/svgs/refactor/bridge-arrow-down.svg"
import { ReactComponent as CopySuccessSvg } from "@/assets/svgs/refactor/bridge-copy-success.svg"
import { ReactComponent as CopySvg } from "@/assets/svgs/refactor/bridge-copy.svg"
import { ReactComponent as DisconnectSvg } from "@/assets/svgs/refactor/bridge-disconnect.svg"
import { ReactComponent as EtherscanSvg } from "@/assets/svgs/refactor/bridge-etherscan.svg"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { truncateAddress } from "@/utils"

const useStyles = makeStyles()(theme => ({
  button: {
    width: "22rem",
    padding: 0,
    color: "#396CE8",
    "&:hover": {
      color: "#396CE8",
    },
  },
  openButton: {
    borderRadius: "2.3rem 2.3rem 0 0",
  },
  endIcon: {
    marginLeft: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0.5rem",
    },
  },
  reverseEndIcon: {
    transform: "rotateX(180deg)",
  },
  paper: {
    borderRadius: "0 0 2.3rem 2.3rem",
  },
  list: {
    padding: 0,
  },
  listItem: {
    height: "4.6rem",
    padding: "0 2rem",
    gap: "0.9rem",
    backgroundColor: theme.palette.themeBackground.normal,
    "&:hover": {
      backgroundColor: theme.palette.themeBackground.optionHightlight,
    },
    [theme.breakpoints.down("sm")]: {
      padding: 0,
      justifyContent: "center",
    },
  },
  listItemIcon: {
    color: "transparent",
    minWidth: "unset !important",
  },
  listItemTextRoot: {
    flex: "unset",
  },
  listItemText: {
    fontWeight: 600,
    cursor: "pointer",
  },
}))

const Dropdown = props => {
  const { sx } = props
  const { classes, cx } = useStyles()
  const { walletCurrentAddress, disconnect } = useRainbowContext()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [anchorWidth, setAnchorWidth] = useState(0)
  const [copied, setCopied] = useState(false)

  const open = useMemo(() => Boolean(anchorEl), [anchorEl])

  const handleClick = e => {
    setAnchorEl(e.currentTarget)
    setAnchorWidth(e.currentTarget.clientWidth)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setCopied(false)
  }

  const viewEtherscan = useCallback(() => {
    window.open(`https://sepolia.etherscan.io/address/${walletCurrentAddress}`)
  }, [walletCurrentAddress])

  const copyAddress = useCallback(() => {
    copy(walletCurrentAddress as string)
    setCopied(true)
  }, [walletCurrentAddress])

  const operations = useMemo(
    () => [
      {
        icon: EtherscanSvg,
        label: "Block explorer",
        action: viewEtherscan,
      },
      { icon: copied ? CopySuccessSvg : CopySvg, label: "Copy address", action: copyAddress },
      { icon: DisconnectSvg, label: "Disconnect", action: disconnect },
    ],
    [viewEtherscan, copyAddress, copied, disconnect],
  )
  return (
    <>
      <Button
        variant="contained"
        color="info"
        classes={{ root: cx(classes.button, open && classes.openButton), endIcon: cx(classes.endIcon, open && classes.reverseEndIcon) }}
        sx={sx}
        onClick={handleClick}
        endIcon={<SvgIcon sx={{ fontSize: "1.3rem !important" }} component={ArrowDownSvg} inheritViewBox></SvgIcon>}
      >
        {truncateAddress(walletCurrentAddress as string)}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        sx={{ ".MuiMenu-paper": { width: anchorWidth } }}
        classes={{ paper: classes.paper, list: classes.list }}
      >
        {operations.map(({ icon, label, action }) => (
          <MenuItem key={label} classes={{ root: classes.listItem }} onClick={action}>
            <ListItemIcon classes={{ root: classes.listItemIcon }}>
              <SvgIcon sx={{ width: "auto", height: "auto" }} component={icon} inheritViewBox></SvgIcon>
            </ListItemIcon>
            <ListItemText classes={{ root: classes.listItemTextRoot, primary: classes.listItemText }}>{label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default Dropdown
