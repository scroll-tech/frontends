import { getPublicClient } from "@wagmi/core"
import { useEffect, useState } from "react"
import useStorage from "squirrel-gill"
import useSWR from "swr"

import { CHAIN_ID } from "@/constants"
import { BLOCK_NUMBERS } from "@/constants/storageKey"
import { config } from "@/contexts/RainbowProvider/configs"

const useBlockNumbers = () => {
  const [blockNumbers, setBlockNumbers] = useStorage(localStorage, BLOCK_NUMBERS, [-1, -1])
  const [isL1Available, setIsL1Available] = useState(true)
  const [isL2Available, setIsL2Available] = useState(true)

  const fetchBlockNumber = async () => {
    const fetchL1BlockNumber = getPublicClient(config, { chainId: CHAIN_ID.L1 })!.getBlock({ blockTag: "finalized" })
    const fetchL2BlockNumber = getPublicClient(config, { chainId: CHAIN_ID.L2 })!.getBlock({ blockTag: "latest" })
    const blockNumbers = await Promise.allSettled([fetchL1BlockNumber, fetchL2BlockNumber])
    return blockNumbers.map(item => (item.status === "fulfilled" ? Number(item.value.number) : item.reason))
  }

  const { data: blockNumbersRes } = useSWR<any>("eth_blockNumber", fetchBlockNumber, {
    refreshInterval: 6000,
  })
  // console.log(blockNumbersRes)

  // in order to be compatible with unstable rpc
  useEffect(() => {
    if (blockNumbersRes) {
      setBlockNumbers([
        typeof blockNumbersRes[0] === "number" ? blockNumbersRes[0] : blockNumbers[0],
        typeof blockNumbersRes[1] === "number" ? blockNumbersRes[1] : blockNumbers[1],
      ])

      setIsL1Available(typeof blockNumbersRes[0] === "object" ? false : true)
      setIsL2Available(typeof blockNumbersRes[1] === "object" ? false : true)
    }
  }, [blockNumbersRes])

  return { isL1Available, isL2Available }
}

export default useBlockNumbers
