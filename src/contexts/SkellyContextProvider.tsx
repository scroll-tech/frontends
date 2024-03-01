import { AbiCoder, Contract, ethers } from "ethers"
import { createContext, useContext, useEffect, useState } from "react"
import { useMatch } from "react-router-dom"

import MulticallAbi from "@/assets/abis/Multicall3.json"
import AttestProxyABI from "@/assets/abis/SkellyAttestProxy.json"
import ProfileABI from "@/assets/abis/SkellyProfile.json"
import { CHAIN_ID } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { getBadgeMetadata, initializeInstance, queryUserBadges } from "@/services/skellyService"
import { decodeBadgePayload, requireEnv } from "@/utils"

const SCROLL_SEPOLIA_EAS_ADDRESS = requireEnv("REACT_APP_EAS_ADDRESS")
const SCROLL_SEPOLIA_BADGE_SCHEMA = requireEnv("REACT_APP_BADGE_SCHEMA")

type SkellyContextProps = {
  checkIfProfileMinted: (userAddress?: `0x${string}`) => void
  hasMintedProfile: boolean
  unsignedProfileRegistryContract: any
  profileRegistryContract: any
  profileContract: any
  username: string
  skellyUsername: string
  queryUsername: () => void
  userBadges: any
  attachedBadges: any
  attachBadges: (badgeAddresses: string[]) => void
  detachBadges: (badgeAddresses: string[]) => void
  customiseDisplay: (attachBadges: string[], detachBadges: string[], order?: number[]) => void
  mintBadge: (nftAddress: string | null | [], nftAbi: [] | null, badgeAddress: string) => void
  queryUserBadgesWrapped: (userAddress?: string) => void
  getAttachedBadges: (profileAddress?: string) => void
}

const SkellyContext = createContext<SkellyContextProps | null>(null)

