import { isDesktop } from "react-device-detect"

import TxHistoryDialog from "@/app/bridge/TxHistoryDialog"

import AIModal from "../AIModal"

const GlobalComponents = () => {
  return (
    <>
      <TxHistoryDialog></TxHistoryDialog>
      {isDesktop && <AIModal></AIModal>}
    </>
  )
}

export default GlobalComponents
