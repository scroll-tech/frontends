"use client"

import Link from "next/link"
import { FormEvent, useState } from "react"

import ScrollMarkSvg from "@/assets/svgs/landingpage/scroll-mark.svg"
import { LOOPS_FORM_ID, LOOPS_MAILING_LIST_ID } from "@/constants/link"

type Status = "idle" | "loading" | "done" | "error"

const CardShell = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full max-w-[354px]">
    <div className="flex flex-col items-center rounded-[16px] bg-white px-[24px] pb-[32px] pt-[28px] shadow-[0_18px_40px_rgba(17,17,17,0.06)]">
      {children}
    </div>
    {/* the stacked lavender sheet from the design */}
    <div className="mx-[6px] h-[56px] rounded-b-[16px] bg-[#E4E4F4]" />
  </div>
)

const SignUpCard = () => {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || status === "loading") return
    setStatus("loading")
    try {
      const res = await fetch(`https://app.loops.so/api/newsletter-form/${LOOPS_FORM_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: [
          `email=${encodeURIComponent(email)}`,
          `userGroup=${encodeURIComponent("Compass Waitlist")}`,
          `mailingLists=${encodeURIComponent(LOOPS_MAILING_LIST_ID)}`,
        ].join("&"),
      })
      if (res.status === 429) {
        setStatus("error")
        setErrorMessage("Too many attempts — please try again in a minute.")
        return
      }
      const data = await res.json()
      if (data.success) {
        setStatus("done")
      } else {
        setStatus("error")
        setErrorMessage(data.message || "Something went wrong — please try again.")
      }
    } catch {
      setStatus("error")
      setErrorMessage("Network error — please try again.")
    }
  }

  if (status === "done") {
    return (
      <CardShell>
        <ScrollMarkSvg className="h-[24px] w-auto" />
        <h1 className="mt-[16px] text-[20px] leading-[26px] text-black">Awesome</h1>
        <p className="mt-[12px] max-w-[240px] text-center text-[13px] leading-[19px] text-[#8C8C8C]">
          We&apos;ll email you a link when we&apos;re done building
        </p>
        <Link
          href="/"
          className="mt-[24px] flex h-[40px] items-center justify-center rounded-[8px] border border-solid border-[#867B71] px-[24px] text-[14px] font-medium text-black transition-colors hover:bg-[#F8F8F8]"
        >
          Go home
        </Link>
      </CardShell>
    )
  }

  return (
    <CardShell>
      <ScrollMarkSvg className="h-[24px] w-auto" />
      <h1 className="mt-[16px] text-[20px] leading-[26px] text-black">Sign up</h1>

      <form onSubmit={handleSubmit} className="mt-[24px] flex w-full flex-col items-center">
        <label htmlFor="signup-email" className="mb-[6px] w-full text-[12px] leading-[16px] text-[#5E5E5E]">
          Email address
        </label>
        <input
          id="signup-email"
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="h-[40px] w-full rounded-[8px] border border-solid border-[#E0DDD9] px-[12px] text-[13px] text-black outline-none transition-colors placeholder:text-[#B0ACA6] focus:border-[#867B71]"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-[24px] flex h-[40px] items-center justify-center rounded-[8px] border border-solid border-[#867B71] px-[28px] text-[14px] font-medium text-black transition-colors hover:bg-[#F8F8F8] disabled:opacity-50"
        >
          {status === "loading" ? "Sending…" : "Confirm"}
        </button>
        {status === "error" && <p className="mt-[12px] text-center text-[12px] text-[#B3261E]">{errorMessage}</p>}
      </form>
    </CardShell>
  )
}

export default SignUpCard
