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
    label: "Develop",
    key: "develop",
    children: [
      {
        label: "",
        type: "grid",
        children: [
          {
            label: "DEPLOY AN APP",
            items: [
              {
                text: "Mainnet Deployment",
                label: "Let’s go live now!",
                key: "mainnet-resources",
                rootKey: "develop",
                href: "/portal",
                icon: EthereumSvg,
              },
              {
                label: "Try and test it out",
                text: "Sepolia Testnet",
                key: "sepolia-resources",
                rootKey: "develop",
                href: "https://sepolia.scroll.io/portal",
                isExternal: true,
                icon: BuildSvg,
              },
              {
                label: "Understand all the details to build",
                text: "Docs",
                key: "docs",
                href: "https://docs.scroll.io/en/home/",
                isExternal: true,
                icon: DocsSvg,
              },
              {
                label: "Scroll network health indicator",
                text: "Status",
                key: "status",
                href: "https://status.scroll.io/",
                isExternal: true,
                icon: StatusSvg,
              },
            ],
          },
          {
            label: "DEPLOY A CHAIN",
            items: [
              {
                label: "Own your blockspace",
                text: "Scroll SDK",
                key: "sdk",
                href: "https://docs.scroll.io/en/sdk",
                isExternal: true,
                icon: SDKSvg,
              },
            ],
          },
          {
            label: "MORE",
            items: [
              {
                label: "Learn, build and innovate",
                text: "Level Up",
                key: "lelvel-up",
                href: "https://levelupweb3.xyz",
                isExternal: true,
                icon: LevelUpSvg,
              },
              {
                label: "Help Scroll get better",
                text: "Bug Bounty",
                key: "bug-bounty",
                href: "https://immunefi.com/bounty/scroll/",
                isExternal: true,
                icon: IssuesSvg,
              },
            ],
          },
        ],
      },
      {
        label: "BLOCK EXPLORERS",
        children: [
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
          {
            label: "OKX Explorer",
            key: "okx",
            href: process.env.NEXT_PUBLIC_OKX_URI,
            isExternal: true,
          },
          {
            label: "Blockscout Explorer",
            key: "blockscout",
            href: process.env.NEXT_PUBLIC_BLOCKSCOUT_URI,
            isExternal: true,
          },
        ],
      },
    ],
  },
  {
    label: "Use",
    key: "use",
    children: [
      {
        children: [
          {
            text: "Bridge",
            label: "Deposit your assets to Scroll",
            key: "bridge",
            rootKey: "use",
            href: "/bridge",
            icon: BridgeSvg,
          },
          {
            text: "Projects",
            label: "Find interesting dApps on Scroll",
            key: "projects",
            rootKey: "use",
            href: "/ecosystem",
            icon: ProjectsSvg,
          },
          {
            text: "Community",
            label: "Explore events and global communities",
            key: "community",
            rootKey: "use",
            href: "/community",
            icon: CommunitySvg,
          },
        ],
      },
    ],
  },

  {
    label: "Defi",
    key: "defi",
    new: true,
    children: [
      {
        children: [
          {
            text: "Sessions",
            label: "Receive Marks for your contributions",
            key: "sessions",
            rootKey: "defi",
            href: "/sessions",
            icon: SessionsSvg,
            reload: true,
          },
          {
            text: "SCR & sSCR",
            label: "Governance token and its LRT",
            key: "SCR-sSCR",
            rootKey: "defi",
            href: "/SCR-sSCR",
            icon: SCRsSCRSvg,
          },
          {
            text: "scrETH",
            label: "Scroll's ecosystem native ETH LRT",
            key: "scrETH",
            rootKey: "defi",
            href: "/scrETH",
            icon: scrETHSvg,
          },
        ],
      },
    ],
  },
  {
    label: "Governance",
    key: "governance",
    children: [
      {
        children: [
          {
            text: "Home",
            label: "Get to know Scroll governance",
            key: "governance-home",
            rootKey: "governance",
            href: "https://gov.scroll.io",
            icon: HomeSvg,
            isExternal: true,
          },
          {
            text: "Documentations",
            label: "Browse all the details about Scroll governance",
            key: "governance-doc",
            rootKey: "governance",
            href: "https://gov.scroll.io/docs",
            icon: DocsSvg,
            isExternal: true,
          },
          {
            text: "Forum",
            label: "Participate in all the governance discussions",
            key: "governance-forum",
            rootKey: "governance",
            href: "https://gov.scroll.io/forum",
            icon: ForumSvg,
            isExternal: true,
          },
        ],
      },
    ],
  },
  {
    label: "Resources",
    key: "resources",
    children: [
      {
        children: [
          {
            label: "Blog",
            key: "blog",
            href: "/blog",
            rootKey: "resources",
          },
          {
            label: "Join Us ",
            key: "join our team",
            href: "/join-us",
            rootKey: "resources",
          },
          {
            label: "Brand Kit",
            key: "brand kit",
            href: "/brand-kit",
            rootKey: "resources",
          },
          {
            label: "Security",
            key: "security",
            href: "https://docs.scroll.io/en/technology/security/audits-and-bug-bounty/",
            isExternal: true,
          },
          {
            label: "Whitepaper",
            key: "whitepaper.pdf",
            href: "/files/whitepaper.pdf",
            isExternal: true,
          },
        ],
      },
    ],
  },
]

const navigations = isSepolia ? sepoliaNavigations : mainnetNavigations

export { navigations }
