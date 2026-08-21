import { genMeta } from "@/utils/route"

import LegalShell from "../_components/LegalShell"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Terms of Service",
  relativeURL: "/terms-of-service",
}))

export default function Layout({ children }) {
  return <LegalShell>{children}</LegalShell>
}
