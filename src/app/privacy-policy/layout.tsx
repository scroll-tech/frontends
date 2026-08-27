import { genMeta } from "@/utils/route"

import LegalShell from "../_components/LegalShell"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Privacy Policy",
  relativeURL: "/privacy-policy",
}))

export default function Layout({ children }) {
  return <LegalShell>{children}</LegalShell>
}
