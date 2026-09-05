"use client"

import ModelLeaderboard from "./ModelLeaderboard"
import ScaleToFit from "./ScaleToFit"

const CompassApiPanel = () => (
  <>
    {/* desktop: the leaderboard is authored at its design size and scaled into the card */}
    <ScaleToFit width={1220} height={706} className="hidden size-full px-[52px] py-[60px] md:flex">
      <ModelLeaderboard />
    </ScaleToFit>

    {/* mobile: keep it readable and let it scroll sideways, the way Glen asked for the
        earlier table in this file */}
    <div className="size-full overflow-x-auto md:hidden">
      <div className="h-full w-[1220px]">
        <ModelLeaderboard />
      </div>
    </div>
  </>
)

export default CompassApiPanel
