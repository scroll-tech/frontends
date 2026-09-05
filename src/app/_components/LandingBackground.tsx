import Image from "next/image"

// Static line/wave backdrop exported from the DESIGN-CONTENT figma (SCROLL section).
// Glen asked to keep this static for now — the animated version comes later.
const LandingBackground = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-[#F8F8F8]">
    <Image src="/imgs/landing/line-bg.webp" alt="" fill priority sizes="100vw" className="object-cover" />
  </div>
)

export default LandingBackground
