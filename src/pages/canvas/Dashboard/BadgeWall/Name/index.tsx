import { useQuery } from "@tanstack/react-query"

import { Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import { fetchENSNameURL } from "@/apis/canvas-profile"
import Skeleton from "@/components/Skeleton"
import { useRainbowContext } from "@/contexts/RainbowProvider"

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
    fontSize: "1.6rem",
    lineHeight: "2.4rem",
    height: "2.4rem",
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
    return <Skeleton dark sx={{ width: "8em", height: ["2.4rem", "3.2rem"] }}></Skeleton>
  }

  if (ensSubdomain) {
    return <ENSSubdomain>{ensSubdomain}</ENSSubdomain>
  }

  if (isError) {
    return <UserName>--</UserName>
  }

  return <UserName>{defaultValue || "--"}</UserName>
}

export default Name
