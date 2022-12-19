export function filterByHash(txs, hash: string = "") {
  return txs.filter((tx) => tx.hash !== hash);
}
