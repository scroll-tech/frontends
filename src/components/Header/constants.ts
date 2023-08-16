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
        label: "Explore1",
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
            label: "Join our Team ",
            key: "join our team",
            href: "/join-our-team",
          },
          {
            label: "Events",
            key: "events",
            href: "",
            isExternal: true,
          },
        ],
      },
    ],
  },
  {
    label: "Develop",
    key: "develop",
    href: "",
    children: [
      {
        label: "develop",
        children: [
          {
            label: "Docs",
            key: "docs",
            href: "https://develop.docs.scroll.xyz",
            isExternal: true,
          },
          {
            label: "Status",
            key: "status",
            href: "https://status.scroll.io/",
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
