import { notFound } from "next/navigation"

import { isSepolia } from "@/utils"
import { genMeta } from "@/utils/route"

import Finalists from "./Finalists"
import Header from "./Header"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Scroll Sticker Vote",
  relativeURL: "/sticker-vote",
  description: "Vote for your favourite sticker designs.",
  ogImg: "/og_sticker_vote.png",
  twitterImg: "/twitter_sticker_vote.png",
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
