import { genMeta } from "@/utils"

import Hero from "./_components/Hero"
import LandingBackground from "./_components/LandingBackground"
import LandingFooter from "./_components/LandingFooter"
import LandingNav from "./_components/LandingNav"
import OurProducts from "./_components/OurProducts"
import { geist } from "./_components/fonts"
import { DropIn } from "./_components/motion"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Your Gateway to Frontier Models",
}))

const LandingPage = () => {
  return (
    <div className={`${geist.className} relative isolate flex w-full flex-col items-center bg-[#F8F8F8] pt-[24px] md:pt-[30px]`}>
      <LandingBackground blur />
      {/* `top` has to equal this wrapper's own resting offset — the pt above — or the bar
          hops the difference the instant it goes sticky. It was top-16 under pt-30, so it
          jumped 14px on the first scroll, which is the movement Glen and Zhengqi both
          caught. Keep the two in step if either changes. */}
      <div className="sticky top-[24px] z-50 w-full px-[16px] md:top-[30px]">
        <DropIn>
          <LandingNav />
        </DropIn>
      </div>
      <div className="mt-[48px] w-full md:mt-0 md:flex md:min-h-[calc(100vh_-_78px)] md:items-center md:py-[24px]">
        <Hero />
      </div>
      <OurProducts />
      <LandingFooter />
    </div>
  )
}

export default LandingPage
