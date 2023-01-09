import React, { useCallback, useContext } from "react"
import { ExternalLink as LinkIcon } from "react-feather"
import { useDispatch } from "react-redux"
import styled, { ThemeContext } from "styled-components"

import { useWeb3Context } from "@/contexts/Web3ContextProvider"

import { ReactComponent as Close } from "../../assets/images/x.svg"
import { AppDispatch } from "../../state"
import { clearAllTransactions } from "../../state/transactions/actions"
import { ExternalLink, LinkStyledButton, TYPE } from "../../theme"
import { shortenAddress } from "../../utils"
import { getEtherscanLink } from "../../utils"
import { ButtonSecondary } from "../Button"
import Identicon from "../Identicon"
import { AutoRow } from "../Row"
import Copy from "./Copy"
import Transaction from "./Transaction"

const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1.6rem 1.6rem;
  font-weight: 500;
  color: ${props => (props.color === "blue" ? ({ theme }) => theme.primary1 : "inherit")};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1.6rem;
  `};
`

const UpperSection = styled.div`
  position: relative;

  h5 {
    margin: 0;
    margin-bottom: 0.8rem;
    font-size: 1.6rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`

const InfoCard = styled.div`
  padding: 1.6rem;
  border: 1px solid ${({ theme }) => theme.bg3};
  border-radius: 20px;
  position: relative;
  display: grid;
  grid-row-gap: 12px;
  margin-bottom: 20px;
`

const AccountGroupingRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  color: ${({ theme }) => theme.text1};

  div {
    ${({ theme }) => theme.flexRowNoWrap}
    align-items: center;
  }
`

const AccountSection = styled.div`
  background-color: ${({ theme }) => theme.bg1};
  padding: 0rem 1.6rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`padding: 0rem 1rem 1.5rem 1rem;`};
`

const YourAccount = styled.div`
  h5 {
    margin: 0 0 1.6rem 0;
    font-weight: 400;
  }

  h4 {
    margin: 0;
    font-weight: 500;
  }
`

const LowerSection = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  padding: 2.4rem;
  flex-grow: 1;
  overflow: auto;
  background-color: ${({ theme }) => theme.bg2};
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 20px;

  h5 {
    margin: 0;
    font-weight: 400;
    color: ${({ theme }) => theme.text3};
  }
`

const AccountControl = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 0;
  width: 100%;

  font-weight: 500;
  font-size: 2rem;

  a:hover {
    text-decoration: underline;
  }

  p {
    min-width: 0;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

const AddressLink = styled(ExternalLink)<{ hasENS: boolean; isENS: boolean }>`
  font-size: 1.32rem;
  color: ${({ theme }) => theme.text3};
  margin-left: 1.6rem;
  font-size: 1.32rem;
  display: flex;
  :hover {
    color: ${({ theme }) => theme.text2};
  }
`

const CloseIcon = styled.div`
  position: absolute;
  right: 1.6rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

const CloseColor = styled(Close)`
  path {
    stroke: ${({ theme }) => theme.text4};
  }
`

const WalletName = styled.div`
  width: initial;
  font-size: 1.32rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text3};
`

const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  & > img,
  span {
    height: ${({ size }) => (size ? size + "px" : "32px")};
    width: ${({ size }) => (size ? size + "px" : "32px")};
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: flex-end;
  `};
`

const TransactionListWrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
`

