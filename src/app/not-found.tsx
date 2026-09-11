import Link from "next/link"

import ScrollMarkSvg from "@/assets/svgs/landingpage/scroll-mark.svg"
import { genMeta } from "@/utils/route"

import Button from "./_components/Button"
import DitherBackground from "./_components/DitherBackground"
import LandingNav from "./_components/LandingNav"
import { CardShell } from "./_components/WaitlistCard"
import { instrumentSerif, inter, jetbrainsMono } from "./_components/fonts"
import styles from "./_components/landing.module.css"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Page not found",
}))

/**
 * The 404, dressed like /sign-up: Glen's tokens, type and dither background (scroll.html,
 * 2026-09-10), the nav as the folded pill, and his login card in the middle carrying the
 * message — the same shell the waitlist card uses, so a dead link lands on something that
 * looks like the rest of the site.
 */
const NotFound = () => (
  <div
    className={`${inter.className} ${instrumentSerif.variable} ${jetbrainsMono.variable} ${styles.theme} relative isolate flex min-h-screen w-full flex-col items-center overflow-x-clip`}
  >
    <DitherBackground />
    <div className="w-full px-[16px] pt-[12px]">
      <LandingNav />
    </div>
    <main className="flex w-full flex-1 items-center justify-center px-[16px] py-[64px]">
      <CardShell
        foot={
          <>
            <p>If a link brought you here, it is out of date.</p>
            <p>
              <Link href="/">Back to Scroll.</Link>
            </p>
          </>
        }
      >
        <div className={styles.cardHead}>
          <ScrollMarkSvg className={styles.cardMark} aria-hidden="true" />
          <span className={styles.panelNum}>ERROR 404</span>
          <h1 className={styles.cardTitle}>Page not found</h1>
        </div>
        <p className={styles.cardText}>That page doesn&apos;t exist, or it has moved.</p>
        <div className="self-center">
          <Button href="/" solid>
            Go home
          </Button>
        </div>
      </CardShell>
    </main>
  </div>
)

export default NotFound
