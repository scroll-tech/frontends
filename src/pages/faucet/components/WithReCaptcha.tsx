import { useState, useRef, useEffect } from "react"
import { CircularProgress, Stack } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { default as HCaptcha } from "@hcaptcha/react-hcaptcha"

const WithReCaptcha = props => {
  const { requestLoading, onRequest } = props

  const [verifyLoading, setVerifyLoading] = useState(false)
  const [captchaToken, setCaptchaToken] = useState("")

  const captchaRef = useRef<HCaptcha>(null)

  useEffect(() => {
    if (captchaToken) {
      onRequest(captchaToken)
    }
  }, [captchaToken])

  const handleRequest = async () => {
    setVerifyLoading(true)
    captchaRef.current?.execute()
  }

  const onOpen = () => {
    setVerifyLoading(false)
  }

  return (
    <>
      <LoadingButton
        loading={verifyLoading || requestLoading}
        sx={{
          mt: "2rem",
        }}
        loadingIndicator={
          <Stack direction="row" spacing={2}>
            <span>Requesting Tokens</span>
            <CircularProgress color="inherit" size={18} thickness={4}></CircularProgress>
          </Stack>
        }
        variant="contained"
        onClick={handleRequest}
      >
        Request Testnet Scroll Tokens
      </LoadingButton>
      <HCaptcha
        size="invisible"
        sitekey={process.env.REACT_APP_HCAPTCHA_SITE_KEY as string}
        languageOverride="en"
        ref={captchaRef}
        onOpen={onOpen}
        onVerify={setCaptchaToken}
      />
    </>
  )
}

export default WithReCaptcha
