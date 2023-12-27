import { isError } from "ethers"
import { Fragment, useState } from "react"
import { useSwiper } from "swiper/react"
import { makeStyles } from "tss-react/mui"

import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Stack, SvgIcon } from "@mui/material"

import { fetchParamsByAddressURL } from "@/apis/nft"
import { ReactComponent as ErrorSvg } from "@/assets/svgs/nft/alert-error.svg"
import { ReactComponent as SuccessSvg } from "@/assets/svgs/nft/alert-success.svg"
import { ReactComponent as CheckedSvg } from "@/assets/svgs/nft/question-checked.svg"
import { ReactComponent as UncheckedSvg } from "@/assets/svgs/nft/question-unchecked.svg"
import Alert from "@/components/Alert/NFTAlert"
import Button from "@/components/Button"
import OrientationToView from "@/components/Motion/OrientationToView"
import RequestWarning from "@/components/RequestWarning"
import { useNFTContext } from "@/contexts/NFTContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useNFTStore from "@/stores/nftStore"
import { sentryDebug, trimErrorMessage } from "@/utils"

import StepWrapper from "./StepWrapper"

const useStyles = makeStyles()(theme => ({
  form: {
    maxWidth: "70rem",
  },
  answerSubject: {
    fontSize: "4.8rem",
    lineHeight: "6.4rem",
    fontWeight: 600,

    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.4rem",
      lineHeight: "3.2rem",
    },
  },
  formGroup: {
    // maxWidth: order === 1 ? "56rem" : "64rem",
    marginTop: "2.4rem",
    marginBottom: "2.4rem",

    [theme.breakpoints.down("md")]: {
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
      marginTop: "2.4rem",
      [theme.breakpoints.down("sm")]: {
        marginTop: "1.6rem",
      },
    },

    [theme.breakpoints.up("sm")]: {
      minHeight: "5.6rem",
    },
  },
  optionLabelText: {
    fontSize: "2rem",
    lineHeight: "3.2rem",
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
          sx={{ fontSize: "2.4rem", color: isCorrect ? "#0F8E7E" : "#C58D49" }}
          component={isCorrect ? SuccessSvg : ErrorSvg}
          inheritViewBox
        ></SvgIcon>
      )}
    </Stack>
  )
}

const QuestionStep = props => {
  const { order, subject, options, answer, image, scrollTarget } = props
  const { walletCurrentAddress, provider } = useRainbowContext()

  const { NFTInstance, NFTV2Instance } = useNFTContext()

  const { isMinting, changeIsMinting, changeNFTVersion } = useNFTStore()

  const { classes } = useStyles()
  const swiper = useSwiper()

  const [value, setValue] = useState<Array<string | never>>([])
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = e => {
    if (e.target.checked) {
      setValue(preValue => [...preValue, e.target.value])
    } else {
      setValue(preValue => preValue.filter(item => item !== e.target.value))
    }
  }

  const mintNFT = async () => {
    try {
      changeIsMinting(true)
      const balance = await provider?.getBalance(walletCurrentAddress as `0x${string}`)
      if (!balance) {
        return "No balance for minting."
      }
      const data = await scrollRequest(fetchParamsByAddressURL(walletCurrentAddress))

      if (data.proof) {
        const { proof, metadata } = data
        const nftMetadata = {
          ...metadata,
          rarityData: BigInt(metadata.rarityData),
        }
        let tx
        if (proof.length) {
          changeNFTVersion(1)
          const gasLimit = await estimateGas(NFTInstance, walletCurrentAddress, nftMetadata, proof)
          tx = await NFTInstance.mint(walletCurrentAddress, nftMetadata, proof, {
            gasLimit,
          })
        } else {
          changeNFTVersion(2)
          const gasLimit = await estimateGas(NFTV2Instance, walletCurrentAddress, nftMetadata)
          tx = await NFTV2Instance.mint(walletCurrentAddress, nftMetadata, {
            gasLimit,
          })
        }
        const txReceipt = await tx.wait()
        if (txReceipt.status === 1) {
          return true
        } else {
          sentryDebug(`mint error txHash:${txReceipt.transactionHash}`)
          return "due to any operation that can cause the transaction or top-level call to revert"
        }
      }
    } catch (error) {
      sentryDebug(`mint error wallet:${walletCurrentAddress} message:${error.message}`)
      if (isError(error, "ACTION_REJECTED")) {
        return ""
      }
      return trimErrorMessage(error.message)
    } finally {
      changeIsMinting(false)
    }
  }

  const estimateGas = async (instance, ...params) => {
    const gasLimit = await instance.mint.estimateGas(...params)
    return (gasLimit * BigInt(120)) / BigInt(100)
  }

  const handleContinue = async () => {
    if (order === 2) {
      const result = await mintNFT()
      if (result !== true) {
        setErrorMessage(result)
        return
      }
    }
    swiper.slideNext()
    scrollTarget.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const handleClose = () => {
    setErrorMessage("")
  }

  return (
    <StepWrapper src={image} smallImage={order === 2}>
      <FormControl classes={{ root: classes.form }}>
        <FormLabel focused={false} classes={{ root: classes.answerSubject }}>
          {subject}
        </FormLabel>
        <FormGroup classes={{ root: classes.formGroup }} sx={{ maxWidth: order === 1 ? "56rem" : "64rem" }}>
          {options.map(({ title, explanation, key }, index) => (
            <Fragment key={key}>
              <FormControlLabel
                classes={{ root: classes.optionLabel, label: classes.optionLabelText }}
                value={key}
                control={
                  <Checkbox
                    sx={{ padding: 0 }}
                    disabled={isMinting}
                    checked={value.includes(key)}
                    icon={<SvgIcon sx={{ fontSize: "2rem" }} component={UncheckedSvg} inheritViewBox></SvgIcon>}
                    checkedIcon={<SvgIcon sx={{ fontSize: "2rem" }} component={CheckedSvg} inheritViewBox></SvgIcon>}
                    onChange={handleChange}
                  />
                }
                label={
                  <QuestionLabel checked={value.includes(key)} isCorrect={answer.includes(key)}>
                    {title}
                  </QuestionLabel>
                }
              />
              {value.includes(key) && (
                <OrientationToView direction="left">
                  <Alert type="compact" severity="success" sx={{ mt: "0.8rem" }}>
                    {explanation}
                  </Alert>
                </OrientationToView>
              )}
            </Fragment>
          ))}
        </FormGroup>
        <Button color="primary" loading={isMinting} gloomy={value.sort().toString() !== answer.sort().toString()} onClick={handleContinue}>
          {isMinting ? "Minting" : "Continue"}
        </Button>
      </FormControl>
      <RequestWarning open={!!errorMessage} onClose={handleClose}>
        {errorMessage}
      </RequestWarning>
    </StepWrapper>
  )
}

export default QuestionStep
