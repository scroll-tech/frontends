export const truncateAddress = (address: string): string => {
  return address.slice(0, 6) + "..." + address.slice(38, 42);
};

export const truncateHash = (hash: string) => {
  return `${hash.substring(0, 6)}…${hash.substring(62, 66)}`;
};

export const convertHexadecimal = (value: string): number => {
  return parseInt(value, 16);
};
