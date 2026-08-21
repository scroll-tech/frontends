import Image from "next/image"

import SectionDivider from "../SectionDivider"
import { instrumentSerif } from "../fonts"

export const COMPASS_APP_STORE_URL = "https://apps.apple.com/us/app/pocketpal-travel-buddy/id6774113297"

const FLOATING_MODELS = [
  { label: "Gemini 3", className: "left-[78px] top-[108px]" },
  { label: "GPT-4o", className: "left-[78px] top-[281px]" },
  { label: "Qwen 3 max", className: "left-[420px] top-[140px]" },
  { label: "Claude Sonnet 3.5", className: "left-[406px] top-[234px]" },
]

const CompassSection = () => (
  <section id="compass" className="flex w-full flex-col items-center gap-[56px] pb-[80px] pt-[32px]">
    <div className="flex w-full flex-col items-center gap-[20px] pt-[40px] text-center">
      <h2 className={`${instrumentSerif.className} text-[48px] text-black md:text-[60px]`}>Scroll Compass</h2>
      <p className="max-w-[680px] text-[15px] text-[#959595]">Every AI model in one iOS app</p>
    </div>
    <a
      href={COMPASS_APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-[8px] border border-solid border-[#867B71] px-[28px] py-[14px] text-[16px] font-semibold text-black hover:bg-[#F4F3ED]"
    >
      Download
    </a>
    <div className="relative h-[436px] w-full max-w-[553px] rounded-[20px] border border-solid border-[#D9D9D9] bg-white shadow-[0px_0px_7.35px_rgba(0,0,0,0.07)]">
      {FLOATING_MODELS.map(({ label, className }) => (
        <div key={label} className={`absolute hidden items-center gap-[9px] sm:flex ${className}`}>
          <span className="size-[5px] rounded-full bg-[#00FF40]" />
          <span className="text-[10px] text-black">{label}</span>
        </div>
      ))}
      <Image
        src="/imgs/homepage/compass-app.png"
        alt="Scroll Compass iOS app"
        width={176}
        height={381}
        className="absolute left-1/2 top-[27px] h-[381px] w-[176px] -translate-x-1/2 rounded-[13px] border border-solid border-[#D9D9D9] object-cover shadow-[0px_0px_4px_rgba(0,0,0,0.07)]"
      />
    </div>
    <SectionDivider />
  </section>
)

export default CompassSection
