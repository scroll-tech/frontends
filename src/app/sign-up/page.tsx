import { genMeta } from "@/utils"

import DitherBackground from "../_components/DitherBackground"
import LandingNav from "../_components/LandingNav"
import WaitlistCard from "../_components/WaitlistCard"
import { instrumentSerif, inter, jetbrainsMono } from "../_components/fonts"
import styles from "../_components/landing.module.css"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Join the waitlist",
}))

/**
 * The waitlist as a page of its own, dressed as Glen's scroll.html (2026-09-10): his tokens,
 * type and dither background, the nav as the folded pill, and his login card in the middle
 * with the waitlist form inside. The landing page opens the same card as an overlay (his
 * way, WaitlistOverlay); this route stays for direct links and for the day a real sign-up
 * moves in here (Zhengqi 2026-09-10).
 */
const SignUpPage = () => (
  <div
    className={`${inter.className} ${instrumentSerif.variable} ${jetbrainsMono.variable} ${styles.theme} relative isolate flex min-h-screen w-full flex-col items-center overflow-x-clip`}
  >
    <DitherBackground />
    <div className="w-full px-[16px] pt-[12px]">
      <LandingNav />
    </div>
    <main className="flex w-full flex-1 items-center justify-center px-[16px] py-[64px]">
      <WaitlistCard />
    </main>
  </div>
)

export default SignUpPage