const SkellyContextProvider = ({ children }: any) => {
  //  TODO: not work
  // const { address: othersWalletAddress } = useParams()
  const matches = useMatch("/scroll-skelly/:address")
  const othersWalletAddress = matches?.params?.address
  const { provider, chainId, walletCurrentAddress } = useRainbowContext()

  const [profileRegistryContract, setProfileRegistryContract] = useState<Contract>()
  const [unsignedProfileRegistryContract, setUnsignedProfileRegistryContract] = useState<Contract>()
  const [profileContract, setProfileContract] = useState<Contract>()

  const [userBadges, setUserBadges] = useState<any>([])
  const [attachedBadges, setAttachedBadges] = useState<any>([])

  const [profileAddress, setProfileAddress] = useState("")

  const [hasMintedProfile, setHasMintedProfile] = useState(false)
  const [username, setUsername] = useState("")
  const [skellyUsername, setSkellyUsername] = useState("")
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

  const checkIfProfileMinted = async userAddress => {
    try {
      const profileAddress = await unsignedProfileRegistryContract!.getProfile(userAddress)
      const minted = await unsignedProfileRegistryContract!.isProfileMinted(profileAddress)
      return { profileAddress, minted }
      // console.log("Profile minted:", minted)
    } catch (error) {
      console.log("Failed to check if profile minted:", error)

      return { profileAddress: null, minted: null }
    }
  }

  useEffect(() => {
    if (unsignedProfileRegistryContract && othersWalletAddress && walletCurrentAddress) {
      fetchOthersSkellyDetail(othersWalletAddress, walletCurrentAddress)
    } else if (unsignedProfileRegistryContract && walletCurrentAddress) {
      fetchCurrentSkellyDetail(walletCurrentAddress)
    } else {
      // TODO: unconnected: use JSONRpcProvider
    }
  }, [unsignedProfileRegistryContract, walletCurrentAddress, othersWalletAddress])

  const fetchOthersSkellyDetail = async (othersAddress, walletAddress) => {
    const { profileContract, name } = await querySkellyUsername(othersAddress)
    const userBadges = await queryUserBadgesWrapped(othersAddress)
    const attachedBadges = await getAttachedBadges(profileContract)
    // const badgeOrder = await getBadgeOrder(profileContract)
    setSkellyUsername(name)
    setUserBadges(userBadges)
    setAttachedBadges(attachedBadges)
    if (walletAddress) {
      const {
        name: currentName,
        profileContract: currentProfileContract,
        profileAddress: currentProfileAddress,
      } = await fetchCurrentUserDetail(walletAddress)
      setUsername(currentName || "")
      setHasMintedProfile(Boolean(currentName))
      if (currentProfileContract) {
        setProfileAddress(currentProfileAddress)
        setProfileContract(currentProfileContract)
      }
    }
  }

  // TODO: integration
  const fetchCurrentUserDetail = async walletAddress => {
    const { minted } = await checkIfProfileMinted(walletAddress)
    if (minted) {
      const { name, profileContract, profileAddress } = await querySkellyUsername(walletAddress)
      return { name, profileContract, profileAddress }
    }
    return { name: null, profileContract: null, profileAddress: null }
  }

  const fetchCurrentSkellyDetail = async walletAddress => {
    const { name, profileContract, profileAddress } = await fetchCurrentUserDetail(walletAddress)
    if (profileContract) {
      setProfileAddress(profileAddress)
      const userBadges = await queryUserBadgesWrapped(walletAddress)
      const attachedBadges = await getAttachedBadges(profileContract)
      // const badgeOrder = await getBadgeOrder(profileContract)
      setUsername(name)
      setSkellyUsername(name)
      setHasMintedProfile(true)
      setUserBadges(userBadges)
      setAttachedBadges(attachedBadges)
      setProfileContract(profileContract)
    }
  }

  const queryUsername = async () => {
    try {
      setLoading(true)
      const currentUsername = await profileContract!.username()
      setUsername(currentUsername)
    } catch (error) {
      console.log("Failed to query username:", error)
    } finally {
      setLoading(false)
    }
  }

  const querySkellyUsername = async walletAddress => {
    try {
      const profile = await unsignedProfileRegistryContract!.getProfile(walletAddress)
      const signer = await provider!.getSigner(0)
      const profileContract = new ethers.Contract(profile, ProfileABI, signer)
      const name = await profileContract!.username()
      return { profileAddress: profile, profileContract, name }
    } catch (error) {
      console.log("Failed to query username:", error)

      return { profileAddress: null, profileContract: null, name: null }
    } finally {
      setLoading(false)
    }
  }

  const fillBadgeDetailWithPayload = async attestation => {
    const { data: encodedData, id: badgeUID } = attestation
    try {
      const [badgeContract] = decodeBadgePayload(encodedData)
      const badgeImageURI = await getBadgeMetadata(provider, badgeContract, badgeUID)

      return {
        ...attestation,
        ...badgeImageURI,
        badgeContract,
      }
    } catch (error) {
      console.error("Failed to decode badge payload:", error)
    }
  }

  const queryUserBadgesWrapped = async userAddress => {
    try {
      await getAttachedBadges(profileContract)
      const attestations = await queryUserBadges(userAddress || walletCurrentAddress)
      const formattedBadgesPromises = attestations.map(attestation => {
        return fillBadgeDetailWithPayload(attestation)
      })
      const formattedBadges = await Promise.all(formattedBadgesPromises)
      console.log("formattedBadges", formattedBadges)
      // setUserBadges(formattedBadges)
      return formattedBadges
    } catch (error) {
      console.log("Failed to query user badges:", error)
      return []
    }
  }

  const exposedQueryUserBadgesWrapped = async () => {
    const userBadges = await queryUserBadgesWrapped(walletCurrentAddress)
    setUserBadges(userBadges)
  }

  const getAttachedBadges = async profileContract => {
    try {
      const badges = await profileContract!.getAttachedBadges()
      const badgesArray = Array.from(badges)
      console.log("attachedBadges", badgesArray)
      return badgesArray
    } catch (error) {
      console.error("Failed to query attached badges:", error)
      return []
    }
  }

  // const getBadgeOrder = async profileContract => {
  //   try {
  //     const badgeOrder = await profileContract.getBadgeOrder()
  //     const badgeOrderArray = Array.from(badgeOrder)
  //     console.log("badgeOrder", badgeOrderArray)
  //     return badgeOrderArray
  //   } catch (error) {
  //     console.error("Failed to query attached badges:", error)
  //     return []
  //   }
  // }

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

  const customiseDisplay = async (attachBadges, detachBadges, order?) => {
    const signer = await provider!.getSigner(0)

    const multicallContract = new ethers.Contract("0xca11bde05977b3631167028862be2a173976ca11", MulticallAbi, signer)

    try {
      const attachCallData = profileContract!.interface.encodeFunctionData("attach(bytes32[])", [attachBadges])
      const detachCallData = profileContract!.interface.encodeFunctionData("detach", [detachBadges])

      const calls = [
        {
          target: profileAddress,
          allowFailure: false,
          callData: attachCallData,
        },
        {
          target: profileAddress,
          allowFailure: false,
          callData: detachCallData,
        },
      ]

      const txResponse = await multicallContract.aggregate3(calls)
      const txReceipt = await txResponse.wait()
      if (txReceipt && txReceipt.returnData && Array.isArray(txReceipt.returnData)) {
        txReceipt.returnData.forEach((result, index) => {
          console.log(`Call ${index}: Success=${result.success}, ReturnData=${result.returnData}`)
        })
      } else {
        console.log("No returnData or returnData is not an array.", txReceipt)
      }
    } catch (error) {
      console.error("Multicall transaction failed!", error)
    }
  }

  const attachBadges = async badgeAddresses => {
    try {
      const tx = await profileContract!["attach(bytes32[])"](badgeAddresses)
      const txReceipt = await tx.wait()
      if (txReceipt.status === 1) {
        return true
      } else {
        return "due to any operation that can cause the transaction or top-level call to revert"
      }
    } catch (error) {
      console.log("Badges attached error!", error, badgeAddresses)
    }
  }

  const detachBadges = async badgeAddresses => {
    try {
      // badgeAddresses  = ["0xcb8c7fd835c350f56738d13b7cb765c8089f7b2a08ebbd14093fa6e4cf515cf0"]
      const tx = await profileContract!.detach(badgeAddresses)
      const txReceipt = await tx.wait()
      if (txReceipt.status === 1) {
        return true
      } else {
        return "due to any operation that can cause the transaction or top-level call to revert"
      }
    } catch (error) {
      console.log("Badge detached error!", error)
    }
  }

  const mintBadge = async (nftAddress, nftAbi, badgeAddress) => {
    const signer = await provider!.getSigner(0)
    // for testing

    if (!nftAddress || !nftAbi) {
      const abiCoder = new AbiCoder()
      const badgePayload = abiCoder.encode(["address", "bytes"], [badgeAddress, "0x"])
      const easContract = new ethers.Contract(SCROLL_SEPOLIA_EAS_ADDRESS, AttestProxyABI, signer)
      const attestParams = {
        schema: SCROLL_SEPOLIA_BADGE_SCHEMA,
        data: {
          recipient: walletCurrentAddress,
          expirationTime: 0,
          revocable: false,
          refUID: "0x0000000000000000000000000000000000000000000000000000000000000000",
          data: badgePayload,
          value: 0,
        },
      }
      try {
        const tx = await easContract.attest(attestParams)
        const txReceipt = await tx.wait()
        if (txReceipt.status === 1) {
          return true
        } else {
          return "due to any operation that can cause the transaction or top-level call to revert"
        }
        // console.log("Badge minted successfully!")
      } catch (error) {
        return "due to any operation that can cause the transaction or top-level call to revert"
        // console.log("Badge minted error!", error)
      }
    } else if (Array.isArray(nftAddress)) {
      // scroll origin nft
      const nftContract = new ethers.Contract(nftAddress[0], nftAbi, signer)
      const nftV2Contract = new ethers.Contract(nftAddress[1], nftAbi, signer)
      let tokenId, nftVersion

      try {
        tokenId = await nftContract.tokenOfOwnerByIndex(walletCurrentAddress, 0)
        console.log("tokenId", tokenId)
        nftVersion = 0
      } catch (error) {
        console.log("nftContract.tokenOfOwnerByIndex error", error)
        tokenId = await nftV2Contract.tokenOfOwnerByIndex(walletCurrentAddress, 0)
        nftVersion = 1
      }
      const abiCoder = new AbiCoder()
      const originsBadgePayload = abiCoder.encode(["address", "uint256"], [nftAddress[nftVersion], tokenId])
      const badgePayload = abiCoder.encode(["address", "bytes"], [badgeAddress, originsBadgePayload])
      const easContract = new ethers.Contract(SCROLL_SEPOLIA_EAS_ADDRESS, AttestProxyABI, signer)
      const attestParams = {
        schema: SCROLL_SEPOLIA_BADGE_SCHEMA,
        data: {
          recipient: walletCurrentAddress,
          expirationTime: 0,
          revocable: false,
          refUID: "0x0000000000000000000000000000000000000000000000000000000000000000",
          data: badgePayload,
          value: 0,
        },
      }
      try {
        const tx = await easContract.attest(attestParams)
        const txReceipt = await tx.wait()
        if (txReceipt.status === 1) {
          return true
        } else {
          return "due to any operation that can cause the transaction or top-level call to revert"
        }
        // console.log("Badge minted successfully!")
      } catch (error) {
        return "due to any operation that can cause the transaction or top-level call to revert"
        // console.log("Badge minted error!", error)
      }
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
        skellyUsername,
        queryUsername,
        userBadges,
        attachedBadges,
        attachBadges,
        detachBadges,
        customiseDisplay,
        mintBadge,
        queryUserBadgesWrapped: exposedQueryUserBadgesWrapped,
        getAttachedBadges,
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
