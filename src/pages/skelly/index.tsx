import { useEffect } from "react"
import { useLocation } from "react-router-dom"

import GlobalComponents from "@/components/GlobalComponents"
import BridgeContextProvider from "@/contexts/BridgeContextProvider"
import { useSkellyContext } from "@/contexts/SkellyContextProvider"
import useSkellyStore, { MintStep } from "@/stores/skellyStore"

import Dashboard from "./Dashboard"
import LandingPage from "./landing"
import MintPage from "./mint"

const Skelly = () => {
  const { profileInstance } = useSkellyContext()
  const { mintStep } = useSkellyStore()
  const location = useLocation()

  useEffect(() => {
    // const searchParams = new URLSearchParams(location.search)
    // const referral = searchParams.get("referral")
    // if (referral) {
    //   // setCodes(referral.split(""))
    // }
  }, [location])

  return (
    <BridgeContextProvider>
      <GlobalComponents></GlobalComponents>
      {profileInstance && <Dashboard />}
      {!profileInstance && mintStep === MintStep.REFERRAL_CODE && <LandingPage />}
      {!profileInstance && mintStep === MintStep.PROFILE && <MintPage />}
    </BridgeContextProvider>
  )
}

export default Skelly
