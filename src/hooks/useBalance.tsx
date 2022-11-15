import { useQuery } from "react-query";
import { ethers } from "ethers";
import { ChainId } from "@/constants";
import { useWeb3Context } from "@/contexts/Web3ContextProvider";

import L1_erc20ABI from "@/assets/abis/L1_erc20ABI.json";
import L2_erc20ABI from "@/assets/abis/L2_erc20ABI.json";

async function fetchBalance(
  token: any,
  networksAndSigners: any,
  network: any,
  address: any
) {
  try {
    if (network.isLayer1) {
      if (token.isNativeToken) {
        return await networksAndSigners[
          ChainId.SCROLL_LAYER_1
        ].provider.getBalance(address);
      } else {
        const l1ERC20 = new ethers.Contract(
          token.address[ChainId.SCROLL_LAYER_1],
          L1_erc20ABI,
          networksAndSigners[ChainId.SCROLL_LAYER_1].provider
        );
        return await l1ERC20.balanceOf(address);
      }
    } else {
      if (token.isNativeToken) {
        return await networksAndSigners[
          ChainId.SCROLL_LAYER_2
        ].provider.getBalance(address);
      } else {
        const l2ERC20 = new ethers.Contract(
          token.address[ChainId.SCROLL_LAYER_2],
          L1_erc20ABI,
          networksAndSigners[ChainId.SCROLL_LAYER_2].provider
        );
        return await l2ERC20.balanceOf(address);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

const useBalance = (token: any, networksAndSigners?: any, network?: any) => {
  const { walletCurrentAddress, chainId } = useWeb3Context();
  const queryKey = `${token?.symbol}:${network?.name}:${walletCurrentAddress}:${chainId}`;
  const { isLoading, isError, data, error } = useQuery(
    [queryKey],
    async () => {
      if (token && walletCurrentAddress) {
        return await fetchBalance(
          token,
          networksAndSigners,
          network,
          walletCurrentAddress
        );
      }
    },
    {
      enabled:
        !!networksAndSigners[ChainId.SCROLL_LAYER_1].provider &&
        !!networksAndSigners[ChainId.SCROLL_LAYER_2].provider,
      refetchInterval: 3e3,
    }
  );

  return { loading: isLoading, isError, balance: data, error };
};

export default useBalance;
