// skellyService.js
import { AbiCoder, BrowserProvider, Contract, ethers } from "ethers"

import MulticallAbi from "@/assets/abis/Multicall3.json"
import AttestProxyABI from "@/assets/abis/SkellyAttestProxy.json"
import BadgeABI from "@/assets/abis/SkellyBadge.json"
import ProfileABI from "@/assets/abis/SkellyProfile.json"
import ProfileRegistryABI from "@/assets/abis/SkellyProfileRegistry.json"
import { decodeBadgePayload, requireEnv } from "@/utils"

const EAS_GRAPHQL_URL = requireEnv("REACT_APP_EAS_GRAPHQL_URL")
const BADGE_SCHEMA = requireEnv("REACT_APP_BADGE_SCHEMA")

const SCROLL_SEPOLIA_EAS_ADDRESS = requireEnv("REACT_APP_EAS_ADDRESS")
const SCROLL_SEPOLIA_BADGE_SCHEMA = requireEnv("REACT_APP_BADGE_SCHEMA")

const PROFILE_REGISTRY_ADDRESS = requireEnv("REACT_APP_PROFILE_REGISTRY_ADDRESS")

const initializeInstance = async provider => {
  const signer = await provider.getSigner(0)
  const profileRegistryContract = new ethers.Contract(PROFILE_REGISTRY_ADDRESS, ProfileRegistryABI, signer)
  const unsignedProfileRegistryContract = new ethers.Contract(PROFILE_REGISTRY_ADDRESS, ProfileRegistryABI, provider)
  return { profileRegistryContract, unsignedProfileRegistryContract }
}

const initializePublicInstance = async provider => {
  const unsignedProfileRegistryContract = new ethers.Contract(PROFILE_REGISTRY_ADDRESS, ProfileRegistryABI, provider)
  return unsignedProfileRegistryContract
}

const queryUserBadges = async userAddress => {
  const query = `
      query Attestation {
        attestations(
          where: {
            schemaId: { equals: "${BADGE_SCHEMA}" },
            recipient: { equals: "${userAddress}" },
            revoked: { equals: false }
          }
        ) {
          attester
          data
          id
          time
          txid
        }
      }
    `

  try {
    const response = await fetch(EAS_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })

    const {
      data: { attestations },
    } = await response.json()

    return attestations
  } catch (error) {
    console.log("Failed to query user badges:", error)
    return []
  }
}

const queryBadgeDetailById = async badgeId => {
  const query = `
      query Attestation {
        attestations(
          where: {
            schemaId: { equals: "${BADGE_SCHEMA}" },
            id: { equals: "${badgeId}" },
            revoked: { equals: false }
          }
        ) {
          attester
          data
          time
        }
      }
    `

  try {
    const response = await fetch(EAS_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })

    const {
      data: { attestations },
    } = await response.json()

    return attestations
  } catch (error) {
    console.log("Failed to query user badges:", error)
    return []
  }
}

const getBadgeMetadata = async (provider, badgeContractAddress, badgeUID = ethers.encodeBytes32String("0x0")) => {
  try {
    const contract = new ethers.Contract(badgeContractAddress, BadgeABI, provider)
    const badgeMetadataURI = await contract.badgeTokenURI(badgeUID)
    let badgeImageURI = badgeMetadataURI.replace(/^ipfs:\/\/(.*)/, "https://ipfs.io/ipfs/$1")
    const response = await fetch(badgeImageURI)
    const metadata = await response.json()
    return metadata
  } catch (error) {
    console.log("Failed to get badge image URI:", error)
    return ""
  }
}

const checkIfProfileMinted = async (registryInstance, userAddress) => {
  try {
    const profileAddress = await registryInstance!.getProfile(userAddress)
    const minted = await registryInstance!.isProfileMinted(profileAddress)
    return { profileAddress, minted }
  } catch (error) {
    console.log("Failed to check if profile minted:", error)
    return { profileAddress: null, minted: null }
  }
}

// work with publicProvider
const fillBadgeDetailWithPayload = async (provider, attestation) => {
  const { data, id } = attestation
  try {
    const [badgeContract] = decodeBadgePayload(data)
    // TODO: provide works well
    const badgeImageURI = await getBadgeMetadata(provider, badgeContract, id)
    return {
      ...attestation,
      ...badgeImageURI,
      badgeContract,
    }
  } catch (error) {
    console.error("Failed to decode badge payload:", error)
  }
}

