import { NETWORKS } from "@/constants"
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
            href: "https://docs.scroll.xyz/en/home/",
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
            href: NETWORKS[0].explorer,
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
            label: "Blog",
            key: "blog",
            href: "/blog",
          },
        ],
      },
      {
        label: "Explore2",
        children: [
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
