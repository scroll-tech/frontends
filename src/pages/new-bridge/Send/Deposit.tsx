import useBridgeStore from "@/stores/bridgeStore"

import SendTransaction from "./SendTransaction"
import TxFailure from "./TxFailure"
import TxSuccess from "./TxSuccess"

const Deposit = () => {
  const { txResult, txError } = useBridgeStore()

  if (txResult) {
    return <TxSuccess></TxSuccess>
  } else if (txError) {
    return <TxFailure></TxFailure>
  }
  return <SendTransaction></SendTransaction>
}

export default Deposit
