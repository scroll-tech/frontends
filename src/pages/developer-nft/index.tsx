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
      {(!phrase || phrase === "in-progress") && <Navigate to="./check-eligibility"></Navigate>}
      {phrase === "end" && <Navigate to="./mint"></Navigate>}
    </>
  )
}

export default DeveloperNFT
