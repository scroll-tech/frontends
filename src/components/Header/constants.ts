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
    label: "Our Story",
    key: "story",
    href: "/story",
  },
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
            href: "/portal",
          },
          {
            label: "Sepolia Testnet",
            key: "sepolia-resources",
            rootKey: "develop",
            href: "https://sepolia.scroll.io/portal",
            isExternal: true,
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
            label: "Audits",
            key: "audits",
            href: "https://github.com/scroll-tech/scroll-audits",
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

const navigations = isSepolia ? sepoliaNavigations : mainnetNavigations

export { navigations }
