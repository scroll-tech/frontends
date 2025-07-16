import { notFound } from "next/navigation"

import { isSepolia } from "@/utils"
import { genMeta } from "@/utils/route"

import Contribute from "./Contribute"
import Header from "./Header"
import Highlights from "./Highlights"
import Protocols from "./Protocols"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Ecosystem",
  relativeURL: "/ecosystem",
}))

const Ecosystem = async () => {
  if (isSepolia) {
    notFound()
  }

  const categoryToTags = await fetch("https://scroll-eco-list.netlify.app/docs/category-to-tags.json").then(res => res.json())

  return (
    <>
      <Header></Header>
      <Highlights />
      <Protocols categories={categoryToTags}></Protocols>
      <Contribute></Contribute>
    </>
  )
}

export default Ecosystem
