import { AbiCoder, Transaction, ethers } from "ethers"
import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useBlockNumber } from "wagmi"

import { CHAIN_ID, ETH_SYMBOL } from "@/constants"
import { BRIDGE_TOKEN } from "@/constants/searchParamsKey"
import { useBridgeContext } from "@/contexts/BridgeContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useBridgeStore from "@/stores/bridgeStore"
import { requireEnv, trimErrorMessage } from "@/utils"

const OFFSET = "0x1111000000000000000000000000000000001111"
const amount = BigInt(1)

enum MIN_GASLIMIT {
  ETH_GATEWAY = 14e4,
  WETH_GATEWAY = 17e4,
  STANDARD_ERC20_GATEWAY = 15e4,
  CUSTOM_ERC20_GATEWAY = 15e4,
  USDC_GATEWAY = 16e4,
  DAI_GATEWAY = 15e4,
  LIDO_GATEWAY = 15e4,
  PUFFER_GATEWAY = 15e4,
}

type Props = {
  gasLimit: bigint
  gasPrice: bigint
  errorMessage: string
  fetchData: () => void
  getL1DataFee: (selectedToken, amount, gasLimit) => Promise<bigint>
}

enum GatewayType {
  ETH_GATEWAY = "ETH_GATEWAY",
  WETH_GATEWAY = "WETH_GATEWAY",
  STANDARD_ERC20_GATEWAY = "STANDARD_ERC20_GATEWAY",
  CUSTOM_ERC20_GATEWAY = "CUSTOM_ERC20_GATEWAY",
  USDC_GATEWAY = "USDC_GATEWAY",
  DAI_GATEWAY = "DAI_GATEWAY",
  LIDO_GATEWAY = "LIDO_GATEWAY",
  PUFFER_GATEWAY = "PUFFER_GATEWAY",
}

// For USDC, Lido, and DAI, can use the STANDARD_ERC20_GATEWAY
const Address2GatewayType = {
  ETH_GATEWAY: GatewayType.ETH_GATEWAY,
  [requireEnv("REACT_APP_L1_WETH_GATEWAY_PROXY_ADDR")]: GatewayType.WETH_GATEWAY,
  [requireEnv("REACT_APP_L1_CUSTOM_ERC20_GATEWAY_PROXY_ADDR")]: GatewayType.CUSTOM_ERC20_GATEWAY,
  [requireEnv("REACT_APP_L1_STANDARD_ERC20_GATEWAY_PROXY_ADDR")]: GatewayType.STANDARD_ERC20_GATEWAY,
  [requireEnv("REACT_APP_L1_USDC_GATEWAY_PROXY_ADDR")]: GatewayType.USDC_GATEWAY,
  [requireEnv("REACT_APP_L1_DAI_GATEWAY_PROXY_ADDR")]: GatewayType.DAI_GATEWAY,
  [requireEnv("REACT_APP_L1_LIDO_GATEWAY_PROXY_ADDR")]: GatewayType.LIDO_GATEWAY,
  [requireEnv("REACT_APP_L1_PUFFER_GATEWAY_PROXY_ADDR")]: GatewayType.PUFFER_GATEWAY,
}

