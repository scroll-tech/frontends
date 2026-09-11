"use client"

import Link from "next/link"
import { FormEvent, ReactNode, useEffect, useState } from "react"

import ScrollMarkSvg from "@/assets/svgs/landingpage/scroll-mark.svg"
import { LOOPS_FORM_ID, LOOPS_MAILING_LIST_ID } from "@/constants/link"

import Button from "./Button"
import styles from "./landing.module.css"
import { Lift } from "./motion"

type Status = "idle" | "loading" | "done" | "error"

interface WaitlistCardProps {
  /** drives the shell's blur-and-settle entrance; leave unset to play it on mount */
  shown?: boolean
  /** set when the card sits in the overlay: the foot link and the success button close it
   *  instead of navigating home */
  onClose?: () => void
  /** id for the title, so a dialog can point aria-labelledby at it */
  titleId?: string
}

export const CardShell = ({ children, foot, shown }: { children: ReactNode; foot: ReactNode; shown?: boolean }) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])
  const on = shown ?? mounted
  return (
    <div className={`${styles.cardShell} ${on ? styles.cardShellIn : ""}`}>
      <Lift className={styles.card}>
        <div className={styles.cardBody}>{children}</div>
        <div className={styles.cardFoot}>{foot}</div>
      </Lift>
    </div>
  )
}

/**
 * Glen's login card (scroll.html, 2026-09-10) — the sheet his "Join the waitlist" button
 * opens — with the waitlist's own content in it: one email field, Confirm, and the note that
 * we will write when it is ready. It lives in two places: the overlay on the landing page,
 * as in his file, and the /sign-up page, kept for when a real sign-up exists.
 */
const WaitlistCard = ({ shown, onClose, titleId = "waitlist-title" }: WaitlistCardProps) => {
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

  const foot = (
    <>
      <p>We&apos;ll only email you about this.</p>
      <p>
        {onClose ? (
          <button type="button" onClick={onClose}>
            Back to Scroll.
          </button>
        ) : (
          <Link href="/">Back to Scroll.</Link>
        )}
      </p>
    </>
  )

  if (status === "done") {
    return (
      <CardShell foot={foot} shown={shown}>
        <div className={styles.cardHead}>
          <ScrollMarkSvg className={styles.cardMark} aria-hidden="true" />
          <h1 className={styles.cardTitle} id={titleId}>
            Awesome
          </h1>
        </div>
        <p className={styles.cardText}>We&apos;ll email you a link when we&apos;re done building.</p>
        <div className="self-center">{onClose ? <Button onClick={onClose}>Close</Button> : <Button href="/">Go home</Button>}</div>
      </CardShell>
    )
  }

  return (
    <CardShell foot={foot} shown={shown}>
      <div className={styles.cardHead}>
        <ScrollMarkSvg className={styles.cardMark} aria-hidden="true" />
        <h1 className={styles.cardTitle} id={titleId}>
          Join the waitlist
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[24px]">
        <div className={styles.field}>
          <label htmlFor="waitlist-email">Email address</label>
          <input
            id="waitlist-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email address"
          />
        </div>
        <div className="self-center">
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Sending…" : "Confirm"}
          </Button>
        </div>
        {status === "error" && (
          <p className={styles.cardError} role="alert">
            {errorMessage}
          </p>
        )}
      </form>
    </CardShell>
  )
}

export default WaitlistCard
