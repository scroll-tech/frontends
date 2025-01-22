import { genMeta } from "@/utils"

import Explaination from "./Explaination"
import Header from "./Header"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "scrETH",
  relativeURL: "/scrETH",
  description: "Scroll's ecosystem native ETH LRT",
}))

const ScrETHPage = () => {
  return (
    <>
      <Header></Header>
      <Explaination></Explaination>
    </>
  )
}

export default ScrETHPage
