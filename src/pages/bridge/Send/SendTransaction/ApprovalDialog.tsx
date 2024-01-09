import { useEffect, useState } from "react"
import { makeStyles } from "tss-react/mui"

import {
  Avatar,
  Box,
  Card,
  Chip,
  Dialog,
  DialogContent,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material"

import { ReactComponent as SelectedSvg } from "@/assets/svgs/bridge/approve-token-selected.svg"
import { ReactComponent as CloseSvg } from "@/assets/svgs/bridge/close.svg"
import { ReactComponent as PraiseSvg } from "@/assets/svgs/bridge/praise.svg"
import { ReactComponent as WarningSvg } from "@/assets/svgs/bridge/warning.svg"
import Button from "@/components/Button"
import useCheckViewport from "@/hooks/useCheckViewport"

const APPROVAL_OPTIONS = [
  {
    title: "Current deposit",
    info: ["Approval on each order", "Pay gas on every trade"],
    type: "Warning",
  },
  {
    title: "Maximum",
    info: ["Only approve once", "Save on future gas fee"],
    type: "Recommended",
  },
]

const APPROVAL_TYPE = Object.fromEntries(APPROVAL_OPTIONS.map(item => [item.type, item.type]))

const useStyles = makeStyles()(theme => ({
  dialogPaper: {
    width: "62.8rem",
    maxWidth: "unset",
    borderRadius: "2rem",
    backgroundColor: theme.palette.themeBackground.light,
    [theme.breakpoints.down("sm")]: {
      padding: "2rem 0",
    },
  },
  dialogContentRoot: {
    padding: "6.4rem 3.2rem 4rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      padding: "6.4rem 2rem 2rem",
    },
  },
  cardRoot: {
    position: "relative",
    borderRadius: "2rem",
    borderColor: "#473835",
    padding: "2rem",
    aspectRatio: "1 / 1",
    display: "flex",
    alignItems: "center",
    overflow: "visible",
    cursor: "pointer",
    "*": {
      cursor: "pointer !important",
    },
    [theme.breakpoints.down("sm")]: {
      aspectRatio: "unset",
      justifyContent: "center",
    },
  },
  selectedCard: {
    outline: `1px solid ${theme.palette.text.primary}`,
  },
  chipRoot: {
    position: "absolute",
    backgroundColor: "#90F8EA",
    height: "3.4rem",
    top: "-1.7rem",
    left: "50%",
    transform: "translateX(-50%)",
  },
  selectedIcon: {
    fontSize: "2.4rem",
    position: "absolute",
    right: "1.2rem",
    top: "1.2rem",
  },
  chipLabel: {
    fontSize: "1.6rem",
    fontWeight: 600,
    padding: 0,
  },
  listRoot: {
    paddingBottom: 0,
  },
  listItemRoot: {
    padding: 0,
    gap: 8,
    "&:nth-of-type(n + 2)": {
      paddingTop: 8,
    },
  },
  listItemIconRoot: {
    minWidth: "unset",
  },
  listItemTextRoot: {
    marginTop: 0,
    marginBottom: 0,
  },
  listItemTextPrimary: {
    fontSize: "2rem",
    lineHeight: "3.4rem",
    [theme.breakpoints.down("sm")]: {
      lineHeight: "2.8rem",
    },
  },
}))

const ApprovalDialog = props => {
  const { token = {}, open, loading, onClose, onApprove } = props
  const { isMobile } = useCheckViewport()
  const { classes, cx } = useStyles()

  const [selectedType, setSelectedType] = useState(APPROVAL_TYPE.Recommended)

  useEffect(() => {
    if (open) {
      setSelectedType(APPROVAL_TYPE.Recommended)
    }
  }, [open])

  const handleSelect = value => {
    setSelectedType(value)
  }

  const handleContinue = () => {
    onApprove(selectedType === APPROVAL_TYPE.Recommended)
  }

  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: classes.dialogPaper }}>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 16,
          top: 28,
        }}
      >
        <SvgIcon sx={{ fontSize: "1.8rem" }} component={CloseSvg} inheritViewBox></SvgIcon>
      </IconButton>
      <DialogContent classes={{ root: classes.dialogContentRoot }}>
        <Avatar sx={{ width: "6.4rem", height: "6.4rem" }} src={token.logoURI}></Avatar>
        <Typography sx={{ fontSize: ["2rem", "2.4rem"], lineHeight: "3.2rem", fontWeight: 500, mt: ["0.8rem", "1.2rem"] }}>
          Approve {token.symbol} token
        </Typography>
        <Typography
          sx={{ fontSize: ["2rem", "2.4rem"], lineHeight: "3.6rem", fontWeight: 600, mt: ["1rem", "2.6rem"], textAlign: ["center", "left"] }}
        >
          Choose the ideal spending cap in your wallet
        </Typography>
        <Stack
          direction={isMobile ? "column" : "row"}
          gap={isMobile ? "3rem" : "2rem"}
          justifyContent="center"
          sx={{ mt: ["2.6rem", "4rem"], mb: ["2.2rem", "3.6rem"], width: "100%" }}
        >
          {APPROVAL_OPTIONS.map(item => (
            <Card
              key={item.type}
              role="button"
              tabIndex={0}
              variant="outlined"
              classes={{ root: cx(classes.cardRoot, selectedType === item.type && classes.selectedCard) }}
              onClick={() => handleSelect(item.type)}
            >
              {item.type === APPROVAL_TYPE.Recommended && (
                <Chip classes={{ root: classes.chipRoot, label: classes.chipLabel }} label={item.type}></Chip>
              )}
              {item.type === selectedType && <SvgIcon classes={{ root: classes.selectedIcon }} component={SelectedSvg} inheritViewBox></SvgIcon>}
              <Box>
                <Typography sx={{ fontSize: ["2rem", "2.4rem"], lineHeight: "3.6rem", fontWeight: 600, textAlign: "center" }}>
                  {item.title}
                </Typography>
                <List classes={{ root: classes.listRoot }}>
                  {item.info.map(i => (
                    <ListItem key={i} classes={{ root: classes.listItemRoot }}>
                      <ListItemIcon classes={{ root: classes.listItemIconRoot }}>
                        <SvgIcon
                          sx={{ fontSize: ["1.8rem", "2rem"], color: "#8C591A" }}
                          component={item.type === APPROVAL_TYPE.Recommended ? PraiseSvg : WarningSvg}
                          inheritViewBox
                        ></SvgIcon>
                      </ListItemIcon>
                      <ListItemText classes={{ root: classes.listItemTextRoot, primary: classes.listItemTextPrimary }}>{i}</ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Card>
          ))}
        </Stack>
        <Stack direction="row" justifyContent="center" sx={{ width: "100%" }}>
          <Button color="primary" width={isMobile ? "100%" : "22rem"} loading={loading} whiteButton onClick={handleContinue}>
            Continue
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

export default ApprovalDialog
