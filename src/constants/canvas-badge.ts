import EngagementSvg from "@/assets/svgs/canvas-badge/engagement.svg"
import FindSvg from "@/assets/svgs/canvas-badge/find.svg"
import IssueSvg from "@/assets/svgs/canvas-badge/issue.svg"
import RockSvg from "@/assets/svgs/canvas-badge/rock.svg"
import SpecialSvg from "@/assets/svgs/canvas-badge/special.svg"
import StarBlur1Svg from "@/assets/svgs/canvas-badge/star-blur-1.svg"
import StarBlur2Svg from "@/assets/svgs/canvas-badge/star-blur-2.svg"
import StarCircle1Svg from "@/assets/svgs/canvas-badge/star-circle-1.svg"
import StarCircle2Svg from "@/assets/svgs/canvas-badge/star-circle-2.svg"
import StarCircle3Svg from "@/assets/svgs/canvas-badge/star-circle-3.svg"
import StarCircle4Svg from "@/assets/svgs/canvas-badge/star-circle-4.svg"
import StarCircle5Svg from "@/assets/svgs/canvas-badge/star-circle-5.svg"
import StarCircle6Svg from "@/assets/svgs/canvas-badge/star-circle-6.svg"
import StarCircle7Svg from "@/assets/svgs/canvas-badge/star-circle-7.svg"
import StarCircle8Svg from "@/assets/svgs/canvas-badge/star-circle-8.svg"
import StarCircle9Svg from "@/assets/svgs/canvas-badge/star-circle-9.svg"
import StarCircle10Svg from "@/assets/svgs/canvas-badge/star-circle-10.svg"
import StarDiamond1Svg from "@/assets/svgs/canvas-badge/star-diamond-1.svg"
import StarDiamond2Svg from "@/assets/svgs/canvas-badge/star-diamond-2.svg"
import TreasureSvg from "@/assets/svgs/canvas-badge/treasure.svg"

export const CANVAS_AND_BADGES_PAGE_SYMBOL = "canvas-badges"

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

export const SORT_LIST = [
  { key: "minted", label: "Sort by most minted" },
  { key: "added", label: "Sort by latest added" },
]

export const CATEGORY_LIST = [
  { key: "all", label: "All categories" },
  { key: "Achievements", label: "🏆 Achievements" },
  { key: "Identities", label: "👤 Identities" },
  { key: "Others", label: "👽 Others" },
]

export const ISSUE_BADGES_URL = "https://www.notion.so/scrollzkp/Introducing-Scroll-Canvas-Badge-Integration-Guide-8656463ab63b42e8baf924763ed8c9d5"

export const CANVAS_URL = "/canvas"

// wrapper 1328x337
export const HEADER_BADGES = [
  {
    image: "/imgs/canvas-badge/Ambient.webp",
    key: "Ambient",
    width: "13.9rem",
    top: 0,
  },
  {
    image: "/imgs/canvas-badge/Zebra.webp",
    key: "Zebra",
    width: "18.8rem",
    top: "13.5rem",
    left: "9.55rem",
  },
  {
    image: "/imgs/canvas-badge/Panda.png",
    key: "Panda",
    width: "13.5rem",
    top: 0,
    left: "17.4rem",
  },
  {
    image: "/imgs/canvas-badge/Pencils.png",
    key: "Pencils",
    width: "16.9rem",
    top: "8.2rem",
    left: "27rem",
  },
  {
    image: "/imgs/canvas-badge/EAS.png",
    key: "EAS",
    width: "20.3rem",
    top: "13.5rem",
    left: "41.8rem",
  },
  {
    image: "/imgs/canvas-badge/SymTrader.png",
    key: "SymTrader",
    width: "13.5rem",
    top: 0,
    left: "45.9rem",
  },
  {
    image: "/imgs/canvas/Badge_Ethereum_Year.png",
    key: "Ethererum",
    width: "16.9rem",
    top: "6.75rem",
    left: "59.45rem",
  },
  {
    image: "/imgs/canvas-badge/Passport.png",
    key: "Passport",
    width: "20.3rem",
    top: "13.5rem",
    left: "73.1rem",
  },
  {
    image: "/imgs/canvas-badge/Cog.png",
    key: "Cog",
    width: "12.5rem",
    top: 0,
    left: "78.7rem",
  },
  {
    image: "/imgs/canvas-badge/Scrolly.png",
    key: "Scrolly",
    width: "13.5rem",
    top: 0,
    left: "101.9rem",
  },
  {
    image: "/imgs/canvas-badge/Scroller.png",
    key: "Scroller",
    width: "16.8rem",
    top: "8.2rem",
    left: "92.8rem",
  },
  {
    image: "/imgs/canvas-badge/Flock-x.png",
    key: "Flock",
    width: "20.2rem",
    top: "13.5rem",
    left: "106.4rem",
  },
  {
    image: "/imgs/canvas-badge/Symbiosis.png",
    key: "Symbiosis",
    width: "13.8rem",
    top: 0,
    left: "119rem",
  },
]
// wrapper 1512
export const HEADER_STARS = [
  {
    icon: StarBlur1Svg,
    size: 64,
    left: "21.95rem",
    top: "10.8rem",
  },
  {
    icon: StarBlur2Svg,
    size: 64,
    left: "125.4rem",
    top: "36.8rem",
  },
  {
    icon: StarCircle1Svg,
    size: 20,
    left: "4.7rem",
    top: "79.6rem",
  },
  {
    icon: StarCircle2Svg,
    size: 16,
    left: "19.5rem",
    top: "29.2rem",
  },
  {
    icon: StarCircle3Svg,
    size: 12,
    left: "5.2rem",
    top: "32rem",
  },
  {
    icon: StarCircle4Svg,
    size: 16,
    left: "38.8rem",
    top: "13.2rem",
  },
  {
    icon: StarCircle5Svg,
    size: 16,
    left: "65.55rem",
    top: "2.4rem",
  },
  {
    icon: StarCircle6Svg,
    size: 20,
    left: "108.1rem",
    top: "37.7rem",
  },
  {
    icon: StarCircle7Svg,
    size: 20,
    left: "136.8rem",
    top: "12.5rem",
  },
  {
    icon: StarCircle8Svg,
    size: 12,
    left: "146.1rem",
    top: "20.3rem",
  },

  {
    icon: StarCircle9Svg,
    size: 12,
    left: "148.6rem",
    top: "48.3rem",
  },
  {
    icon: StarCircle10Svg,
    size: 8,
    left: "135rem",
    top: "15.1rem",
  },
  {
    icon: StarDiamond1Svg,
    size: 30.5,
    left: "121.5rem",
    top: "27.6rem",
  },
  {
    icon: StarDiamond2Svg,
    size: 30.5,
    left: "142rem",
    top: "70.3rem",
  },
]
