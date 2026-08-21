"use client"

import { FormEvent, useState } from "react"

import { ArrowRightSmallIcon } from "../LandingIcons"
import SectionDivider from "../SectionDivider"
import { instrumentSerif } from "../fonts"

const AIHardwareSection = () => {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return
    // TODO: wire up the waitlist endpoint once it exists
    setSubmitted(true)
  }

  return (
    <section
      id="ai-hardware"
      className="scroll-mt-[96px] flex w-full flex-col items-center gap-[40px] px-[16px] pb-[48px] pt-[32px] md:gap-[56px] md:pb-[80px] md:min-h-[900px]"
    >
      <div className="flex w-full flex-col items-center gap-[20px] pt-[8px] md:pt-[40px] text-center">
        <p className="text-[12px] font-bold uppercase text-[#959595]">*coming soon*</p>
        <h2 className={`${instrumentSerif.className} text-[48px] text-black md:text-[60px]`}>AI Hardware</h2>
        <p className="max-w-[680px] px-[24px] text-[15px] text-[#5E5E5E]">Your Agents stored locally. Unlimited prompting by staking SCR</p>
      </div>
      <SectionDivider />
      {submitted ? (
        <p className="text-[15px] text-[#5E5E5E]">Thanks — you're on the waitlist.</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex h-[50px] w-full max-w-[476px] items-center gap-[8px] rounded-[8px] border border-solid border-[#867B71] py-[6px] pl-[28px] pr-[6px]"
        >
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email for waitlist..."
            className="min-w-0 flex-1 bg-transparent text-[15px] text-black outline-none placeholder:text-[#8F8CA0]"
          />
          <button
            type="submit"
            className="flex shrink-0 items-center gap-[8px] rounded-[100px] px-[20px] py-[10px] text-[13px] font-bold text-black hover:bg-[#F4F3ED]"
          >
            Submit
            <ArrowRightSmallIcon className="size-[12px]" />
          </button>
        </form>
      )}
    </section>
  )
}

export default AIHardwareSection
