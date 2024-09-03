import { requireEnv } from "@/utils"

const L2_NAME = requireEnv("REACT_APP_ROLLUP") || "ScrollSDK"

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
            label: `${L2_NAME} Explorer`,
            key: "scroll-sdk-explorer",
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
