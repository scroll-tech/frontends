import { COMPASS_API_URL } from "@/constants/link"

import GraphicFrame from "../GraphicFrame"
import { geistMono } from "../fonts"
import { SlideUp, Typed } from "../motion"

const CheckItOut = ({ className = "" }: { className?: string }) => (
  <a
    href={COMPASS_API_URL}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex h-[49px] w-[149px] items-center justify-center rounded-[8px] border border-solid border-[#867B71] text-[16px] font-semibold leading-[20.8px] text-black transition-colors hover:bg-[#F8F8F8] ${className}`}
  >
    Check it out
  </a>
)

/**
 * Desktop: the block sits straight on the page background. The Landing frame draws it in a
 * white 1120 x 763 card, but Glen asked for that box gone (Slack, 2026-09-08: "can we remove
 * the white box from the landing page? just on the background"), so what is left of it is a
 * plain 1120-wide column that still carries the frame's 45/45 padding and 18px gaps — the
 * spacing survives, only the fill, radius and shadow are dropped. The inner wrapper needs
 * md:bg-transparent for the same reason: it has its own white for the phone card, which
 * would otherwise show through as a second box now that the outer one is gone.
 *
 * Mobile: the headline sits on the background and the card takes the same 311 x 516 the
 * "Mobile version" frame gives it — the same shape as the product cards below. That card is
 * still white; Glen was looking at desktop.
 *
 * The graphic below the CTA is Glen's model-routing animation (Slack, 2026-09-08), which
 * replaced the spinning globe here; the globe now only appears in Our Products › Compass.
 * He ships a landscape file and a portrait one rather than one responsive file, so we
 * mount whichever matches and let his own fit() scale the stage inside it.
 */
const LandingHero = () => (
  <section id="home" className="w-full scroll-mt-[96px] px-[16px]">
    <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center md:pt-[45px] md:pb-[45px]">
      <SlideUp>
        <h1 className={`${geistMono.className} px-[16px] text-center text-[32px] font-bold leading-[1.3] text-black sm:text-[42px] md:text-[56px]`}>
          Your Gateway to
          <br />
          <span className="text-[#636363]">Frontier Models</span>
        </h1>
      </SlideUp>

      <div className="relative mt-[24px] flex aspect-[311/516] max-h-[600px] w-full flex-col items-center overflow-hidden rounded-[16px] bg-white pt-[24px] shadow-[0_8px_32px_rgba(17,17,17,0.05)] md:mt-0 md:bg-transparent md:shadow-none md:aspect-auto md:max-h-none md:rounded-none md:pt-0">
        <p className="max-w-[343px] px-[16px] text-center text-[16px] leading-[19px] text-[#636363] md:mt-[18px] md:text-[18px] md:leading-[23.4px]">
          <Typed text="Switch between 30+ providers through a single unified interface" />
        </p>

        <CheckItOut className="mt-[24px] md:mt-[18px]" />

        {/* portrait file, filling what the card has left under the CTA */}
        <GraphicFrame src="landing-hero-mobile.html" title="Model routing" className="mt-[16px] w-full min-h-0 flex-1 md:hidden" />

        {/* Landscape file. The card is centred in the first screen by the wrapper in
            page.tsx, so this only decides how much height the card asks for, and 512 is
            what everything else costs: 78 above (30 page + 48 nav), the card's own
            45/45 padding with the 18px-gapped headline, subtitle and CTA (386 all in),
            and the wrapper's 24/24 minimum breathing room.

            456 is where his stage stops getting bigger — it is 1200 x 460 plus the 48px
            margin his fit() reserves, so at 1120 wide the width caps the scale at
            1120/1248 = 0.897, which needs only 456px of height (456/508). Asking for
            more would grow the card without drawing the graphic any larger.

            So: from a 968px viewport up, the graphic sits at 456 and the centring shares
            out the slack — at the design's own 1024 that lands 52px above the card and
            52px below, which is the frame's gap under the nav. Between 776 and 968 the
            graphic gives height back and the gaps hold at the 24px minimum. Below 776
            the 264 floor takes over and the card runs past the fold rather than
            collapsing the stage further; his fit() only ever scales it down and centres
            it, so the model rail is never sliced either way. */}
        <GraphicFrame
          src="landing-hero-desktop.html"
          title="Model routing"
          className="mt-[18px] hidden h-[clamp(264px,calc(100vh_-_512px),456px)] w-full md:block"
        />
      </div>
    </div>
  </section>
)

export default LandingHero
