"use client"

import Image from "next/image"

import { SpeakerIcon } from "../LandingIcons"
import ScaleToFit from "./ScaleToFit"

// authored at the panel's design size (886 × 572) and scaled to the card
const AIHardwarePanel = () => (
  <ScaleToFit width={886} height={572} className="size-full">
    <div className="relative size-full">
      <Image
        src="/imgs/landing/ai-hardware.webp"
        alt="Scroll AI hardware — a local device that stores your agents"
        width={513}
        height={379}
        className="absolute left-[172px] top-[119px] w-[513px]"
      />

      <div className="absolute left-[220px] top-[76px] flex items-center gap-[10px]">
        <span className="size-[12px] rounded-full bg-[#5EFF86]" />
        <span className="whitespace-nowrap text-[15px] leading-[19px] text-black">Store your agents</span>
      </div>
      <span className="absolute left-[286px] top-[104px] h-[115px] w-px bg-[#949494]/60" />

      <div className="absolute left-[548px] top-[120px] flex items-center gap-[10px]">
        <SpeakerIcon className="size-[17px] shrink-0 text-[#7F8FE7]" />
        <span className="whitespace-nowrap text-[15px] leading-[19px] text-black">Speech interface</span>
      </div>
      <span className="absolute left-[641px] top-[146px] h-[84px] w-px bg-[#949494]/60" />

      <p className="absolute inset-x-0 top-[517px] text-center text-[15px] leading-[19px] text-[#636363]">*COMING SOON*</p>
    </div>
  </ScaleToFit>
)

export default AIHardwarePanel
