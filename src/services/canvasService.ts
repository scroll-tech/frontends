import { AbiCoder, ethers } from "ethers"

import { checkBadgeEligibilityURL, claimBadgeURL } from "@/apis/canvas"
import { fetchBadgeByAddrURL } from "@/apis/canvas-badge"
import { fetchEcosystemProtocolByNameURL, fetchEcosystemProtocolLogo } from "@/apis/ecosystem"
import AttestProxyABI from "@/assets/abis/CanvasAttestProxy.json"
import BadgeABI from "@/assets/abis/CanvasBadge.json"
import ProfileABI from "@/assets/abis/CanvasProfile.json"
import ProfileRegistryABI from "@/assets/abis/CanvasProfileRegistry.json"
import { ORIGINS_NFT_BADGE } from "@/constants"
import {
  checkDelegatedAttestation,
  decodeBadgePayload,
  ipfsToBrowserURL,
  isOriginsNFTBadge,
  isUserRejected,
  recognizeError,
  requireEnv,
  sentryDebug,
  trimErrorMessage,
} from "@/utils"

const EAS_GRAPHQL_URL = requireEnv("REACT_APP_EAS_GRAPHQL_URL")

const SCROLL_EAS_ADDRESS = requireEnv("REACT_APP_EAS_ADDRESS")
const SCROLL_BADGE_SCHEMA = requireEnv("REACT_APP_BADGE_SCHEMA")

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
            schemaId: { equals: "${SCROLL_BADGE_SCHEMA}" },
            recipient: { equals: "${userAddress}" },
            revoked: { equals: false },
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
  }
}

