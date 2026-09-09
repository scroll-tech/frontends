import { genMeta } from "@/utils"

import Hero from "./_components/Hero"
import LandingBackground from "./_components/LandingBackground"
import LandingFooter from "./_components/LandingFooter"
import LandingNav from "./_components/LandingNav"
import ModelStrip from "./_components/ModelStrip"
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
      {/* monad's hero is a top-padded flow, 102 from the nav's underside to the headline
          (their 72 of hero padding plus 30 on the wrapper) — not centred in the first
          screen, which is what this wrapper used to do. The nav's underside is 78 here
          (30 page top + 48 bar). Their phone: 72. */}
      <div className="mt-[72px] w-full md:mt-[102px]">
        <Hero />
      </div>
      {/* monad puts its logo row right under the first screen; ours lists the models */}
      <ModelStrip />
      <OurProducts />
      <LandingFooter />
    </div>
  )
}

export default LandingPage
