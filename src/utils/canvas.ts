import { NO_EXPIRATION, SchemaEncoder, ZERO_BYTES32 } from "@ethereum-attestation-service/eas-sdk"
import { EIP712Proxy } from "@ethereum-attestation-service/eas-sdk/dist/eip712-proxy.js"
import { AbiCoder, TransactionDescription, ethers } from "ethers"

import AttestProxyABI from "@/assets/abis/CanvasAttestProxy.json"
import { requireEnv } from "@/utils"

const SCROLL_SEPOLIA_BADGE_SCHEMA = requireEnv("REACT_APP_BADGE_SCHEMA")

const SCROLL_ORIGINS_BADGE_ADDRESS = "0x2dBce60ebeAafb77e5472308f432F78aC3AE07d9"

export const ipfsToBrowserURL = ipfsAddress => {
  if (!ipfsAddress) return ""
  return ipfsAddress.replace(/^ipfs:\/\/(.*)/, "https://dweb.link/ipfs/$1")
}

export const decodeBadgePayload = encodedData => {
  const abiCoder = new AbiCoder()
  const decodedPayload = abiCoder.decode(["address", "bytes"], encodedData)
  return decodedPayload
}

export const generateAttestParams = async (signer, walletAddress, attesterProxyAddress, badgeAddress) => {
  const easContract = new ethers.Contract(attesterProxyAddress, AttestProxyABI, signer)
  const abiCoder = new SchemaEncoder("address badge, bytes payload")
  const badgePayload = abiCoder.encodeData([
    { name: "badge", value: badgeAddress, type: "address" },
    { name: "payload", value: "0x", type: "bytes" },
  ])

  const currentTime = Math.floor(Date.now() / 1000)
  const deadline = currentTime + 3600

  const attestation = {
    // attestation data
    schema: SCROLL_SEPOLIA_BADGE_SCHEMA,
    recipient: walletAddress,
    data: badgePayload,

    // unused fields
    revocable: false,
    refUID: ZERO_BYTES32,
    value: BigInt(0),
    expirationTime: NO_EXPIRATION,

    // signature details
    deadline: BigInt(deadline),
    attester: signer.address,
  }

  const proxy = new EIP712Proxy(attesterProxyAddress)
  const delegatedProxy = await proxy.connect(signer).getDelegated()
  const signature = await delegatedProxy.signDelegatedProxyAttestation(attestation, signer)

  const attestParams = {
    schema: attestation.schema,
    data: {
      recipient: attestation.recipient,
      expirationTime: 0,
      revocable: false,
      refUID: "0x0000000000000000000000000000000000000000000000000000000000000000",
      data: badgePayload,
      value: 0,
    },
    signature: signature.signature,
    attester: attestation.attester,
    deadline: attestation.deadline,
  }
  console.log(attestParams, "attestParams")
  const tx = await easContract.attestByDelegation.populateTransaction(attestParams)
  return tx
}

export const checkDelegatedAttestation = (tx, proxyAddress) => {
  if (!tx) {
    throw new Error("Got empty tx")
  }

  if (!tx.to || tx.to.toUpperCase() !== proxyAddress.toUpperCase()) {
    throw new Error("Unexpected contract address")
  }
  const instance = new ethers.Interface(AttestProxyABI)
  const parsedTx = instance.parseTransaction(tx) as TransactionDescription

  if (parsedTx.name !== "attestByDelegation") {
    throw new Error("Unexpected function name")
  }

  if (parsedTx.args[0].length !== 5) {
    throw new Error("Unexpected number of arguments")
  }

  if (parsedTx.value !== BigInt(0)) {
    throw new Error("Unexpected transaction value")
  }
  return
}

export const isOriginsNFTBadge = badgeContract => {
  return badgeContract === SCROLL_ORIGINS_BADGE_ADDRESS
}
