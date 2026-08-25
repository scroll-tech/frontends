"use client"

import ReactFullpage from "@fullpage/react-fullpage"
import "fullpage.js/dist/fullpage.css"

import AIHardwareSection from "./AIHardware"
import CompassSection from "./Compass"
import CompassApiSection from "./CompassApi"
import Hero from "./Hero"
import LandingFooter from "./LandingFooter"
import LandingNav from "./LandingNav"

// TODO: purchase a fullPage.js commercial license before shipping this to production;
// "gplv3-license" is only valid while the project usage qualifies as GPLv3 open source
const FULLPAGE_LICENSE_KEY = "gplv3-license"

const FullpageLanding = () => (
  <>
    <div className="fixed inset-x-0 top-[16px] z-50 px-[16px]">
      <LandingNav />
    </div>
    <ReactFullpage
      licenseKey={FULLPAGE_LICENSE_KEY}
      credits={{ enabled: true }}
      anchors={["home", "compass", "compass-api", "ai-hardware"]}
      scrollOverflow
      responsiveWidth={768}
      scrollingSpeed={800}
      easingcss3="cubic-bezier(0.22, 1, 0.36, 1)"
      render={() => (
        <ReactFullpage.Wrapper>
          <div className="section">
            <Hero />
          </div>
          <div className="section">
            <CompassSection />
          </div>
          <div className="section">
            <CompassApiSection />
          </div>
          <div className="section fp-auto-height">
            <AIHardwareSection />
            <LandingFooter />
          </div>
        </ReactFullpage.Wrapper>
      )}
    />
  </>
)

export default FullpageLanding
