import { COMPASS_API_URL } from "@/constants/link"

import GraphicFrame from "../GraphicFrame"
import { geistMono } from "../fonts"
import { SlideUp, Typed } from "../motion"

/**
 * One button, at monad's size (Glen 2026-09-09: "we'll use their button sizing too (only
 * one button)"). Read off monad.com: 48 tall, 12 / 32 padding, radius 100, 18px, 16 between
 * buttons when there are two; on the phone it runs the full width (358 at 390). The border
 * colour, text colour and case stay ours — that is the sizing, not the style.
 */
const CheckItOut = ({ className = "" }: { className?: string }) => (
  <a
    href={COMPASS_API_URL}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex h-[48px] w-full items-center justify-center rounded-[100px] border border-solid border-[#867B71] text-[18px] font-semibold leading-normal text-black transition-colors hover:bg-[#F8F8F8] md:w-auto md:px-[32px] ${className}`}
  >
    Check it out
  </a>
)

/**
 * Desktop: monad.com's first screen, measured off the live page (Glen 2026-09-09: "Can we
 * clone from the actual website for all of this instead of working off a screenshot? The
 * same layout and text spacing etc as this website. ONLY for the landing page. We'll use
 * our own assets and copy of course. Let's also keep our old nav bar. and our color
 * system. This mostly for placement of elements").
 *
 * Theirs, 1571 x 906 and 1728 x 997, same numbers at both:
 *   container   1432 max with 40 a side → 1352 of content
 *   nav → h1    72 of hero padding + 30 on the wrapper = 102
 *   h1          80 / 96, letter-spacing −1.6, centred, max-w 800
 *   → p         32;  p 20 / 27, centred. Theirs caps at ~560 and wraps to three lines; ours
 *                is one sentence and Tommy wants it on one line (2026-09-09 18:31), so no
 *                cap on desktop — at 20px it is ~640 wide, which fits from md up.
 *   → button    40;  48 tall, see CheckItOut
 *   → graphic   40;  full content width, 432 tall (the height of their SVG)
 *   → logo row  100 (50 of hero bottom + the slider's 50 top), see ModelStrip
 *
 * So the block is a top-padded flow, not centred in the first screen as it used to be —
 * their graphic runs under the fold on a laptop, and now so does ours. Type sizes and
 * gaps are theirs; the faces, the weight and every colour are ours. The graphic is Glen's
 * routing animation; 456 is where his fit() stops growing the stage (1200 x 460 + 48),
 * so that's its height rather than their 432.
 *
 * Phone: monad's phone hero too (Glen 2026-09-09 21:05: "It'll be better if we follow
 * monad mobile too"), measured at 390 x 844 — gutter 16; nav → h1 72; h1 48 / 57.6; → p 32,
 * p 20 / 27; → button 40, full-width pill 48 tall; graphic under it, 40 below (their 40
 * again — the phone gap read 70 but off an image with its own margin). No white card any
 * more; that was the Figma frame this replaces. Headline is 40 / 48 rather than their 48:
 * "Frontier Models" in 40px mono is 360 wide, the most that fits the 358 column without
 * wrapping — 48 would break it onto a third line.
 */
const LandingHero = () => (
  <section id="home" className="w-full scroll-mt-[96px] px-[16px]">
    <div className="mx-auto flex w-full max-w-[1352px] flex-col items-center">
      <SlideUp>
        <h1
          className={`${geistMono.className} max-w-[800px] text-center text-[40px] font-bold leading-[48px] tracking-[-0.8px] text-black md:text-[80px] md:leading-[96px] md:tracking-[-1.6px]`}
        >
          Your Gateway to
          <br />
          <span className="text-[#636363]">Frontier Models</span>
        </h1>
      </SlideUp>

      {/* a bare column at every width — monad's gaps below are the only spacing at work */}
      <div className="relative flex w-full flex-col items-center">
        {/* 0, 250, 500 are monad's three delayVal buckets. Written out rather than imported
            from motion.tsx: that file is "use client" and this one is a server component, so
            a plain array crossing the boundary arrives as a module reference and indexes to
            undefined — silently, straight back to no stagger at all. */}
        <SlideUp delay={250}>
          <p className="mt-[32px] text-center text-[20px] leading-[27px] text-[#636363]">
            {/* Glen: "and this types in" — typed, inside monad's fade-and-rise */}
            <Typed text="Switch between 30+ providers through a single unified interface" />
          </p>
        </SlideUp>

        <div className="mt-[40px] flex w-full flex-col items-center">
          <SlideUp delay={500} className="w-full md:w-auto">
            <CheckItOut />
          </SlideUp>

          {/* portrait file (his stage is 1080 x 1920); full width, capped so the block does
              not run to a second screen — his fit() scales the stage down and centres it */}
          <GraphicFrame
            src="landing-hero-mobile.html"
            title="Model routing"
            className="mt-[40px] aspect-[1080/1920] max-h-[600px] w-full md:hidden"
          />

          {/* landscape file, monad's 40 under the button, full content width */}
          <GraphicFrame src="landing-hero-desktop.html" title="Model routing" className="mt-[40px] hidden h-[456px] w-full md:block" />
        </div>
      </div>
    </div>
  </section>
)

export default LandingHero
