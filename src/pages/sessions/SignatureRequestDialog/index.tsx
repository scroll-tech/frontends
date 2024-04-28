import { useEffect } from "react"
import { makeStyles } from "tss-react/mui"
import { useSignMessage } from "wagmi"

import { Dialog, DialogContent, DialogTitle, IconButton, Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as CloseSvg } from "@/assets/svgs/bridge/close.svg"
import Button from "@/components/Button"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import useSessionsStore from "@/stores/sessionsStore"

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

  const { signMessage, isLoading, data: signMessageData, reset } = useSignMessage()

  const onClose = () => {
    changeSignatureRequestVisible(false)
  }

  const signTerms = async () => {
    const message = "I agree to the terms and conditions."
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
        // const hasSigned = await checkIfSigned(walletCurrentAddress);
        // setHasSignedTerms(hasSigned);
        // const hasSigned = Math.random() > 0.5
        // changeHasSignedTerms(hasSigned)
        // if (hasSigned) {
        //   // record that the user has signed the terms
        // }
      })()
    }
  }, [walletCurrentAddress])

  useEffect(() => {
    if (signMessageData) {
      reset()
      onClose()
      changeHasSignedTerms(true)
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
          top: 28,
        }}
      >
        <SvgIcon sx={{ fontSize: "1.8rem" }} component={CloseSvg} inheritViewBox></SvgIcon>
      </IconButton>
      <DialogTitle sx={{ textAlign: "center", fontSize: ["2rem", "2.4rem"], lineHeight: ["2.8rem", "3.6rem"], fontWeight: "600" }}>
        Scroll Sessions’ terms and conditions
      </DialogTitle>
      <DialogContent classes={{ root: classes.dialogContentRoot }}>
        <Typography
          sx={{
            fontSize: ["1.6rem", "1.8rem"],
            lineHeight: ["2rem", "2.8rem"],
            textAlign: ["center", "left"],
            maxHeight: "50vh",
            overflow: "auto",
            color: "#5B5B5B",
          }}
        >
          Lorem ipsum dolor sit amet consectetur. Rutrum diam elit nec mauris tempor mi molestie in. Condimentum sit dolor morbi massa sit laoreet
          augue est. Faucibus imperdiet dictumst facilisi montes. Vitae nunc dui augue vitae ac arcu. Non nisl lectus feugiat id quam sed facilisi.
          Blandit in tellus volutpat ut a posuere habitant. Tempus in ac aliquet euismod sed. Lorem condimentum molestie ipsum neque molestie ac.
          Semper mauris risus magna amet nulla eu viverra tortor viverra. Morbi nisl mattis faucibus arcu et eu blandit urna. Quam eu mauris molestie
          eros. Tortor sed varius congue vehicula. Est euismod pellentesque odio imperdiet nibh. Facilisis adipiscing integer ullamcorper metus quis
          tellus risus suspendisse proin. Egestas nisl venenatis diam turpis urna in nulla massa nunc. Orci leo orci volutpat a. Leo venenatis non
          metus purus quis molestie. Laoreet eleifend ac sit id facilisi dignissim massa. Fermentum velit tristique ligula pellentesque turpis
          vulputate libero molestie. Lectus dignissim nullam pretium imperdiet enim eget et et. Lorem ipsum dolor sit amet consectetur. Rutrum diam
          elit nec mauris tempor mi molestie in. Condimentum sit dolor morbi massa sit laoreet augue est. Faucibus imperdiet dictumst facilisi montes.
          Vitae nunc dui augue vitae ac arcu. Non nisl lectus feugiat id quam sed facilisi. Blandit in tellus volutpat ut a posuere habitant. Tempus
          in ac aliquet euismod sed. Lorem condimentum molestie ipsum neque molestie ac. Semper mauris risus magna amet nulla eu viverra tortor
          viverra. Morbi nisl mattis faucibus arcu et eu blandit urna. Quam eu mauris molestie eros. Tortor sed varius congue vehicula. Est euismod
          pellentesque odio imperdiet nibh. Facilisis adipiscing integer ullamcorper metus quis tellus risus suspendisse proin. Egestas nisl venenatis
          diam turpis urna in nulla massa nunc. Orci leo orci volutpat a. Leo venenatis non metus purus quis molestie. Laoreet eleifend ac sit id
          facilisi dignissim massa. Fermentum velit tristique ligula pellentesque turpis vulputate libero molestie. Lectus dignissim nullam pretium
          imperdiet enim eget et et.
        </Typography>
        <Stack direction="row" justifyContent="center" sx={{ width: "100%", mt: "3.2rem" }}>
          <Button color="primary" width={isMobile ? "100%" : "22rem"} loading={isLoading} whiteButton onClick={signTerms}>
            {isLoading ? "Check Wallet" : "Sign to agree"}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

export default SignatureRequestDialog
