import { useEffect, useState } from "react"
import MailchimpSubscribe from "react-mailchimp-subscribe"

import { Box, Button } from "@mui/material"
import { styled, useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

import { isValidEmail } from "@/utils"

// import { IntrinsicAttributes } from '@types/react-mailchimp-subscribe'

const url = "https://gmail.us14.list-manage.com/subscribe/post?u=3b1d822eb27b2fa64d82d430b&id=0b4603244e"

const Input = styled("input")(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.up("md")]: {
    borderRadius: 0,
  },
}))

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

  const medias = [
    {
      name: "Twitter",
      imgSrc: "/imgs/footer/twitter.svg",
      href: "https://twitter.com/Scroll_ZKP",
    },
    {
      name: "Discord",
      imgSrc: "/imgs/footer/discord.svg",
      href: "https://discord.gg/scroll",
    },
    {
      name: "GitHub",
      imgSrc: "/imgs/footer/github.svg",
      href: "https://github.com/scroll-tech",
    },
    {
      name: "YouTube",
      imgSrc: "/imgs/footer/youtube.svg",
      href: "https://www.youtube.com/@Scroll_ZKP",
    },
  ]

  const renderMedias = () =>
    medias.map(media => (
      <a
        className="flex mr-[36px] hover:text-charcoal items-center text-body-title-80"
        href={media.href}
        key={media.name}
        target="_blank"
        rel="noreferrer"
      >
        <img alt={media.name} src={media.imgSrc} className="w-[20px] mr-[8px]" />
        {media.name}
      </a>
    ))

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
    <>
      <div className="relative">
        <p className="text-md mb-[14px] font-display font-semibold">Follow Us</p>
        <div className="flex  my-[20px]">{renderMedias()}</div>
        <MailchimpSubscribe
          url={url}
          render={({ subscribe, status, message }: any) => (
            <div>
              <Box
                className="flex flex-col mb-[20px] items-center overflow-hidden lg:flex-row"
                sx={{
                  borderRadius: `${theme.shape.borderRadius}px`,
                }}
              >
                <Input
                  className="w-full bg-[#c9cbce33] flex-shrink-0 border h-[50px] text-base outline-none mb-[12px] pl-[24px] placeholder:text-charcoal-50  lg:w-[254px] lg:border-transparent lg:mb-0"
                  type="email"
                  placeholder="Enter email address"
                  onChange={(event: any) => setEmail(event.target.value)}
                />
                <Button
                  sx={{
                    borderRadius: theme => ({
                      md: `0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`,
                    }),
                    width: "max-content",
                  }}
                  variant={emailValid ? "contained" : "outlined"}
                  fullWidth={!matches}
                  color={emailValid ? "primary" : "secondary"}
                  onClick={() => handleSubmit(subscribe)}
                >
                  Subscribe to Newsletter
                </Button>
              </Box>

              {customMessage && <div className="text-[18px] leading-21px text-red   font-medium absolute">{customMessage}</div>}
              {status === "error" && <div className="text-[18px] leading-21px text-red   font-medium absolute">{message}</div>}
              {status === "success" && (
                <div className="text-base text-body-title  leading-[21px]  font-medium absolute">Thank you for subscribing!</div>
              )}
            </div>
          )}
        />
      </div>
    </>
  )
}

export default Subscribe
