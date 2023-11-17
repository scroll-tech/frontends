import { Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as DiscordSvg } from "@/assets/svgs/portal/discord.svg"
import { ReactComponent as GithubSvg } from "@/assets/svgs/portal/github.svg"
import { ReactComponent as StatusSvg } from "@/assets/svgs/portal/status.svg"
import Link from "@/components/Link"

import Descriptions, { DescriptionItem } from "./Descriptions"

const SendFeedback = () => {
  const FEEDBACK_LIST = [
    {
      icon: StatusSvg,
      content: (
        <>
          First, check our{" "}
          <Link external underline="hover" href="https://status.scroll.io">
            system status
          </Link>
        </>
      ),
    },
    {
      icon: DiscordSvg,
      content: (
        <>
          Chat with us on{" "}
          <Link external underline="hover" href="https://discord.gg/scroll">
            Discord
          </Link>
        </>
      ),
    },
    {
      icon: GithubSvg,
      content: (
        <>
          Open an issue/PR{" "}
          <Link external underline="hover" href="https://github.com/scroll-tech">
            in our GitHub
          </Link>
        </>
      ),
    },
  ]
  return (
    <Descriptions title="Send us feedback">
      {FEEDBACK_LIST.map((item, index) => (
        <DescriptionItem key={index}>
          <Stack direction="row" spacing="1.2rem" alignItems="center">
            <SvgIcon sx={{ fontSize: ["1.8rem", "2.2rem"] }} component={item.icon} inheritViewBox></SvgIcon>
            <Typography>{item.content}</Typography>
          </Stack>
        </DescriptionItem>
      ))}
    </Descriptions>
  )
}

export default SendFeedback
