import React, { useContext } from "react"
import { Link, RouteComponentProps, withRouter } from "react-router-dom-v5"
import { Token, TokenAmount, WETH } from "uniswap-v2-sdk-scroll"

import { Text } from "rebass"
import { ThemeContext } from "styled-components"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import { ButtonSecondary } from "../Button"
import { AutoColumn } from "../Column"
import DoubleCurrencyLogo from "../DoubleLogo"
import { RowBetween, RowFixed } from "../Row"
import { FixedHeightRow, HoverCard } from "./index"

interface PositionCardProps extends RouteComponentProps<{}> {
  token: Token
  V1LiquidityBalance: TokenAmount
}

function V1PositionCard({ token, V1LiquidityBalance }: PositionCardProps) {
  const theme = useContext(ThemeContext)

  const { chainId } = useWeb3Context()

  return (
    <HoverCard>
      <AutoColumn gap="12px">
        <FixedHeightRow>
          <RowFixed>
            <DoubleCurrencyLogo currency0={token} margin={true} size={20} />
            <Text fontWeight={500} fontSize={20} style={{ marginLeft: "" }}>
              {`${chainId && token.equals(WETH[chainId]) ? "WETH" : token.symbol}/${process.env.REACT_APP_ETH_SYMBOL}`}
            </Text>
            <Text
              fontSize={12}
              fontWeight={500}
              ml="0.8rem"
              px="1.2rem"
              py="0.4rem"
              style={{ borderRadius: "1.6rem" }}
              backgroundColor={theme.yellow1}
              color={"black"}
            >
              V1
            </Text>
          </RowFixed>
        </FixedHeightRow>

        <AutoColumn gap="8px">
          <RowBetween marginTop="10px">
            <ButtonSecondary width="68%" as={Link} to={`/migrate/v1/${V1LiquidityBalance.token.address}`}>
              Migrate
            </ButtonSecondary>

            <ButtonSecondary style={{ backgroundColor: "transparent" }} width="28%" as={Link} to={`/remove/v1/${V1LiquidityBalance.token.address}`}>
              Remove
            </ButtonSecondary>
          </RowBetween>
        </AutoColumn>
      </AutoColumn>
    </HoverCard>
  )
}

export default withRouter(V1PositionCard)