const queryUserBadgesWrapped = async (provider, userAddress) => {
  try {
    const attestations = await queryUserBadges(userAddress)
    const formattedBadgesPromises = attestations.map(attestation => {
      return fillBadgeDetailWithPayload(provider, attestation)
    })
    const formattedBadges = await Promise.all(formattedBadgesPromises)
    return formattedBadges
  } catch (error) {
    console.log("Failed to query user badges:", error)
    return []
  }
}

const querySkellyUsername = async (provider, profileAddress) => {
  try {
    const profileContract = new ethers.Contract(profileAddress, ProfileABI, provider)
    const name = await profileContract.username()
    return { profileContract, name }
  } catch (error) {
    return { profileContract: null, name: null }
  }
}

const getAttachedBadges = async profileContract => {
  try {
    const badges = await profileContract!.getAttachedBadges()
    const badgesArray = Array.from(badges)
    const badgeOrder = await getBadgeOrder(profileContract)
    const orderedAttachedBadges = badgeOrder.map(index => badgesArray[Number(BigInt(index as bigint)) - 1])
    console.log("orderedAttachedBadges", orderedAttachedBadges)
    // setAttachedBadges(orderedAttachedBadges)
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
    // console.log("badgeOrder", badgeOrderArray)
    return badgeOrderArray
  } catch (error) {
    console.error("Failed to query attached badges:", error)
    return []
  }
}

const fetchSkellyDetail = async (privider, othersAddress, profileAddress) => {
  const { profileContract, name } = await querySkellyUsername(privider, profileAddress)
  const userBadges = await queryUserBadgesWrapped(privider, othersAddress)
  const attachedBadges = await getAttachedBadges(profileContract)
  const badgeOrder = await getBadgeOrder(profileContract)
  return { name, profileContract, userBadges, attachedBadges, badgeOrder }
}

const attachBadges = async (profileContract, badgeAddresses) => {
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

const detachBadges = async (profileContract, badgeAddresses) => {
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

const mintBadge = async (provider, walletCurrentAddress, nftAddress, nftAbi, badgeAddress) => {
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

const customiseDisplay = async ({
  provider,
  profileContract,
  profileAddress,
  attachBadges,
  detachBadges,
  order,
}: {
  provider: BrowserProvider
  profileContract: Contract
  profileAddress: string
  attachBadges: string[] | null
  detachBadges: string[] | null
  order: number[] | null
}) => {
  const signer = await provider!.getSigner(0)

  const multicallContract = new ethers.Contract("0xca11bde05977b3631167028862be2a173976ca11", MulticallAbi, signer)

  try {
    const calls: { target: string; callData: string; allowFailure: boolean }[] = []
    if (attachBadges) {
      const attachCallData = profileContract!.interface.encodeFunctionData("attach(bytes32[])", [attachBadges])
      calls.push({
        target: profileAddress,
        callData: attachCallData,
        allowFailure: true,
      })
    }

    if (detachBadges) {
      const detachCallData = profileContract!.interface.encodeFunctionData("detach", [detachBadges])
      calls.push({
        target: profileAddress,
        callData: detachCallData,
        allowFailure: true,
      })
    }

    if (order) {
      const reorderCallData = profileContract!.interface.encodeFunctionData("reorderBadges", [order])
      calls.push({
        target: profileAddress,
        callData: reorderCallData,
        allowFailure: true,
      })
    }

    const txResponse = await multicallContract.aggregate3(calls)
    const txReceipt = await txResponse.wait()
    txReceipt.returnData.forEach((result, index) => {
      console.log(`Call ${index}: Success=${result.success}, ReturnData=${result.returnData}`)
    })
  } catch (error) {
    console.error("Multicall transaction failed!", error)
  }
}

const reorderBadges = async (profileContract, badgeOrder) => {
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

export {
  initializeInstance,
  initializePublicInstance,
  checkIfProfileMinted,
  getBadgeMetadata,
  queryUserBadges,
  queryUserBadgesWrapped,
  queryBadgeDetailById,
  querySkellyUsername,
  getAttachedBadges,
  getBadgeOrder,
  fetchSkellyDetail,
  attachBadges,
  detachBadges,
  mintBadge,
  customiseDisplay,
  reorderBadges,
}
