import { requireEnv } from "@/utils"

const navigations = [
  {
    label: "Develop",
    key: "develop",
    children: [
      {
        children: [
          {
            label: "Docs",
            key: "docs",
            href: "https://docs.scroll.io/en/home/",
            isExternal: true,
            rootKey: "develop",
          },
          {
            label: "Rollup Explorer",
            key: "rollup-explorer",
            href: "/rollupscan",
            rootKey: "develop",
          },
          {
            label: "Scroll Stack Explorer",
            key: "scroll-stack-explorer",
            href: requireEnv("REACT_APP_EXTERNAL_EXPLORER_URI_L2"),
            isExternal: true,
            rootKey: "develop",
          },
          {
            label: "Base Chain Explorer",
            key: "base-chain-explorer",
            href: requireEnv("REACT_APP_EXTERNAL_EXPLORER_URI_L1"),
            isExternal: true,
            rootKey: "develop",
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