// Contracts
const Contracts = {
  [GatewayType.ETH_GATEWAY]: { abi: require("@/assets/abis/L2ETHGateway.json"), env: "REACT_APP_L2_ETH_GATEWAY_PROXY_ADDR" },
  [GatewayType.WETH_GATEWAY]: { abi: require("@/assets/abis/L2WETHGateway.json"), env: "REACT_APP_L2_WETH_GATEWAY_PROXY_ADDR" },
  [GatewayType.STANDARD_ERC20_GATEWAY]: {
    abi: require("@/assets/abis/L2StandardERC20Gateway.json"),
    env: "REACT_APP_L2_STANDARD_ERC20_GATEWAY_PROXY_ADDR",
  },
  [GatewayType.CUSTOM_ERC20_GATEWAY]: {
    abi: require("@/assets/abis/L2StandardERC20Gateway.json"),
    env: "REACT_APP_L2_CUSTOM_ERC20_GATEWAY_PROXY_ADDR",
  },
  [GatewayType.USDC_GATEWAY]: {
    abi: require("@/assets/abis/L2StandardERC20Gateway.json"),
    env: "REACT_APP_L2_USDC_GATEWAY_PROXY_ADDR",
  },
  [GatewayType.DAI_GATEWAY]: {
    abi: require("@/assets/abis/L2StandardERC20Gateway.json"),
    env: "REACT_APP_L2_DAI_GATEWAY_PROXY_ADDR",
  },
  [GatewayType.LIDO_GATEWAY]: {
    abi: require("@/assets/abis/L2StandardERC20Gateway.json"),
    env: "REACT_APP_L2_LIDO_GATEWAY_PROXY_ADDR",
  },
  [GatewayType.PUFFER_GATEWAY]: {
    abi: require("@/assets/abis/L2StandardERC20Gateway.json"),
    env: "REACT_APP_L2_PUFFER_GATEWAY_PROXY_ADDR",
  },
  SCROLL_MESSENGER: { abi: require("@/assets/abis/L2ScrollMessenger.json"), env: "REACT_APP_L2_SCROLL_MESSENGER" },
  L1_GAS_PRICE_ORACLE: { abi: require("@/assets/abis/L1GasPriceOracle.json"), env: "REACT_APP_L1_GAS_PRICE_ORACLE" },
  L1_MESSAGE_QUEUE_WITH_GAS_PRICE_ORACLE: {
    abi: require("@/assets/abis/L1_MESSAGE_QUEUE_WITH_GAS_PRICE_ORACLE.json"),
    env: "REACT_APP_L1_MESSAGE_QUEUE_WITH_GAS_PRICE_ORACLE",
  },

  L1_GATEWAY_ROUTER_PROXY: { abi: require("@/assets/abis/L1_GATEWAY_ROUTER_PROXY_ADDR.json"), env: "REACT_APP_L1_GATEWAY_ROUTER_PROXY_ADDR" },
}

