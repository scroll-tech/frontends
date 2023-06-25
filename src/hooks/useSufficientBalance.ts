import { useEffect, useState } from "react"

import { useRainbowContext } from "@/contexts/RainbowProvider"
import { useIsSmartContractWallet, usePriceFee } from "@/hooks"
import { toTokenDisplay } from "@/utils"

function useSufficientBalance(
  selectedToken: any,
  token?: any,
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
      if (!(amount && token && token.signer)) {
        setWarning("")
        return setSufficientBalance(false)
      }

      let totalCost: bigint
      let enoughFeeBalance: boolean
      let enoughTokenBalance: boolean
      let message: string = ""

      const ntb = await token.provider.getBalance(walletCurrentAddress)

      if (!estimatedGasCost) {
        const { maxFeePerGas: gasPrice } = await token.provider.getFeeData()
        estimatedGasCost = BigInt(200e3) * (gasPrice || BigInt(1e9))
      }

      if (selectedToken.native) {
        totalCost = estimatedGasCost + amount
        const isLayer1 = token.network.isLayer1
        const fee = await getPriceFee(selectedToken, isLayer1)
        totalCost = totalCost + fee
        enoughFeeBalance = ntb >= totalCost
        enoughTokenBalance = enoughFeeBalance
      } else {
        totalCost = estimatedGasCost
        const isLayer1 = token.network.isLayer1
        const fee = await getPriceFee(selectedToken, isLayer1)
        totalCost = totalCost + fee
        enoughFeeBalance = ntb >= totalCost
        enoughTokenBalance = tokenBalance >= amount
      }

      if (enoughFeeBalance && enoughTokenBalance) {
        setWarning("")
        return setSufficientBalance(true)
      }

      if (!enoughFeeBalance) {
        const diff = totalCost - ntb
        message = `Insufficient balance to cover the cost of tx. Please add ${
          selectedToken.symbol
        } to pay for tx fees or reduce the amount by approximately ${toTokenDisplay(diff)} ${selectedToken.symbol}`

        if (!selectedToken.native) {
          message = "Insufficient balance to cover the cost of tx. Please add ETH to pay for tx fees."
        }
      } else if (!enoughTokenBalance) {
        message = `Insufficient ${selectedToken.symbol} balance.`
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
  }, [token, amount?.toString(), estimatedGasCost?.toString(), tokenBalance.toString()])

  return {
    sufficientBalance,
    warning,
  }
}
export default useSufficientBalance
