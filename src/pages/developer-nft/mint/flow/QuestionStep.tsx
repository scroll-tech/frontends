import { useState } from "react"
import { useSwiper } from "swiper/react"
import { makeStyles } from "tss-react/mui"

import { Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack } from "@mui/material"

import Button from "@/components/Button"
import OrientationToView from "@/components/Motion/OrientationToView"

import Alert from "../../components/Alert"

const useStyles = makeStyles()(theme => ({
  form: {
    width: "70rem",
  },
  answerSubject: {
    fontSize: "4.6rem",
    fontWeight: 500,
    lineHeight: "5.5rem",
    color: theme.palette.primary.contrastText,
  },
  formGroup: {
    width: "48rem",
    marginTop: "5.6rem",
    marginBottom: "5.6rem",
  },
  optionLabel: {
    height: "5.2rem",
    borderRadius: "1rem",
    backgroundColor: theme.palette.background.default,
    margin: 0,
    "&:nth-of-type(n + 2)": {
      marginTop: "3.2rem",
    },
  },
  optionLabelText: {
    fontSize: "2rem",
    fontWeight: 600,
    color: `${theme.palette.text.primary} !important`,
    cursor: "pointer",
  },
}))

const QuestionStep = props => {
  const { subject, options } = props
  const { classes } = useStyles()
  const swiper = useSwiper()

  const [value, setValue] = useState()
  const handleChange = e => {
    setValue(e.target.value)
  }

  const handleContinue = () => {
    swiper.slideNext()
  }

  return (
    <Container sx={{ pt: "12rem" }}>
      <Stack direction="row">
        <FormControl classes={{ root: classes.form }}>
          <FormLabel focused={false} classes={{ root: classes.answerSubject }}>
            {subject}
          </FormLabel>
          <RadioGroup classes={{ root: classes.formGroup }} value={value} onChange={handleChange} name="radio-buttons-group">
            {options.map(({ title, explaination }, index) => (
              <>
                <FormControlLabel
                  classes={{ root: classes.optionLabel, label: classes.optionLabelText }}
                  value={index}
                  control={<Radio sx={{ color: theme => theme.palette.text.primary }} />}
                  label={title}
                />
                {Number(value) === index && (
                  <OrientationToView direction="left">
                    <Alert type="multiline" variants="success" sx={{ mt: "0.8rem" }}>
                      {explaination}
                    </Alert>
                  </OrientationToView>
                )}
              </>
            ))}
          </RadioGroup>
          <Button color="primary" gloomy={!value} onClick={handleContinue}>
            Continue
          </Button>
        </FormControl>
        <img src="/imgs/nft/flow-question.svg" alt="flow-question"></img>
      </Stack>
    </Container>
  )
}

export default QuestionStep