const WalletAction = styled(ButtonSecondary)`
  width: fit-content;
  font-weight: 400;
  margin-left: 8px;
  font-size: 1.32rem;
  padding: 4px 6px;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

function renderTransactions(transactions: string[]) {
  return (
    <TransactionListWrapper>
      {transactions.map((hash, i) => {
        return <Transaction key={i} hash={hash} />
      })}
    </TransactionListWrapper>
  )
}

interface AccountDetailsProps {
  toggleWalletModal: () => void
  pendingTransactions: string[]
  confirmedTransactions: string[]
  ENSName?: string
  openOptions: () => void
}

export default function AccountDetails({ toggleWalletModal, pendingTransactions, confirmedTransactions, ENSName, openOptions }: AccountDetailsProps) {
  const { disconnectWallet, chainId, walletCurrentAddress } = useWeb3Context()
  const theme = useContext(ThemeContext)
  const dispatch = useDispatch<AppDispatch>()

  function formatConnectorName() {
    const { ethereum } = window
    const isMetaMask = !!(ethereum && ethereum.isMetaMask)
    // TODO: need to optimize
    const name = isMetaMask ? "MetaMask" : "BlockWallet"
    return <WalletName>Connected with {name}</WalletName>
  }

  function getStatusIcon() {
    return (
      <IconWrapper size={16}>
        <Identicon />
      </IconWrapper>
    )
  }

  const clearAllTransactionsCallback = useCallback(() => {
    if (chainId) dispatch(clearAllTransactions({ chainId }))
  }, [dispatch, chainId])

  return (
    <>
      <UpperSection>
        <CloseIcon onClick={toggleWalletModal}>
          <CloseColor />
        </CloseIcon>
        <HeaderRow>Account</HeaderRow>
        <AccountSection>
          <YourAccount>
            <InfoCard>
              <AccountGroupingRow>
                {formatConnectorName()}
                <div>
                  <WalletAction
                    style={{
                      fontSize: "1.32rem",
                      fontWeight: 400,
                      marginRight: "8px",
                    }}
                    onClick={disconnectWallet}
                  >
                    Disconnect
                  </WalletAction>
                </div>
              </AccountGroupingRow>
              <AccountGroupingRow id="web3-account-identifier-row">
                <AccountControl>
                  {ENSName ? (
                    <>
                      <div>
                        {getStatusIcon()}
                        <p> {ENSName}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        {getStatusIcon()}
                        <p>{walletCurrentAddress && shortenAddress(walletCurrentAddress)}</p>
                      </div>
                    </>
                  )}
                </AccountControl>
              </AccountGroupingRow>
              <AccountGroupingRow>
                {ENSName ? (
                  <>
                    <AccountControl>
                      <div>
                        {walletCurrentAddress && (
                          <Copy toCopy={walletCurrentAddress}>
                            <span style={{ marginLeft: "4px" }}>Copy Address</span>
                          </Copy>
                        )}
                        {chainId && walletCurrentAddress && (
                          <AddressLink hasENS={!!ENSName} isENS={true} href={getEtherscanLink(chainId, ENSName, "address")}>
                            <LinkIcon size={16} />
                            <span style={{ marginLeft: "4px" }}>View on block explorer</span>
                          </AddressLink>
                        )}
                      </div>
                    </AccountControl>
                  </>
                ) : (
                  <>
                    <AccountControl>
                      <div>
                        {walletCurrentAddress && (
                          <Copy toCopy={walletCurrentAddress}>
                            <span style={{ marginLeft: "4px" }}>Copy Address</span>
                          </Copy>
                        )}
                        {chainId && walletCurrentAddress && (
                          <AddressLink hasENS={!!ENSName} isENS={false} href={getEtherscanLink(chainId, walletCurrentAddress, "address")}>
                            <LinkIcon size={16} />
                            <span style={{ marginLeft: "4px" }}>View on block explorer</span>
                          </AddressLink>
                        )}
                      </div>
                    </AccountControl>
                  </>
                )}
              </AccountGroupingRow>
            </InfoCard>
          </YourAccount>
        </AccountSection>
      </UpperSection>
      {!!pendingTransactions.length || !!confirmedTransactions.length ? (
        <LowerSection>
          <AutoRow mb={"1.6rem"} style={{ justifyContent: "space-between" }}>
            <TYPE.body>Recent Transactions</TYPE.body>
            <LinkStyledButton onClick={clearAllTransactionsCallback}>(clear all)</LinkStyledButton>
          </AutoRow>
          {renderTransactions(pendingTransactions)}
          {renderTransactions(confirmedTransactions)}
        </LowerSection>
      ) : (
        <LowerSection>
          <TYPE.body color={theme.text1}>Your transactions will appear here...</TYPE.body>
        </LowerSection>
      )}
    </>
  )
}
