import { useQueryClient } from "@tanstack/react-query"
import { isEmpty, without } from "lodash"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useStorage from "squirrel-gill"

import { CANVAS_SCROLLY_ID } from "@/constants/storageKey"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCanvasProfileStore from "@/stores/canvasProfileStore"
import usePerkStore from "@/stores/perksStore"

const useShowScrolly = () => {
  const navigate = useNavigate()
  const { walletCurrentAddress } = useRainbowContext()
  const queryClient = useQueryClient()

  const { changePerksDialogVisible, firstSeePerks } = usePerkStore()

  const { changeEditProfileVisible } = useCanvasProfileStore()

  const [scrollyId, setScrollyId] = useStorage(localStorage, CANVAS_SCROLLY_ID, ["1canvas"])
  const [open, setOpen] = useState(false)

  const canvasAvatar = queryClient.getQueryData(["canvasAvatar", walletCurrentAddress])

  useEffect(() => {
    let nextScrollyId = [...scrollyId]
    if (firstSeePerks && !scrollyId.includes("2perks")) {
      nextScrollyId.push("2perks")
    } else if (isEmpty(canvasAvatar) && !scrollyId.includes("3avatar") && !scrollyId.includes("3avatar-end")) {
      nextScrollyId.push("3avatar")
    }

    setScrollyId(nextScrollyId.sort())
    setOpen(scrollyList.map(item => item.id).includes(nextScrollyId[0]))
  }, [firstSeePerks, canvasAvatar])

  const scrollyList = [
    {
      id: "1canvas",
      content: (
        <>
          <strong>Welcome to Scroll Canvas!</strong>
          <br></br>Scroll Canvas provides the best tools to commemorate your on-chain achievements and build your on-chain identity. Discover the
          badges you're eligible for and add them to your canvas today!
        </>
      ),
      acitonText: "Explore More Badges",
      action: () => {
        setOpen(false)
        setTimeout(() => {
          navigate("/canvas-and-badges#discover")
        })
      },
      clearData: () => {
        // from default value of CANVAS_SCROLLY_ID, no need to clear
        const nextScrollyId = without(scrollyId, "1canvas")
        setScrollyId(nextScrollyId)
      },
    },
    {
      id: "2perks",
      content: (
        <>
          <strong>We’ve got something new for you!</strong>
          <br></br>
          <strong>Perks</strong> – Check and claim the benefits you've earned from your badges.
        </>
      ),
      acitonText: "Go to Perks",
      action: () => {
        changePerksDialogVisible(true)
        setOpen(false)
      },
      clearData: () => {
        // from CANVAS_PERKS, no need to clear
        const nextScrollyId = without(scrollyId, "2perks")
        setScrollyId(nextScrollyId)
      },
    },
    {
      id: "3avatar",
      content: (
        <>
          <strong>Haven’t tried our new features yet?</strong>
          <br></br>Take this chance to set your favorite image as your profile picture!
        </>
      ),
      acitonText: "Edit Now",
      action: () => {
        changeEditProfileVisible(true)
        setOpen(false)
      },
      clearData: () => {
        // need to clear -> annotate completed
        const nextScrollyId = [...scrollyId]
        nextScrollyId.splice(nextScrollyId.indexOf("3avatar"), 1, "3avatar-end")
        setScrollyId(nextScrollyId)
      },
    },
  ]

  return { open, data: scrollyList.find(item => item.id === scrollyId[0]) }
}

export default useShowScrolly
