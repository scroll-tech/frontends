import Exp1Image from "@/assets/images/cloak/cloak-exp-1.webp"
import Exp2Image from "@/assets/images/cloak/cloak-exp-2.webp"
import Exp3Image from "@/assets/images/cloak/cloak-exp-3.webp"
import Workflow1Image from "@/assets/images/cloak/cloak-workflow-1.svg?url"
import Workflow2Image from "@/assets/images/cloak/cloak-workflow-2.svg?url"
import Workflow3Image from "@/assets/images/cloak/cloak-workflow-3.svg?url"
import Workflow4Image from "@/assets/images/cloak/cloak-workflow-4.svg?url"

export const CLOAK_SIGNUP_URL = "https://forms.gle/kqpuFXfMNpZLiKrp7"

export const CLOAK_HERO_LINKS = [
  {
    label: "Check out technical docs",
    key: "tech",
    href: "https://scroll-tech.github.io/cloak-documentation/",
  },
  {
    label: "Why we built Cloak",
    key: "reason",
    href: "/blog/introducing-cloak",
  },
]

export const CLOAK_PRIVATE_DESCS = [
  {
    key: "history",
    title: "Private transaction history",
    content: "Every transfer and payment details remains confidential within each client’s Cloak network; invisible from public chain.",
  },
  {
    key: "balance",
    title: "Confidential Balances",
    content: "Balances on Cloak layer are always hidden from public view—visible only to the owner.",
  },
  {
    key: "deposit",
    title: "Shielded Deposits",
    content: "With an encrypted address, recipient of a deposit stays private, preserving confidentiality end-to-end.",
  },
]

export const CLOAK_USER_EXP_DESCS = [
  {
    key: "fast",
    imageURL: Exp1Image,
    title: "Lightning-Fast Transfers",
    content: "Deposits and withdrawals settle in under 2 seconds—delivering real-time UX for users.",
  },
  {
    key: "evm",
    imageURL: Exp2Image,
    title: "Full EVM Compatibility",
    content: "Cloak supports all Ethereum smart contracts and tooling—no re‑engineering required.",
  },
  {
    key: "fees",
    imageURL: Exp3Image,
    title: "Optional Zero Fees",
    content: "Offer fee-free txs if it suits your business model—fully optional and under your control.",
  },
]

export const CLOAK_CONTROL_DESCS = [
  {
    key: "self-hosted",
    title: "Self‑Hosted or Cloud‑Hosted",
    content: "Run Cloak entirely in your own infra—no vendor lock-in.",
  },
  {
    key: "admin",
    title: "Administer Contracts & Assets",
    content: "Full rights over data, bridges, contracts, keys, and governance—all under your management.",
  },
  {
    key: "modular",
    title: "Modular Stack You Own",
    content: "Customize as you like—all components built on Scroll’s open stack.",
  },
  {
    key: "workflow",
    title: "Traceable Workflows",
    content: "Every deposit-to-withdrawal flow is verifiable—yet remains shielded from the public.",
  },
  {
    key: "disclosure",
    title: "Selective Disclosure",
    content: "Grant regulators or auditors limited, cryptographically certified visibility—without exposing everything.",
  },
]

export const CLOAK_WORKFLOW_APPS = [
  {
    key: "bank",
    imageURL: Workflow1Image,
    title: "Application A:",
    name: "Bank",
    list: ["Indexer", "Prover", "Intent bridge", "Private RPC gateway"],
  },
  {
    key: "payment",
    imageURL: Workflow2Image,
    title: "Application B:",
    name: "Payment app",
    list: ["Indexer", "Prover", "Intent bridge", "Private RPC gateway"],
  },
]

export const CLOAK_WORKFLOW_STEPS = [
  {
    key: "step1",
    imageURL: Workflow3Image,
    content: "Scroll (Ethereum Layer 2):",
    content2: "Verifier + Aggregator",
    backgroundColor: "#F7F7AE",
    stepMark: "Inherits Ethereum security",
  },
  {
    key: "step2",
    imageURL: Workflow4Image,
    content: "Ethereum: L2 Verifier & Settlement",
    content2: "+ Data Availability Layer",
    backgroundColor: "#DAFDF8",
  },
]
