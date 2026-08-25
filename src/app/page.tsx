import { genMeta } from "@/utils"

import FullpageLanding from "./_components/FullpageLanding"
import { geist, instrumentSerif } from "./_components/fonts"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Your Gateway to Frontier Models",
}))

const LandingPage = () => {
  return (
    <div className={`${geist.className} ${instrumentSerif.variable} w-full bg-white`}>
      <FullpageLanding />
    </div>
  )
}

export default LandingPage
