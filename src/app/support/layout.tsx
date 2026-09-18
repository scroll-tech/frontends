import { genMeta } from "@/utils/route"

import LegalShell from "../_components/LegalShell"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Compass Support",
  description:
    "Compass is an AI assistant for iPhone. Ask anything with Claude, GPT, Gemini, Grok and more, or download Compass Mini and get answers with no signal.",
  relativeURL: "/support",
}))

export default function Layout({ children }) {
  return <LegalShell>{children}</LegalShell>
}
