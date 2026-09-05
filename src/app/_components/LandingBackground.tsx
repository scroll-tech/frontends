// Static line/wave backdrop. Glen asked to keep it static for now — the animated version
// comes later.
//
// This is the vector original, pulled from USX - Master 2026 (node 2443:1358, "Layer_1"):
// 118 stroked curves at #AEAEE5, group opacity 0.3. The copy sitting in DESIGN-CONTENT is
// a raster export of the same artwork, and shipping that meant the linework resampled
// itself blurry on any large retina screen. As vector it stays sharp at any size, and it's
// smaller too — 99KB, ~39KB over the wire, against a 297KB webp.
//
// Deliberately a plain <img>, not next/image: this project caps `deviceSizes` at 1536px,
// so the optimizer would rasterize the svg back down to that.
//
// The figma places this backdrop 2447px wide over a 1440px frame; object-cover fits it
// to the viewport, so 1.7x puts it back at the size — and therefore the line weight — the
// design draws. Free to do now that it is vector.
const LandingBackground = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#F8F8F8]">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/imgs/landing/line-bg.svg" alt="" fetchPriority="high" decoding="async" className="size-full scale-[1.7] object-cover" />
  </div>
)

export default LandingBackground
