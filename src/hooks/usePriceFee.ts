import { ethers } from "ethers"

import L1GasPriceOracle from "@/assets/abis/L1GasPriceOracle.json"
import L2GasPriceOracle from "@/assets/abis/L2GasPriceOracle.json"
import { ChainId, GasLimit } from "@/constants"
import { useApp } from "@/contexts/AppContextProvider"
import { requireEnv } from "@/utils"

const usePriceFee = () => {
  const { networksAndSigners } = useApp()

  const getPriceFee = async (token: any, isL1: boolean = false) => {
    try {
      if (isL1) {
        const L2GasPriceOracleContract = new ethers.Contract(
          requireEnv("REACT_APP_L2_GAS_PRICE_ORACLE"),
          L2GasPriceOracle,
          networksAndSigners[ChainId.SCROLL_LAYER_1].signer,
        )
        const fee = await L2GasPriceOracleContract.l2BaseFee()
        return fee * BigInt(token.native ? GasLimit.DEPOSIT_ETH : GasLimit.DEPOSIT_ERC20)
      } else {
        const L1GasPriceOracleContract = new ethers.Contract(
          requireEnv("REACT_APP_L1_GAS_PRICE_ORACLE"),
          L1GasPriceOracle,
          networksAndSigners[ChainId.SCROLL_LAYER_2].signer,
        )
        const fee = await L1GasPriceOracleContract.l1BaseFee()
        return fee * BigInt(token.native ? GasLimit.WITHDRAW_ETH : GasLimit.WITHDRAW_ERC20)
      }
    } catch (err) {
      return BigInt(0)
    }
  }

  return { getPriceFee }
}

export default usePriceFee
