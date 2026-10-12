import { genMeta } from "@/utils/route"

import LegalShell from "../_components/LegalShell"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "App Terms of Use",
  relativeURL: "/app-terms",
}))

export default function Layout({ children }) {
  return <LegalShell>{children}</LegalShell>
}
