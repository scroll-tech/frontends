import copy from "copy-to-clipboard"
import { useCallback, useMemo, useState } from "react"
import { makeStyles } from "tss-react/mui"

import { ButtonBase, Fade, ListItemIcon, ListItemText, Menu, MenuItem, SvgIcon } from "@mui/material"

import { ReactComponent as CopySuccessSvg } from "@/assets/svgs/refactor/bridge-copy-success.svg"
import { ReactComponent as BlockSvg } from "@/assets/svgs/refactor/wallet-connector-block.svg"
import { ReactComponent as CopySvg } from "@/assets/svgs/refactor/wallet-connector-copy.svg"
import { ReactComponent as DisconnectSvg } from "@/assets/svgs/refactor/wallet-connector-disconnect.svg"
import { ReactComponent as DownTriangleSvg } from "@/assets/svgs/refactor/wallet-connector-down-triangle.svg"
import { CHAIN_ID, EXPLORER_URL } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { generateExploreLink, truncateAddress } from "@/utils"

const useStyles = makeStyles<any>()((theme, { dark }) => ({
  button: {
    fontFamily: "var(--developer-page-font-family)",
    fontSize: "1.6rem",
    height: "3.6rem",
    padding: "0 1.2rem",
    borderRadius: "0.5rem",
    border: dark ? `1px solid ${theme.palette.primary.contrastText}` : "none",
    backgroundColor: dark ? "unset" : theme.palette.themeBackground.normal,
    color: dark ? theme.palette.primary.contrastText : "#473835",
    whiteSpace: "nowrap",
  },
  openButton: {
    borderRadius: "1rem 1rem 0 0",
    borderBottomColor: "transparent",
  },
  connectButton: {
    fontFamily: "var(--onboard-font-family-normal)",
    backgroundColor: "#FF684B",
    color: theme.palette.primary.contrastText,
    fontSize: "1.8rem",
    fontWeight: 500,
  },
  endIcon: {
    fontSize: "1.6rem",
    marginLeft: "0.8rem",
    color: dark ? theme.palette.primary.contrastText : "#473835",
  },
  reverseEndIcon: {
    transform: "rotateX(180deg)",
  },
  paper: {
    borderRadius: "0 0 0.5rem 0.5rem",
    border: dark ? `1px solid ${theme.palette.primary.contrastText}` : "none",
    backgroundColor: dark ? "unset" : theme.palette.themeBackground.normal,
    borderTop: "none",
    marginTop: -1.5,
  },
  list: {
    padding: "0.4rem 0 0",
  },
  listItem: {
    height: "4rem",
    padding: "0 1.2rem",
    gap: "0.8rem",
  },
  listItemIcon: {
    minWidth: "unset !important",
    color: dark ? theme.palette.primary.contrastText : "#473835",
  },

  listItemText: {
    fontSize: "1.6rem",
    fontFamily: "var(--developer-page-font-family)",
    cursor: "pointer",
    color: dark ? theme.palette.primary.contrastText : "#473835",
  },
}))

const WalletDropdown = props => {
  const { sx, dark } = props
  const { classes, cx } = useStyles({ dark })

  const { walletCurrentAddress, connect, disconnect, chainId } = useRainbowContext()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [anchorWidth, setAnchorWidth] = useState(0)
  const [copied, setCopied] = useState(false)

  const open = useMemo(() => Boolean(anchorEl), [anchorEl])

  const handleClick = e => {
    setAnchorEl(e.currentTarget)
    setAnchorWidth(e.currentTarget.offsetWidth)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setCopied(false)
  }

  const viewScan = useCallback(() => {
    window.open(generateExploreLink(EXPLORER_URL[chainId === CHAIN_ID.L1 ? "L1" : "L2"], walletCurrentAddress, "address"))
  }, [walletCurrentAddress, chainId])

  const copyAddress = useCallback(() => {
    copy(walletCurrentAddress as string)
    setCopied(true)
  }, [walletCurrentAddress])

  const operations = useMemo(
    () => [
      {
        icon: BlockSvg,
        label: "Block explorer",
        action: viewScan,
      },
      { icon: copied ? CopySuccessSvg : CopySvg, label: "Copy address", action: copyAddress },
      {
        icon: DisconnectSvg,
        label: "Disconnect",
        action: () => {
          disconnect()
          handleClose()
        },
      },
    ],
    [viewScan, copyAddress, copied, disconnect],
  )

  return (
    <>
      {chainId ? (
        <ButtonBase classes={{ root: cx(classes.button, open && classes.openButton) }} sx={sx} onClick={handleClick}>
          {truncateAddress(walletCurrentAddress as string)}
          <SvgIcon className={cx(classes.endIcon, open && classes.reverseEndIcon)} component={DownTriangleSvg} inheritViewBox></SvgIcon>
        </ButtonBase>
      ) : (
        <ButtonBase classes={{ root: cx(classes.button, classes.connectButton) }} sx={sx} onClick={connect}>
          Connect Wallet
        </ButtonBase>
      )}

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
              <SvgIcon sx={{ fontSize: "1.6rem" }} component={icon} inheritViewBox></SvgIcon>
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.listItemText }}>{label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default WalletDropdown
