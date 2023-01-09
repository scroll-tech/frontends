import React, { Fragment, memo, useContext } from "react"
import { ChevronRight } from "react-feather"
import { Flex } from "rebass"
import { ThemeContext } from "styled-components"
import { Trade } from "uniswap-v2-sdk-scroll"

import { TYPE } from "../../theme"
import CurrencyLogo from "../CurrencyLogo"

export default memo(function SwapRoute({ trade }: { trade: Trade }) {
  const theme = useContext(ThemeContext)
  return (
    <Flex
      px="1.6rem"
      py="0.8rem"
      my="0.8rem"
      style={{ border: `1px solid ${theme.bg3}`, borderRadius: "1.6rem" }}
      flexWrap="wrap"
      width="100%"
      justifyContent="space-evenly"
      alignItems="center"
    >
      {trade.route.path.map((token, i, path) => {
        const isLastItem: boolean = i === path.length - 1
        return (
          <Fragment key={i}>
            <Flex my="0.8rem" alignItems="center" style={{ flexShrink: 0 }}>
              <CurrencyLogo currency={token} size="2.4rem" />
              <TYPE.black fontSize={14} color={theme.text1} ml="0.8rem">
                {token.symbol}
              </TYPE.black>
            </Flex>
            {isLastItem ? null : <ChevronRight color={theme.text2} />}
          </Fragment>
        )
      })}
    </Flex>
  )
})
