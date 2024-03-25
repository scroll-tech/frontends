import { AbiCoder } from "ethers"

export const getBadgeImgURL = image => {
  if (!image) return ""
  return image.replace(/^ipfs:\/\/(.*)/, "https://cloudflare-ipfs.com/ipfs/$1")
}

export const decodeBadgePayload = encodedData => {
  const abiCoder = new AbiCoder()
  const decodedPayload = abiCoder.decode(["address", "bytes"], encodedData)
  return decodedPayload
}
