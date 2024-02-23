import { AbiCoder, Contract, ethers } from "ethers"
import { createContext, useContext, useEffect, useState } from "react"

import ScrollOriginsNFTABI from "@/assets/abis/ScrollOriginsNFT.json"
import ScrollSkellyABI from "@/assets/abis/ScrollSkelly.json"
import { CHAIN_ID } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { getBadgeImageURI, initializeInstance, queryUserBadges } from "@/services/skellyService"
import { requireEnv } from "@/utils"

const UNISWAP_NFT_ADDRESS = "0xbbAd0e891922A8A4a7e9c39d4cc0559117016fec"
const SCROLL_SEPOLIA_ORIGINS_BADGE_ADDRESS = "0xb05837704cc99F7f30c8693F05c7CfEc9CFA88FE"
const SCROLL_SEPOLIA_EAS_ADDRESS = requireEnv("REACT_APP_EAS_ADDRESS")
const SCROLL_SEPOLIA_BADGE_SCHEMA = requireEnv("REACT_APP_BADGE_SCHEMA")

type SkellyContextProps = {
  checkIfProfileMinted: (userAddress?: `0x${string}`) => void
  hasMintedProfile: boolean
  unsignedProfileRegistryContract: any
  profileRegistryContract: any
  profileContract: any
  username: string
  queryUsername: () => void
  userBadges: any
  attachBadges: any
}

const SkellyContext = createContext<SkellyContextProps | null>(null)

