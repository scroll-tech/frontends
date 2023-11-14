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

export const separateRarityData = rarityData => {
  const value = BigInt(rarityData)
  const deployMonth = value & BigInt(0xf)
  const deployDay = (value >> BigInt(4)) & BigInt(0x1f)
  const deployOrder = (value >> BigInt(9)) & BigInt(0xffffffff)
  const background = (value >> BigInt(41)) & BigInt(1)
  const stroke = (value >> BigInt(42)) & BigInt(1)
  const rarity = (value >> BigInt(43)) & BigInt(0xff)
  return {
    deployMonth,
    deployDay,
    deployOrder,
    background,
    stroke,
    rarity,
  }
}

export const decodeSVG = base64URI => {
  const uri = JSON.parse(Buffer.from(base64URI.substring(29), "base64").toString("utf-8"))
  const tokenURI = uri.image
  const rarity = uri.attributes.find(item => item.trait_type === "Rarity").value
  return { tokenURI, rarity }
}
