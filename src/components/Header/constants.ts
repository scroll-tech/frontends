const homeNavigations: any = [
  {
    label: "Home",
    key: "",
    href: "/",
  },
  {
    label: "Blog",
    key: "blog",
    href: "/blog",
  },
  {
    label: "Team",
    key: "team",
    href: "/team",
  },
  {
    label: "Careers",
    key: "careers",
    href: "https://jobs.lever.co/ScrollFoundation",
    isExternal: true,
  },
];

const navigations = [
  {
    label: "Home",
    key: "",
    href: "/",
  },
  {
    label: "Faucet",
    key: "faucet",
    href: "/faucet",
  },
  {
    label: "Bridge",
    key: "bridge",
    href: "/bridge",
  },
  {
    label: "Swap",
    key: "swap",
    href: "/swap",
    isExternal: false,
  },
  {
    label: "Explorers",
    key: "explorers",
    children: [
      {
        label: "Rollup Explorer",
        key: "rollupscan",
        href: "/rollupscan",
      },
      {
        label: "L1 Block Explorer",
        key: "l1BlockExplorer",
        href: process.env.REACT_APP_EXTERNAL_EXPLORER_URI_L1,
        isExternal: true,
      },
      {
        label: "L2 Block Explorer",
        key: "l2BlockExplorer",
        href: process.env.REACT_APP_EXTERNAL_EXPLORER_URI_L2,
        isExternal: true,
      },
    ],
  },
];

export { navigations, homeNavigations };
