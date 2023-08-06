import { BigNumber } from "@ethersproject/bignumber"
import { ethers } from "ethers"
import { useMemo } from "react"
import useStorage from "squirrel-gill"

import { CHAIN_ID, ETH_SYMBOL, WETH_SYMBOL } from "@/constants"
import { BRIDGE_TOKEN_SYMBOL } from "@/constants/storageKey"
import { useApp } from "@/contexts/AppContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { requireEnv } from "@/utils"

const OFFSET = "0x1111000000000000000000000000000000001111"
const amount = BigInt(1)

// Contracts
const L2Contracts = {
  ETHGateway: { abi: require("@/assets/abis/L2ETHGateway.json"), env: "REACT_APP_L2_ETH_GATEWAY_PROXY_ADDR" },
  WETHGateway: { abi: require("@/assets/abis/L2WETHGateway.json"), env: "REACT_APP_L2_WETH_GATEWAY_PROXY_ADDR" },
  ERC20Gateway: { abi: require("@/assets/abis/L2StandardERC20Gateway.json"), env: "REACT_APP_L1_STANDARD_ERC20_GATEWAY_PROXY_ADDR" },
  ScrollMessenger: { abi: require("@/assets/abis/L2ScrollMessenger.json"), env: "REACT_APP_L2_SCROLL_MESSENGER" },
  GasPriceOracle: { abi: require("@/assets/abis/L2GasPriceOracle.json"), env: "REACT_APP_L2_GAS_PRICE_ORACLE" },
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
      const L2GasPriceOracleContract = getContract("GasPriceOracle", networksAndSigners[CHAIN_ID.L1].signer)
      const gasPrice = await L2GasPriceOracleContract.l2BaseFee()
      return gasPrice
    } catch (err) {
      throw new Error("Failed to get gas price")
    }
  }

  const getGasLimit = async () => {
    if (l2Token.symbol === ETH_SYMBOL) {
      return await getEthL2GasLimit()
    } else if (l2Token.symbol === WETH_SYMBOL) {
      return await getWETHL2GasLimit()
    } else {
      return await getERC20L2GasLimit()
    }
  }

  const getGasLimitGeneric = async contractName => {
    const { provider } = networksAndSigners[CHAIN_ID.L2]

    const gateway = getContract(contractName, provider)
    const l2messenger = getContract("ScrollMessenger", provider)
    const finalizeDepositParams = [
      (l1Token as ERC20Token).address,
      (l2Token as ERC20Token).address,
      walletCurrentAddress,
      walletCurrentAddress,
      amount,
      "0x",
    ].filter(Boolean)
    const finalizeDepositMethod = "address" in l1Token ? "finalizeDepositERC20" : "finalizeDepositETH"
    const message = gateway.interface.encodeFunctionData(finalizeDepositMethod, finalizeDepositParams)

    const calldata = l2messenger.interface.encodeFunctionData("relayMessage", [
      requireEnv(L2Contracts[contractName].env.replace("2", "1")), // l1 gateway
      requireEnv(L2Contracts[contractName].env),
      amount,
      ethers.MaxUint256,
      message,
    ])

    const gaslimit = await provider.estimateGas({
      from: BigNumber.from(requireEnv("REACT_APP_L1_SCROLL_MESSENGER")).add(BigNumber.from(OFFSET)).mod(BigNumber.from(2).pow(160)).toHexString(),
      to: requireEnv(L2Contracts.ScrollMessenger.env),
      data: calldata,
    })
    return (BigInt(gaslimit) * BigInt(110)) / BigInt(100)
  }

  const getEthL2GasLimit = () => getGasLimitGeneric("ETHGateway")
  const getWETHL2GasLimit = () => getGasLimitGeneric("WETHGateway")
  const getERC20L2GasLimit = () => getGasLimitGeneric("ERC20Gateway")

  return { getPriceFee, getEthL2GasLimit, getWETHL2GasLimit, getERC20L2GasLimit, getGasLimit, getGasPrice }
}

export default usePriceFee
