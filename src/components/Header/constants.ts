const navigations = [
  {
    label: "Develop",
    key: "develop",
    children: [
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
            label: "User Guide",
            key: "userGuide",
            href: "https://docs.scroll.io/en/user-guide/",
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

export { navigations }
