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
        ],
      },
      {
        label: "Explore2",
        children: [
          {
            label: "Join our Team ",
            key: "join our team",
            href: "/join-us",
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
