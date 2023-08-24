import { useEffect, useState } from "react"

import { useApp } from "@/contexts/AppContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { useIsSmartContractWallet } from "@/hooks"
import useBridgeStore from "@/stores/bridgeStore"
import { toTokenDisplay } from "@/utils"

function useSufficientBalance(selectedToken: any, amount?: bigint, fee?: bigint, tokenBalance: bigint = BigInt(0)) {
  const { walletCurrentAddress, chainId } = useRainbowContext()
  const { networksAndSigners } = useApp()
  const networksAndSigner = networksAndSigners[chainId as number]

  const { isNetworkCorrect } = useBridgeStore()
  const [, setSufficientBalance] = useState(false)
  const [warning, setWarning] = useState("")
  const { isSmartContractWallet } = useIsSmartContractWallet()

  useEffect(() => {
    async function checkEnoughBalance() {
      if (!isNetworkCorrect || !amount) {
        setWarning("")
        return
      }

      let enoughFeeBalance: boolean
      let enoughTokenBalance: boolean
      let message: string = ""

      const totalFee = fee ?? BigInt(0)

      if (selectedToken.native) {
        const totalCost = amount + totalFee

        enoughFeeBalance = tokenBalance >= totalCost
        enoughTokenBalance = enoughFeeBalance
      } else {
        const nativeTokenBalance = await networksAndSigner.provider.getBalance(walletCurrentAddress)

        enoughFeeBalance = nativeTokenBalance >= totalFee
        enoughTokenBalance = tokenBalance >= amount
      }

      if (enoughFeeBalance && enoughTokenBalance) {
        setWarning("")
        return setSufficientBalance(true)
      }

      if (!tokenBalance) {
        message = `Insufficient balance. Your account has 0 ${selectedToken.symbol}.`
      } else if (!enoughFeeBalance) {
        const diff = tokenBalance - totalFee
        message = `Insufficient balance to cover the cost of tx. The amount should be less than ${toTokenDisplay(
          diff,
          selectedToken.decimals,
          selectedToken.symbol,
        )}`

        if (!selectedToken.native) {
          message = "Insufficient balance to cover the tx fee. Please add ETH to pay for tx fees."
        }
      } else if (!enoughTokenBalance) {
        message = `Insufficient balance. The amount should be less than ${toTokenDisplay(tokenBalance, selectedToken.decimals, selectedToken.symbol)}`
      }

      setWarning(message)
      setSufficientBalance(false)
    }

    // NOTE: For now, no accommodations are made for the tx sender
    // if they do not have enough funds to pay for the relay tx.
    // It's kind of complicated to handle, because for the case when the SC wallet has more than owner
    // is not possible to know who of them will be the one who executes the TX.
    // We will trust on the wallet UI to handle this issue for now.
    if (isSmartContractWallet) {
      setSufficientBalance(true)
    } else {
      checkEnoughBalance()
    }
  }, [networksAndSigner, amount, fee, tokenBalance])

  return {
    insufficientWarning: warning,
  }
}
export default useSufficientBalance
