import useSWR from "swr"

import { fetchBadgeByAddrURL } from "@/apis/canvas-badge"

const useNotionBadge = address => {
  console.log(address, "useNotionBadge")
  const { data } = useSWR(fetchBadgeByAddrURL(address), url => scrollRequest(url), {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  })

  console.log(data, "data")

  return data
}

export default useNotionBadge
