import { BigNumber } from "@ethersproject/bignumber"
import { AbiCoder, ethers } from "ethers"
import { useMemo } from "react"
import useStorage from "squirrel-gill"

import { CHAIN_ID, ETH_SYMBOL, WETH_SYMBOL } from "@/constants"
import { BRIDGE_TOKEN_SYMBOL } from "@/constants/storageKey"
import { useApp } from "@/contexts/AppContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { requireEnv } from "@/utils"

const OFFSET = "0x1111000000000000000000000000000000001111"
const amount = BigInt(1)

enum GatewayType {
  ETH_GATEWAY = "ETH_GATEWAY",
  WETH_GATEWAY = "WETH_GATEWAY",
  STANDARD_ERC20_GATEWAY = "STANDARD_ERC20_GATEWAY",
}

// Contracts
const L2Contracts = {
  [GatewayType.ETH_GATEWAY]: { abi: require("@/assets/abis/L2ETHGateway.json"), env: "REACT_APP_L2_ETH_GATEWAY_PROXY_ADDR" },
  [GatewayType.WETH_GATEWAY]: { abi: require("@/assets/abis/L2WETHGateway.json"), env: "REACT_APP_L2_WETH_GATEWAY_PROXY_ADDR" },
  [GatewayType.STANDARD_ERC20_GATEWAY]: {
    abi: require("@/assets/abis/L2StandardERC20Gateway.json"),
    env: "REACT_APP_L2_STANDARD_ERC20_GATEWAY_PROXY_ADDR",
  },
  SCROLL_MESSENGER: { abi: require("@/assets/abis/L2ScrollMessenger.json"), env: "REACT_APP_L2_SCROLL_MESSENGER" },
  GAS_PRICE_ORACLE: { abi: require("@/assets/abis/L2GasPriceOracle.json"), env: "REACT_APP_L2_GAS_PRICE_ORACLE" },
}

const getContract = (contractName, providerOrSigner) =>
  new ethers.Contract(requireEnv(L2Contracts[contractName].env), L2Contracts[contractName].abi, providerOrSigner)

const usePriceFee = () => {
  const { walletCurrentAddress, chainId } = useRainbowContext()
  const [tokenSymbol] = useStorage(localStorage, BRIDGE_TOKEN_SYMBOL, ETH_SYMBOL)
  const { networksAndSigners, tokenList } = useApp()

  const l1Token = useMemo(
    () => tokenList.find(item => item.chainId === CHAIN_ID.L1 && item.symbol === tokenSymbol) ?? ({} as any as Token),
    [tokenList, tokenSymbol],
  )

  const l2Token = useMemo(
    () => tokenList.find(item => item.chainId === CHAIN_ID.L2 && item.symbol === tokenSymbol) ?? ({} as any as Token),
    [tokenList, tokenSymbol],
  )

  const getPriceFee = async () => {
    if (chainId === CHAIN_ID.L1) {
      try {
        const gasPrice = await getGasPrice()
        const gasLimit = await getGasLimit()
        return gasPrice * gasLimit
      } catch (err) {
        throw new Error("Failed to get gas fee")
      }
    } else {
      //  Currently, the computation required for proof generation is done and subsidized by Scroll.
      return BigInt(0)
    }
  }

  const getGasPrice = async () => {
    try {
      const L2GasPriceOracleContract = getContract("GAS_PRICE_ORACLE", networksAndSigners[CHAIN_ID.L1].signer)
      const gasPrice = await L2GasPriceOracleContract.l2BaseFee()
      return gasPrice
    } catch (err) {
      throw new Error("Failed to get gas price")
    }
  }

  const getGasLimit = async () => {
    if (l2Token.symbol === ETH_SYMBOL) {
      return await getGasLimitGeneric(GatewayType.ETH_GATEWAY)
    } else if (l2Token.symbol === WETH_SYMBOL) {
      return await getGasLimitGeneric(GatewayType.WETH_GATEWAY)
    } else {
      return await getGasLimitGeneric(GatewayType.STANDARD_ERC20_GATEWAY)
    }
  }

  const messageDataGeneric = contractName => {
    let finalizeDepositParams: any = []
    let finalizeDepositMethod = "finalizeDepositERC20"

    if (contractName === GatewayType.ETH_GATEWAY) {
      finalizeDepositParams = [walletCurrentAddress, walletCurrentAddress, amount, "0x"]
      finalizeDepositMethod = "finalizeDepositETH"
    } else if (contractName === GatewayType.WETH_GATEWAY) {
      finalizeDepositParams = [
        (l1Token as ERC20Token).address,
        (l2Token as ERC20Token).address,
        walletCurrentAddress,
        walletCurrentAddress,
        amount,
        "0x",
      ]
    } else {
      finalizeDepositParams = [
        (l1Token as ERC20Token).address,
        (l2Token as ERC20Token).address,
        walletCurrentAddress,
        walletCurrentAddress,
        amount,
        AbiCoder.defaultAbiCoder().encode(
          ["bool", "bytes"],
          [
            true,
            AbiCoder.defaultAbiCoder().encode(
              ["bytes", "bytes"],
              ["0x", AbiCoder.defaultAbiCoder().encode(["string", "string", "uint8"], [l2Token.symbol, l2Token.name, l2Token.decimals])],
            ),
          ],
        ),
      ]
    }

    return { finalizeDepositParams, finalizeDepositMethod }
  }

  const getGasLimitGeneric = async contractName => {
    const { provider } = networksAndSigners[CHAIN_ID.L2]

    const gateway = getContract(contractName, provider)
    const l2messenger = getContract("SCROLL_MESSENGER", provider)
    const { finalizeDepositMethod, finalizeDepositParams } = messageDataGeneric(contractName)
    const message = gateway.interface.encodeFunctionData(finalizeDepositMethod, finalizeDepositParams)

    const calldata = l2messenger.interface.encodeFunctionData("relayMessage", [
      requireEnv(`REACT_APP_L1_${contractName}_PROXY_ADDR`), // l1 gateway
      requireEnv(`REACT_APP_L2_${contractName}_PROXY_ADDR`), // l2 gateway
      contractName === GatewayType.STANDARD_ERC20_GATEWAY ? 0 : amount,
      ethers.MaxUint256,
      message,
    ])

    const gaslimit = await provider.estimateGas({
      from: BigNumber.from(requireEnv("REACT_APP_L1_SCROLL_MESSENGER")).add(BigNumber.from(OFFSET)).mod(BigNumber.from(2).pow(160)).toHexString(),
      to: requireEnv(L2Contracts.SCROLL_MESSENGER.env),
      data: calldata,
    })

    return (BigInt(gaslimit) * BigInt(120)) / BigInt(100)
  }

  return { getPriceFee, getGasLimit, getGasPrice }
}

export default usePriceFee
