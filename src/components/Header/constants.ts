import { isSepolia, requireEnv } from "@/utils"

const sepoliaNavigations = [
  {
    label: "Develop",
    key: "develop",
    children: [
      {
        label: "develop1",
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
            label: "Scroll Origins NFT",
            key: "developer-nft",
            href: "/developer-nft",
          },
        ],
      },
      {
        label: "develop2",
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
    label: "Our Story",
    key: "story",
    href: "/story",
  },
  {
    label: "Develop",
    key: "develop",
    children: [
      {
        label: "develop1",
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
            label: "Scroll Origins NFT",
            key: "developer-nft",
            rootKey: "develop",
            href: "/developer-nft",
          },
        ],
      },
      {
        label: "develop2",
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
    label: "Explore",
    key: "explore",
    children: [
      {
        children: [
          {
            label: "Ecosystem",
            key: "ecosystem",
            href: "/ecosystem",
            rootKey: "explore",
          },
          {
            label: "Blog",
            key: "blog",
            href: "/blog",
            rootKey: "explore",
          },
          {
            label: "User Guide",
            key: "userGuide",
            href: "https://docs.scroll.io/en/user-guide/",
            isExternal: true,
          },
          {
            label: "Forum",
            key: "forum",
            href: "https://community.scroll.io",
            isExternal: true,
          },
          {
            label: "Join Us ",
            key: "join our team",
            href: "https://jobs.lever.co/ScrollFoundation",
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
