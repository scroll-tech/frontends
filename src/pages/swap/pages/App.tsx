import React, { Suspense } from "react"
import { HashRouter, Route, Switch } from "react-router-dom-v5"
import styled from "styled-components"

import Header from "../components/Header"
// import Popups from '../components/Popups'
import DarkModeQueryParamReader from "../theme/DarkModeQueryParamReader"
import AddLiquidity from "./AddLiquidity"
import { RedirectDuplicateTokenIds, RedirectOldAddLiquidityPathStructure, RedirectToAddLiquidity } from "./AddLiquidity/redirects"
import MigrateV1 from "./MigrateV1"
import MigrateV1Exchange from "./MigrateV1/MigrateV1Exchange"
import RemoveV1Exchange from "./MigrateV1/RemoveV1Exchange"
import Pool from "./Pool"
import PoolFinder from "./PoolFinder"
import RemoveLiquidity from "./RemoveLiquidity"
import { RedirectOldRemoveLiquidityPathStructure } from "./RemoveLiquidity/redirects"
import Swap from "./Swap"
import { RedirectPathToSwapOnly, RedirectToSwap } from "./Swap/redirects"

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
  min-height: 60vh;
  margin-bottom: 10vh;
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 80px;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      padding: 16px;
  `};

  z-index: 0;
`

const Marginer = styled.div`
  margin-top: 5rem;
`

export default function App() {
  return (
    <Suspense fallback={null}>
      <HashRouter>
        <Route component={DarkModeQueryParamReader} />
        <AppWrapper>
          <HeaderWrapper>
            <Header />
          </HeaderWrapper>
          <BodyWrapper>
            {/* <Popups /> */}
            <Switch>
              <Route exact strict path="/" component={Swap} />
              <Route exact strict path="/swap" component={RedirectToSwap} />
              <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
              <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
              <Route exact strict path="/find" component={PoolFinder} />
              <Route exact strict path="/pool" component={Pool} />
              <Route exact strict path="/create" component={RedirectToAddLiquidity} />
              <Route exact path="/add" component={AddLiquidity} />
              <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
              <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
              <Route exact strict path="/remove/v1/:address" component={RemoveV1Exchange} />
              <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
              <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
              <Route exact strict path="/migrate/v1" component={MigrateV1} />
              <Route exact strict path="/migrate/v1/:address" component={MigrateV1Exchange} />
              <Route component={RedirectPathToSwapOnly} />
            </Switch>
            <Marginer />
          </BodyWrapper>
        </AppWrapper>
      </HashRouter>
    </Suspense>
  )
}
