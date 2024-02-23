// skellyService.js
import { ethers } from "ethers"

import ScrollSkellyABI from "@/assets/abis/ScrollSkelly.json"
import { requireEnv } from "@/utils"

const EAS_GRAPHQL_URL = requireEnv("REACT_APP_EAS_GRAPHQL_URL")
const BADGE_SCHEMA = requireEnv("REACT_APP_BADGE_SCHEMA")

const PROFILE_REGISTRY_ADDRESS = requireEnv("REACT_APP_PROFILE_REGISTRY_ADDRESS")

export const initializeInstance = async provider => {
  const signer = await provider.getSigner(0)
  const profileRegistryContract = new ethers.Contract(PROFILE_REGISTRY_ADDRESS, ScrollSkellyABI, signer)
  const unsignedProfileRegistryContract = new ethers.Contract(PROFILE_REGISTRY_ADDRESS, ScrollSkellyABI, provider)
  return { profileRegistryContract, unsignedProfileRegistryContract }
}

export const queryUserBadges = async userAddress => {
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

export const getBadgeImageURI = async (badgeContractAddress, badgeUID, provider) => {
  try {
    const contractABI = ["function badgeTokenURI(bytes32) view returns (string)"]
    const contract = new ethers.Contract(badgeContractAddress, contractABI, provider)
    const badgeMetadataURI = await contract.badgeTokenURI(badgeUID)
    let badgeImageURI = badgeMetadataURI.replace(/^ipfs:\/\/(.*)/, "https://ipfs.io/ipfs/$1")
    const response = await fetch(badgeImageURI)
    const metadata = await response.json()
    return metadata
  } catch (error) {
    console.error("Failed to get badge image URI:", error)
    return ""
  }
}
