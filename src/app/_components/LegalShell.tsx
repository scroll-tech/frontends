import { ReactNode } from "react"

import LandingFooter from "./LandingFooter"
import LandingNav from "./LandingNav"
import { geist, instrumentSerif } from "./fonts"

const LegalShell = ({ children }: { children: ReactNode }) => (
  <div className={`${geist.className} ${instrumentSerif.variable} flex min-h-screen w-full flex-col items-center gap-[32px] bg-white pt-[32px]`}>
    <div className="sticky top-[16px] z-50 w-full px-[16px]">
      <LandingNav />
    </div>
    <main className="w-full max-w-[840px] flex-1 px-[24px] pb-[80px]">{children}</main>
    <LandingFooter />
  </div>
)

export default LegalShell
