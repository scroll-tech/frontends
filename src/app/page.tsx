import { genMeta } from "@/utils"

import AIHardwareSection from "./_components/AIHardware"
import CompassSection from "./_components/Compass"
import CompassApiSection from "./_components/CompassApi"
import Hero from "./_components/Hero"
import LandingFooter from "./_components/LandingFooter"
import LandingNav from "./_components/LandingNav"
import { geist, instrumentSerif } from "./_components/fonts"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Your Gateway to Frontier Models",
}))

const LandingPage = () => {
  return (
    <div className={`${geist.className} ${instrumentSerif.variable} flex w-full flex-col items-center gap-[32px] bg-white pt-[32px] md:gap-[56px]`}>
      <div className="sticky top-[16px] z-50 w-full px-[16px]">
        <LandingNav />
      </div>
      <Hero />
      <CompassSection />
      <CompassApiSection />
      <AIHardwareSection />
      <LandingFooter />
    </div>
  )
}

export default LandingPage
