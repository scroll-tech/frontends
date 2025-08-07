import { isDesktop } from "react-device-detect"

import AIModal from "../AIModal"

const GlobalComponents = () => {
  return <>{isDesktop && <AIModal></AIModal>}</>
}

export default GlobalComponents
