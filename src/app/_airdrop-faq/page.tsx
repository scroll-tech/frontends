import { genMeta } from "@/utils/route"

import Detail from "./detail"

export const generateMetadata = genMeta(() => {
  return {
    titleSuffix: "$SCR Airdrop FAQ",
    relativeURL: "/airdrop-faq",
    description: "$SCR Airdrop FAQ",
  }
})

const AirdropFaq = () => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.13.13/dist/katex.min.css"
        integrity="sha384-RZU/ijkSsFbcmivfdRBQDtwuwVqK7GMOw6IMvKyeWL2K5UAlyp6WonmB8m7Jd0Hn"
        crossOrigin="anonymous"
        precedence="high"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.9.0/github-markdown.min.css"
        crossOrigin="anonymous"
        precedence="high"
      />
      <Detail></Detail>
    </>
  )
}

export default AirdropFaq
