import ModelGlobe from "../ModelGlobe/lazy"
import SmoothAnchor from "../SmoothAnchor"
import { geistMono } from "../fonts"

const CheckItOut = ({ className = "" }: { className?: string }) => (
  <SmoothAnchor
    href="#products"
    className={`h-[49px] w-[149px] items-center justify-center rounded-[8px] border border-solid border-[#867B71] text-[15px] font-medium leading-[47px] text-black transition-colors hover:bg-[#F8F8F8] ${className}`}
  >
    Check it out
  </SmoothAnchor>
)

/**
 * Desktop: the whole block sits inside one white card (SCROLL › Landing frame).
 * Mobile: the headline sits on the background and the CTA drops below the card,
 * matching the "Mobile version" frame.
 */
const LandingHero = () => (
  <section id="home" className="w-full scroll-mt-[96px] px-[16px]">
    <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center md:overflow-hidden md:rounded-[24px] md:bg-white md:pt-[45px]">
      <h1
        className={`${geistMono.className} px-[16px] text-center text-[32px] font-semibold leading-[1.375] text-black sm:text-[42px] md:text-[56px]`}
      >
        Your Gateway to
        <br />
        <span className="text-[#636363]">Frontier Models</span>
      </h1>

      <div className="mt-[24px] flex w-full flex-col items-center overflow-hidden rounded-[16px] bg-white pt-[24px] md:mt-0 md:rounded-none md:pt-0">
        <p className="max-w-[343px] px-[16px] text-center text-[16px] leading-[25px] text-[#636363] md:mt-[45px]">
          Switch between 30+ providers through a single unified interface
        </p>

        <CheckItOut className="mt-[45px] hidden text-center md:block" />

        {/* Glen: "Crop the 3d asset like this for the landing page" — the globe is rendered
            at full height and the card only reveals its top cap. */}
        <div className="relative mt-[24px] h-[260px] w-full overflow-hidden md:mt-[45px] md:h-[310px]">
          <div className="absolute inset-x-0 top-0 h-[560px] md:h-[720px]">
            <ModelGlobe fit={1.05} offsetY={0} interactive={false} showCore={false} />
          </div>
        </div>
      </div>

      <CheckItOut className="mt-[24px] block text-center md:hidden" />
    </div>
  </section>
)

export default LandingHero
