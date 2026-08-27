import { genMeta } from "@/utils/route"

import LegalShell from "../_components/LegalShell"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "App Privacy Policy",
  relativeURL: "/app-privacy-policy",
}))

export default function Layout({ children }) {
  return <LegalShell>{children}</LegalShell>
}