const queryBadgeDetailById = async badgeId => {
  const query = `
      query Attestation {
        attestations(
          where: {
            id: { equals: "${badgeId}" },
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
    return []
  }
}

const getBadgeMetadata = async (provider, badgeContractAddress, badgeUID = ethers.encodeBytes32String("0x0")) => {
  try {
    const contract = new ethers.Contract(badgeContractAddress, BadgeABI, provider)
    const badgeTokenURI = await contract.badgeTokenURI(badgeUID)
    const badgeTokenBrowserURL = ipfsToBrowserURL(badgeTokenURI)
    const metadata = await scrollRequest(badgeTokenBrowserURL, { timeout: 5e3 })
    return metadata
  } catch (error) {
    return {}
  }
}

const checkIfProfileMinted = async (registryInstance, userAddress) => {
  try {
    const profileAddress = await registryInstance!.getProfile(userAddress)
    const minted = await registryInstance!.isProfileMinted(profileAddress)
    return { profileAddress, minted }
  } catch (error) {
    sentryDebug(`check minted:${userAddress}-${error.message}`)
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
        id,
        badgeContract,
        ...badgeMetadata,
      }
    }
    return {
      id,
      badgeContract,
    }
  } catch (error) {
    sentryDebug(`fill badges detail:${error.message}`)
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
  }
}

const queryCanvasUsername = async (provider, profileAddress) => {
  try {
    const profileContract = new ethers.Contract(profileAddress, ProfileABI, provider)
    const name = await profileContract.username()

    return { profileContract, name }
  } catch (error) {
    sentryDebug(`query username: ${error.message}`)
    throw new Error("Failed to fetch username")
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

    return { orderedAttachedBadges, attachedBadges, badgeOrder }
  } catch (error) {
    sentryDebug(`query attached badges: ${error.message}`)
    throw new Error("Failed to query attached badges")
  }
}

const getBadgeOrder = async profileContract => {
  try {
    const badgeOrder = await profileContract.getBadgeOrder()
    const badgeOrderArray = Array.from(badgeOrder)
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

const checkBadgeEligibility = async (provider, walletAddress, badge: any) => {
  try {
    // originsNFT
    if (isOriginsNFTBadge(badge.badgeContract)) {
      const { validator } = ORIGINS_NFT_BADGE
      const eligibility = await validator(provider, walletAddress)
      return eligibility
    }

    if (!badge.baseURL && !badge.eligibilityCheck) {
      return true
    }
    // permissionless
    if (!badge.baseURL && badge.eligibilityCheck) {
      const badgeInstance = new ethers.Contract(badge.badgeContract, BadgeABI, provider)
      const eligibility = await badgeInstance.isEligible(walletAddress)
      return eligibility
    }
    // backend authorized / airdropped
    if (badge.baseURL) {
      const data = await scrollRequest(checkBadgeEligibilityURL(badge.baseURL, walletAddress, badge.badgeContract), {
        timeout: 1e4,
      })
      return data.eligibility ?? false
    }
    return false
  } catch (error) {
    sentryDebug(`check badge eligibility: ${badge.badgeContract}-${error.message}`)
    return false
  }
}

const mintBackendAuthorizedBadge = async (signer, walletAddress, badgeAddress, attesterProxyAddress, claimBaseUrl) => {
  const { tx: unsignedTx } = await scrollRequest(claimBadgeURL(claimBaseUrl, walletAddress, badgeAddress))
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
  const easContract = new ethers.Contract(SCROLL_EAS_ADDRESS, AttestProxyABI, signer)
  const attestParams = {
    schema: SCROLL_BADGE_SCHEMA,
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
  const easContract = new ethers.Contract(SCROLL_EAS_ADDRESS, AttestProxyABI, signer)
  const attestParams = {
    schema: SCROLL_BADGE_SCHEMA,
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
    const { badgeContract, attesterProxy, baseURL } = badge
    const signer = await provider!.getSigner(0)

    // Origins NFT Badge
    if (isOriginsNFTBadge(badgeContract)) {
      const { nftAddress, nftAbi } = ORIGINS_NFT_BADGE
      return await mintOriginNFTBadge(signer, walletCurrentAddress, badgeContract, nftAddress, nftAbi)
    }
    // Backend-authorized Badges
    if (attesterProxy) {
      return await mintBackendAuthorizedBadge(signer, walletCurrentAddress, badgeContract, attesterProxy, baseURL)
    }

    return await mintPermissionlessBadge(signer, walletCurrentAddress, badgeContract)
  } catch (error) {
    if (isUserRejected(error)) {
      return false
    } else {
      const message = recognizeError(error, badge.issuer)
      sentryDebug(`mint badge:${walletCurrentAddress}-${badge.badgeContract}-${error.message}`)
      throw typeof message === "string" ? new Error(trimErrorMessage(message)) : message
    }
  }
}
const upgradeBadge = async (provider, badge) => {
  try {
    const { id, badgeContract } = badge
    const signer = await provider!.getSigner(0)
    const badgeInstance = new ethers.Contract(badgeContract, BadgeABI, signer)
    const tx = await badgeInstance.upgrade(id)
    const txReceipt = await tx.wait()
    if (txReceipt.status === 1) {
      const badgeMetadataURI = await badgeInstance.badgeTokenURI(id)
      const badgeTokenBrowserURL = ipfsToBrowserURL(badgeMetadataURI)
      const metadata = await scrollRequest(badgeTokenBrowserURL)
      return metadata
    } else {
      throw new Error("due to any operation that can cause the transaction or top-level call to revert")
    }
  } catch (error) {
    if (isUserRejected(error)) {
      return false
    } else {
      const message = recognizeError(error, badge.issuer)
      sentryDebug(`upgrade badge:${badge.id}-${error.message}`)
      throw typeof message === "string" ? new Error(trimErrorMessage(message)) : message
    }
  }
}

const checkBadgeUpgradable = async (provider, badge) => {
  try {
    const { id, badgeContract } = badge

    const badgeInstance = new ethers.Contract(badgeContract, BadgeABI, provider)
    const upgradable = await badgeInstance.canUpgrade(id)
    return { ...badge, upgradable }
  } catch (e) {
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

  if (txReceipt.status !== 1) {
    throw new Error("due to any operation that can cause the transaction or top-level call to revert")
  }
}

const checkIfHasBadgeByAddress = async (provider, userAddress, badgeAddress) => {
  try {
    const badgeContract = new ethers.Contract(badgeAddress, BadgeABI, provider)
    const hasBadge = await badgeContract.hasBadge(userAddress)
    return hasBadge
  } catch (error) {
    return false
  }
}

const getReferrerData = async (registryInstance, userAddress) => {
  const referrerData = await registryInstance.referrerData(userAddress)
  return referrerData
}

const fetchNotionBadgeByAddr = async addr => {
  try {
    if (!addr) {
      return {}
    }
    const data = await scrollRequest(fetchBadgeByAddrURL(addr))
    return data
  } catch (e) {
    return {}
  }
}

export const fetchIssuer = async issuerName => {
  try {
    const { data } = await scrollRequest(fetchEcosystemProtocolByNameURL(issuerName))
    if (!data.length) {
      return {}
    }
    const [{ name: issuerFullName, ext, website }] = data
    const issuerLogo = fetchEcosystemProtocolLogo(issuerFullName, ext)
    const issuer = {
      name: issuerFullName,
      logo: issuerLogo,
      origin: website,
    }
    return issuer
  } catch (error) {
    return {}
  }
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
  mintBadge,
  upgradeBadge,
  checkBadgeUpgradable,
  customiseDisplay,
  checkIfHasBadgeByAddress,
  getReferrerData,
  fillBadgeDetailWithPayload,
  checkBadgeEligibility,
  fetchNotionBadgeByAddr,
  testAsyncFunc,
}
