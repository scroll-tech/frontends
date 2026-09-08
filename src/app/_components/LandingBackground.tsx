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
const SRC = "/imgs/landing/line-bg.svg"
const ART = "absolute inset-0 size-full scale-[1.7] object-cover"
// solid over the bottom sixth, then out by 58% — Glen's reference keeps the top half crisp
const FADE = "linear-gradient(to top, #000 0%, #000 18%, rgba(0,0,0,0.5) 38%, transparent 58%)"

interface LandingBackgroundProps {
  /**
   * Glen (Slack, 2026-09-08) asked for the hero's white box to go, then took it back half
   * an hour later: "It only works if it has a blur like this. Like it blur from bottom and
   * becomes weaker at the top. Only for the first page."
   *
   * Then named it and gave a reference (22:30): "This is what I meant by the progressive
   * blur for the first page", attaching a shot whose linework is crisp through the top half
   * and dissolved completely across the bottom third. Hence 14px rather than the 10 this
   * started at, and a mask that holds solid over the bottom sixth before ramping out — the
   * first pass faded from the very bottom pixel and read as barely there.
   *
   * The same message settled the box: "either all elements sit in the white box before the
   * latest deployment, or try this style of progressive blur for the background." Zhengqi
   * chose the blur, so the hero has no surface of its own and this carries the whole look.
   *
   * So not the flat blur his Figma comment implied (591:20252 carries a uniform LAYER_BLUR
   * r=10.6) but a gradient one: the linework stays sharp behind the headline and dissolves
   * towards the bottom, which is what lets the copy sit on it with no card behind it. CSS
   * has no gradient blur, so the artwork is drawn twice — sharp underneath, blurred on top
   * and masked to fade out on the way up.
   *
   * Opt-in because "only for the first page" is the point: sign-up and the 404 mount the
   * same backdrop and keep it sharp throughout. The blur is on the image rather than the
   * wrapper, and the artwork is scaled past the viewport, so no soft edge is ever exposed.
   */
  blur?: boolean
}

const LandingBackground = ({ blur = false }: LandingBackgroundProps) => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#F8F8F8]">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={SRC} alt="" fetchPriority="high" decoding="async" className={ART} />
    {blur && (
      // the same artwork again, blurred and faded upwards. Same URL, so it is already
      // cached — this costs a paint, not a request.
      /* eslint-disable-next-line @next/next/no-img-element */
      <img src={SRC} alt="" decoding="async" className={`${ART} blur-[14px]`} style={{ maskImage: FADE, WebkitMaskImage: FADE }} />
    )}
  </div>
)

export default LandingBackground