const getContract = (contractName, providerOrSigner) =>
  new ethers.Contract(requireEnv(Contracts[contractName].env), Contracts[contractName].abi, providerOrSigner)

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
  const [searchParams] = useSearchParams()

  const token = searchParams.get(BRIDGE_TOKEN)
  const tokenSymbol = useMemo(() => token || ETH_SYMBOL, [token])

  const { networksAndSigners } = useBridgeContext()
  const { tokenList } = useBridgeStore()
  const [gasLimit, setGasLimit] = useState(BigInt(0))
  const [gasPrice, setGasPrice] = useState(BigInt(0))
  const [errorMessage, setErrorMessage] = useState("")

  const fetchData = async () => {
    const { provider } = networksAndSigners[CHAIN_ID.L2]
    if (provider) {
      if (chainId === CHAIN_ID.L1) {
        const price = await getGasPrice()
        const limit = await getGasLimit()
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

  const { data: blockNumber } = useBlockNumber({ watch: true })

  useEffect(() => {
    fetchData()
      .then(() => {
        setErrorMessage("")
      })
      .catch(error => {
        console.log("error", error)
        //TODO:
        // setGasLimit(null)
        // setGasPrice(null)
        setErrorMessage(trimErrorMessage(error.message))
      })
  }, [blockNumber])

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
      const L1MessageQueueWithGasPriceOracleContract = getContract("L1_MESSAGE_QUEUE_WITH_GAS_PRICE_ORACLE", networksAndSigners[CHAIN_ID.L1].provider)
      const gasPrice = await L1MessageQueueWithGasPriceOracleContract.l2BaseFee()
      return (gasPrice * BigInt(120)) / BigInt(100)
    } catch (err) {
      console.log("err", err)
      throw new Error("Failed to get gas price")
    }
  }

  const getGasLimit = async () => {
    if (l2Token.symbol === ETH_SYMBOL) {
      return await getGasLimitGeneric("ETH_GATEWAY")
    }

    const { provider } = networksAndSigners[CHAIN_ID.L2]
    const code = await provider.getCode((l2Token as ERC20Token).address)
    // This address does not have a contract deployed.
    if (code === "0x") {
      return BigInt(7e5)
    }

    // fetch gateway address from router.getERC20Gateway((l1Token as ERC20Token).address)
    const gatewayRouter = getContract("L1_GATEWAY_ROUTER_PROXY", networksAndSigners[CHAIN_ID.L1].provider)
    const gatewayAddress = await gatewayRouter.getERC20Gateway((l1Token as ERC20Token).address)
    return await getGasLimitGeneric(gatewayAddress)
  }

  const messageDataGeneric = gatewayAddress => {
    let finalizeDepositParams: any = []
    let finalizeDepositMethod = "finalizeDepositERC20"
    const gatewayType = Address2GatewayType[gatewayAddress]
    if (gatewayType === GatewayType.ETH_GATEWAY) {
      finalizeDepositParams = [walletCurrentAddress, walletCurrentAddress, amount, "0x"]
      finalizeDepositMethod = "finalizeDepositETH"
    } else if (gatewayType === GatewayType.WETH_GATEWAY) {
      finalizeDepositParams = [
        (l1Token as ERC20Token).address,
        (l2Token as ERC20Token).address,
        walletCurrentAddress,
        walletCurrentAddress,
        amount,
        "0x",
      ]
    } else if ([GatewayType.CUSTOM_ERC20_GATEWAY, GatewayType.PUFFER_GATEWAY].includes(gatewayType)) {
      finalizeDepositParams = [(l1Token as ERC20Token).address, (l2Token as ERC20Token).address, walletCurrentAddress, walletCurrentAddress, 0, "0x"]
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

  const getGasLimitGeneric = async l1GatewayAddress => {
    const { provider: l1Provider } = networksAndSigners[CHAIN_ID.L1]
    const { provider: l2Provider } = networksAndSigners[CHAIN_ID.L2]
    const gatewayType = Address2GatewayType[l1GatewayAddress]
    let accountOrAddress1, accountOrAddress2, message

    const l2messenger = getContract("SCROLL_MESSENGER", l2Provider)

    const { finalizeDepositMethod, finalizeDepositParams } = messageDataGeneric(l1GatewayAddress)

    if ([GatewayType.ETH_GATEWAY].includes(gatewayType)) {
      accountOrAddress1 = walletCurrentAddress
      accountOrAddress2 = walletCurrentAddress
      message = "0x"
    } else {
      const l1Gateway = new ethers.Contract(l1GatewayAddress, Contracts[gatewayType].abi, l1Provider)
      const l2GatewayAddress = await l1Gateway.counterpart()
      accountOrAddress1 = l1GatewayAddress
      accountOrAddress2 = l2GatewayAddress
      message = getContract(gatewayType, l2Provider).interface.encodeFunctionData(finalizeDepositMethod, finalizeDepositParams)
    }

    const calldata = l2messenger.interface.encodeFunctionData("relayMessage", [
      accountOrAddress1,
      accountOrAddress2,
      [GatewayType.ETH_GATEWAY, GatewayType.WETH_GATEWAY].includes(gatewayType) ? amount : 0,
      ethers.MaxUint256,
      message,
    ])

    try {
      const gaslimit = await l2Provider.estimateGas({
        from: "0x" + (BigInt(requireEnv("REACT_APP_L1_SCROLL_MESSENGER")) + (BigInt(OFFSET) % BigInt(Math.pow(2, 160)))).toString(16),
        to: requireEnv(Contracts.SCROLL_MESSENGER.env),
        data: calldata,
      })

      return (BigInt(Math.max(Number(gaslimit), MIN_GASLIMIT[gatewayType] as unknown as number)) * BigInt(120)) / BigInt(100)
    } catch (error) {
      throw new Error(error)
    }
  }

  const buildUnsignedSerializedTransaction = async (selectedToken, amount, gasLimit) => {
    const { gateway } = networksAndSigners[CHAIN_ID.L2]
    if (selectedToken.symbol === ETH_SYMBOL) {
      const data = gateway.interface.encodeFunctionData("withdrawETH(uint256,uint256)", [amount, 0])
      return Transaction.from({
        to: walletCurrentAddress,
        data,
        value: amount,
        gasLimit,
      }).unsignedSerialized
    }

    const data = gateway.interface.encodeFunctionData("withdrawERC20(address,uint256,uint256)", [selectedToken.address, amount, 0])
    return Transaction.from({
      to: walletCurrentAddress,
      data,
      gasLimit,
    }).unsignedSerialized
  }

  // L1 Data Fee on L2
  const getL1DataFee = async (selectedToken, amount = BigInt(1), gasLimit) => {
    const tx = buildUnsignedSerializedTransaction(selectedToken, amount, gasLimit)

    const L1GasPriceOracleContract = getContract("L1_GAS_PRICE_ORACLE", networksAndSigners[CHAIN_ID.L2].provider)
    const l1DateFee = await L1GasPriceOracleContract.getL1Fee(tx)
    return l1DateFee
  }

  return <PriceFeeContext.Provider value={{ gasLimit, gasPrice, errorMessage, fetchData, getL1DataFee }}>{children}</PriceFeeContext.Provider>
}
