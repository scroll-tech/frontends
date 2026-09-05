// Static line/wave backdrop exported from the DESIGN-CONTENT figma (SCROLL section).
// Glen asked to keep this static for now — the animated version comes later.
//
// Deliberately a plain <img>, not next/image: this project caps `deviceSizes` at 1536px,
// so the optimizer would hand a retina viewport a 1536px file stretched to ~3400 device
// pixels and re-encode it a second time — the thin line work turns to mush. Served
// straight, the 3840px webp (~200KB) stays crisp.
//
// The 1.6x scale reproduces the framing from the figma, where the backdrop is placed at
// roughly 1.7x the frame width rather than fitted to it.
const LandingBackground = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#F8F8F8]">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/imgs/landing/line-bg.webp" alt="" fetchPriority="high" decoding="async" className="size-full scale-[1.6] object-cover" />
  </div>
)

export default LandingBackground
