import useBridgeStore from "@/stores/bridgeStore"

import SendTransaction from "./SendTransaction"
import TxSuccess from "./TxSuccess"

const Deposit = () => {
  const { txResult } = useBridgeStore()

  if (txResult) {
    return <TxSuccess></TxSuccess>
  }
  return <SendTransaction></SendTransaction>
}

export default Deposit
