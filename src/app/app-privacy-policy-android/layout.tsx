import { genMeta } from "@/utils/route"

import LegalShell from "../_components/LegalShell"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "App Privacy Policy (Android)",
  relativeURL: "/app-privacy-policy-android",
}))

export default function Layout({ children }) {
  return <LegalShell>{children}</LegalShell>
}
