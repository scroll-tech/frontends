import { useEffect } from "react"
import useStorage from "squirrel-gill"
import { makeStyles } from "tss-react/mui"
import { useSignMessage } from "wagmi"

import { Dialog, DialogContent, DialogTitle, IconButton, Stack, SvgIcon } from "@mui/material"

import { checkSignStatus, updateSignStatus } from "@/apis/sessions"
import { ReactComponent as CloseSvg } from "@/assets/svgs/bridge/close.svg"
import Button from "@/components/Button"
import { SIGNED_TERMS } from "@/constants/storageKey"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import SessionsTerms from "@/pages/sessions-terms"
import useSessionsStore from "@/stores/sessionsStore"
import { sentryDebug } from "@/utils"

const useStyles = makeStyles()(theme => ({
  dialogPaper: {
    width: "62.8rem",
    maxWidth: "unset",
    borderRadius: "2rem",
    paddingTop: "2.4rem",
    backgroundColor: "#fff",
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

const SignatureRequestDialog = () => {
  const { isMobile } = useCheckViewport()
  const { classes } = useStyles()
  const { walletCurrentAddress } = useRainbowContext()

  const { changeSignatureRequestVisible, signatureRequestVisible, changeHasSignedTerms } = useSessionsStore()

  const { signMessage, isPending, data: signMessageData, reset } = useSignMessage()
  const [signedTerms, setSignedTerms] = useStorage(localStorage, SIGNED_TERMS, {})

  const onClose = () => {
    changeSignatureRequestVisible(false)
  }

  const signTerms = async () => {
    const message =
      "By signing this message, you acknowledge that you have read and understood the Scroll Sessions Terms of Use, Scroll Terms of Service and Privacy Policy, and agree to abide by all of the terms and conditions contained therein."
    signMessage({ message })
  }

  useEffect(() => {
    changeSignatureRequestVisible(false)
    changeHasSignedTerms(false)
    if (!walletCurrentAddress) {
      changeSignatureRequestVisible(false)
      changeHasSignedTerms(false)
    } else {
      ;(async () => {
        let hasSigned = !!signedTerms[walletCurrentAddress]
        if (!hasSigned) {
          try {
            const result = await scrollRequest(checkSignStatus(walletCurrentAddress))
            if (result?.errcode === 0) {
              hasSigned = true
              setSignedTerms({
                ...signedTerms,
                [walletCurrentAddress as string]: result.data,
              })
            } else {
              hasSigned = false
            }
          } catch (e) {
            sentryDebug(`check sign: ${walletCurrentAddress}-${e.message}`)
          }
        }
        changeHasSignedTerms(hasSigned)
      })()
    }
  }, [walletCurrentAddress])

  useEffect(() => {
    if (signMessageData) {
      const info = {
        address: walletCurrentAddress,
        signature: signMessageData,
        timestamp: new Date().valueOf(),
      }
      reset()
      onClose()
      changeHasSignedTerms(true)
      setSignedTerms({
        ...signedTerms,
        [walletCurrentAddress as string]: info,
      })

      try {
        scrollRequest(updateSignStatus, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(info),
        })
      } catch (e) {
        sentryDebug(`update sign: ${walletCurrentAddress}-${e.message}`)
      }
    }
  }, [signMessageData])

  return (
    <Dialog open={signatureRequestVisible} onClose={onClose} classes={{ paper: classes.dialogPaper }}>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 16,
          top: [10, 28],
        }}
      >
        <SvgIcon sx={{ fontSize: ["1.6rem", "1.8rem"] }} component={CloseSvg} inheritViewBox></SvgIcon>
      </IconButton>
      <DialogTitle
        sx={{
          textAlign: "center",
          fontSize: ["2rem", "2.4rem"],
          lineHeight: ["2.8rem", "3.6rem"],
          fontWeight: "600",
          margin: "0 auto",
          maxWidth: ["26rem", "100%"],
        }}
      >
        Scroll Sessions Program Terms of Use
      </DialogTitle>
      <DialogContent classes={{ root: classes.dialogContentRoot }}>
        <SessionsTerms isPopup />
        <Stack direction="row" justifyContent="center" sx={{ width: "100%", mt: "3.2rem" }}>
          <Button color="primary" width={isMobile ? "100%" : "22rem"} loading={isPending} whiteButton onClick={signTerms}>
            {isPending ? "Check Wallet" : "Sign to agree"}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

export default SignatureRequestDialog
