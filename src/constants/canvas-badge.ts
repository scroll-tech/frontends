import { ReactComponent as EngagementSvg } from "@/assets/svgs/canvas-badge/engagement.svg"
import { ReactComponent as FindSvg } from "@/assets/svgs/canvas-badge/find.svg"
import { ReactComponent as IssueSvg } from "@/assets/svgs/canvas-badge/issue.svg"
import { ReactComponent as RockSvg } from "@/assets/svgs/canvas-badge/rock.svg"
import { ReactComponent as SpecialSvg } from "@/assets/svgs/canvas-badge/special.svg"
import { ReactComponent as TreasureSvg } from "@/assets/svgs/canvas-badge/treasure.svg"

export const CANVAS_BADGE_INTRODUCTIONS = [
  {
    label: "For Users",
    key: "user",
    icon: "👥",
    items: [
      {
        icon: RockSvg,
        title: "Rock and Scroll",
        content: "Make your Scroll Canvas a showcase for your achievements. Share badges, stories, and milestones with the Scroll community.",
      },
      {
        icon: SpecialSvg,
        title: "Unlock Special Perks",
        content: "Earn special privileges and access through your badges, turning your achievements into new opportunities.",
      },
      {
        icon: TreasureSvg,
        title: "Collect Hidden Treasures",
        content: "Gather badges from various platforms and display them on Canvas.",
      },
    ],
  },
  {
    label: "For Developers",
    key: "developer",
    icon: "🛠️",
    items: [
      {
        icon: IssueSvg,
        title: "Permissionless, issue badges right away!",
        content: "Projects on Scroll can issue versatile, permissionless Badges to recognize contributions and boost engagement.",
      },
      {
        icon: FindSvg,
        title: "Find the right crowd",
        content: "Badges represents user traits. Leverage Badge traits to find your ideal users to drive growth.",
      },
      {
        icon: EngagementSvg,
        title: "Activate User Engagement",
        content: "Guide, recognize and reward users with badges. Gamify DApp experience.",
      },
    ],
  },
]
