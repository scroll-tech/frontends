import { useEffect, useState } from "react"

import { useRainbowContext } from "@/contexts/RainbowProvider"
import { useIsSmartContractWallet, usePriceFee } from "@/hooks"
import { toTokenDisplay } from "@/utils"

function useSufficientBalance(
  selectedToken: any,
  networksAndSigner?: any,
  amount?: bigint,
  estimatedGasCost?: bigint,
  tokenBalance: bigint = BigInt(0),
  isCorrectNetwork?: boolean,
) {
  const { walletCurrentAddress } = useRainbowContext()
  const [sufficientBalance, setSufficientBalance] = useState(false)
  const [warning, setWarning] = useState("")
  const { isSmartContractWallet } = useIsSmartContractWallet()
  const { getPriceFee } = usePriceFee()

  useEffect(() => {
    async function checkEnoughBalance() {
      if (!isCorrectNetwork) {
        return
      }
      if (!(amount && networksAndSigner && networksAndSigner.signer)) {
        setWarning("")
        return setSufficientBalance(false)
      }

      let totalCost: bigint
      let fee: bigint
      let enoughFeeBalance: boolean
      let enoughTokenBalance: boolean
      let message: string = ""

      if (selectedToken.native) {
        fee = await getPriceFee()
        totalCost = amount + (estimatedGasCost ?? BigInt(0)) + fee
        enoughFeeBalance = tokenBalance >= totalCost
        enoughTokenBalance = enoughFeeBalance
      } else {
        const nativeTokenBalance = await networksAndSigner.provider.getBalance(walletCurrentAddress)
        fee = await getPriceFee()
        totalCost = (estimatedGasCost ?? BigInt(0)) + fee
        enoughFeeBalance = nativeTokenBalance >= totalCost
        enoughTokenBalance = tokenBalance >= amount
      }

      if (enoughFeeBalance && enoughTokenBalance) {
        setWarning("")
        return setSufficientBalance(true)
      }

      if (!tokenBalance) {
        message = `Insufficient balance. Your account has 0 ${selectedToken.symbol}.`
      } else if (!enoughFeeBalance) {
        const diff = tokenBalance - fee - (estimatedGasCost ?? BigInt(0))
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
  }, [networksAndSigner, amount?.toString(), estimatedGasCost?.toString(), tokenBalance.toString()])

  return {
    sufficientBalance,
    warning,
  }
}
export default useSufficientBalance
