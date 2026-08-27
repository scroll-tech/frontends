import { notFound } from "next/navigation"

import { isSepolia } from "@/utils"
import { genMeta } from "@/utils/route"

import Finalists from "./Finalists"
import Header from "./Header"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Scroll Sticker Winners",
  relativeURL: "/sticker-winners",
  description: "Congratulations to the winners of the sticker contest.",
}))

const StickerContest = () => {
  if (isSepolia) {
    notFound()
  }
  return (
    <>
      <Header></Header>
      <Finalists></Finalists>
    </>
  )
}

export default StickerContest
