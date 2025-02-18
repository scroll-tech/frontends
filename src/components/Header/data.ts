import { isSepolia } from "@/utils"

interface MenuItem {
  rootKey: string
  label: string
  key: string
  href: string
  reload?: boolean
}

interface Navigation {
  label: string
  key: string

  children?: MenuItem[]
  new?: boolean

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
        label: "Block Explorer",
        key: "block-explorer",
        href: process.env.NEXT_PUBLIC_EXTERNAL_EXPLORER_URI_L2,
      },
      {
        label: "Rollup Explorer",
        key: "rollupscan",
        href: "/rollupscan",
        rootKey: "develop",
      },
    ],
  },
  {
    label: "Explore",
    key: "explore",
    children: [
      {
        rootKey: "explore",
        label: "Bridge",
        key: "bridge",
        href: "/bridge",
      },
    ],
  },
  {
    label: "Participate",
    key: "participate",
    children: [
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
        label: "Technology",
        key: "technology",
        href: "https://docs.scroll.io/en/technology/",
      },
    ],
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
        href: "https://open.scroll.io",
      },
      {
        rootKey: "build",
        label: "Level Up",
        key: "level-up",
        href: "https://www.levelup.xyz/",
      },
      {
        rootKey: "build",
        label: "Block Explorer",
        key: "block-explorer",
        href: process.env.NEXT_PUBLIC_EXTERNAL_EXPLORER_URI_L2,
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
