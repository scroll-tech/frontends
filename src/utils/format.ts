import { BigNumberish, utils, BigNumber, FixedNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import numbro from "numbro";

export const commafy = (
  value: string | number | undefined,
  decimals: number = 2
) => {
  if (value === undefined) {
    return "";
  }
  if (typeof decimals === "string") {
    decimals = Number(decimals);
  }
  if (decimals === null) {
    decimals = 2;
  }

  try {
    return numbro(value).format({
      thousandSeparated: true,
      optionalMantissa: true,
      mantissa: decimals,
    });
  } catch (err) {
    return value.toString();
  }
};

export const truncateAddress = (address: string): string => {
  return address.slice(0, 6) + "..." + address.slice(38, 42);
};

export const truncateHash = (hash: string) => {
  return `${hash.substring(0, 6)}…${hash.substring(62, 66)}`;
};

export const convertHexadecimal = (value: string): number => {
  return parseInt(value, 16);
};

export const toTokenDisplay = (
  num?: BigNumberish,
  decimals: number = 18,
  symbol?: string
) => {
  if (!num || !decimals) {
    return "-";
  }

  const formattedNum = formatUnits(num, decimals);
  const nonDecimalNum = formattedNum.split(".")[0];
  let significantDecimals = 0;
  if (nonDecimalNum.length < 8) {
    significantDecimals = 8 - nonDecimalNum.length;
  }

  let formatted = commafy(formatUnits(num, decimals), significantDecimals);

  if (symbol) {
    formatted += ` ${symbol}`;
  }

  return formatted;
};

export function sanitizeNumericalString(numStr: string) {
  return numStr.replace(/[^0-9.]|\.(?=.*\.)/g, "");
}

export function maxDecimals(amount: string, decimals: number) {
  const sanitizedAmount = sanitizeNumericalString(amount);
  const indexOfDecimal = sanitizedAmount.indexOf(".");
  if (indexOfDecimal === -1) {
    return sanitizedAmount;
  }

  const wholeAmountStr = sanitizedAmount.slice(0, indexOfDecimal) || "0";
  const wholeAmount = BigNumber.from(wholeAmountStr).toString();

  const fractionalAmount = sanitizedAmount.slice(indexOfDecimal + 1);
  const decimalAmount =
    decimals !== 0 ? `.${fractionalAmount.slice(0, decimals)}` : "";

  return `${wholeAmount}${decimalAmount}`;
}

export function fixedDecimals(amount: string, decimals: number = 18) {
  if (amount === "") {
    return amount;
  }
  const mdAmount = maxDecimals(amount, decimals);
  return FixedNumber.from(mdAmount).toString();
}

export function amountToBN(
  amount: string | number | undefined,
  decimals: number = 18
) {
  // @ts-ignore
  const fixedAmount = fixedDecimals(amount.toString(), decimals);
  return utils.parseUnits(fixedAmount || "0", decimals);
}
