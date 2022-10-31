import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { useIsSmartContractWallet } from "@/hooks";
import { toTokenDisplay } from "@/utils";

function useSufficientBalance(
  selectedToken: any,
  token?: any,
  amount?: BigNumber,
  estimatedGasCost?: BigNumber,
  tokenBalance: BigNumber = BigNumber.from(0)
) {
  const [sufficientBalance, setSufficientBalance] = useState(false);
  const [warning, setWarning] = useState("");
  const { isSmartContractWallet } = useIsSmartContractWallet();

  useEffect(() => {
    async function checkEnoughBalance() {
      if (!(amount && token && token.signer)) {
        setWarning("");
        return setSufficientBalance(false);
      }

      let totalCost: BigNumber;
      let enoughFeeBalance: boolean;
      let enoughTokenBalance: boolean;
      let message: string = "";

      const ntb = await token.signer.getBalance();

      if (!estimatedGasCost) {
        const gasPrice = await token.signer.getGasPrice();
        estimatedGasCost = BigNumber.from(200e3).mul(gasPrice || 1e9);
      }

      if (selectedToken.isNativeToken) {
        totalCost = estimatedGasCost.add(amount);
        enoughFeeBalance = ntb.gte(totalCost);
        enoughTokenBalance = enoughFeeBalance;
      } else {
        totalCost = estimatedGasCost;
        enoughFeeBalance = ntb.gte(totalCost);
        enoughTokenBalance = tokenBalance.gte(amount);
      }

      if (enoughFeeBalance && enoughTokenBalance) {
        setWarning("");
        return setSufficientBalance(true);
      }

      if (!enoughFeeBalance) {
        const diff = totalCost.sub(ntb);
        message = `Insufficient balance to cover the cost of tx. Please add ${
          selectedToken.symbol
        } to pay for tx fees or reduce the amount by approximately ${toTokenDisplay(
          diff
        )} ${selectedToken.symbol}`;

        if (!selectedToken.isNativeToken) {
          message =
            "Insufficient balance to cover the cost of tx. Please add ETH to pay for tx fees.";
        }
      } else if (!enoughTokenBalance) {
        message = `Insufficient ${selectedToken.symbol} balance.`;
      }

      setWarning(message);
      setSufficientBalance(false);
    }

    // NOTE: For now, no accommodations are made for the tx sender
    // if they do not have enough funds to pay for the relay tx.
    // It's kind of complicated to handle, because for the case when the SC wallet has more than owner
    // is not possible to know who of them will be the one who executes the TX.
    // We will trust on the wallet UI to handle this issue for now.
    if (isSmartContractWallet) {
      setSufficientBalance(true);
    } else {
      checkEnoughBalance();
    }
  }, [
    token,
    amount?.toString(),
    estimatedGasCost?.toString(),
    tokenBalance.toString(),
  ]);

  return {
    sufficientBalance,
    warning,
  };
}
export default useSufficientBalance;
