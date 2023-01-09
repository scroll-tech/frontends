import { darken, lighten } from "polished"
import { useMemo } from "react"
import { Activity } from "react-feather"
import styled, { css } from "styled-components"

import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import { switchNetwork } from "@/utils"

import { SUPPORTED_CHAINID } from "../../constants"
import useENSName from "../../hooks/useENSName"
import { useHasSocks } from "../../hooks/useSocksBalance"
import { useWalletModalToggle } from "../../state/application/hooks"
import { isTransactionRecent, useAllTransactions } from "../../state/transactions/hooks"
import { TransactionDetails } from "../../state/transactions/reducer"
import { shortenAddress } from "../../utils"
import { ButtonSecondary } from "../Button"
import Identicon from "../Identicon"
import Loader from "../Loader"
import { RowBetween } from "../Row"
import WalletModal from "../WalletModal"

const Web3StatusGeneric = styled(ButtonSecondary)`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  align-items: center;
  padding: 0.8rem;
  border-radius: 12px;
  cursor: pointer;
  user-select: none;
  :focus {
    outline: none;
  }
`
const Web3StatusError = styled(Web3StatusGeneric)`
  background-color: ${({ theme }) => theme.red1};
  border: 1px solid ${({ theme }) => theme.red1};
  color: ${({ theme }) => theme.white};
  font-weight: 500;
  :hover,
  :focus {
    background-color: ${({ theme }) => darken(0.1, theme.red1)};
  }
`

const Web3StatusConnect = styled(Web3StatusGeneric)<{ faded?: boolean }>`
  background-color: ${({ theme }) => theme.primary4};
  border: none;
  color: ${({ theme }) => theme.primaryText1};
  font-weight: 500;

  :hover,
  :focus {
    border: 1px solid ${({ theme }) => darken(0.05, theme.primary4)};
    color: ${({ theme }) => theme.primaryText1};
  }

  ${({ faded }) =>
    faded &&
    css`
      background-color: ${({ theme }) => theme.primary5};
      border: 1px solid ${({ theme }) => theme.primary5};
      color: ${({ theme }) => theme.primaryText1};

      :hover,
      :focus {
        border: 1px solid ${({ theme }) => darken(0.05, theme.primary4)};
        color: ${({ theme }) => darken(0.05, theme.primaryText1)};
      }
    `}
`

const Web3StatusConnected = styled(Web3StatusGeneric)<{ pending?: boolean }>`
  background-color: ${({ pending, theme }) => (pending ? theme.primary1 : theme.bg2)};
  border: 1px solid ${({ pending, theme }) => (pending ? theme.primary1 : theme.bg3)};
  color: ${({ pending, theme }) => (pending ? theme.white : theme.text1)};
  font-weight: 500;
  :hover,
  :focus {
    background-color: ${({ pending, theme }) => (pending ? darken(0.05, theme.primary1) : lighten(0.05, theme.bg2))};

    :focus {
      border: 1px solid ${({ pending, theme }) => (pending ? darken(0.1, theme.primary1) : darken(0.1, theme.bg3))};
    }
  }
`

const Text = styled.p`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 0.8rem 0 0.4rem;
  font-size: 1.6rem;
  width: fit-content;
  font-weight: 500;
`

const NetworkIcon = styled(Activity)`
  margin-left: 0.4rem;
  margin-right: 0.8rem;
  width: 16px;
  height: 16px;
`

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}

const SOCK = (
  <span role="img" aria-label="has socks emoji" style={{ marginTop: -4, marginBottom: -4 }}>
    🧦
  </span>
)

// eslint-disable-next-line react/prop-types
function StatusIcon() {
  return <Identicon />
}

function Web3StatusInner() {
  const { walletCurrentAddress, checkConnectedChainId, connectWallet } = useWeb3Context()

  const { ENSName } = useENSName(walletCurrentAddress ?? undefined)
  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions.filter(tx => !tx.receipt).map(tx => tx.hash)

  const hasPendingTransactions = !!pending.length
  const hasSocks = useHasSocks()
  const toggleWalletModal = useWalletModalToggle()

  const handleSwitchNetwork = async () => {
    try {
      await switchNetwork(SUPPORTED_CHAINID)
    } catch (error) {
      console.log(error)
    }
  }

  const handleConnectWallet = async () => {
    connectWallet()
    switchNetwork(SUPPORTED_CHAINID)
  }

  if (checkConnectedChainId(SUPPORTED_CHAINID)) {
    return (
      <Web3StatusConnected id="web3-status-connected" onClick={toggleWalletModal} pending={hasPendingTransactions}>
        {hasPendingTransactions ? (
          <RowBetween>
            <Text>{pending?.length} Pending</Text> <Loader stroke="white" />
          </RowBetween>
        ) : (
          <>
            {hasSocks ? SOCK : null}
            <Text>{ENSName || shortenAddress(walletCurrentAddress as string)}</Text>
          </>
        )}
        {!hasPendingTransactions && <StatusIcon />}
      </Web3StatusConnected>
    )
  } else if (walletCurrentAddress) {
    return (
      <Web3StatusError onClick={handleSwitchNetwork}>
        <NetworkIcon />
        <Text>Wrong Network</Text>
      </Web3StatusError>
    )
  }
  return (
    <Web3StatusConnect id="connect-wallet" onClick={handleConnectWallet} faded={!walletCurrentAddress}>
      <Text>Connect wallet</Text>
    </Web3StatusConnect>
  )
}

export default function Web3Status() {
  const { walletCurrentAddress } = useWeb3Context()

  const { ENSName } = useENSName(walletCurrentAddress ?? undefined)

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions.filter(tx => !tx.receipt).map(tx => tx.hash)
  const confirmed = sortedRecentTransactions.filter(tx => tx.receipt).map(tx => tx.hash)

  return (
    <>
      <Web3StatusInner />
      <WalletModal ENSName={ENSName ?? undefined} pendingTransactions={pending} confirmedTransactions={confirmed} />
    </>
  )
}
