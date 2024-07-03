// canvasService.js
import { AbiCoder, ethers, isError } from "ethers"

import { checkBadgeEligibilityURL, claimBadgeURL } from "@/apis/canvas"
import AttestProxyABI from "@/assets/abis/CanvasAttestProxy.json"
import BadgeABI from "@/assets/abis/CanvasBadge.json"
import ProfileABI from "@/assets/abis/CanvasProfile.json"
import ProfileRegistryABI from "@/assets/abis/CanvasProfileRegistry.json"
import { checkDelegatedAttestation, decodeBadgePayload, requireEnv, sentryDebug, trimErrorMessage } from "@/utils"

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
    sentryDebug(`query user's badges: ${error.message}`)
    throw new Error("Failed to query user badges:")
    // console.log("Failed to query user badges:", error)
    // return []
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
          data
          time
          recipient
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
    sentryDebug(`query badge detail: ${error.message}`)
    console.log(`Failed to query badge: ${badgeId}:`, error)
    return []
  }
}

const getBadgeMetadata = async (provider, badgeContractAddress, badgeUID = ethers.encodeBytes32String("0x0")) => {
  try {
    const contract = new ethers.Contract(badgeContractAddress, BadgeABI, provider)
    const badgeMetadataURI = await contract.badgeTokenURI(badgeUID)
    let badgeImageURI = badgeMetadataURI.replace(/^ipfs:\/\/(.*)/, "https://ipfs.io/ipfs/$1")
    const metadata = await scrollRequest(badgeImageURI)
    return metadata
  } catch (error) {
    // console.log("Failed to get badge image URI:", error)
    return ""
  }
}

const checkIfProfileMinted = async (registryInstance, userAddress) => {
  try {
    const profileAddress = await registryInstance!.getProfile(userAddress)
    const minted = await registryInstance!.isProfileMinted(profileAddress)
    return { profileAddress, minted }
  } catch (error) {
    sentryDebug(`check minted: ${error.message}`)
    console.log("Failed to check if profile minted:", error)
    return { profileAddress: null, minted: null }
  }
}

// work with publicProvider
const fillBadgeDetailWithPayload = async (provider, attestation, withMetadata = true) => {
  const { data, id } = attestation
  try {
    const [badgeContract] = decodeBadgePayload(data)
    if (withMetadata) {
      const badgeMetadata = await getBadgeMetadata(provider, badgeContract, id)
      return {
        ...attestation,
        badgeContract,
        ...badgeMetadata,
      }
    }
    return {
      ...attestation,
      badgeContract,
    }
  } catch (error) {
    sentryDebug(`fill badges detail: ${error.message}`)
    console.error("Failed to decode badge payload:", error)
  }
}

const queryUserBadgesWrapped = async (provider, userAddress, withMetadata = true) => {
  try {
    const attestations = await queryUserBadges(userAddress)
    const formattedBadgesPromises = attestations.map(attestation => {
      return fillBadgeDetailWithPayload(provider, attestation, withMetadata)
    })
    const formattedBadges = await Promise.all(formattedBadgesPromises)
    return formattedBadges
  } catch (error) {
    throw new Error("Failed to query user badges")
    // console.log("Failed to query user badges:", error)
    // return []
  }
}

const queryCanvasUsername = async (provider, profileAddress) => {
  try {
    const profileContract = new ethers.Contract(profileAddress, ProfileABI, provider)
    const name = await profileContract.username()

    return { profileContract, name }
  } catch (error) {
    sentryDebug(`query username: ${error.message}`)
    console.log(error, "queryCanvasUsername")
    throw new Error("Failed to fetch username")
    // return { profileContract: null, name: null }
  }
}

