import dayjs from "dayjs"
import utc from "dayjs/plugin/utc.js"

export const SCROLL_ORIGINS_NFT = "Scroll Origins NFT"

dayjs.extend(utc)
// UTC
// const StartDate = new Date("2023-10-10T06:00:00Z") // mainnet
// export const StartDate = dayjs("2023-10-10T06:00:00Z") // mainnet

// export const Stage2StartDate = dayjs("2023-11-09T23:00:00Z")

// export const Stage3StartDate = dayjs("2023-11-24T23:00:00Z")

// export const EndDate = dayjs("2023-12-09T23:00:00Z").subtract(1, "ms")

// export const MintableDate = dayjs("2023-12-14T23:00:00Z")

export const StartDate = dayjs("2023-09-02T06:00:00Z") // mainnet

export const Stage2StartDate = dayjs("2023-10-09T23:00:00Z")

export const Stage3StartDate = dayjs("2023-10-24T23:00:00Z")

export const EndDate = dayjs("2023-11-01T23:00:00Z").subtract(1, "ms")

export const MintableDate = dayjs().add(1, "m")

export const ContractReleaseDate = dayjs("2023-11-10T08:58:37Z")

export const DEVELOPER_NFT_STEPS = [
  { label: "Starts", date: StartDate, title: "Genesis Block" },
  { label: "Ends", date: EndDate, title: "Program Ends" },
]

export const DEVELOPER_NFT_PHRASES = Object.fromEntries(DEVELOPER_NFT_STEPS.map(item => [item.label, item.date.valueOf()]))

export const FLOW_QUESTIONS = [
  {
    order: 1,
    subject: "What are the values most important to Scroll?",
    options: [
      {
        key: "A",
        title: "Openness",
        explaination:
          "Yes! Scroll openly shares work and research with the public, engaging regularly with the community to foster an open Ethereum ecosystem.",
      },
      {
        key: "B",
        title: "Community-Drive",
        explaination:
          "Yes! Scroll values shared ownership, so no single entity holds disproportionate power or influence. Scroll is committed to organically scaling an inclusive and fair ecosystem.",
      },
      {
        key: "C",
        title: "Credible Neutrality",
        explaination:
          "Yes! Scroll strives to be fair and unbiased, without favoring any specific applications. Scroll’s relationships with partners are policy-based, not relationship-based.",
      },
    ],
    answer: ["A", "B", "C"],
    image: "/imgs/nft/flow-question-1.svg",
  },
  {
    order: 2,
    subject: "What are the differences between a bytecode-compatible vs language-compatible ZK Rollup?",
    options: [
      {
        key: "A",
        title:
          "With bytecode-compatible zkEVMs, code works exactly the same as on Ethereum, providing additional security without the need to re-audit code",
        explaination: "This is true",
      },
      {
        key: "B",
        title:
          "Bytecode-compatible zkEVMs execute and prove the same bytecode as the EVM. This means developer tooling, Solidity, and compilers work exactly like on Ethereum.",
        explaination: "This is true",
      },
      {
        key: "C",
        title: "Unlike language-compatible ZK-Rollups, bytecode-compatible zkEVMS map opcodes onto custom ZK circuits",
        explaination: "This is true",
      },
    ],
    answer: ["A", "B", "C"],
    image: "/imgs/nft/flow-question-2.svg",
  },
]
