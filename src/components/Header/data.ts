import { BRIDGE_URL, LEVEL_UP_URL, SCROLL_OPEN_URL, SESSIONS_URL } from "@/constants/link"
import { isSepolia } from "@/utils"

interface MenuItem {
  rootKey: string
  label: string
  key: string
  href: string
  reload?: boolean
  isNew?: boolean
}

interface Navigation {
  label: string
  key: string

  children?: MenuItem[]
  isNew?: boolean

  href?: string
  reload?: boolean
}

const sepoliaNavigations: Navigation[] = [
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
        href: SCROLL_OPEN_URL,
      },
      {
        rootKey: "build",
        label: "Level Up",
        key: "level-up",
        href: LEVEL_UP_URL,
      },
      {
        rootKey: "build",
        label: "Block Explorer",
        key: "block-explorer",
        href: process.env.NEXT_PUBLIC_EXTERNAL_EXPLORER_URI_L2,
      },
      // {
      //   label: "Rollup Explorer",
      //   key: "rollupscan",
      //   href: "/rollupscan",
      //   rootKey: "develop",
      // },
    ],
  },
  {
    label: "Bridge",
    key: "bridge",
    href: BRIDGE_URL,
  },
]

const mainnetNavigations: Navigation[] = [
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
        href: SCROLL_OPEN_URL,
      },
      {
        rootKey: "build",
        label: "Level Up",
        key: "level-up",
        href: LEVEL_UP_URL,
      },
      {
        rootKey: "build",
        label: "Block Explorer",
        key: "block-explorer",
        href: process.env.NEXT_PUBLIC_EXTERNAL_EXPLORER_URI_L2,
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
    label: "Use",
    key: "use",
    children: [
      {
        rootKey: "use",
        label: "User Portal",
        key: "portal",
        href: process.env.NEXT_PUBLIC_USER_PORTAL_BASE_URL,
        isNew: true,
      },
      {
        rootKey: "participate",
        label: "Session 2",
        key: "session-2",
        href: SESSIONS_URL,
      },
      {
        rootKey: "use",
        label: "Projects",
        key: "projects",
        href: "/ecosystem",
      },
      {
        rootKey: "use",
        label: "Bridge",
        key: "bridge",
        href: BRIDGE_URL,
      },
      {
        rootKey: "use",
        label: "SCR & sSCR",
        key: "scr",
        href: "/SCR-sSCR",
      },
      {
        rootKey: "use",
        label: "scrETH",
        key: "scrETH",
        href: "/scrETH",
      },
      {
        rootKey: "use",
        label: "Governance",
        key: "governance",
        href: "https://gov.scroll.io/info",
      },
      // {
      //   rootKey: "use",
      //   label: "Community",
      //   key: "community",
      //   href: "/community",
      // },
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
        rootKey: "resources",
        label: "Whitepaper",
        key: "whitepaper",
        href: "https://scroll.io/files/whitepaper.pdf",
      },
    ],
  },
]

const navigations = isSepolia ? sepoliaNavigations : mainnetNavigations

export { navigations }
