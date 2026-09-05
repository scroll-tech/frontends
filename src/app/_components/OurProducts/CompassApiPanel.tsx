"use client"

import ModelLeaderboard from "./ModelLeaderboard"
import ModelLeaderboardCompact from "./ModelLeaderboardCompact"
import ScaleToFit from "./ScaleToFit"

const CompassApiPanel = () => (
  <>
    {/* desktop: the leaderboard is authored at its design size and scaled into the card */}
    <ScaleToFit width={1220} height={706} className="hidden size-full px-[52px] py-[60px] md:flex">
      <ModelLeaderboard />
    </ScaleToFit>

    {/* phone: the 1220px table can't scale down and stay readable — stack the rows instead */}
    <div className="h-full md:hidden">
      <ModelLeaderboardCompact />
    </div>
  </>
)

export default CompassApiPanel
