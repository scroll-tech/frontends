import { requireEnv } from "@/utils"

const navigations = [
  {
    label: "Our Story",
    key: "story",
    href: "/story",
  },
  {
    label: "Develop",
    key: "develop",
    href: "",
    children: [
      {
        label: "develop1",
        children: [
          {
            label: "Docs",
            key: "docs",
            href: "https://docs.scroll.io/en/home/",
            isExternal: true,
          },
          {
            label: "Testnet",
            key: "testnet",
            href: "/portal",
          },
          {
            label: "Status",
            key: "status",
            href: "https://status.scroll.io/",
            isExternal: true,
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
          },
          {
            label: "Etherscan",
            key: "etherscan",
            href: "https://sepolia.scrollscan.dev/",
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
    href: "",
    children: [
      {
        children: [
          {
            label: "Ecosystem",
            key: "ecosystem",
            href: "/ecosystem",
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
            label: "Blog",
            key: "blog",
            href: "/blog",
          },
          {
            label: "Join Us ",
            key: "join our team",
            href: "/join-us",
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

export { navigations }
