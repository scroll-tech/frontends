import { EXPLORER_URL } from "../../constants/common"

const navigations = [
  {
    label: "Our Story",
    key: "story",
    href: "/story",
  },
  {
    label: "Explore",
    key: "explore",
    href: "",
    children: [
      {
        label: "Quickstart",
        children: [
          {
            label: "Testnet",
            key: "portal",
            href: "/portal",
          },
          {
            label: "Bridge",
            key: "bridge",
            href: "/bridge",
          },
          {
            label: "Ecosystem",
            key: "ecosystem",
            href: "/ecosystem",
          },
          {
            label: "User Guide",
            key: "user guide",
            href: "https://docs.scroll.io/en/user-guide/",
            isExternal: true,
          },
        ],
      },
      {
        label: "Block Explorers",
        children: [
          {
            label: "Rollup Explorer",
            key: "rollupExplorer",
            href: "/rollupscan?page=1&per_page=10",
          },
          {
            label: "Scroll Blockscout",
            key: "l2BlockExplorer",
            href: EXPLORER_URL.L2,
            isExternal: true,
          },
          {
            label: "Dora Explorer",
            key: "doraBlockExplorer",
            href: EXPLORER_URL.Dora,
            isExternal: true,
          },
        ],
      },
    ],
  },
  {
    label: "Build",
    key: "build",
    href: "",
    children: [
      {
        label: "Build",
        children: [
          {
            label: "Documentation",
            key: "documentation",
            href: "https://docs.scroll.io/en/home/",
            isExternal: true,
          },
          {
            label: "Developer Guide",
            key: "developer guide",
            href: "https://docs.scroll.io/en/developers/",
            isExternal: true,
          },
          {
            label: "Technology",
            key: "technology",
            href: "https://docs.scroll.io/en/technology/",
            isExternal: true,
          },
        ],
      },
    ],
  },

  {
    label: "About",
    key: "about",
    href: "",
    children: [
      {
        label: "About",
        children: [
          {
            label: "Blog",
            key: "blog",
            href: "/blog",
          },
          {
            label: "Join Us",
            key: "join us",
            href: "/join-us",
          },
          {
            label: "Team",
            key: "team",
            href: "/team",
          },
          {
            label: "Community",
            key: "community",
            href: "https://community.scroll.io/",
            isExternal: true,
          },
        ],
      },
    ],
  },
]

export { navigations }
