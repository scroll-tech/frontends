import { genMeta } from "@/utils"

import Explaination from "./Explaination"
import Header from "./Header"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "scrETH",
  relativeURL: "/scrETH",
  description: "Scroll's ecosystem native ETH LRT",
  ogImg: "/og_scrETH.png",
  twitterImg: "/twitter_scrETH.png",
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
