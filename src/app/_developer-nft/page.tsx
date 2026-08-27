"use client"

import { useRouter } from "next/navigation"

const DeveloperNFT = () => {
  const router = useRouter()

  router.replace("/developer-nft/mint")
  return null
}

export default DeveloperNFT
