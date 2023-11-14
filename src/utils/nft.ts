// month: 1~12
// day: 1~31
// order: number
// background: 0 | 1
// stroke: 0 | 1
// rarity: 0~100

export const genetateRarityData = (month, day, order, background, stroke, rarity) => {
  const value =
    BigInt(month) |
    (BigInt(day) << BigInt(4)) |
    (BigInt(order) << BigInt(9)) |
    (BigInt(background) << BigInt(41)) |
    (BigInt(stroke) << BigInt(42)) |
    (BigInt(rarity) << BigInt(43))
  return value
}

export const decodeSVG = base64URI => {
  const uri = JSON.parse(Buffer.from(base64URI.substring(29), "base64").toString("utf-8"))
  const tokenURI = uri.image
  const rarity = uri.attributes.find(item => item.trait_type === "Rarity").value
  return { tokenURI, rarity }
}
