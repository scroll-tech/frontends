import { COMPASS_API_URL } from "@/constants/link"

import SectionDivider from "../SectionDivider"
import { instrumentSerif } from "../fonts"

const BRANDS_ROW_1 = ["Qwen", "Grok", "Kimi", "Black Forest Labs", "NVIDIA", "Claude", "Google", "DeepSeek", "OpenAI", "Mistral"]
const BRANDS_ROW_2 = ["Gemma", "Kling", "Arcee", "PixVerse", "Vidu", "ElevenLabs", "Runway", "Bytedance", "MiniMax"]

const CompassApiSection = () => (
  <section
    id="compass-api"
    className="scroll-mt-[-92px] flex w-full flex-col items-center gap-[40px] pb-[48px] md:gap-[56px] md:pb-[80px] pt-[32px] md:min-h-[900px]"
  >
    <div className="flex w-full flex-col items-center gap-[20px] pt-[8px] text-center md:pt-[40px]">
      <h2 className={`${instrumentSerif.className} max-w-full px-[16px] text-[40px] text-black sm:text-[48px] md:text-[60px]`}>
        Compass <span className="italic text-[#C8B195]">API</span>
      </h2>
      <p className="max-w-[680px] px-[24px] text-[15px] text-[#959595]">Keys to AI models secured natively by Zero Knowledge proofs.</p>
    </div>
    <a
      href={COMPASS_API_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-[8px] border border-solid border-[#867B71] px-[28px] py-[14px] text-[16px] font-semibold text-black hover:bg-[#F4F3ED]"
    >
      View All Models
    </a>
    <div className="flex w-full flex-col items-center gap-[24px] py-[24px]">
      <div className="flex max-w-full flex-wrap items-center justify-center gap-x-[48px] gap-y-[16px] px-[24px]">
        {BRANDS_ROW_1.map(brand => (
          <div key={brand} className="flex items-center gap-[8px]">
            <span className="size-[5px] rounded-full bg-[#00FF40]" />
            <span className="text-[14px] font-medium text-[#60665C]">{brand}</span>
          </div>
        ))}
      </div>
      <div className="flex max-w-full flex-wrap items-center justify-center gap-x-[48px] gap-y-[16px] px-[24px]">
        {BRANDS_ROW_2.map(brand => (
          <div key={brand} className="flex items-center gap-[8px]">
            <span className="size-[5px] rounded-full bg-[#00FF40] opacity-[0.47]" />
            <span className="text-[14px] font-medium text-[rgba(96,102,92,0.52)]">{brand}</span>
          </div>
        ))}
      </div>
    </div>
    <SectionDivider />
  </section>
)

export default CompassApiSection