const SkellyContextProvider = ({ children }: any) => {
  const { provider, chainId, walletCurrentAddress } = useRainbowContext()

  const [profileRegistryContract, setProfileRegistryContract] = useState<Contract>()
  const [unsignedProfileRegistryContract, setUnsignedProfileRegistryContract] = useState<Contract>()
  const [profileContract, setProfileContract] = useState<Contract>()

  const [userBadges, setUserBadges] = useState<any>([])
  const [attachBadges, setAttachBadges] = useState<any>([])

  const [profileAddress, setProfileAddress] = useState("")

  const [hasMintedProfile, setHasMintedProfile] = useState(false)
  const [username, setUsername] = useState("")
  const [, setLoading] = useState(false)

  const initializeInstanceWrapped = async provider => {
    const { profileRegistryContract, unsignedProfileRegistryContract } = await initializeInstance(provider)
    setProfileRegistryContract(profileRegistryContract)
    setUnsignedProfileRegistryContract(unsignedProfileRegistryContract)
  }

  useEffect(() => {
    if (provider && chainId === CHAIN_ID.L2) {
      initializeInstanceWrapped(provider)
    }
  }, [provider, chainId, walletCurrentAddress])

  useEffect(() => {
    if (unsignedProfileRegistryContract && walletCurrentAddress && provider) {
      checkIfProfileMinted(walletCurrentAddress)
    }
  }, [unsignedProfileRegistryContract, walletCurrentAddress, provider])

  const checkIfProfileMinted = async (userAddress = walletCurrentAddress) => {
    try {
      const profileAddress = await unsignedProfileRegistryContract!.getProfile(userAddress)
      setProfileAddress(profileAddress)
      const minted = await unsignedProfileRegistryContract!.isProfileMinted(profileAddress)
      setHasMintedProfile(minted)
      console.log("Profile minted:", minted)
    } catch (error) {
      console.log("Failed to check if profile minted:", error)
    } finally {
      // setLoading(false)
    }
  }

  useEffect(() => {
    const fetchProfileContract = async () => {
      if (profileAddress) {
        try {
          const signer = await provider!.getSigner(0)
          // test profileAddress
          const profileContract = new ethers.Contract("0x984f0481E246E94B3524C8875Dfa5163FbaBa5c6", ScrollSkellyABI, signer)
          setProfileContract(profileContract)
        } catch (error) {
          console.error("Error fetching profile contract:", error)
        }
      }
    }

    fetchProfileContract()
  }, [profileAddress])

  useEffect(() => {
    if (profileContract && hasMintedProfile) {
      queryUsername()
      queryUserBadgesWrapped("0xF138EdC6038C237e94450bcc9a7085a7b213cAf0")
      getAttachedBadges("0x97218b8fEDfB8980a4505901185f4757129F032B")
      mintScrollOriginsBadge(walletCurrentAddress!)
      getBadgeOrder(walletCurrentAddress!)
    }
  }, [profileContract, hasMintedProfile])

  const queryUsername = async () => {
    try {
      const currentUsername = await profileContract!.username()
      setUsername(currentUsername)
    } catch (error) {
      console.log("Failed to query username:", error)
    } finally {
      setLoading(false)
    }
  }

  const decodeBadgePayload = async (encodedData, badgeUID) => {
    const abiCoder = new AbiCoder()
    try {
      const decoded = abiCoder.decode(["address", "bytes"], encodedData)
      const [badgeAddress] = decoded

      // 0x6346f8fd2ba17fb5540589cf4ba88ce1c5a5c3af01f3b807c28abd0ea4f80737
      const badgeImageURI = await getBadgeImageURI(badgeAddress, "0x6346f8fd2ba17fb5540589cf4ba88ce1c5a5c3af01f3b807c28abd0ea4f80737", provider)
      return badgeImageURI
    } catch (error) {
      console.error("Failed to decode badge payload:", error)
    }
  }

  const queryUserBadgesWrapped = async userAddress => {
    try {
      const attestations = await queryUserBadges(userAddress)
      console.log("attestations", attestations)
      const formattedBadgesPromises = attestations.map(attestation => {
        const { data, id } = attestation
        return decodeBadgePayload(data, id)
      })
      const formattedBadges = await Promise.all(formattedBadgesPromises)
      setUserBadges(formattedBadges)
      console.log("formatedBadges", formattedBadges)
    } catch (error) {
      console.log("Failed to query user badges:", error)
      return []
    }
  }

  const getAttachedBadges = async profileAddress => {
    try {
      const badges = await profileContract!.getAttachedBadges()
      const badgesArray = Array.from(badges)
      setAttachBadges(badgesArray)
      return badgesArray
    } catch (error) {
      console.error("Failed to query attached badges:", error)
      return []
    }
  }

  const getBadgeOrder = async profileAddress => {
    try {
      const badgeOrder = await profileContract!.getBadgeOrder()
      const badgeOrderArray = Array.from(badgeOrder)
      console.log("badgeOrderArray", badgeOrder, badgeOrderArray)
    } catch (error) {
      console.error("Failed to query attached badges:", error)
      return []
    }
  }

  const mintScrollOriginsBadge = async (userAddress: string) => {
    const signer = await provider!.getSigner(0)

    const originsV1Contract = new ethers.Contract(UNISWAP_NFT_ADDRESS, ScrollOriginsNFTABI, signer)
    const tokenId = await originsV1Contract.tokenOfOwnerByIndex(userAddress, 0)
    console.log("tokenId", tokenId)
    const abiCoder = new AbiCoder()

    const originsBadgePayload = abiCoder.encode(["address", "uint256"], [UNISWAP_NFT_ADDRESS, tokenId])
    console.log("originsBadgePayload", originsBadgePayload)

    const badgePayload = abiCoder.encode(["address", "bytes"], [SCROLL_SEPOLIA_ORIGINS_BADGE_ADDRESS, originsBadgePayload])

    const easContract = new ethers.Contract(SCROLL_SEPOLIA_EAS_ADDRESS, ScrollSkellyABI, signer)
    try {
      const tx = await easContract.attest(SCROLL_SEPOLIA_BADGE_SCHEMA, [
        userAddress,
        0,
        false,
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        badgePayload,
        0,
      ])

      await tx.wait()
      console.log("Badge minted successfully!")
    } catch (error) {
      console.log("Badge minted error!", error)
    }
  }

  return (
    <SkellyContext.Provider
      value={{
        hasMintedProfile,
        unsignedProfileRegistryContract,
        profileRegistryContract,
        profileContract,
        checkIfProfileMinted,
        username,
        queryUsername,
        userBadges,
        attachBadges,
      }}
    >
      {children}
    </SkellyContext.Provider>
  )
}

export function useSkellyContext() {
  const ctx = useContext(SkellyContext)
  if (!ctx) {
    throw new Error("useSkellyContext must be used within SkellyContextProvider")
  }
  return ctx
}

export default SkellyContextProvider
