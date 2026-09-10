"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

import WaitlistCard from "./WaitlistCard"
import styles from "./landing.module.css"

const OPEN_EVENT = "scroll:waitlist:open"

/** opens the overlay from anywhere on the page — the AI Hardware panel's button calls this */
export const openWaitlist = () => window.dispatchEvent(new Event(OPEN_EVENT))

/**
 * Glen's login overlay (scroll.html, 2026-09-10), carrying the waitlist card: a frosted wash
 * over the page that fades in over half a second while the card settles into place. Closes
 * on the corner button, on Escape, on a click on the wash, or from the card's own links; the
 * page stops scrolling underneath while it is open, and focus goes to the email field on the
 * way in and back to the button that opened it on the way out — all as his script does.
 *
 * Portalled to <body> rather than rendered in the page wrapper: the wrapper is an isolated
 * stacking context, and the site's fixed back-to-top button lives outside it, so anything
 * inside would paint under that button. The tokens and fonts the card needs come along on
 * the overlay itself (`fontClass`) since it sits outside the themed wrapper.
 */
const WaitlistOverlay = ({ fontClass = "" }: { fontClass?: string }) => {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const onOpen = () => {
      lastFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
      setOpen(true)
    }
    window.addEventListener(OPEN_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_EVENT, onOpen)
  }, [])

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    // put back whatever was there — other parts of the site set this too
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const focusTimer = setTimeout(() => overlayRef.current?.querySelector<HTMLInputElement>("input")?.focus(), 260)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      clearTimeout(focusTimer)
      window.removeEventListener("keydown", onKey)
      lastFocus.current?.focus()
    }
  }, [open, close])

  if (!mounted) return null

  return createPortal(
    <div
      ref={overlayRef}
      className={`${fontClass} ${styles.overlay} ${open ? styles.overlayOpen : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="waitlist-title"
      aria-hidden={!open}
      onClick={e => {
        if (e.target === e.currentTarget) close()
      }}
    >
      <button type="button" className={styles.overlayClose} onClick={close} aria-label="Close" tabIndex={open ? 0 : -1}>
        <svg width="16" height="16" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M3 3l10 10M13 3L3 13" />
        </svg>
      </button>
      <WaitlistCard shown={open} onClose={close} />
    </div>,
    document.body,
  )
}

export default WaitlistOverlay
