import { COMPASS_API_URL } from "@/constants/link"

import GraphicFrame from "../GraphicFrame"
import { geistMono } from "../fonts"
import { SlideUp, Typed } from "../motion"

/**
 * One button, at monad's size (Glen 2026-09-09: "we'll use their button sizing too (only
 * one button)"). Read off monad.com: 48 tall, 12 / 32 padding, radius 100, 18px, 16 between
 * buttons when there are two. The border colour, text colour and case stay ours — that is
 * the sizing, not the style. Phone keeps the frame's 49 x 149 button.
 */
const CheckItOut = ({ className = "" }: { className?: string }) => (
  <a
    href={COMPASS_API_URL}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex h-[49px] w-[149px] items-center justify-center rounded-[8px] border border-solid border-[#867B71] text-[16px] font-semibold leading-[20.8px] text-black transition-colors hover:bg-[#F8F8F8] md:h-[48px] md:w-auto md:rounded-[100px] md:px-[32px] md:text-[18px] md:leading-normal ${className}`}
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
 *   → p         32;  p 20 / 27, max-w ~560, centred
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
 * Mobile is untouched: the headline on the background and the frame's white 311 x 516
 * card, the same shape as the product cards below.
 */
const LandingHero = () => (
  <section id="home" className="w-full scroll-mt-[96px] px-[16px]">
    <div className="mx-auto flex w-full max-w-[1352px] flex-col items-center">
      <SlideUp>
        <h1
          className={`${geistMono.className} max-w-[800px] px-[16px] text-center text-[32px] font-bold leading-[1.3] text-black sm:text-[42px] md:px-0 md:text-[80px] md:leading-[96px] md:tracking-[-1.6px]`}
        >
          Your Gateway to
          <br />
          <span className="text-[#636363]">Frontier Models</span>
        </h1>
      </SlideUp>

      {/* On the phone this is still the frame's white 311 x 516 card; on desktop it is
          nothing — a bare column, so monad's gaps below are the only spacing at work. */}
      <div className="relative mt-[24px] flex aspect-[311/516] max-h-[600px] w-full flex-col items-center overflow-hidden rounded-[16px] bg-white pt-[24px] shadow-[0_8px_32px_rgba(17,17,17,0.05)] md:mt-0 md:rounded-none md:bg-transparent md:pt-0 md:shadow-none md:aspect-auto md:max-h-none">
        {/* 0, 250, 500 are monad's three delayVal buckets. Written out rather than imported
            from motion.tsx: that file is "use client" and this one is a server component, so
            a plain array crossing the boundary arrives as a module reference and indexes to
            undefined — silently, straight back to no stagger at all. */}
        <SlideUp delay={250}>
          <p className="max-w-[343px] px-[16px] text-center text-[16px] leading-[19px] text-[#636363] md:mt-[32px] md:max-w-[560px] md:px-0 md:text-[20px] md:leading-[27px]">
            {/* Glen: "and this types in" — typed, inside monad's fade-and-rise */}
            <Typed text="Switch between 30+ providers through a single unified interface" />
          </p>
        </SlideUp>

        <div className="mt-[24px] flex min-h-0 w-full flex-1 flex-col items-center md:mt-[40px] md:flex-none">
          <SlideUp delay={500}>
            <CheckItOut />
          </SlideUp>

          {/* portrait file, filling what the card has left under the CTA */}
          <GraphicFrame src="landing-hero-mobile.html" title="Model routing" className="mt-[16px] w-full min-h-0 flex-1 md:hidden" />

          {/* landscape file, monad's 40 under the button, full content width */}
          <GraphicFrame src="landing-hero-desktop.html" title="Model routing" className="mt-[40px] hidden h-[456px] w-full md:block" />
        </div>
      </div>
    </div>
  </section>
)

export default LandingHero
