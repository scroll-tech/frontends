import { useQuery } from "@tanstack/react-query"
import copy from "copy-to-clipboard"
import { useRef, useState } from "react"

import { Tooltip, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import { fetchENSNameURL } from "@/apis/canvas-profile"
import Skeleton from "@/components/Skeleton"
import { useRainbowContext } from "@/contexts/RainbowProvider"

// import { restoreAllEmojis } from "@/utils"
import ENSSubdomain from "./ENSSubdomain"

const COPY_TIP_MAP = {
  "to-copy": "Click to copy",
  copied: "ENS subdomain copied",
}

const UserName = styled(Typography)(({ theme }) => ({
  color: "#FFFFFF",
  textAlign: "center",
  fontSize: "3.2rem",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "4.4rem",
  alignSelf: "center",
  flexShrink: 0,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.4rem",
    lineHeight: "2rem",
  },
}))

const Name = props => {
  const { defaultValue, loading } = props

  const { walletCurrentAddress } = useRainbowContext()
  const [copyTipVisible, setCopyTipVisible] = useState(false)
  const [copyTipType, setCopyTipType] = useState("to-copy")
  const timer = useRef<any>(null)

  const {
    data: ensSubdomain,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["ensSubdomain", walletCurrentAddress],
    queryFn: async () => {
      const result = await scrollRequest(fetchENSNameURL(walletCurrentAddress))
      return result?.name ?? ""
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: 5e3,
  })

  const handleCopySubdomainName = () => {
    copy(ensSubdomain)
    setCopyTipType("copied")
    setCopyTipVisible(true)
    timer.current = setTimeout(() => {
      setCopyTipType("to-copy")
      setCopyTipVisible(false)
    }, 6e3)
  }

  const handelOpenCopyTip = () => {
    setCopyTipType("to-copy")
    setCopyTipVisible(true)
  }

  const handleCloseCopyTip = () => {
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = null
    }
    setCopyTipVisible(false)
  }

  if (loading || isFetching) {
    return <Skeleton dark sx={{ width: "8em", height: ["2rem", "2.4rem"] }}></Skeleton>
  }

  if (ensSubdomain) {
    const [name] = ensSubdomain.split(".")
    return (
      <Tooltip
        title={COPY_TIP_MAP[copyTipType]}
        placement="bottom"
        disableFocusListener
        disableHoverListener
        disableTouchListener
        open={copyTipVisible}
        onClose={handleCloseCopyTip}
      >
        <div>
          <ENSSubdomain
            role="button"
            sx={{ maxWidth: "100%", px: "1.5rem", whiteSpace: "pre-wrap", wordBreak: "keep-all" }}
            onMouseEnter={handelOpenCopyTip}
            onMouseLeave={handleCloseCopyTip}
            onClick={handleCopySubdomainName}
          >
            {name}.&#8203;scroll.eth
          </ENSSubdomain>
        </div>
      </Tooltip>
    )
  }

  if (isError) {
    return <UserName>--</UserName>
  }

  return <UserName>{defaultValue || "--"}</UserName>
}

export default Name
