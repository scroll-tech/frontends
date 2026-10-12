import { genMeta } from "@/utils/route"

import LegalShell from "../_components/LegalShell"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Delete Your Compass Account",
  relativeURL: "/app-account-deletion",
}))

export default function Layout({ children }) {
  return <LegalShell>{children}</LegalShell>
}
