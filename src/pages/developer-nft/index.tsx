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
      {(!phrase || phrase === "in-progress" || phrase === "waiting") && <Navigate to="./check-eligibility" replace={true}></Navigate>}
      {phrase === "end" && <Navigate to="./mint" replace={true}></Navigate>}
    </>
  )
}

export default DeveloperNFT
