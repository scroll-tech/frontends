import { genMeta } from "@/utils"

import LandingBackground from "../_components/LandingBackground"
import LandingNav from "../_components/LandingNav"
import { geist } from "../_components/fonts"
import SignUpCard from "./SignUpCard"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Sign up",
}))

const SignUpPage = () => (
  <div className={`${geist.className} relative isolate flex min-h-screen w-full flex-col items-center bg-[#F8F8F8] pt-[24px] md:pt-[30px]`}>
    <LandingBackground />
    <div className="w-full px-[16px]">
      <LandingNav />
    </div>
    <div className="flex w-full flex-1 items-center justify-center px-[16px] py-[64px]">
      <SignUpCard />
    </div>
  </div>
)

export default SignUpPage
