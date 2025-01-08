import FirstSvg from "@/assets/svgs/builder-portal/1.svg"
import SecondSvg from "@/assets/svgs/builder-portal/2.svg"
import ThirdSvg from "@/assets/svgs/builder-portal/3.svg"
import ForthSvg from "@/assets/svgs/builder-portal/4.svg"
import FifthSvg from "@/assets/svgs/builder-portal/5.svg"
import SDKSvg from "@/assets/svgs/builder-portal/SDK.svg"
import AppsSvg from "@/assets/svgs/builder-portal/apps.svg"
import BeakerSvg from "@/assets/svgs/builder-portal/beaker.svg"
import BugBountySvg from "@/assets/svgs/builder-portal/bug-bounty.svg"
import CalenderSvg from "@/assets/svgs/builder-portal/calender.svg"
import ChatSvg from "@/assets/svgs/builder-portal/chat.svg"
import DiscordSvg from "@/assets/svgs/builder-portal/discord.svg"
import DocSvg from "@/assets/svgs/builder-portal/doc.svg"
import FellowshipSvg from "@/assets/svgs/builder-portal/fellowship.svg"
import GlobalSvg from "@/assets/svgs/builder-portal/global.svg"
import GrantsSvg from "@/assets/svgs/builder-portal/grants.svg"
import LevelupSvg from "@/assets/svgs/builder-portal/levelup.svg"
import OpenSvg from "@/assets/svgs/builder-portal/open.svg"
import PencilSvg from "@/assets/svgs/builder-portal/pencil.svg"
import RocketSvg from "@/assets/svgs/builder-portal/rocket.svg"
import SepoliaSvg from "@/assets/svgs/builder-portal/sepolia.svg"
import StatusSvg from "@/assets/svgs/builder-portal/status.svg"
import TwitterSvg from "@/assets/svgs/builder-portal/x.svg"

const data = [
  {
    icon: FirstSvg,
    title: "Get Funded",
    children: [
      {
        icon: ChatSvg,
        title: "Chat with our partnership team",
        description: "Connect with experts for quick support.",
        href: "https://tally.so/r/waxLBW",
      },
      // TODO: scroll open url
      {
        icon: OpenSvg,
        title: "Involve in Scroll Open programme",
        description: "Description of Scroll Open here.",
        upcoming: true,
        href: "https://open.scroll.io",
      },
      {
        icon: FellowshipSvg,
        title: "Scroll Fellowship",
        description: "Empowering builders with mentorship, resources, and opportunities.",
        upcoming: true,
      },
      { icon: GrantsSvg, title: "Scroll Grants", description: "Fueling innovation with funding and support for impactful projects.", upcoming: true },
    ],
  },
  {
    icon: SecondSvg,
    title: "Develop",
    children: [
      {
        icon: DocSvg,
        title: "Scroll Docs",
        description: "Start developing on Scroll with all of your favourite tools for building and testing smart contracts.",
        href: "https://docs.scroll.io/en/home/",
      },
    ],
    items: [
      {
        title: "Deploy on Scroll",
        children: [
          { icon: RocketSvg, title: "Mainnet Deployment", description: "Launch your projects seamlessly on the Scroll mainnet.", href: "/portal" },
          {
            icon: SepoliaSvg,
            title: "Sepolia Testnet",
            description: "Test your projects in a secure and scalable environment.",
            href: "https://sepolia.scroll.io/",
          },
          {
            icon: StatusSvg,
            title: "Network Status",
            description: "Stay updated on real-time network performance and activity.",
            href: "https://status.scroll.io/",
          },
        ],
      },
      {
        title: "Deploy Your Own Chain",
        children: [
          {
            icon: SDKSvg,
            title: "Scroll SDK",
            description: "Simplify development with tools for seamless blockchain integration.",
            href: "https://docs.scroll.io/en/sdk/",
          },
        ],
      },
    ],
  },
  {
    icon: ThirdSvg,
    title: "Get Amplified",
    children: [
      {
        icon: TwitterSvg,
        title: "Submit projects to Build with Scroll",
        description: "Amplified your projects and grow with our ecosystem.",
        href: "https://x.com/BuildWithScroll",
      },
      {
        icon: ChatSvg,
        title: "Chat with our ecosystem team",
        description: "Reach out for insights, support, and collaboration opportunities.",
        href: "https://tally.so/r/waxLBW",
      },
    ],
  },
  {
    icon: ForthSvg,
    title: "Get Involved",
    children: [
      {
        icon: DiscordSvg,
        title: "Submit projects to Build with Scroll",
        description: "Amplified your projects and grow with our ecosystem.",
        href: "https://discord.com/invite/scroll",
      },
      {
        icon: LevelupSvg,
        title: "Join Level Up Telegram Group",
        description: "Reach out for support and collaboration.",
        href: "https://t.me/+jbhmyDZ63Vw0ZGYy",
      },
      {
        icon: CalenderSvg,
        title: "Join Scroll’s events",
        description: "Reach out for insights, support, and collaboration opportunities.",
        href: "https://www.levelup.xyz/events",
      },
      {
        icon: GlobalSvg,
        title: "Be part of Scroll’s global community",
        description: "Connect, learn, and grow with us.",
        href: "/community",
      },
      { icon: AppsSvg, title: "Explore our ecosystem", description: "Discover and test innovative dApps.", href: "/ecosystem" },
    ],
  },
  {
    icon: FifthSvg,
    title: "Learn & Contribute",
    children: [
      {
        icon: DocSvg,
        title: "Learn Solidity",
        description: "Master the language of smart contracts with ease.",
        href: "https://www.levelup.xyz/solidity",
      },
      {
        icon: PencilSvg,
        title: "Test your skills",
        description: "Challenge yourself and level up your expertise.",
        href: "https://www.levelup.xyz/content",
      },
      {
        icon: BeakerSvg,
        title: "Read about the latest R&D in ZK and Scroll",
        description: "Stay updated on latest research and innovations.",
        href: "https://www.levelup.xyz/content",
      },
      {
        icon: BugBountySvg,
        title: "Submit bug bounty",
        description: "Spot issues, share insights, and earn rewards.",
        href: "https://immunefi.com/bug-bounty/scroll/information/",
      },
    ],
  },
]

export default data
