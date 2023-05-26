import { useEffect, useState } from "react"
import MailchimpSubscribe from "react-mailchimp-subscribe"

import { Box, Button, InputBase, Stack } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

import { isValidEmail } from "@/utils"

const url = "https://gmail.us14.list-manage.com/subscribe/post?u=3b1d822eb27b2fa64d82d430b&id=0b4603244e"

const Subscribe = () => {
  const [email, setEmail] = useState("")
  const [customMessage, setCustomMessage] = useState("")
  const [emailValid, setEmailValid] = useState(false)
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))

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
    }
  }

  return (
    <Box className="relative" sx={{ mt: "2.2rem" }}>
      <MailchimpSubscribe
        url={url}
        render={({ subscribe, status, message }: any) => (
          <div>
            <Stack direction="column" spacing={"1.5rem"}>
              <InputBase
                type="email"
                autoComplete="off"
                sx={{
                  width: ["100%", "35.8rem"],
                  height: "5rem",
                  p: "1.6rem 2.4rem",
                  backgroundColor: "#F3EFEC",
                  borderRadius: theme => `${theme.shape.borderRadius}px`,
                  border: theme => `1px solid ${theme.palette.divider}`,
                  "&:hover": {
                    border: theme => `1px solid ${theme.palette.primary.main}`,
                  },
                }}
                placeholder="Enter email address"
                onChange={(event: any) => setEmail(event.target.value)}
              />
              <Button
                sx={{
                  borderRadius: theme => `${theme.shape.borderRadius}px`,
                  width: "23.5rem",
                  px: 0,
                }}
                variant={emailValid ? "contained" : "outlined"}
                fullWidth={!matches}
                color={emailValid ? "primary" : "secondary"}
                onClick={() => handleSubmit(subscribe)}
              >
                Subscribe to Newsletter
              </Button>
            </Stack>

            {customMessage && <div className="text-[18px] leading-21px text-red   font-medium absolute">{customMessage}</div>}
            {status === "error" && <div className="text-[18px] leading-21px text-red   font-medium absolute">{message}</div>}
            {status === "success" && (
              <div className="text-base text-body-title  leading-[21px]  font-medium absolute">Thank you for subscribing!</div>
            )}
          </div>
        )}
      />
    </Box>
  )
}

export default Subscribe
