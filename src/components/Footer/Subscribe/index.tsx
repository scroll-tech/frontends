import { useEffect, useState } from "react"
import MailchimpSubscribe from "react-mailchimp-subscribe"

import { Box, Stack, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as SubscribeIcon } from "@/assets/svgs/footer/subscribe.svg"
import { isValidEmail } from "@/utils"

import EmailInput from "./EmailInput"

const url = "https://gmail.us14.list-manage.com/subscribe/post?u=3b1d822eb27b2fa64d82d430b&id=0b4603244e"

const SubscribeBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "2.2rem",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "1.8rem",
    alignItems: "flex-start",
  },
}))

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
        backgroundColor: theme => theme.palette.themeBackground.highlight,
        p: ["6rem 2rem", "3.2rem 6rem"],
      }}
    >
      <SubscribeBox>
        <SvgIcon sx={{ fontSize: ["4.8rem", "7rem"] }} component={SubscribeIcon} inheritViewBox></SvgIcon>
        <Stack direction="column" flex={1}>
          <Typography sx={{ fontSize: ["2rem", "2.4rem"], fontWeight: 600, lineHeight: "normal" }}>Contribute and join our survey</Typography>
          <Typography sx={{ fontSize: ["1.6rem", "2rem"], lineHeight: "normal", mt: ["1rem", 0] }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
        </Stack>
        <MailchimpSubscribe
          url={url}
          render={({ subscribe, status, message }: any) => (
            <>
              <EmailInput
                value={email}
                sx={{ mt: ["3.2rem", 0] }}
                end={status === "success"}
                onChange={handleChangeEmail}
                onClick={() => handleSubmit(subscribe)}
                onEnter={() => handleSubmit(subscribe)}
              ></EmailInput>

              {customMessage && <div className="text-[18px] leading-21px text-red   font-medium absolute">{customMessage}</div>}
              {status === "error" && <div className="text-[18px] leading-21px text-red   font-medium absolute">{message}</div>}
            </>
          )}
        />
      </SubscribeBox>
    </Box>
  )
}

export default Subscribe
