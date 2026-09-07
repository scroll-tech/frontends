import Link from "next/link"

import ScrollMarkSvg from "@/assets/svgs/landingpage/scroll-mark.svg"
import { genMeta } from "@/utils"

import LandingBackground from "./_components/LandingBackground"
import LandingNav from "./_components/LandingNav"
import { geist } from "./_components/fonts"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Page not found",
}))

// Same card the sign-up flow ends on, so a dead link lands somewhere that still looks
// like the site rather than the old template.
const NotFound = () => (
  <div className={`${geist.className} relative isolate flex min-h-screen w-full flex-col items-center bg-[#F8F8F8] pt-[24px] md:pt-[30px]`}>
    <LandingBackground />
    <div className="w-full px-[16px]">
      <LandingNav />
    </div>

    <div className="flex w-full flex-1 items-center justify-center px-[16px] py-[64px]">
      <div className="w-full max-w-[354px] overflow-hidden rounded-[16px] shadow-[0_18px_40px_rgba(17,17,17,0.06)]">
        <div className="flex flex-col items-center bg-white px-[24px] pb-[32px] pt-[28px]">
          <ScrollMarkSvg className="h-[24px] w-auto" />
          <h1 className="mt-[16px] text-[20px] leading-[26px] text-black">Page not found</h1>
          <p className="mt-[12px] max-w-[260px] text-center text-[13px] leading-[19px] text-[#8C8C8C]">
            That page doesn&apos;t exist, or it has moved.
          </p>
          <Link
            href="/"
            className="mt-[24px] flex h-[40px] items-center justify-center rounded-[8px] border border-solid border-[#867B71] px-[24px] text-[14px] font-medium text-black transition-colors hover:bg-[#F8F8F8]"
          >
            Go home
          </Link>
        </div>
        <div className="h-[68px] bg-[#E4E4F4]" />
      </div>
    </div>
  </div>
)

export default NotFound
