import { AbiCoder, Contract, JsonRpcProvider, ethers } from "ethers"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useMatch } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import MulticallAbi from "@/assets/abis/Multicall3.json"
import AttestProxyABI from "@/assets/abis/SkellyAttestProxy.json"
import ProfileABI from "@/assets/abis/SkellyProfile.json"
import { CHAIN_ID, RPC_URL } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { getBadgeMetadata, initializeInstance, initializePublicInstance, queryUserBadges } from "@/services/skellyService"
import useSkellyStore, { MintStep } from "@/stores/skellyStore"
import { decodeBadgePayload, requireEnv } from "@/utils"

const SCROLL_SEPOLIA_EAS_ADDRESS = requireEnv("REACT_APP_EAS_ADDRESS")
const SCROLL_SEPOLIA_BADGE_SCHEMA = requireEnv("REACT_APP_BADGE_SCHEMA")

export enum MintedStatus {
  MINTED = "MINTED",
  NOT_MINTED = "NOT_MINTED",
  UNKNOWN = "UNKNOWN",
}

type SkellyContextProps = {
  checkIfProfileMinted: (userAddress?: `0x${string}`) => void
  hasMintedProfile: MintedStatus
  unsignedProfileRegistryContract: any
  profileRegistryContract: any
  profileContract: any
  username: string
  skellyUsername: string
  queryUsername: () => void
  userBadges: any
  attachedBadges: any
  publicProvider: any
  badgeOrder: any
  attachBadges: (badgeAddresses: string[]) => void
  detachBadges: (badgeAddresses: string[]) => void
  customiseDisplay: (attachBadges: string[], detachBadges: string[], order?: number[]) => void
  mintBadge: (nftAddress: string | null | [], nftAbi: [] | null, badgeAddress: string) => void
  queryUserBadgesWrapped: (userAddress?: string) => void
  getAttachedBadges: (profileAddress?: string) => void
  reorderBadges: (badgeOrder: number[]) => void
}

const SkellyContext = createContext<SkellyContextProps | null>(null)

