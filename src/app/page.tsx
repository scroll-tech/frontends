import { genMeta } from "@/utils"

import FounderClub from "./_components/FounderClub"
import Hero from "./_components/Hero"
import Portal from "./_components/Portal"
import Tech from "./_components/Tech"
import Vision from "./_components/Vision"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "Native zkEVM Layer 2 for Ethereum",
}))

const LandingPage = () => {
  return (
    <>
      <Hero />
      <Vision />
      <Tech />
      <FounderClub />
      <Portal />
    </>
  )
}

export default LandingPage
