import { Fragment, useState } from "react"
import { useSwiper } from "swiper/react"
import { makeStyles } from "tss-react/mui"

import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, SvgIcon } from "@mui/material"

import { ReactComponent as ErrorSvg } from "@/assets/svgs/refactor/nft-alert-error.svg"
import { ReactComponent as SuccessSvg } from "@/assets/svgs/refactor/nft-alert-success.svg"
import Button from "@/components/Button"
import OrientationToView from "@/components/Motion/OrientationToView"

import Alert from "../../components/Alert"
import StepWrapper from "./StepWrapper"

const useStyles = makeStyles()(theme => ({
  form: {
    maxWidth: "70rem",
  },
  answerSubject: {
    fontSize: "4.8rem",
    lineHeight: "7.2rem",
    fontWeight: 600,

    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.4rem",
      lineHeight: "3.2rem",
    },
  },
  formGroup: {
    maxWidth: "48rem",
    marginTop: "5.6rem",
    marginBottom: "5.6rem",

    [theme.breakpoints.up("md")]: {
      marginTop: "3.2rem",
      marginBottom: "3.2rem",
    },

    [theme.breakpoints.down("sm")]: {
      marginTop: "1.6rem",
      marginBottom: "1.6rem",
    },
  },
  optionLabel: {
    padding: "1.2rem 1.6rem",
    borderRadius: "1rem",
    backgroundColor: theme.palette.background.default,
    margin: 0,
    "&:nth-of-type(n + 2)": {
      marginTop: "3.2rem",
      [theme.breakpoints.up("md")]: {
        marginTop: "2.4rem",
      },
      [theme.breakpoints.down("sm")]: {
        marginTop: "1.6rem",
      },
    },

    [theme.breakpoints.up("sm")]: {
      height: "5.6rem",
    },
  },
  optionLabelText: {
    fontSize: "2rem",
    fontWeight: 600,
    flex: 1,
    paddingLeft: "1rem",
    color: `${theme.palette.text.primary} !important`,
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6rem",
      lineHeight: "2.4rem",
      paddingLeft: "0.8rem",
    },
  },
}))

const QuestionLabel = props => {
  const { children, isCorrect, checked } = props
  return (
    <Stack direction="row" justifyContent="space-between" spacing="0.8rem" alignItems="center" sx={{ width: "100%" }}>
      <span>{children}</span>
      {checked && (
        <SvgIcon
          sx={{ fontSize: "2.4rem", color: isCorrect ? "#62E3D1" : "#C58D49" }}
          component={isCorrect ? SuccessSvg : ErrorSvg}
          inheritViewBox
        ></SvgIcon>
      )}
    </Stack>
  )
}

const QuestionStep = props => {
  const { subject, options, answer } = props
  const { classes } = useStyles()
  const swiper = useSwiper()

  const [value, setValue] = useState()
  const handleChange = e => {
    setValue(e.target.value)
    console.log(e.target.value)
  }

  const handleContinue = () => {
    swiper.slideNext()
  }

  return (
    <StepWrapper src="/imgs/nft/flow-question.svg">
      <FormControl classes={{ root: classes.form }}>
        <FormLabel focused={false} classes={{ root: classes.answerSubject }}>
          {subject}
        </FormLabel>
        <RadioGroup classes={{ root: classes.formGroup }} value={value} onChange={handleChange} name="radio-buttons-group">
          {options.map(({ title, explanation, key }, index) => (
            <Fragment key={key}>
              <FormControlLabel
                classes={{ root: classes.optionLabel, label: classes.optionLabelText }}
                value={key}
                control={<Radio sx={{ color: theme => theme.palette.text.primary, padding: 0 }} />}
                label={
                  <QuestionLabel checked={value === key} isCorrect={answer === key}>
                    {title}
                  </QuestionLabel>
                }
              />
              {value === key && (
                <OrientationToView direction="left">
                  <Alert type="multiline" weaker severity={answer === key ? "success" : "info"} sx={{ mt: "0.8rem" }}>
                    {explanation}
                  </Alert>
                </OrientationToView>
              )}
            </Fragment>
          ))}
        </RadioGroup>
        <Button color="primary" gloomy={value !== answer} onClick={handleContinue}>
          Continue
        </Button>
      </FormControl>
    </StepWrapper>
  )
}

export default QuestionStep
