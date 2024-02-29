import { AbiCoder, Contract, ethers } from "ethers"
import { createContext, useContext, useEffect, useState } from "react"

// import ScrollOriginsNFTABI from "@/assets/abis/ScrollOriginsNFT.json"
// import AttestProxyABI from "@/assets/abis/SkellyAttestProxy.json"
import ProfileABI from "@/assets/abis/SkellyProfile.json"
import { CHAIN_ID } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { getBadgeImageURI, initializeInstance, queryUserBadges } from "@/services/skellyService"

// import { requireEnv } from "@/utils"

// const SCROLL_ORIGINS_NFT_V2 = requireEnv("REACT_APP_SCROLL_ORIGINS_NFT_V2")
// const SCROLL_SEPOLIA_ORIGINS_BADGE_ADDRESS = "0xE207971d5B1332f267d00f4a75D9949AE69b03a4"
// const SCROLL_SEPOLIA_EAS_ADDRESS = requireEnv("REACT_APP_EAS_ADDRESS")
// const SCROLL_SEPOLIA_BADGE_SCHEMA = requireEnv("REACT_APP_BADGE_SCHEMA")

type SkellyContextProps = {
  checkIfProfileMinted: (userAddress?: `0x${string}`) => void
  hasMintedProfile: boolean
  unsignedProfileRegistryContract: any
  profileRegistryContract: any
  profileContract: any
  username: string
  queryUsername: () => void
  userBadges: any
  attachedBadges: any
}

const SkellyContext = createContext<SkellyContextProps | null>(null)

const SkellyContextProvider = ({ children }: any) => {
  const { provider, chainId, walletCurrentAddress } = useRainbowContext()

  const [profileRegistryContract, setProfileRegistryContract] = useState<Contract>()
  const [unsignedProfileRegistryContract, setUnsignedProfileRegistryContract] = useState<Contract>()
  const [profileContract, setProfileContract] = useState<Contract>()

  const [userBadges, setUserBadges] = useState<any>([])
  const [attachedBadges, setAttachedBadges] = useState<any>([])

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
      console.log("Profile address:", profileAddress)
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
          const profileContract = new ethers.Contract(profileAddress, ProfileABI, signer)
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
      queryUserBadgesWrapped(walletCurrentAddress)
      getAttachedBadges(profileAddress)
      // mintScrollOriginsBadge(walletCurrentAddress!)
      getBadgeOrder(walletCurrentAddress!)
      // reorderBadges([2, 1])
      // attachOneBadge("0x2aed6377b6e822be2cd0bbb883f8406cd36f8504eda0b8a1fe2ddc203ccb9ab4")
      // detachBadges(["0x2aed6377b6e822be2cd0bbb883f8406cd36f8504eda0b8a1fe2ddc203ccb9ab4"])
      // attachBadges([
      //   "0x2aed6377b6e822be2cd0bbb883f8406cd36f8504eda0b8a1fe2ddc203ccb9ab4",
      //   "0xff4f10891e956b0bb600bef5a0dd0c1ff9205a2dfb9743c722e20fa68a7a760f",
      // ])
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

  const decodeBadgePayload = async attestation => {
    const { data: encodedData, id: badgeUID } = attestation
    const abiCoder = new AbiCoder()
    try {
      const decoded = abiCoder.decode(["address", "bytes"], encodedData)
      const [badgeAddress] = decoded

      const badgeImageURI = await getBadgeImageURI(badgeAddress, badgeUID, provider)

      return {
        ...attestation,
        ...badgeImageURI,
      }
    } catch (error) {
      console.error("Failed to decode badge payload:", error)
    }
  }

  const queryUserBadgesWrapped = async userAddress => {
    try {
      const attestations = await queryUserBadges(userAddress)
      const formattedBadgesPromises = attestations.map(attestation => {
        return decodeBadgePayload(attestation)
      })
      const formattedBadges = await Promise.all(formattedBadgesPromises)
      console.log("formattedBadges", formattedBadges)
      setUserBadges(formattedBadges)
    } catch (error) {
      console.log("Failed to query user badges:", error)
      return []
    }
  }

  const getAttachedBadges = async profileAddress => {
    try {
      const badges = await profileContract!.getAttachedBadges()
      const badgesArray = Array.from(badges)
      setAttachedBadges(badgesArray)
      console.log("attachedBadges", badgesArray)
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
      console.log("badgeOrder", badgeOrderArray)
    } catch (error) {
      console.error("Failed to query attached badges:", error)
      return []
    }
  }

  // const reorderBadges = async badgeOrder => {
  //   try {
  //     const tx = await profileContract!.reorderBadges(badgeOrder)
  //     await tx.wait()
  //     console.log("Badges reordered successfully!")
  //   } catch (error) {
  //     console.log("Badges reordered error!", error)
  //   }
  // }

  // const attachOneBadge = async badgeAddress => {
  //   try {
  //     const tx = await profileContract!.attachOne(badgeAddress)
  //     await tx.wait()
  //     console.log("Badge attached successfully!")
  //   } catch (error) {
  //     console.log("Badge attached error!", error)
  //   }
  // }

  // const attachBadges = async badgeAddresses => {
  //   try {
  //     const tx = await profileContract!["attach(bytes32[])"](badgeAddresses)
  //     await tx.wait()
  //     console.log("Badges attached successfully!")
  //   } catch (error) {
  //     console.log("Badges attached error!", error, badgeAddresses)
  //   }
  // }

  // const detachBadges = async badgeAddresses => {
  //   try {
  //     // badgeAddresses  = ["0xcb8c7fd835c350f56738d13b7cb765c8089f7b2a08ebbd14093fa6e4cf515cf0"]
  //     console.log("profileContract!.detach", profileContract!.detach)
  //     const tx = await profileContract!.detach(badgeAddresses)
  //     await tx.wait()
  //     console.log("Badge detached successfully!")
  //   } catch (error) {
  //     console.log("Badge detached error!", error)
  //   }
  // }

  // const mintScrollOriginsBadge = async (userAddress: string) => {
  //   const signer = await provider!.getSigner(0)

  //   const originsV2Contract = new ethers.Contract(SCROLL_ORIGINS_NFT_V2, ScrollOriginsNFTABI, signer)
  //   const tokenId = await originsV2Contract.tokenOfOwnerByIndex(userAddress, 0)
  //   const abiCoder = new AbiCoder()
  //   const originsBadgePayload = abiCoder.encode(["address", "uint256"], [SCROLL_ORIGINS_NFT_V2, tokenId])
  //   const badgePayload = abiCoder.encode(["address", "bytes"], [SCROLL_SEPOLIA_ORIGINS_BADGE_ADDRESS, originsBadgePayload])
  //   const easContract = new ethers.Contract(SCROLL_SEPOLIA_EAS_ADDRESS, AttestProxyABI, signer)
  //   const attestParams = {
  //     schema: SCROLL_SEPOLIA_BADGE_SCHEMA,
  //     data: {
  //       recipient: userAddress,
  //       expirationTime: 0,
  //       revocable: false,
  //       refUID: "0x0000000000000000000000000000000000000000000000000000000000000000",
  //       data: badgePayload,
  //       value: 0,
  //     },
  //   }
  //   try {
  //     const tx = await easContract.attest(attestParams)
  //     await tx.wait()
  //     console.log("Badge minted successfully!")
  //   } catch (error) {
  //     console.log("Badge minted error!", error)
  //   }
  // }

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
        attachedBadges,
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