const getOrderedAttachedBadges = async profileContract => {
  try {
    const badgesProxy = await profileContract!.getAttachedBadges()
    const attachedBadges: Array<string> = Array.from(badgesProxy)
    const badgeOrder = await getBadgeOrder(profileContract)

    const orderedAttachedBadges = badgeOrder
      .map((order, index) => [Number(order), attachedBadges[index]])
      .sort((a: (string | number)[], b: (string | number)[]) => (a[0] as number) - (b[0] as number))
      .map(item => item[1] as string)

    // console.log(attachedBadges, "badges")
    // console.log(badgeOrder, "badgeOrder")
    // console.log(orderedAttachedBadges, "orderedAttachedBadges")

    return { orderedAttachedBadges, attachedBadges, badgeOrder }
  } catch (error) {
    sentryDebug(`query attached badges: ${error.message}`)
    throw new Error("Failed to query attached badges")
    // console.error("Failed to query attached badges:", error)
    // return { orderedAttachedBadges: [], badgeOrder: [] }
  }
}

const getBadgeOrder = async profileContract => {
  try {
    const badgeOrder = await profileContract.getBadgeOrder()
    const badgeOrderArray = Array.from(badgeOrder)
    // console.log("badgeOrder", badgeOrderArray)
    return badgeOrderArray
  } catch (error) {
    sentryDebug(`query badge order: ${error.message}`)
    console.error("Failed to query attached badges:", error)
    return []
  }
}

const fetchCanvasDetail = async (privider, othersAddress, profileAddress) => {
  const { profileContract, name } = await queryCanvasUsername(privider, profileAddress)
  const userBadges = await queryUserBadgesWrapped(privider, othersAddress)
  const { orderedAttachedBadges, attachedBadges, badgeOrder } = await getOrderedAttachedBadges(profileContract)
  return { name, profileContract, userBadges, attachedBadges, orderedAttachedBadges, badgeOrder }
}

// no use
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

