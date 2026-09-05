// Static line/wave backdrop exported from the DESIGN-CONTENT figma (SCROLL section).
// Glen asked to keep this static for now — the animated version comes later.
//
// Deliberately a plain <img>, not next/image: this project caps `deviceSizes` at 1536px,
// so the optimizer would hand a retina viewport a 1536px file stretched to ~3400 device
// pixels and re-encode it a second time — the thin line work turns to mush. Served
// straight, the 4096px webp (the native size of the figma fill, ~300KB) stays crisp.
//
// The scale zooms in towards the framing the figma uses (it places the backdrop at ~1.7x
// the frame width rather than fitting it), but every step of zoom divides the pixels we
// have: at 1.6x a 1724px retina viewport was resampling the 4096px source 1.35x and the
// linework turned to mush. 1.15x keeps some of that crop and still renders ~1:1 on a
// 2x display up to about 1900px wide. Going back to 1.6 needs a larger source from Glen.
const LandingBackground = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#F8F8F8]">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/imgs/landing/line-bg.webp" alt="" fetchPriority="high" decoding="async" className="size-full scale-[1.15] object-cover" />
  </div>
)

export default LandingBackground
