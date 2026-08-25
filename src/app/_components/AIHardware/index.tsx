"use client"

import { FormEvent, useState } from "react"

import { ArrowRightSmallIcon } from "../LandingIcons"
import SectionDivider from "../SectionDivider"
import { instrumentSerif } from "../fonts"

// public form endpoint id from Loops (Forms -> Settings -> Form Endpoint)
const LOOPS_FORM_ID = process.env.NEXT_PUBLIC_LOOPS_FORM_ID

type Status = "idle" | "loading" | "success" | "error"

const AIHardwareSection = () => {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || status === "loading") return
    if (!LOOPS_FORM_ID) {
      setStatus("error")
      setErrorMessage("The waitlist isn't open yet — please check back soon.")
      return
    }
    setStatus("loading")
    try {
      const res = await fetch(`https://app.loops.so/api/newsletter-form/${LOOPS_FORM_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `email=${encodeURIComponent(email)}&userGroup=${encodeURIComponent("AI Hardware Waitlist")}`,
      })
      if (res.status === 429) {
        setStatus("error")
        setErrorMessage("Too many attempts — please try again in a minute.")
        return
      }
      const data = await res.json()
      if (data.success) {
        setStatus("success")
      } else {
        setStatus("error")
        setErrorMessage(data.message || "Something went wrong — please try again.")
      }
    } catch {
      setStatus("error")
      setErrorMessage("Network error — please try again.")
    }
  }

  return (
    <section
      id="ai-hardware"
      className="scroll-mt-[-92px] flex w-full flex-col items-center gap-[40px] px-[16px] pb-[48px] pt-[32px] md:gap-[56px] md:pb-[80px] md:min-h-[900px]"
    >
      <div className="flex w-full flex-col items-center gap-[20px] pt-[8px] text-center md:pt-[40px]">
        <p className="text-[12px] font-bold uppercase text-[#959595]">*coming soon*</p>
        <h2 className={`${instrumentSerif.className} text-[48px] text-black md:text-[60px]`}>AI Hardware</h2>
        <p className="max-w-[680px] px-[24px] text-[15px] text-[#5E5E5E]">Your Agents stored locally. Unlimited prompting by staking SCR</p>
      </div>
      <SectionDivider />
      {status === "success" ? (
        <p className="text-[15px] text-[#5E5E5E]">Thanks — you're on the waitlist!</p>
      ) : (
        <div className="flex w-full flex-col items-center gap-[8px]">
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
              disabled={status === "loading"}
              className="flex shrink-0 items-center gap-[8px] rounded-[100px] px-[20px] py-[10px] text-[13px] font-bold text-black hover:bg-[#F4F3ED] disabled:opacity-50"
            >
              {status === "loading" ? "Sending..." : "Submit"}
              <ArrowRightSmallIcon className="size-[12px]" />
            </button>
          </form>
          {status === "error" && <p className="text-[13px] text-[#B3261E]">{errorMessage}</p>}
        </div>
      )}
    </section>
  )
}

export default AIHardwareSection
