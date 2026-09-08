import { COMPASS_API_URL } from "@/constants/link"

import GraphicFrame from "../GraphicFrame"
import { geistMono } from "../fonts"
import { SlideUp, Typed } from "../motion"

const CheckItOut = ({ className = "" }: { className?: string }) => (
  <a
    href={COMPASS_API_URL}
    target="_blank"
    rel="noopener noreferrer"
    className={`h-[49px] w-[149px] items-center justify-center rounded-[8px] border border-solid border-[#867B71] text-[15px] font-medium leading-[47px] text-black transition-colors hover:bg-[#F8F8F8] ${className}`}
  >
    Check it out
  </a>
)

/**
 * Desktop: the whole block sits inside one white card (SCROLL › Landing frame).
 * Mobile: the headline sits on the background and the card takes the same 311 x 516 the
 * "Mobile version" frame gives it — the same shape as the product cards below.
 *
 * The graphic below the CTA is Glen's model-routing animation (Slack, 2026-09-08), which
 * replaced the spinning globe here; the globe now only appears in Our Products › Compass.
 * He ships a landscape file and a portrait one rather than one responsive file, so we
 * mount whichever matches and let his own fit() scale the stage inside it.
 */
const LandingHero = () => (
  <section id="home" className="w-full scroll-mt-[96px] px-[16px]">
    <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center md:overflow-hidden md:rounded-[24px] md:bg-white md:pt-[45px] md:shadow-[0_8px_32px_rgba(17,17,17,0.05)]">
      <SlideUp>
        <h1
          className={`${geistMono.className} px-[16px] text-center text-[32px] font-semibold leading-[1.375] text-black sm:text-[42px] md:text-[56px]`}
        >
          Your Gateway to
          <br />
          <span className="text-[#636363]">Frontier Models</span>
        </h1>
      </SlideUp>

      <div className="relative mt-[24px] flex aspect-[311/516] max-h-[600px] w-full flex-col items-center overflow-hidden rounded-[16px] bg-white pt-[24px] shadow-[0_8px_32px_rgba(17,17,17,0.05)] md:mt-0 md:shadow-none md:aspect-auto md:max-h-none md:rounded-none md:pt-0">
        <p className="max-w-[343px] px-[16px] text-center text-[16px] leading-[25px] text-[#636363] md:mt-[32px]">
          <Typed text="Switch between 30+ providers through a single unified interface" />
        </p>

        <CheckItOut className="mt-[24px] block text-center md:mt-[32px]" />

        {/* portrait file, filling what the card has left under the CTA */}
        <GraphicFrame src="landing-hero-mobile.html" title="Model routing" className="mt-[16px] w-full min-h-0 flex-1 md:hidden" />

        {/* Landscape file. 1248 x 508 is Glen's 1200 x 460 stage plus the 48px margin his
            fit() reserves, so at that ratio the graphic lands at its intended size. The
            clamp gives the height back on a short window instead of letting the hero run
            past the fold with the model rail sliced in half — his fit() just scales the
            whole stage down and centres it, so nothing is ever cut. */}
        <GraphicFrame
          src="landing-hero-desktop.html"
          title="Model routing"
          className="mt-[24px] hidden h-[clamp(280px,calc(100vh_-_580px),456px)] w-full md:block"
        />
      </div>
    </div>
  </section>
)

export default LandingHero
