import { CpuLargeIcon } from "./LandingIcons"

const SectionDivider = () => (
  <div className="flex w-full items-center justify-center pt-[48px]">
    <div className="h-px w-[560px] max-w-[calc(50%-24px)] bg-[#E3E1D5]" />
    <div className="flex size-[48px] shrink-0 items-center justify-center rounded-[24px] border border-solid border-[#E3E1D5]">
      <CpuLargeIcon className="size-[24px] text-[#C8B195]" />
    </div>
    <div className="h-px w-[560px] max-w-[calc(50%-24px)] bg-[#E3E1D5]" />
  </div>
)

export default SectionDivider
