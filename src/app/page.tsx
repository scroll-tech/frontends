import { genMeta } from "@/utils"

import DitherBackground from "./_components/DitherBackground"
import Hero from "./_components/Hero"
import LandingFooter from "./_components/LandingFooter"
import LandingNav from "./_components/LandingNav"
import OurProducts from "./_components/OurProducts"
import WaitlistOverlay from "./_components/WaitlistOverlay"
import { instrumentSerif, inter, jetbrainsMono } from "./_components/fonts"
import styles from "./_components/landing.module.css"
import { DropIn } from "./_components/motion"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Your Gateway to Frontier Models",
}))

/**
 * The landing page is Glen's scroll.html (2026-09-10), section for section: his tokens,
 * type, copy, spacing and motion, with our real links and our own graphic files where his
 * were placeholders. landing.module.css is his stylesheet; the components hand out its
 * classes.
 *
 * overflow-x is clipped (not hidden, which would un-stick the nav) because a panel waiting
 * to reveal sits 34px to the right of its column and would otherwise give the page a
 * sideways scroll on some widths — his body has overflow-x: hidden for the same reason.
 */
const LandingPage = () => {
  return (
    <div
      className={`${inter.className} ${instrumentSerif.variable} ${jetbrainsMono.variable} ${styles.theme} relative isolate flex w-full flex-col items-center overflow-x-clip`}
    >
      <DitherBackground />
      {/* The bar is open at the top of the page and folds into a pill once you scroll — see
          LandingNav. Its wrapper keeps a constant height whichever state the bar is in, so
          the hero under it never moves. Pointer events are off on the wrapper and back on
          for the bar, so the empty strip beside a folded pill does not block whatever has
          scrolled under it. */}
      <div className="pointer-events-none sticky top-0 z-[60] w-full">
        <DropIn className="pointer-events-none">
          <LandingNav collapsible />
        </DropIn>
      </div>
      <main id="top" className="w-full">
        <Hero />
        <OurProducts />
      </main>
      <LandingFooter ridge />
      <WaitlistOverlay fontClass={`${inter.className} ${instrumentSerif.variable}`} />
    </div>
  )
}

export default LandingPage
