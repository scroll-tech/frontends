import { ReactComponent as BuildSvg } from "@/assets/svgs/header/Build.svg"
import { ReactComponent as DocsSvg } from "@/assets/svgs/header/Doc.svg"
import { ReactComponent as EthereumSvg } from "@/assets/svgs/header/Eth.svg"
import { ReactComponent as IssuesSvg } from "@/assets/svgs/header/Issues.svg"
import { ReactComponent as LevelUpSvg } from "@/assets/svgs/header/LevelUp.svg"
import { ReactComponent as StatusSvg } from "@/assets/svgs/header/Status.svg"
import { isSepolia, requireEnv } from "@/utils"

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
            href: requireEnv("REACT_APP_EXTERNAL_EXPLORER_URI_L2"),
            isExternal: true,
          },
          {
            label: "L2 Scan",
            key: "l2-scan",
            href: requireEnv("REACT_APP_L2_SCAN_URI"),
            isExternal: true,
          },
          {
            label: "Dora Explorer",
            key: "dora",
            href: requireEnv("REACT_APP_EXTERNAL_EXPLORER_URI_DORA"),
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
        children: [
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
      {
        label: "BLOCK EXPLORERS",
        children: [
          {
            label: "Scrollscan",
            key: "etherscan",
            href: requireEnv("REACT_APP_EXTERNAL_EXPLORER_URI_L2"),
            isExternal: true,
          },
          {
            label: "L2 Scan",
            key: "l2-scan",
            href: requireEnv("REACT_APP_L2_SCAN_URI"),
            isExternal: true,
          },
          {
            label: "Dora Explorer",
            key: "dora",
            href: requireEnv("REACT_APP_EXTERNAL_EXPLORER_URI_DORA"),
            isExternal: true,
          },
          {
            label: "OKX Explorer",
            key: "okx",
            href: requireEnv("REACT_APP_OKX_URI"),
            isExternal: true,
          },
        ],
      },
    ],
  },
  {
    label: "Ecosystem",
    key: "ecosystem",
    href: "/ecosystem",
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
            label: "Forum",
            key: "forum",
            href: "https://community.scroll.io",
            isExternal: true,
          },
          {
            label: "Security",
            key: "security",
            href: "https://docs.scroll.io/en/technology/security/audits-and-bug-bounty/",
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
  {
    label: "Sessions",
    key: "sessions",
    href: "/sessions",
    reload: true,
  },
]

const navigations = isSepolia ? sepoliaNavigations : mainnetNavigations

export { navigations }
