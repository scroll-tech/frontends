import { useQuery } from "@tanstack/react-query"

import { Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import { fetchENSNameURL } from "@/apis/canvas-profile"
import Skeleton from "@/components/Skeleton"
import { useRainbowContext } from "@/contexts/RainbowProvider"

// import { restoreAllEmojis } from "@/utils"
import ENSSubdomain from "./ENSSubdomain"

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

  const {
    data: ensSubdomain,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["ensSubdomain", walletCurrentAddress],
    queryFn: async () => {
      const result = await scrollRequest(fetchENSNameURL(walletCurrentAddress))
      return result?.name
      // return null
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: 5e3,
  })

  if (loading || isFetching) {
    return <Skeleton dark sx={{ width: "8em", height: ["2rem", "2.4rem"] }}></Skeleton>
  }

  if (ensSubdomain) {
    const [name] = ensSubdomain.split(".")
    return (
      <ENSSubdomain sx={{ maxWidth: "100%", px: "1.5rem", whiteSpace: "pre-wrap", wordBreak: "keep-all" }}>{name}.&#8203;scroll.eth</ENSSubdomain>
    )
  }

  if (isError) {
    return <UserName>--</UserName>
  }

  return <UserName>{defaultValue || "--"}</UserName>
}

export default Name
