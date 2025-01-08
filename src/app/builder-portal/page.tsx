import { genMeta } from "@/utils/route"

import Content from "./Content"
import Header from "./Header"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Builder Portal",
  relativeURL: "/build-portal",
  description: "Your all-in-one resource hub for building on Scroll.",
}))

const BuilderPortalPage = () => {
  return (
    <>
      <Header></Header>
      <Content></Content>
    </>
  )
}

export default BuilderPortalPage
