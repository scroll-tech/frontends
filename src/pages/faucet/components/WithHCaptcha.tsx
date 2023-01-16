import { default as HCaptcha } from "@hcaptcha/react-hcaptcha"
import { useEffect, useRef, useState } from "react"

import LoadingButton from "@/components/LoadingButton"

const WithHCaptcha = props => {
  const { requestLoading, onRequest } = props

  const [verifyLoading, setVerifyLoading] = useState(false)
  const [captchaToken, setCaptchaToken] = useState("")

  const captchaRef = useRef<HCaptcha>(null)

  useEffect(() => {
    if (window.location.hostname === "localhost") {
      console.info(
        `\n %c Notice: we use hCaptcha to verify humanity in faucet, to make hCaptcha work on localhost please check https://docs.hcaptcha.com/#local-development \n\n`,
        "color: #DC3347; background: #FFD7E2; padding:5px 0; border-radius: 5px 5px 5px 5px;",
      )
    }
  }, [])

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
        loadingText="Requesting Tokens"
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

export default WithHCaptcha
