"use client"

import ModelGlobe from "../ModelGlobe/lazy"
import { instrumentSerif } from "../fonts"

const MODALITIES = [
  { label: "Text", count: 284 },
  { label: "Video", count: 96 },
  { label: "Image", count: 31 },
  { label: "Audio", count: 12 },
]

interface CalloutProps {
  color: string
  name: string
  badge: string
  slug: string
  className: string
}

const Callout = ({ color, name, badge, slug, className }: CalloutProps) => (
  <div className={`absolute hidden items-start gap-[10px] md:flex ${className}`}>
    <span className="mt-[3px] size-[12px] shrink-0 rounded-full" style={{ backgroundColor: color }} />
    <div className="flex flex-col gap-[2px]">
      <div className="flex items-center gap-[8px]">
        <span className={`${instrumentSerif.className} whitespace-nowrap text-[16px] leading-[18px] text-black`}>{name}</span>
        <span className="rounded-[4px] border border-solid border-[#D6D6D6] px-[5px] py-[1px] text-[9px] font-medium uppercase leading-[12px] tracking-[0.4px] text-[#8C8C8C]">
          {badge}
        </span>
      </div>
      <span className="whitespace-nowrap text-[11px] leading-[14px] text-[#959595]">{slug}</span>
    </div>
  </div>
)

const CompassPanel = () => (
  <div className="relative size-full">
    <ModelGlobe className="size-full" fit={0.68} interactive />

    <Callout color="#5B72E4" name="Llama 4 405B Instruct" badge="Open" slug="meta/llama-4-405b-instruct" className="left-[5.5%] top-[13%]" />
    <Callout color="#F2915C" name="Qwen3 Max" badge="1M ctx" slug="alibaba/qwen3-max" className="left-[70%] top-[12%]" />
    <Callout color="#2F6BFF" name="DeepSeek V4 Chat" badge="Open" slug="deepseek/v4-chat" className="left-[70%] top-[66%]" />

    <div className="pointer-events-none absolute bottom-[6%] left-[4%] w-[45%] max-w-[222px] md:w-[25%]">
      <p className="mb-[10px] text-[10px] font-medium uppercase leading-[12px] tracking-[0.6px] text-[#959595]">Modality</p>
      {MODALITIES.map(({ label, count }) => (
        <div key={label} className="flex items-center justify-between py-[4px] text-[13px] leading-[16px]">
          <span className="text-black">{label}</span>
          <span className="tabular-nums text-[#959595]">{count}</span>
        </div>
      ))}
    </div>
  </div>
)

export default CompassPanel
