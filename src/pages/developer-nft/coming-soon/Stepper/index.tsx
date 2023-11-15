import { useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { makeStyles } from "tss-react/mui"

import { Step, StepIcon, StepLabel, Stepper, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as StepCompletedSvg } from "@/assets/svgs/nft/step-completed-icon.svg"
import { ReactComponent as StepDefaultSvg } from "@/assets/svgs/nft/step-default-icon.svg"
import { DEVELOPER_NFT_STEPS } from "@/constants"
import useNFTStore from "@/stores/nftStore"
import { formatDate } from "@/utils"

import Connector from "./Connector"

const useStyles = makeStyles()(theme => ({
  stepper: {
    marginTop: "2.4rem",
    maxWidth: "64rem",
    width: "100%",
  },
  step: {
    "&.Mui-completed span": {
      color: "#62E3D1",
    },
  },
  stepLabelRoot: {
    flexDirection: "column",
    gap: 8,
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "9rem",
    },
  },
  stepLabelContainer: {
    textAlign: "center",
  },
  stepIconContainer: {
    paddingRight: 0,
  },
  stepLabelText: {
    color: theme.palette.primary.contrastText,
    fontSize: "2rem",
    fontWeight: "600 !important",
    lineHeight: "normal",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.8rem",
      lineHeight: "1.5",
    },
  },
}))

const PhraseStepIcon = props => {
  const { completed, active } = props
  return (
    <StepIcon
      icon={<SvgIcon sx={{ fontSize: "2rem" }} component={completed || active ? StepCompletedSvg : StepDefaultSvg} inheritViewBox></SvgIcon>}
    ></StepIcon>
  )
}

const NFTStepper = () => {
  const { classes } = useStyles()
  const navigate = useNavigate()

  const { phrase } = useNFTStore()

  const activeStep = useMemo(() => {
    if (phrase === "in-progress") {
      return 0
    } else if (phrase === "end") {
      return 1
    }
    return -1
  }, [phrase])

  useEffect(() => {
    if (activeStep === 1) {
      navigate("/developer-nft/mint")
    }
  }, [activeStep])

  return (
    <Stepper classes={{ root: classes.stepper }} activeStep={activeStep} connector={<Connector></Connector>}>
      {DEVELOPER_NFT_STEPS.map(({ date, label }, index) => {
        return (
          <Step classes={{ root: classes.step }} key={label} completed={index <= activeStep}>
            <StepLabel
              classes={{
                root: classes.stepLabelRoot,
                iconContainer: classes.stepIconContainer,
                labelContainer: classes.stepLabelContainer,
                label: classes.stepLabelText,
              }}
              StepIconComponent={PhraseStepIcon}
              optional={
                // TODO: NumberTypography not allow component="span"
                <Typography component="span" sx={{ fontSize: ["1.6rem", "2rem"], lineHeight: [1.5, "normal"] }}>
                  {formatDate(date, { withTime: true })}
                </Typography>
              }
            >
              {label}
            </StepLabel>
          </Step>
        )
      })}
    </Stepper>
  )
}

export default NFTStepper
