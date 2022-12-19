import { isMobile } from "react-device-detect";
import { Text } from "rebass";
import { ChainId } from "uniswap-v2-sdk-scroll";

import styled from "styled-components";
import { useWeb3Context } from "@/contexts/Web3ContextProvider";
import Logo from "../../assets/images/logo.png";
import { useDarkModeManager } from "../../state/user/hooks";
import { useETHBalances } from "../../state/wallet/hooks";
import { YellowCard } from "../Card";
import Settings from "../Settings";

import React from "react";
import { RowBetween } from "../Row";
import Web3Status from "../Web3Status";

const HeaderFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  top: 0;
  // position: absolute;
  z-index: 2;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 12px 0 0 0;
    width: calc(100%);
    position: relative;
  `};
`;

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: 0.8rem;
`};
`;

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;

  :hover {
    cursor: pointer;
  }
`;

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg3)};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;

  :focus {
    border: 1px solid blue;
  }
`;

const TestnetWrapper = styled.div`
  white-space: nowrap;
  width: fit-content;
  margin-left: 10px;
  pointer-events: auto;
`;

const NetworkCard = styled(YellowCard)`
  width: fit-content;
  margin-right: 10px;
  border-radius: 12px;
  padding: 8px 12px;
`;

const UniIcon = styled.div`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    img { 
      width: 7.2rem;
    }
  `};
`;

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    align-items: flex-end;
  `};
`;

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`;
const NETWORK_LABELS: { [chainId in ChainId]: string | null } = {
  [ChainId.MAINNET]: null,
  [ChainId.RINKEBY]: "Rinkeby",
  [ChainId.ROPSTEN]: "Ropsten",
  [ChainId.GÖRLI]: "Görli",
  [ChainId.KOVAN]: "Kovan",
  [ChainId.TEST]: "Scroll L2",
};

export default function Header() {
  const { walletCurrentAddress, chainId } = useWeb3Context();

  const [darkMode] = useDarkModeManager();

  const userEthBalance = useETHBalances(
    walletCurrentAddress ? [walletCurrentAddress] : []
  )?.[walletCurrentAddress ?? ""];

  return (
    <div style={{ display: "block", width: "100%" }}>
      <HeaderFrame>
        <RowBetween
          style={{
            alignItems: "flex-start",
            justifyContent: "end",
            paddingTop: 0,
            marginTop: "40px",
          }}
          padding="1.6rem 1.6rem 0 1.6rem"
        >
          <HeaderElement style={{ display: "none" }}>
            {/* TODO: ENV */}
            <Title
              href={process.env.REACT_APP_HOME_URI}
              style={{ textDecoration: "none" }}
            >
              <UniIcon>
                <img src={Logo} style={{ width: "50px" }} alt="logo" />
              </UniIcon>
            </Title>
            <Title href="." style={{ textDecoration: "none" }}>
              <Text
                style={{
                  color: darkMode ? "#fff" : "#000",
                  fontWeight: 500,
                  fontSize: "20px",
                  paddingLeft: "6px",
                }}
              >
                Scroll Swap
              </Text>
            </Title>
          </HeaderElement>
          <HeaderControls>
            <HeaderElement>
              <TestnetWrapper>
                {!isMobile && chainId && NETWORK_LABELS[chainId] && (
                  <NetworkCard>{NETWORK_LABELS[chainId]}</NetworkCard>
                )}
              </TestnetWrapper>
              <AccountElement
                active={!!walletCurrentAddress}
                style={{ pointerEvents: "auto" }}
              >
                {walletCurrentAddress && userEthBalance ? (
                  <BalanceText
                    style={{ flexShrink: 0 }}
                    pl="1.2rem"
                    pr="0.8rem"
                    fontWeight={500}
                  >
                    {userEthBalance?.toSignificant(4)} ETH
                  </BalanceText>
                ) : null}
                <Web3Status />
              </AccountElement>
            </HeaderElement>
            <HeaderElementWrap>
              <Settings />
            </HeaderElementWrap>
          </HeaderControls>
        </RowBetween>
      </HeaderFrame>
    </div>
  );
}
