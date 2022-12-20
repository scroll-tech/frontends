import { useEffect } from "react"
import styled from "styled-components"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import { useWalletModalOpen, useWalletModalToggle } from "../../state/application/hooks"
import { Addresses } from "@/constants"
import { SUPPORTED_CHAINID } from "../../constants"
import AccountDetails from "../AccountDetails"
import Modal from "../Modal"

const Wrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  margin: 0;
  padding: 0;
  width: 100%;
`

export default function WalletModal({
  pendingTransactions,
  confirmedTransactions,
  ENSName,
}: {
  pendingTransactions: string[] // hashes of pending
  confirmedTransactions: string[] // hashes of confirmed
  ENSName?: string
}) {
  const { chainId } = useWeb3Context()

  const walletModalOpen = useWalletModalOpen()
  const toggleWalletModal = useWalletModalToggle()

  const switchToL2 = () => {
    ;(window?.ethereum as any).request({
      method: "wallet_addEthereumChain",
      params: [Addresses[SUPPORTED_CHAINID].autoconnect],
    })
  }

  // always reset to account view
  useEffect(() => {
    if (walletModalOpen && chainId !== SUPPORTED_CHAINID) {
      toggleWalletModal()
      switchToL2()
    }
  }, [walletModalOpen, chainId])

  function getModalContent() {
    return (
      <AccountDetails
        toggleWalletModal={toggleWalletModal}
        pendingTransactions={pendingTransactions}
        confirmedTransactions={confirmedTransactions}
        ENSName={ENSName}
        openOptions={() => {}}
      />
    )
  }

  return (
    <Modal isOpen={walletModalOpen} onDismiss={toggleWalletModal} minHeight={false} maxHeight={90}>
      <Wrapper>{getModalContent()}</Wrapper>
    </Modal>
  )
}
