import BridgeSvg from "@/assets/svgs/header/Bridge.svg"
import BuildSvg from "@/assets/svgs/header/Build.svg"
import CommunitySvg from "@/assets/svgs/header/Community.svg"
import DocsSvg from "@/assets/svgs/header/Doc.svg"
import EthereumSvg from "@/assets/svgs/header/Eth.svg"
import ForumSvg from "@/assets/svgs/header/Forum.svg"
import HomeSvg from "@/assets/svgs/header/Home.svg"
import IssuesSvg from "@/assets/svgs/header/Issues.svg"
import LevelUpSvg from "@/assets/svgs/header/LevelUp.svg"
import ProjectsSvg from "@/assets/svgs/header/Projects.svg"
import SCRsSCRSvg from "@/assets/svgs/header/SCRsSCR.svg"
import SDKSvg from "@/assets/svgs/header/SDK.svg"
import SessionsSvg from "@/assets/svgs/header/Sessions.svg"
import StatusSvg from "@/assets/svgs/header/Status.svg"
import scrETHSvg from "@/assets/svgs/header/scrETH.svg"
import { isSepolia } from "@/utils"

const sepoliaNavigations = [
  {
    label: "Develop",
    key: "develop",
    children: [
      {
        label: "",
        children: [
          {
            label: "Mainnet",
            key: "mainnet-resources",
            rootKey: "develop",
            href: "https://scroll.io/portal",
            isExternal: true,
          },
          {
            label: "Sepolia Testnet",
            key: "sepolia-resources",
            rootKey: "develop",
            href: "/portal",
          },
          {
            label: "Docs",
            key: "docs",
            href: "https://docs.scroll.io/en/home/",
            isExternal: true,
          },
          {
            label: "Status",
            key: "status",
            href: "https://status.scroll.io/",
            isExternal: true,
          },
          {
            label: "Bug Bounty",
            key: "bug-bounty",
            href: "https://immunefi.com/bounty/scroll/",
            isExternal: true,
          },
        ],
      },
      {
        label: "BLOCK EXPLORERS",
        children: [
          {
            label: "Rollup Explorer",
            key: "rollupscan",
            href: "/rollupscan",
            rootKey: "develop",
          },
          {
            label: "Scrollscan",
            key: "etherscan",
            href: process.env.NEXT_PUBLIC_EXTERNAL_EXPLORER_URI_L2,
            isExternal: true,
          },
          {
            label: "L2 Scan",
            key: "l2-scan",
            href: process.env.NEXT_PUBLIC_L2_SCAN_URI,
            isExternal: true,
          },
          {
            label: "Dora Explorer",
            key: "dora",
            href: process.env.NEXT_PUBLIC_EXTERNAL_EXPLORER_URI_DORA,
            isExternal: true,
          },
        ],
      },
    ],
  },
  {
    label: "Bridge",
    key: "bridge",
    href: "/bridge",
  },
]

const mainnetNavigations = [
  {
    label: "Build",
    key: "build",
    children: [
      {
        rootKey: "build",
        label: "Docs",
        key: "docs",
        href: "https://docs.scroll.io/en/home/",
      },
      {
        rootKey: "build",
        label: "Scroll Open",
        key: "scroll-open",
        href: "https://open.scroll.io",
      },
      {
        rootKey: "build",
        label: "Level Up",
        key: "level-up",
        href: "https://levelupweb3.xyz",
      },
      {
        rootKey: "build",
        label: "Block Explorer",
        key: "block-explorer",
        href: "https://scrollscan.com/",
        isExternal: true,
        icon: StatusSvg,
      },
    ],
  },
  {
    label: "Explore",
    key: "explore",
    children: [
      {
        rootKey: "explore",
        label: "Projects",
        key: "projects",
        href: "/ecosystem",
      },
      {
        rootKey: "explore",
        label: "Bridge",
        key: "bridge",
        href: "/bridge",
        icon: ProjectsSvg,
      },
      {
        rootKey: "explore",
        label: "SCR",
        key: "scr",
        href: "/SCR-sSCR",
      },
    ],
  },
  {
    label: "Participate",
    key: "participate",
    children: [
      {
        rootKey: "participate",
        label: "Session 2",
        key: "session-2",
        href: "/sessions",
        reload: true,
      },
      {
        rootKey: "participate",
        label: "Governance",
        key: "governance",
        href: "https://gov.scroll.io/info",
        isExternal: true,
      },
      {
        rootKey: "participate",
        label: "Community",
        key: "community",
        href: "/community",
      },
      {
        rootKey: "participate",
        label: "Bug Bounty",
        key: "bug-bounty",
        href: "https://immunefi.com/bug-bounty/scroll/information/",
      },
    ],
  },
  {
    label: "Vision",
    key: "vision",
    children: [
      {
        rootKey: "vision",
        label: "Research",
        key: "research",
        href: "https://scroll.io/research",
      },
      {
        rootKey: "vision",
        label: "Technology",
        key: "technology",
        href: "https://docs.scroll.io/en/technology/",
      },
      {
        rootKey: "vision",
        label: "Strategy",
        key: "strategy",
        href: "https://scroll.io/blog/vision-and-values",
      },
    ],
  },
  {
    label: "Resources",
    key: "resources",
    children: [
      {
        rootKey: "resources",
        label: "Blog",
        key: "blog",
        href: "/blog",
      },
      {
        rootKey: "resources",
        label: "Brand Kit",
        key: "brand kit",
        href: "/brand-kit",
      },
      {
        rootKey: "resources",
        label: "Audits",
        key: "audits",
        href: "https://docs.scroll.io/en/technology/security/audits-and-bug-bounty/",
      },
      {
        rootKey: "resources",
        label: "Jobs",
        key: "jobs",
        href: "/join-us",
      },
      {
        label: "Whitepaper",
        key: "whitepaper",
        href: "https://scroll.io/files/whitepaper.pdf",
      },
    ],
  },
]

const navigations = isSepolia ? sepoliaNavigations : mainnetNavigations

export { navigations }
