import { useEffect, useState } from "react"
import MailchimpSubscribe from "react-mailchimp-subscribe"

import { Box, Container, Stack, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as SubscribeIcon } from "@/assets/svgs/footer/subscribe.svg"
import { isValidEmail } from "@/utils"

import EmailInput from "./EmailInput"

const url = "https://gmail.us14.list-manage.com/subscribe/post?u=3b1d822eb27b2fa64d82d430b&id=0b4603244e"

const SubscribeBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "2.2rem",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "2.6rem",
  },
  [theme.breakpoints.down("sm")]: {
    gap: "1.8rem",
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
      setCustomMessage("Please insert your email.")
    } else if (!emailValid) {
      setCustomMessage("Please use a correct email address.")
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
        py: ["6rem", "6rem", "3.2rem"],
      }}
    >
      <Container sx={{ maxWidth: "152rem !important" }}>
        <SubscribeBox>
          <SvgIcon sx={{ fontSize: ["4.8rem", "7rem"] }} component={SubscribeIcon} inheritViewBox></SvgIcon>
          <Stack direction="column" flex={1}>
            <Typography sx={{ fontSize: ["2rem", "2.4rem"], fontWeight: 600 }}>Stay up-to-date on the latest Scroll developer news</Typography>
          </Stack>
          <MailchimpSubscribe
            url={url}
            render={({ subscribe, status, message }: any) => (
              <Box sx={{ position: "relative", width: ["100%", "auto"], textAlign: "right" }}>
                <EmailInput
                  value={email}
                  end={status === "success"}
                  onChange={handleChangeEmail}
                  onClick={() => handleSubmit(subscribe)}
                  onEnter={() => handleSubmit(subscribe)}
                ></EmailInput>

                {customMessage && (
                  <Typography sx={{ position: "absolute", fontSize: "1.6rem", textAlign: "center", mt: "1rem", width: "100%" }}>
                    {customMessage}
                  </Typography>
                )}
                {status === "error" && (
                  <Typography sx={{ position: "absolute", fontSize: "1.6rem", textAlign: "center", mt: "1rem", width: "100%" }}>{message}</Typography>
                )}
              </Box>
            )}
          />
        </SubscribeBox>
      </Container>
    </Box>
  )
}

export default Subscribe
