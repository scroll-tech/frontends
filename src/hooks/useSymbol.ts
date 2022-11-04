import { ethers } from "ethers";
import useSWR from "swr";
import { useWeb3Context } from "@/contexts/Web3ContextProvider";
import L1_erc20ABI from "@/assets/abis/L1_erc20ABI.json";
import { loadState, saveState } from "@/utils/localStorage";

const TokenSymbolMapKey = "tokenSymbolMap";

const useSymbol = (address: string) => {
  const { provider } = useWeb3Context();
  const { data, error } = useSWR(
    () => (provider ? { address, provider } : null),
    async ({ address, provider }) => {
      if (!address) {
        return "ETH";
      }
      const symbolMap = loadState(TokenSymbolMapKey);
      if (symbolMap?.[address]) {
        return symbolMap[address];
      }
      const erc20 = new ethers.Contract(address, L1_erc20ABI, provider);
      const tokenSymbol = await erc20.symbol();
      saveState(TokenSymbolMapKey, { ...symbolMap, [address]: tokenSymbol });
      return tokenSymbol;
    }
  );

  return { loading: !data && !error, symbol: data };
};

export default useSymbol;
