import { genMeta } from "@/utils"

import Hero from "./_components/Hero"
import LandingBackground from "./_components/LandingBackground"
import LandingFooter from "./_components/LandingFooter"
import LandingNav from "./_components/LandingNav"
import OurProducts from "./_components/OurProducts"
import { geist } from "./_components/fonts"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Your Gateway to Frontier Models",
}))

const LandingPage = () => {
  return (
    <div className={`${geist.className} relative isolate flex w-full flex-col items-center bg-[#F8F8F8] pt-[24px] md:pt-[30px]`}>
      <LandingBackground />
      <div className="sticky top-[16px] z-50 w-full px-[16px]">
        <LandingNav />
      </div>
      <div className="mt-[48px] w-full md:mt-[99px]">
        <Hero />
      </div>
      <OurProducts />
      <LandingFooter />
    </div>
  )
}

export default LandingPage
