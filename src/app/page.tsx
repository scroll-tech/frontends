import { genMeta } from "@/utils"

import AIHardwareSection from "./_components/AIHardware"
import CompassSection from "./_components/Compass"
import CompassApiSection from "./_components/CompassApi"
import Hero from "./_components/Hero"
import LandingFooter from "./_components/LandingFooter"
import LandingNav from "./_components/LandingNav"
import { geist, instrumentSerif } from "./_components/fonts"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "One Plan, Every Model, Secured by ZK",
}))

const LandingPage = () => {
  return (
    <div className={`${geist.className} ${instrumentSerif.variable} flex w-full flex-col items-center bg-white`}>
      <div className="w-full px-[16px] pt-[32px]">
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
