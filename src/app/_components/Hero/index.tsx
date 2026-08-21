import { ReactNode } from "react"

import { ArrowCircleIcon, CodeIcon, CpuSmallIcon, SmartphoneIcon } from "../LandingIcons"
import SectionDivider from "../SectionDivider"
import { instrumentSerif } from "../fonts"

interface ModelCard {
  status: string
  dotColor: string
  icon: ReactNode
  title: string
  description: string
  href: string
}

const MODEL_CARDS: ModelCard[] = [
  {
    status: "iOS App",
    dotColor: "#000000",
    icon: <SmartphoneIcon className="size-[16px] text-[#8F8CA0]" />,
    title: "Scroll Compass",
    description: "Every model under one place",
    href: "#compass",
  },
  {
    status: "Enterprise API",
    dotColor: "#C8B195",
    icon: <CodeIcon className="size-[16px] text-[#8F8CA0]" />,
    title: "Compass API",
    description: "Keys to leading models secured with ZK proofs.",
    href: "#compass-api",
  },
  {
    status: "Currently building",
    dotColor: "#5F5C6E",
    icon: <CpuSmallIcon className="size-[16px] text-[#8F8CA0]" />,
    title: "AI Hardware",
    description: "Run local agents. Unlimited prompts by staking SCR.",
    href: "#ai-hardware",
  },
]

const LandingHero = () => (
  <section id="home" className="flex w-full flex-col items-center gap-[56px] pb-[80px]">
    <div className="flex w-full flex-col items-center gap-[20px] pt-[40px] text-center">
      <h1 className={`${instrumentSerif.className} text-[48px] text-black md:text-[60px]`}>Scroll</h1>
      <p className="max-w-[680px] text-[15px] text-[#959595]">
        One Plan, Every Model,
        <br />
        Secured by ZK
      </p>
    </div>
    <div className="flex w-full max-w-[428px] flex-col items-center gap-[24px] px-[24px] lg:w-auto lg:max-w-none lg:flex-row lg:items-stretch lg:gap-[40px] lg:px-0">
      {MODEL_CARDS.map(({ status, dotColor, icon, title, description, href }) => (
        <div
          key={title}
          className="flex min-h-[201px] w-full max-w-[380px] flex-col gap-[16px] rounded-[16px] border border-solid border-[#D9D9D9] bg-white p-[24px] shadow-[0px_8px_12px_rgba(30,26,21,0.07)]"
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-[8px]">
              <span className="size-[8px] rounded-full" style={{ backgroundColor: dotColor }} />
              <span className="text-[11px] font-semibold uppercase text-[#8F8CA0]">{status}</span>
            </div>
            {icon}
          </div>
          <div className="flex flex-col gap-[2px]">
            <h3 className={`${instrumentSerif.className} text-[22px] text-[#111]`}>{title}</h3>
            <p className="text-[14px] leading-[1.4] text-[#8F8CA0]">{description}</p>
          </div>
          <div className="mt-auto h-px w-full bg-[#E5E2DD]" />
          <a href={href} aria-label={`Go to ${title}`} className="block size-[34px] text-[#959595] hover:text-black">
            <ArrowCircleIcon className="size-full" />
          </a>
        </div>
      ))}
    </div>
    <SectionDivider />
  </section>
)

export default LandingHero
