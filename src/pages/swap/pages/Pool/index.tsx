import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom-v5";
import { ThemeContext } from "styled-components";
import { Pair } from "uniswap-v2-sdk-scroll";
import { useWeb3Context } from "@/contexts/Web3ContextProvider";
import { SwapPoolTabs } from "../../components/NavigationTabs";

import { Text } from "rebass";
import { ButtonPrimary } from "../../components/Button";
import { LightCard } from "../../components/Card";
import { AutoColumn } from "../../components/Column";
import FullPositionCard from "../../components/PositionCard";
import Question from "../../components/QuestionHelper";
import { RowBetween } from "../../components/Row";
import { useTokenBalancesWithLoadingIndicator } from "../../state/wallet/hooks";
import { TYPE } from "../../theme";

import { Dots } from "../../components/swap/styleds";
import { usePairs } from "../../data/Reserves";
import {
  toV2LiquidityToken,
  useTrackedTokenPairs,
} from "../../state/user/hooks";
import AppBody from "../AppBody";

export default function Pool() {
  const theme = useContext(ThemeContext);
  const { walletCurrentAddress } = useWeb3Context();

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs();
  const tokenPairsWithLiquidityTokens = useMemo(
    () =>
      trackedTokenPairs.map((tokens) => ({
        liquidityToken: toV2LiquidityToken(tokens),
        tokens,
      })),
    [trackedTokenPairs]
  );
  const liquidityTokens = useMemo(
    () => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken),
    [tokenPairsWithLiquidityTokens]
  );
  const [
    v2PairsBalances,
    fetchingV2PairBalances,
  ] = useTokenBalancesWithLoadingIndicator(
    walletCurrentAddress ?? undefined,
    liquidityTokens
  );

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan("0")
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances]
  );

  const v2Pairs = usePairs(
    liquidityTokensWithBalances.map(({ tokens }) => tokens)
  );
  const v2IsLoading =
    fetchingV2PairBalances ||
    v2Pairs?.length < liquidityTokensWithBalances.length ||
    v2Pairs?.some((V2Pair) => !V2Pair);

  const allV2PairsWithLiquidity = v2Pairs
    .map(([, pair]) => pair)
    .filter((v2Pair): v2Pair is Pair => Boolean(v2Pair));

  return (
    <>
      <AppBody>
        <SwapPoolTabs active={"pool"} />
        <AutoColumn gap="lg" justify="center">
          <ButtonPrimary
            id="join-pool-button"
            as={Link}
            style={{ padding: 16, color: "#fff" }}
            to="/add/ETH"
          >
            <Text fontWeight={500} fontSize={20}>
              Add Liquidity
            </Text>
          </ButtonPrimary>

          <AutoColumn gap="12px" style={{ width: "100%" }}>
            <RowBetween padding={"0 8px"}>
              <Text color={theme.text1} fontWeight={500}>
                Your Liquidity
              </Text>
              <Question text="When you add liquidity, you are given pool tokens that represent your share. If you don’t see a pool you joined in this list, try importing a pool below." />
            </RowBetween>

            {!walletCurrentAddress ? (
              <LightCard padding="40px">
                <TYPE.body color={theme.text3} textAlign="center">
                  Connect to a wallet to view your liquidity.
                </TYPE.body>
              </LightCard>
            ) : v2IsLoading ? (
              <LightCard padding="40px">
                <TYPE.body color={theme.text3} textAlign="center">
                  <Dots>Loading</Dots>
                </TYPE.body>
              </LightCard>
            ) : allV2PairsWithLiquidity?.length > 0 ? (
              <>
                {allV2PairsWithLiquidity.map((v2Pair) => (
                  <FullPositionCard
                    key={v2Pair.liquidityToken.address}
                    pair={v2Pair}
                  />
                ))}
              </>
            ) : (
              <LightCard padding="40px">
                <TYPE.body color={theme.text3} textAlign="center">
                  No liquidity found.
                </TYPE.body>
              </LightCard>
            )}
          </AutoColumn>
        </AutoColumn>
      </AppBody>
    </>
  );
}
