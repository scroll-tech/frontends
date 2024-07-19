import { useCallback } from "react"

import useCanvasStore from "@/stores/canvasStore"

const useBadgeListProxy = () => {
  const { badgeList } = useCanvasStore()

  const badgeListProxy = useCallback(
    badgeContract => {
      // const handle = {
      //   get(target, prop) {
      //     return target.find(item => item.badgeContract === prop)
      //   },
      // }
      // return new Proxy(badgeList, handle)
      return badgeList.find(item => item.badgeContract === badgeContract)
    },
    [badgeList],
  )

  return badgeListProxy
}

export default useBadgeListProxy
