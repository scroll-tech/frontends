import { formatUnits, parseUnits } from "ethers"
import _ from "lodash"
import numbro from "numbro"

export const commafy = (value: string | number | undefined, decimals: number = 2) => {
  if (value === undefined) {
    return ""
  }
  if (typeof decimals === "string") {
    decimals = Number(decimals)
  }
  if (decimals === null) {
    decimals = 2
  }

  try {
    return numbro(value).format({
      thousandSeparated: true,
      optionalMantissa: true,
      mantissa: decimals,
    })
  } catch (err) {
    return value.toString()
  }
}

export const truncateAddress = (address: string): string => {
  return address ? `${address.slice(0, 6)}…${address.slice(38, 42)}` : "-"
}

export const truncateHash = (hash: string) => {
  return hash ? `${hash.substring(0, 6)}…${hash.substring(62, 66)}` : "-"
}

export const convertHexadecimal = (value: string): number => {
  return parseInt(value, 16)
}

export const toHexadecimal = (value: number): string => {
  return `0x${value.toString(16)}`
}

export const toTokenDisplay = (num, decimals: bigint = BigInt(18), symbol?: string) => {
  if (_.isNil(num) || !decimals) {
    return "-"
  }

  const formattedNum = formatUnits(num, decimals)
  const nonDecimalNum = formattedNum.split(".")[0]
  let significantDecimals = 0
  if (nonDecimalNum.length < 8) {
    significantDecimals = 8 - nonDecimalNum.length
  }

  let formatted = commafy(formatUnits(num, decimals), significantDecimals)

  // Remove trailing zeros after decimal point
  formatted = formatted.replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "")

  if (symbol) {
    formatted += ` ${symbol}`
  }

  return formatted
}

export function sanitizeNumericalString(numStr: string) {
  return numStr.replace(/[^0-9.]|\.(?=.*\.)/g, "")
}

export function maxDecimals(amount: string, decimals: bigint = BigInt(18)) {
  const sanitizedAmount = sanitizeNumericalString(amount)
  const indexOfDecimal = sanitizedAmount.indexOf(".")
  if (indexOfDecimal === -1) {
    return sanitizedAmount
  }

  const wholeAmountStr = sanitizedAmount.slice(0, indexOfDecimal) || "0"
  const wholeAmount = BigInt(wholeAmountStr).toString()

  const fractionalAmount = sanitizedAmount.slice(indexOfDecimal + 1)
  const decimalAmount = decimals !== BigInt(0) ? `.${fractionalAmount.slice(0, Number(decimals))}` : ""

  return `${wholeAmount}${decimalAmount}`
}

export function fixedDecimals(amount: string, decimals: bigint = BigInt(18)) {
  if (amount === "") {
    return amount
  }
  const mdAmount = maxDecimals(amount, decimals)
  return mdAmount
}

export function amountToBN(amount: string | number | undefined, decimals: bigint = BigInt(18)): bigint {
  try {
    const fixedAmount = fixedDecimals(amount ? amount.toString() : "", decimals)
    return parseUnits(fixedAmount || "0", decimals)
  } catch (e) {
    return BigInt(0)
  }
}

export const checkAmountOverflow = (inputAmount, decimals: bigint = BigInt(18)) => {
  try {
    if (!inputAmount) {
      return true
    }
    const clipDecimals = maxDecimals(inputAmount, decimals)
    parseUnits(clipDecimals, decimals)
    return true
  } catch (e) {
    return false
  }
}