// no use
const detachBadges = async (profileContract, badgeAddresses) => {
  try {
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

const checkBadgeEligibility = async (provider, walletAddress, badge: any) => {
  try {
    // originsNFT
    if (badge.validator) {
      const eligibility = await badge.validator(provider, walletAddress)
      return eligibility
    }

    // scroll native
    if (badge.native) {
      return true
    }
    // third-party badge
    if (badge.attesterProxy) {
      const data = await scrollRequest(checkBadgeEligibilityURL(badge.baseUrl, walletAddress, badge.badgeContract))
      // TODO: must return true or false
      return data.eligibility ?? false
    }
    return false
  } catch (error) {
    sentryDebug(`check badge eligibility: ${error.message}`)
    return false
  }
}

const mintThirdBadge = async (signer, walletAddress, badgeAddress, attesterProxyAddress, claimBaseUrl) => {
  const { tx: unsignedTx } = await scrollRequest(claimBadgeURL(claimBaseUrl, walletAddress, badgeAddress))
  console.log(unsignedTx, "unsignedTx")
  checkDelegatedAttestation(unsignedTx, attesterProxyAddress)
  const tx = await signer.sendTransaction(unsignedTx)
  const txReceipt = await tx.wait()
  if (txReceipt.status === 1) {
    return txReceipt.logs[0].data
  } else {
    throw new Error("due to any operation that can cause the transaction or top-level call to revert")
  }
}

const mintOriginNFTBadge = async (signer, walletCurrentAddress, badgeAddress, nftAddress, nftAbi) => {
  const nftContract = new ethers.Contract(nftAddress[0], nftAbi, signer)
  const nftV2Contract = new ethers.Contract(nftAddress[1], nftAbi, signer)
  let tokenId, nftVersion

  try {
    tokenId = await nftContract.tokenOfOwnerByIndex(walletCurrentAddress, 0)
    nftVersion = 0
  } catch (error) {
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
  const tx = await easContract.attest(attestParams)
  const txReceipt = await tx.wait()
  if (txReceipt.status === 1) {
    return txReceipt.logs[0].data
  } else {
    throw new Error("due to any operation that can cause the transaction or top-level call to revert")
  }
}

const mintPermissionlessBadge = async (signer, walletCurrentAddress, badgeAddress) => {
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

  const tx = await easContract.attest(attestParams)
  const txReceipt = await tx.wait()
  if (txReceipt.status === 1) {
    return txReceipt.logs[0].data
  } else {
    throw new Error("due to any operation that can cause the transaction or top-level call to revert")
  }
}

const mintBadge = async (provider, walletCurrentAddress, badge) => {
  try {
    const { badgeContract, nftAddress, nftAbi, attesterProxy, baseUrl } = badge
    const signer = await provider!.getSigner(0)

    // Origins NFT Badge
    if (nftAddress) {
      return await mintOriginNFTBadge(signer, walletCurrentAddress, badgeContract, nftAddress, nftAbi)
    }
    // Third Party Badge
    if (attesterProxy) {
      return await mintThirdBadge(signer, walletCurrentAddress, badgeContract, attesterProxy, baseUrl)
    }

    return await mintPermissionlessBadge(signer, walletCurrentAddress, badgeContract)
  } catch (error) {
    if (isError(error, "ACTION_REJECTED")) {
      return false
    } else {
      sentryDebug(`mint badge: ${error.message}`)
      console.log("Failed to mint badge:", error)
      throw new Error(trimErrorMessage(error.message))
    }
  }
}
const upgradeBadge = async (provider, badge) => {
  const { id, badgeContract } = badge
  const badgeInstance = new ethers.Contract(badgeContract, BadgeABI, provider)
  await badgeInstance.upgrade(id)
  const badgeMetadataURI = await badgeInstance.badgeTokenURI(id)
  const accessableURI = badgeMetadataURI.replace(/^ipfs:\/\/(.*)/, "https://ipfs.io/ipfs/$1")
  const metadata = await scrollRequest(accessableURI)
  return metadata
}

const checkBadgeUpgradable = async (provider, badge) => {
  try {
    const { id, badgeContract } = badge

    const badgeInstance = new ethers.Contract(badgeContract, BadgeABI, provider)
    const upgradable = await badgeInstance.canUpgrade(id)
    return { ...badge, upgradable }
  } catch (e) {
    // TODO: upgradable badge contract
    return { ...badge, upgradable: false }
  }
}

const customiseDisplay = async ({ profileContract, attachBadges, detachBadges, order }) => {
  const calls: any = []
  if (attachBadges) {
    const attachCallData = profileContract.interface.encodeFunctionData("attach(bytes32[])", [attachBadges])
    calls.push(attachCallData)
  }

  if (detachBadges) {
    const detachCallData = profileContract.interface.encodeFunctionData("detach", [detachBadges])
    calls.push(detachCallData)
  }

  if (order) {
    const reorderCallData = profileContract.interface.encodeFunctionData("reorderBadges", [order])
    calls.push(reorderCallData)
  }
  const txResponse = await profileContract.multicall(calls)
  const txReceipt = await txResponse.wait()
  // console.log(txReceipt, "txReceipt")

  if (txReceipt.status !== 1) {
    throw new Error("due to any operation that can cause the transaction or top-level call to revert")
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

const checkIfHasBadgeByAddress = async (provider, userAddress, badgeAddress) => {
  try {
    const badgeContract = new ethers.Contract(badgeAddress, BadgeABI, provider)
    const hasBadge = await badgeContract.hasBadge(userAddress)
    return hasBadge
  } catch (error) {
    console.log("Failed to check if has badge by address:", error)
    return false
  }
}

const getReferrerData = async (registryInstance, userAddress) => {
  const referrerData = await registryInstance.referrerData(userAddress)
  return referrerData
}

const testAsyncFunc = value => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(value)
    }, 1000)
  })
}

export {
  initializeInstance,
  initializePublicInstance,
  checkIfProfileMinted,
  getBadgeMetadata,
  queryUserBadges,
  queryUserBadgesWrapped,
  queryBadgeDetailById,
  queryCanvasUsername,
  getOrderedAttachedBadges,
  getBadgeOrder,
  fetchCanvasDetail,
  attachBadges,
  detachBadges,
  mintBadge,
  upgradeBadge,
  checkBadgeUpgradable,
  customiseDisplay,
  reorderBadges,
  checkIfHasBadgeByAddress,
  getReferrerData,
  fillBadgeDetailWithPayload,
  checkBadgeEligibility,
  testAsyncFunc,
}
