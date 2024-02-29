export const getBadgeImgURL = image => {
  if (!image) return ""
  return image.replace(/^ipfs:\/\/(.*)/, "https://cloudflare-ipfs.com/ipfs/$1")
}
