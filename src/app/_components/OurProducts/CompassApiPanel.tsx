/**
 * Glen 2026-09-08 replaced the leaderboard mock-up here with two animations: the routing
 * hub up top and the AI MODEL → ZK API KEY → COMPASS chain under it.
 *
 * Both are pure SVG + CSS, so unlike the hero they need no iframe — a plain <img> renders
 * them and still runs their animations. He authors the hub twice, landscape (346 x 290)
 * and portrait (290 x 346), and the phone frame drops the chain, so each breakpoint gets
 * the file the design actually draws.
 */
const CompassApiPanel = () => (
  <>
    <div className="hidden size-full flex-col items-center justify-center gap-[44px] px-[52px] py-[48px] md:flex">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {/* 360px is the max-width Glen caps the hub at in his own stylesheet */}
      <img src="/graphics/compass-api-hub-desktop.svg" alt="" className="w-[360px] max-w-full" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/graphics/compass-api-chain.svg" alt="" className="w-full max-w-[760px]" />
    </div>

    <div className="flex h-full w-full flex-col items-center justify-center px-[24px] py-[24px] md:hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/graphics/compass-api-hub-mobile.svg" alt="" className="w-full max-w-[320px]" />
    </div>
  </>
)

export default CompassApiPanel
