import { useEffect, useMemo } from "react"
import { Navigate, useMatch, useNavigate } from "react-router-dom"

import { CHAIN_ID } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useSkellyStore from "@/stores/skellyStore"

import Dashboard from "./Dashboard"
import LoadingPage from "./loading"
import WrongNetwork from "./wrongNetwork"

const SkellyIndex = props => {
  const navigate = useNavigate()
  const isOthersSkelly = useMatch("/scroll-skelly/:address")
  const isBadgeDetail = useMatch("/scroll-skelly/badge/:id")

  const { walletCurrentAddress, chainId } = useRainbowContext()
  const { profileMintedChecking, profileMinted } = useSkellyStore()
  const isWrongNetwork = useMemo(() => {
    return !isOthersSkelly && !isBadgeDetail && chainId !== CHAIN_ID.L2
  }, [chainId, isOthersSkelly, isBadgeDetail])

  useEffect(() => {
    if (!walletCurrentAddress) {
      navigate("/scroll-skelly/mint")
    }
  }, [walletCurrentAddress])

  const renderSkelly = () => {
    if (!walletCurrentAddress) {
      return <Navigate to="/scroll-skelly/mint" replace={true}></Navigate>
    } else if (isWrongNetwork) {
      return <WrongNetwork></WrongNetwork>
    } else if (profileMintedChecking || profileMinted === null) {
      return <LoadingPage></LoadingPage>
    } else if (profileMinted) {
      // if connected user views the invite link, then redirect to skelly
      return <Dashboard />
    }
    return <Navigate to="/scroll-skelly/mint" replace={true}></Navigate>
  }

  return <>{renderSkelly()}</>
}

export default SkellyIndex