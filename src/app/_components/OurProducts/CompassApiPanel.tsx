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
    <div className="hidden size-full flex-col items-center justify-center gap-[40px] px-[52px] py-[48px] md:flex">
      {/* Sizes come from frame 590:20011, not from the 360px cap in Glen's own stylesheet:
          that cap is for his standalone demo page, while the frame is what he composed
          for this card — hub 430 wide centred, chain 709. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/graphics/compass-api-hub-desktop.svg" alt="" className="w-[430px] max-w-full" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/graphics/compass-api-chain.svg" alt="" className="w-full max-w-[709px]" />
    </div>

    <div className="flex h-full w-full flex-col items-center justify-center px-[24px] py-[24px] md:hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/graphics/compass-api-hub-mobile.svg" alt="" className="w-[85%] max-w-[300px]" />
    </div>
  </>
)

export default CompassApiPanel
