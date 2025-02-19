import { promises as fs } from "fs"
import { notFound } from "next/navigation"

import { BNToAmount, genMeta, isSepolia } from "@/utils"

import Explaination from "./Explaination"
import Header from "./Header"

export const generateMetadata = genMeta(() => ({
  titleSuffix: "SCR & sSCR",
  relativeURL: "/SCR-sSCR",
  description: "Governance token and its LRT",
  ogImg: "/og_sSCR.png",
  twitterImg: "/twitter_sSCR.png",
}))

const ScrAndsSCRPage = async () => {
  const circulatingSupplyStr = await fs.readFile(process.cwd() + "/public/tokenomics/circulatingSupply.txt", "utf8")
  const circulatingSupply = +circulatingSupplyStr

  const { votable_supply } = await fetch(`${process.env.NEXT_PUBLIC_AGORA_API_URI}/api/v1/votable_supply`, {
    next: { revalidate: 3600 },
  }).then(res => res.json())

  if (isSepolia) {
    notFound()
  }

  return (
    <>
      <Header circulatingSupply={circulatingSupply} votableSupply={BNToAmount(BigInt(votable_supply))}></Header>
      <Explaination></Explaination>
    </>
  )
}

export default ScrAndsSCRPage
