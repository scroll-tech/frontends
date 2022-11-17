import { useMemo } from "react";
import { JSBI } from "uniswap-v2-sdk-scroll";
import { NEVER_RELOAD, useSingleCallResult } from "../state/multicall/hooks";
import { useWeb3Context } from "@/contexts/Web3ContextProvider";
import { useSocksController } from "./useContract";

export default function useSocksBalance(): JSBI | undefined {
  const { walletCurrentAddress } = useWeb3Context();
  const socksContract = useSocksController();

  const { result } = useSingleCallResult(
    socksContract,
    "balanceOf",
    [walletCurrentAddress ?? undefined],
    NEVER_RELOAD
  );
  const data = result?.[0];
  return data ? JSBI.BigInt(data.toString()) : undefined;
}

export function useHasSocks(): boolean | undefined {
  const balance = useSocksBalance();
  return useMemo(() => balance && JSBI.greaterThan(balance, JSBI.BigInt(0)), [
    balance,
  ]);
}
