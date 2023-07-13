import { useEffect, useState } from "react"
import MailchimpSubscribe from "react-mailchimp-subscribe"

import { Box, Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as SubscribeIcon } from "@/assets/svgs/footer/subscribe.svg"
import { isValidEmail } from "@/utils"

import EmailInput from "./EmailInput"

const url = "https://gmail.us14.list-manage.com/subscribe/post?u=3b1d822eb27b2fa64d82d430b&id=0b4603244e"

const Subscribe = () => {
  const [email, setEmail] = useState("")
  const [customMessage, setCustomMessage] = useState("")
  const [emailValid, setEmailValid] = useState(false)

  useEffect(() => {
    setCustomMessage("")
    setEmailValid(isValidEmail(email))
  }, [email])

  const handleSubmit = subscribe => {
    if (!email) {
      setCustomMessage("Please insert your email")
    } else if (!emailValid) {
      setCustomMessage("Please use a correct email")
    } else {
      subscribe({ EMAIL: email })
      setEmail("")
    }
  }

  const handleChangeEmail = e => {
    setEmail(e.target.value)
  }

  return (
    <Box
      sx={{
        backgroundColor: "#FFDEB5",
        p: "3.2rem 6rem",
      }}
    >
      <Stack direction="row" alignItems="center" spacing="2.2rem">
        <SvgIcon sx={{ fontSize: "7rem" }} component={SubscribeIcon} inheritViewBox></SvgIcon>
        <Stack direction="column" flex={1}>
          <Typography sx={{ fontSize: "2.4rem", fontWeight: 600, lineHeight: "normal," }}>Contribute and join our survey</Typography>
          <Typography sx={{ fontSize: "2rem", lineHeight: "normal," }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
        </Stack>
        <MailchimpSubscribe
          url={url}
          render={({ subscribe, status, message }: any) => (
            <div>
              <EmailInput
                value={email}
                end={status === "success"}
                onChange={handleChangeEmail}
                onClick={() => handleSubmit(subscribe)}
                onEnter={() => handleSubmit(subscribe)}
              ></EmailInput>

              {customMessage && <div className="text-[18px] leading-21px text-red   font-medium absolute">{customMessage}</div>}
              {status === "error" && <div className="text-[18px] leading-21px text-red   font-medium absolute">{message}</div>}
            </div>
          )}
        />
      </Stack>
    </Box>
  )
}

export default Subscribe
