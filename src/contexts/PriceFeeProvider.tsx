import { AbiCoder, ethers } from "ethers"
import React, { createContext, useContext, useMemo, useState } from "react"
import useStorage from "squirrel-gill"
import { useBlockNumber } from "wagmi"

import { fetchDepositStatusUrl } from "@/apis/bridge"
import { CHAIN_ID, ETH_SYMBOL, WETH_SYMBOL } from "@/constants"
import { BRIDGE_TOKEN_SYMBOL } from "@/constants/storageKey"
import { useApp } from "@/contexts/AppContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { requireEnv } from "@/utils"

const OFFSET = "0x1111000000000000000000000000000000001111"
const amount = BigInt(1)

// For users who haven't deposited, a higher gas limit is required
enum INITIAL_MIN_GASLIMIT {
  ETH_GATEWAY = 136500,
  WETH_GATEWAY = 172000,
  STANDARD_ERC20_GATEWAY = 152000,
}

// For users who have deposited
enum SUBSEQUENT_MIN_GASLIMIT {
  ETH_GATEWAY = 112000,
  WETH_GATEWAY = 155000,
  STANDARD_ERC20_GATEWAY = 135000,
}

type Props = {
  gasLimit: bigint
  gasPrice: bigint
  errorMessage: string
  fetchData: () => void
}

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

const PriceFeeContext = createContext<Props | undefined>(undefined)

export const usePriceFeeContext = () => {
  const context = useContext(PriceFeeContext)
  if (!context) {
    throw new Error("usePriceFeeContext must be used within a PriceFeeProvider")
  }
  return context
}

export const PriceFeeProvider = ({ children }) => {
  const { walletCurrentAddress, chainId } = useRainbowContext()
  const [tokenSymbol] = useStorage(localStorage, BRIDGE_TOKEN_SYMBOL, ETH_SYMBOL)
  const { networksAndSigners, tokenList } = useApp()
  const [gasLimit, setGasLimit] = useState(BigInt(0))
  const [gasPrice, setGasPrice] = useState(BigInt(0))
  const [errorMessage, setErrorMessage] = useState("")
  const [userDepositStatus, setUserDepositStatus] = useState({
    [GatewayType.ETH_GATEWAY]: false,
    [GatewayType.WETH_GATEWAY]: false,
    [GatewayType.STANDARD_ERC20_GATEWAY]: false,
  })

  const getDepositStatus = async () => {
    try {
      scrollRequest(`${fetchDepositStatusUrl}?address=${walletCurrentAddress}`).then(data => {
        setUserDepositStatus({
          [GatewayType.ETH_GATEWAY]: true,
          [GatewayType.WETH_GATEWAY]: true,
          [GatewayType.STANDARD_ERC20_GATEWAY]: true,
        })
      })
    } catch (err) {
      // console.log(err)
      throw new Error("Failed to get deposit status")
    }
  }

  const fetchData = async () => {
    const { provider } = networksAndSigners[CHAIN_ID.L2]
    if (provider) {
      if (chainId === CHAIN_ID.L1) {
        const price = await getGasPrice()
        const limit = await getGasLimit()
        // console.log(price, limit, "gas price/limit")
        setGasPrice(price)
        setGasLimit(limit)
      } else {
        //  Currently, the computation required for proof generation is done and subsidized by Scroll.
        setGasLimit(BigInt(0))
        setGasPrice(BigInt(0))
        setErrorMessage("")
      }
    }
  }

  useBlockNumber({
    // enabled: !!(networksAndSigners[CHAIN_ID.L1].signer && networksAndSigners[CHAIN_ID.L2].provider),
    onBlock(blockNumber) {
      fetchData()
        .then(() => {
          setErrorMessage("")
        })
        .catch(error => {
          setErrorMessage(error.message)
        })
      getDepositStatus()
    },
  })

  const l1Token = useMemo(
    () => tokenList.find(item => item.chainId === CHAIN_ID.L1 && item.symbol === tokenSymbol) ?? ({} as any as Token),
    [tokenList, tokenSymbol],
  )

  const l2Token = useMemo(
    () => tokenList.find(item => item.chainId === CHAIN_ID.L2 && item.symbol === tokenSymbol) ?? ({} as any as Token),
    [tokenList, tokenSymbol],
  )

  const getGasPrice = async () => {
    try {
      const L2GasPriceOracleContract = getContract("GAS_PRICE_ORACLE", networksAndSigners[CHAIN_ID.L1].signer)
      const gasPrice = await L2GasPriceOracleContract.l2BaseFee()
      return gasPrice
    } catch (err) {
      // console.log(err)
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

  const getMinGaslimit = contractName => {
    const minGaslimit = userDepositStatus[contractName] ? SUBSEQUENT_MIN_GASLIMIT : INITIAL_MIN_GASLIMIT
    return minGaslimit[contractName] as unknown as number
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

    try {
      const gaslimit = await provider.estimateGas({
        from: "0x" + (BigInt(requireEnv("REACT_APP_L1_SCROLL_MESSENGER")) + (BigInt(OFFSET) % BigInt(Math.pow(2, 160)))).toString(16),
        to: requireEnv(L2Contracts.SCROLL_MESSENGER.env),
        data: calldata,
      })
      return (BigInt(Math.max(Number(gaslimit), getMinGaslimit(contractName))) * BigInt(120)) / BigInt(100)
    } catch (error) {
      throw new Error(error)
    }
  }

  return <PriceFeeContext.Provider value={{ gasLimit, gasPrice, errorMessage, fetchData }}>{children}</PriceFeeContext.Provider>
}
