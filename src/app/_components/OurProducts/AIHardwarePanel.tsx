"use client"

import Image from "next/image"

import { SpeakerIcon } from "../LandingIcons"
import ScaleToFit from "./ScaleToFit"

const DEVICE_SRC = "/imgs/landing/ai-hardware.webp"
const DEVICE_ALT = "Scroll AI hardware — a local device that stores your agents"

// desktop: authored at the panel's design size (886 × 572) and scaled into the card
const Desktop = () => (
  <ScaleToFit width={886} height={572} className="hidden size-full md:flex">
    <div className="relative size-full">
      <Image src={DEVICE_SRC} alt={DEVICE_ALT} width={513} height={379} className="absolute left-[172px] top-[119px] w-[513px]" />

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

// phone: scaling the desktop composition would render the callouts at ~6px, so the
// labels come out of the artwork and sit above it at a readable size
const Mobile = () => (
  <div className="mx-auto flex h-full w-full max-w-[440px] flex-col items-center justify-center gap-[16px] px-[20px] pb-[48px] pt-[24px] md:hidden">
    <div className="flex w-full items-center justify-between gap-[12px]">
      <div className="flex items-center gap-[8px]">
        <span className="size-[10px] shrink-0 rounded-full bg-[#5EFF86]" />
        <span className="text-[13px] leading-[17px] text-black">Store your agents</span>
      </div>
      <div className="flex items-center gap-[8px]">
        <SpeakerIcon className="size-[15px] shrink-0 text-[#7F8FE7]" />
        <span className="text-[13px] leading-[17px] text-black">Speech interface</span>
      </div>
    </div>

    <Image src={DEVICE_SRC} alt={DEVICE_ALT} width={956} height={706} className="w-full" />

    <p className="text-[13px] leading-[17px] text-[#636363]">*COMING SOON*</p>
  </div>
)

const AIHardwarePanel = () => (
  <>
    <Desktop />
    <Mobile />
  </>
)

export default AIHardwarePanel
