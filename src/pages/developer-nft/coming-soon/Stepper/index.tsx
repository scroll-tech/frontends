import dayjs from "dayjs"
import { useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { makeStyles } from "tss-react/mui"

import { Step, StepIcon, StepLabel, Stepper, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as StepCompletedSvg } from "@/assets/svgs/refactor/nft-step-completed-icon.svg"
import { ReactComponent as StepDefaultSvg } from "@/assets/svgs/refactor/nft-step-default-icon.svg"
import { DEVELOPER_NFT_STEPS } from "@/constants"
import useNFTStore from "@/stores/nftStore"

import Connector from "./Connector"

const useStyles = makeStyles()(theme => ({
  step: {
    "&.Mui-completed span": {
      color: "#62E3D1",
    },
  },
  stepLabelRoot: {
    flexDirection: "column",
    gap: 8,
    alignItems: "center",
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
    fontWeight: 600,
    lineHeight: "2.8rem",
  },
}))

const PhraseStepIcon = props => {
  const { completed, active } = props
  return (
    <StepIcon
      icon={
        <SvgIcon sx={{ width: "auto", height: "auto" }} component={completed || active ? StepCompletedSvg : StepDefaultSvg} inheritViewBox></SvgIcon>
      }
    ></StepIcon>
  )
}

const NFTStepper = () => {
  const { classes } = useStyles()
  const navigate = useNavigate()

  const { phrase } = useNFTStore()

  const activeStep = useMemo(() => {
    if (phrase === "warm-up") {
      return 0
    } else if (phrase === "in-progress") {
      return 1
    }
    return 2
  }, [phrase])

  useEffect(() => {
    if (activeStep === 2) {
      navigate("/developer-nft/mint")
    }
  }, [activeStep])

  return (
    <Stepper sx={{ mt: "2.4rem" }} activeStep={activeStep} connector={<Connector></Connector>}>
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
                <Typography sx={{ fontSize: "1.8rem", lineHeight: "2.5rem" }} component="span">
                  {dayjs(date).format("MMM D, YYYY")}
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
