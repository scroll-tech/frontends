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

const Ecosystem = () => {
  if (isSepolia) {
    notFound()
  }
  return (
    <>
      <Header></Header>
      <Highlights />
      <Protocols></Protocols>
      <Contribute></Contribute>
    </>
  )
}

export default Ecosystem
