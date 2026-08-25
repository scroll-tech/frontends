import { GET_IN_TOUCH_URL } from "@/constants/link"

import { ArrowRightSmallIcon } from "../LandingIcons"
import SectionDivider from "../SectionDivider"
import { instrumentSerif } from "../fonts"

// TODO: replace with a dedicated AI Hardware waitlist form once the team creates one
const WAITLIST_FORM_URL = GET_IN_TOUCH_URL

const AIHardwareSection = () => {
  return (
    <section className="scroll-mt-[-92px] flex w-full flex-col items-center gap-[40px] px-[16px] pb-[48px] pt-[32px] md:gap-[56px] md:pb-[80px] md:min-h-[900px]">
      <div className="flex w-full flex-col items-center gap-[20px] pt-[8px] md:pt-[40px] text-center">
        <p className="text-[12px] font-bold uppercase text-[#959595]">*coming soon*</p>
        <h2 className={`${instrumentSerif.className} text-[48px] text-black md:text-[60px]`}>AI Hardware</h2>
        <p className="max-w-[680px] px-[24px] text-[15px] text-[#5E5E5E]">Your Agents stored locally. Unlimited prompting by staking SCR</p>
      </div>
      <SectionDivider />
      <a
        href={WAITLIST_FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-[8px] rounded-[8px] border border-solid border-[#867B71] px-[28px] py-[14px] text-[16px] font-semibold text-black hover:bg-[#F4F3ED]"
      >
        Join the Waitlist
        <ArrowRightSmallIcon className="size-[12px]" />
      </a>
    </section>
  )
}

export default AIHardwareSection
