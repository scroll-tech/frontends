import { useEffect } from "react"
import { Navigate } from "react-router-dom"

import useNFTStore from "@/stores/nftStore"

const DeveloperNFT = () => {
  const { phrase, checkPhrase } = useNFTStore()

  useEffect(() => {
    checkPhrase()
  }, [])

  return (
    <>
      {["warm-up", "in-progress"].includes(phrase) && <Navigate to="./coming-soon"></Navigate>}
      {phrase === "end" && <Navigate to="./mint"></Navigate>}
    </>
  )
}

export default DeveloperNFT
