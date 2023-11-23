import { ethers } from "ethers"
import { useState } from "react"

import L1MessageQueue from "@/assets/abis/L1MessageQueue.json"
import L1ScrollMessenger from "@/assets/abis/L1ScrollMessenger.json"
import L2GasPriceOracle from "@/assets/abis/L2GasPriceOracle.json"
import { CHAIN_ID } from "@/constants"
import { useBrigeContext } from "@/contexts/BridgeContextProvider"
import useTxStore from "@/stores/txStore"
import { MAX_OFFSET_TIME } from "@/stores/utils"
import { requireEnv } from "@/utils"

export function useRetry(props) {
  const { hash } = props
  const { networksAndSigners } = useBrigeContext()
  const [loading, setLoading] = useState(false)
  const { addEstimatedTimeMap } = useTxStore()

  const replayMessage = async () => {
    const l2provider = networksAndSigners[CHAIN_ID.L2].provider
    const deployer = networksAndSigners[CHAIN_ID.L1].signer
    const queue = new ethers.Contract(requireEnv("REACT_APP_L1_MESSAGE_QUEUE"), L1MessageQueue, deployer)
    const messenger = new ethers.Contract(requireEnv("REACT_APP_L1_SCROLL_MESSENGER"), L1ScrollMessenger, deployer)
    const oracle = new ethers.Contract(requireEnv("REACT_APP_L2_GAS_PRICE_ORACLE"), L2GasPriceOracle, deployer)

    setLoading(true)
    try {
      const receipts = await networksAndSigners[CHAIN_ID.L1].provider.getTransactionReceipt(hash)

      let gasLimit = BigInt(0)

      for (const log of receipts.logs) {
        if (log.topics[0] === "0x69cfcb8e6d4192b8aba9902243912587f37e550d75c1fa801491fce26717f37e") {
          const event = queue.interface.decodeEventLog("QueueTransaction", log.data, log.topics)
          gasLimit = await l2provider.estimateGas({
            from: event.sender,
            to: event.target,
            value: event.value,
            data: event.data,
          })
        } else if (log.topics[0] === "0x104371f3b442861a2a7b82a070afbbaab748bb13757bf47769e170e37809ec1e") {
          const event = messenger.interface.decodeEventLog("SentMessage", log.data, log.topics)
          const gasPirce = await oracle.estimateCrossDomainMessageFee((gasLimit * BigInt(12)) / BigInt(10))

          await messenger.replayMessage(
            event.sender,
            event.target,
            event.value,
            event.messageNonce,
            event.message,
            (gasLimit * BigInt(12)) / BigInt(10),
            deployer.address,
            {
              value: (gasPirce * BigInt(12)) / BigInt(10),
            },
          )
          addEstimatedTimeMap(`progress_${hash}`, Date.now() + MAX_OFFSET_TIME)
          setLoading(false)
        }
      }
    } catch (error) {
      console.error("Error replaying message:", error)
      setLoading(false)
    }
  }

  return {
    replayMessage,
    loading,
  }
}
