import { useMemo } from "react"

import useCanvasStore from "@/stores/canvasStore"

const useBadgeListProxy = () => {
  const { badgeList } = useCanvasStore()

  const badgeListProxy = useMemo(() => {
    const handle = {
      get(target, prop) {
        return target.find(item => item.badgeContract === prop)
      },
    }
    return new Proxy(badgeList, handle)
  }, [badgeList])

  return badgeListProxy
}

export default useBadgeListProxy
