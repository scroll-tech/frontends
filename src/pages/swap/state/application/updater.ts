import { useCallback, useEffect, useState } from "react";
import { useWeb3Context } from "@/contexts/Web3ContextProvider";
import useDebounce from "../../hooks/useDebounce";
import useIsWindowVisible from "../../hooks/useIsWindowVisible";
import { updateBlockNumber } from "./actions";
import { useDispatch } from "react-redux";

export default function Updater(): null {
  const { provider, chainId } = useWeb3Context();
  const dispatch = useDispatch();

  const windowVisible = useIsWindowVisible();

  const [state, setState] = useState<{
    chainId: number | undefined;
    blockNumber: number | null;
  }>({
    chainId,
    blockNumber: null,
  });

  const blockNumberCallback = useCallback(
    (blockNumber: number) => {
      setState((state) => {
        if (chainId === state.chainId) {
          if (typeof state.blockNumber !== "number")
            return { chainId, blockNumber };
          return {
            chainId,
            blockNumber: Math.max(blockNumber, state.blockNumber),
          };
        }
        return state;
      });
    },
    [chainId, setState]
  );

  // attach/detach listeners
  useEffect(() => {
    if (!provider || !chainId || !windowVisible) return undefined;

    setState({ chainId, blockNumber: null });

    provider
      .getBlockNumber()
      .then(blockNumberCallback)
      .catch((error) =>
        console.error(
          `Failed to get block number for chainId: ${chainId}`,
          error
        )
      );

    provider.on("block", blockNumberCallback);
    return () => {
      provider.removeListener("block", blockNumberCallback);
    };
  }, [dispatch, chainId, provider, blockNumberCallback, windowVisible]);

  const debouncedState = useDebounce(state, 100);

  useEffect(() => {
    if (
      !debouncedState.chainId ||
      !debouncedState.blockNumber ||
      !windowVisible
    )
      return;
    dispatch(
      updateBlockNumber({
        chainId: debouncedState.chainId,
        blockNumber: debouncedState.blockNumber,
      })
    );
  }, [
    windowVisible,
    dispatch,
    debouncedState.blockNumber,
    debouncedState.chainId,
  ]);

  return null;
}
