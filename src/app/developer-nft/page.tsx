"use client"

// import Link from "next/link";
import { useRouter } from "next/navigation"

const DeveloperNFT = () => {
  const router = useRouter()
  router.replace("/developer-nft/mint")
  return null
}

export default DeveloperNFT
