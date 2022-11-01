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
    href: "https://prealpha.scroll.io/swap",
    isExternal: true,
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
        href: "https://l1scan.scroll.io/",
        isExternal: true,
      },
      {
        label: "L2 Block Explorer",
        key: "l2BlockExplorer",
        href: "https://l2scan.scroll.io/",
        isExternal: true,
      },
    ],
  },
];

export default navigations;