// TODO: only store contract instance && public provider
const SkellyContextProvider = ({ children }: any) => {
  const navigate = useNavigate()
  //  TODO: not work
  // const { address: othersWalletAddress } = useParams()
  const matches = useMatch("/scroll-skelly/:address")
  const othersWalletAddress = matches?.params?.address
  const { provider, chainId, walletCurrentAddress } = useRainbowContext()
  const { changeMintStep } = useSkellyStore()

  const isL2 = useMemo(() => chainId === CHAIN_ID.L2, [chainId])

  const [publicProvider, setPublicProvider] = useState<JsonRpcProvider | null>(null)

  const [profileRegistryContract, setProfileRegistryContract] = useState<Contract>()
  const [unsignedProfileRegistryContract, setUnsignedProfileRegistryContract] = useState<Contract>()
  const [profileContract, setProfileContract] = useState<Contract | null>(null)

  // TODO: for customize
  const [userBadges, setUserBadges] = useState<any>([])
  const [attachedBadges, setAttachedBadges] = useState<any>([])

  const [profileAddress, setProfileAddress] = useState("")

  const [badgeOrder, setBadgeOrder] = useState<any>([])

  const [hasMintedProfile, setHasMintedProfile] = useState(MintedStatus.UNKNOWN)
  const [username, setUsername] = useState("")
  const [skellyUsername, setSkellyUsername] = useState("")
  const [, setLoading] = useState(false)

  const initializeInstanceWrapped = async provider => {
    const { profileRegistryContract, unsignedProfileRegistryContract } = await initializeInstance(provider)
    setProfileRegistryContract(profileRegistryContract)
    setUnsignedProfileRegistryContract(unsignedProfileRegistryContract)
  }

  const initializeRPCInstance = async provider => {
    const instance = await initializePublicInstance(provider)
    setUnsignedProfileRegistryContract(instance)
  }

  useEffect(() => {
    if (provider && isL2) {
      initializeInstanceWrapped(provider)
    } else {
      const instance = new JsonRpcProvider(RPC_URL.L2)
      setPublicProvider(instance)
      initializeRPCInstance(instance)
    }
  }, [provider, isL2, walletCurrentAddress])

  const checkIfProfileMinted = async userAddress => {
    try {
      const profileAddress = await unsignedProfileRegistryContract!.getProfile(userAddress)
      const minted = await unsignedProfileRegistryContract!.isProfileMinted(profileAddress)
      return { profileAddress, minted }
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
    } else if (unsignedProfileRegistryContract && othersWalletAddress) {
      fetchOthersSkellyDetail(othersWalletAddress)
    }
  }, [unsignedProfileRegistryContract, walletCurrentAddress, othersWalletAddress])

  const fetchOthersSkellyDetail = async (othersAddress, walletAddress?) => {
    const { minted, profileAddress } = await checkIfProfileMinted(othersAddress)
    if (minted) {
      const { profileContract, name } = await querySkellyUsername(profileAddress)
      const userBadges = await queryUserBadgesWrapped(othersAddress)
      const attachedBadges = await getAttachedBadges(profileContract)
      // const badgeOrder = await getBadgeOrder(profileContract)
      setSkellyUsername(name)
      setUserBadges(userBadges)
      setAttachedBadges(attachedBadges)
    } else {
      // TODO: not minted address
      navigate("/404")
      return
    }

    if (walletAddress) {
      const { profileAddress: currentProfileAddress, minted } = await checkIfProfileMinted(walletAddress)
      if (minted) {
        const { profileContract: currentProfileContract, name: currentName } = await querySkellyUsername(currentProfileAddress)
        setUsername(currentName)
        // setHasMintedProfile(Boolean(currentName))
        setHasMintedProfile(MintedStatus.MINTED)
        setProfileAddress(currentProfileAddress)
        setProfileContract(currentProfileContract!)
      } else {
        setUsername("")
        console.log("Not minted profile0")
        setHasMintedProfile(MintedStatus.NOT_MINTED)
        setProfileAddress("")
        setProfileContract(null)
      }
    }
  }

  const fetchCurrentUserDetail = async walletAddress => {
    const { minted, profileAddress } = await checkIfProfileMinted(walletAddress)
    if (minted) {
      const { name, profileContract } = await querySkellyUsername(profileAddress)
      console.log("fetchCurrentUserDetail", minted, name, profileAddress)
      return { name, profileContract, profileAddress }
    }
    return { name: null, profileContract: null, profileAddress: null }
  }

  const fetchCurrentSkellyDetail = async walletAddress => {
    const { name, profileContract, profileAddress } = await fetchCurrentUserDetail(walletAddress)
    console.log("fetchCurrentSkellyDetail", name, profileAddress)
    if (name) {
      setProfileAddress(profileAddress)
      const userBadges = await queryUserBadgesWrapped(walletAddress)
      const attachedBadges = await getAttachedBadges(profileContract)
      const badgeOrder = await getBadgeOrder(profileContract)
      // const orderedAttachedBadges = badgeOrder.map(index => attachedBadges[Number(BigInt(index as bigint)) - 1])
      setUsername(name)
      setBadgeOrder(badgeOrder)
      setSkellyUsername(name)
      setHasMintedProfile(MintedStatus.MINTED)
      setUserBadges(userBadges)
      setAttachedBadges(attachedBadges)
      setProfileContract(profileContract)
    } else {
      console.log("Not minted profile", name)
      setHasMintedProfile(MintedStatus.NOT_MINTED)
      changeMintStep(MintStep.REFERRAL_CODE)
    }
  }

  const queryUsername = async () => {
    try {
      setLoading(true)
      const currentUsername = await profileContract!.username()
      setUsername(currentUsername)
      setSkellyUsername(currentUsername)
    } catch (error) {
      console.log("Failed to query username:", error)
    } finally {
      setLoading(false)
    }
  }

  // work with publicProvider
  const querySkellyUsername = async profile => {
    try {
      let signerOrProvider
      if (isL2) {
        signerOrProvider = await provider?.getSigner(0)
      } else {
        signerOrProvider = publicProvider
      }
      const profileContract = new ethers.Contract(profile, ProfileABI, signerOrProvider)
      const name = await profileContract.username()
      console.log("fetchCurrentname", name)
      return { profileContract, name }
    } catch (error) {
      return { profileContract: null, name: null }
    }
  }

  // work with publicProvider
  const fillBadgeDetailWithPayload = async attestation => {
    const { data, id } = attestation
    try {
      const [badgeContract] = decodeBadgePayload(data)
      // TODO: provide works well
      const badgeImageURI = await getBadgeMetadata(isL2 ? provider : publicProvider, badgeContract, id)
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
      const attestations = await queryUserBadges(userAddress)
      const formattedBadgesPromises = attestations.map(attestation => {
        return fillBadgeDetailWithPayload(attestation)
      })
      const formattedBadges = await Promise.all(formattedBadgesPromises)
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
      const badgeOrder = await getBadgeOrder(profileContract)
      const orderedAttachedBadges = badgeOrder.map(index => badgesArray[Number(BigInt(index as bigint)) - 1])
      console.log("orderedAttachedBadges", orderedAttachedBadges)
      setAttachedBadges(orderedAttachedBadges)
      return orderedAttachedBadges
    } catch (error) {
      console.error("Failed to query attached badges:", error)
      return []
    }
  }

  const getBadgeOrder = async profileContract => {
    try {
      const badgeOrder = await profileContract.getBadgeOrder()
      const badgeOrderArray = Array.from(badgeOrder)
      console.log("badgeOrder", badgeOrderArray)
      return badgeOrderArray
    } catch (error) {
      console.error("Failed to query attached badges:", error)
      return []
    }
  }

  const reorderBadges = async badgeOrder => {
    try {
      const tx = await profileContract!.reorderBadges(badgeOrder)
      const txReceipt = await tx.wait()
      if (txReceipt.status === 1) {
        return true
      } else {
        return "due to any operation that can cause the transaction or top-level call to revert"
      }
    } catch (error) {
      console.log("Badges reordered error!", error)
    }
  }

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
        badgeOrder,
        publicProvider: isL2 ? provider : publicProvider,
        reorderBadges,
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
