import AppProvider from "@/contexts/AppContextProvider"

import Header from "./Header"
import NFTPanel from "./NFTPanel"

const NFTBridge = () => {
  return (
    <AppProvider>
      <Header />
      <NFTPanel />
    </AppProvider>
  )
}

export default NFTBridge
