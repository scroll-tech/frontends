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
  stepper: {
    marginTop: "2.4rem",
    maxWidth: "98rem",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: 8,
      height: "24rem",
    },
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
      flexDirection: "row",
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
      fontSize: "1.6rem",
      lineHeight: "1.5",
      textAlign: "left",
    },
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
                <Typography
                  component="span"
                  sx={{ fontSize: ["1.6rem", "2rem"], lineHeight: [1.5, "normal"], fontFamily: "var(--developer-page-font-family)" }}
                >
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