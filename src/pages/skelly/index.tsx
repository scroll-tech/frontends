import { Navigate } from "react-router-dom"

import GlobalComponents from "@/components/GlobalComponents"
import BridgeContextProvider from "@/contexts/BridgeContextProvider"
import { useSkellyContext } from "@/contexts/SkellyContextProvider"
import useSkellyStore, { MintStep } from "@/stores/skellyStore"

import Dashboard from "./dashboard"
import LandingPage from "./landing"
import MintPage from "./mint"

const Skelly = props => {
  const { code } = props
  const { hasMintedProfile } = useSkellyContext()
  const { mintStep } = useSkellyStore()

  if (code && hasMintedProfile) {
    return <Navigate to="/scroll-skelly"></Navigate>
  }

  return (
    <BridgeContextProvider>
      <GlobalComponents></GlobalComponents>
      {hasMintedProfile && <Dashboard />}
      {!hasMintedProfile && mintStep === MintStep.REFERRAL_CODE && <LandingPage code={code} />}
      {!hasMintedProfile && mintStep === MintStep.PROFILE && <MintPage />}
    </BridgeContextProvider>
  )
}

export default Skelly
