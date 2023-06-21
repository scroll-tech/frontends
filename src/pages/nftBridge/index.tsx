import { GlobalStyles } from "@mui/material"

import AppProvider from "@/contexts/AppContextProvider"

import Header from "./Header"
import NFTPanel from "./NFTPanel"

const NFTBridge = () => {
  return (
    <AppProvider>
      <GlobalStyles
        styles={{
          ".scrollApp": {
            minWidth: "119rem",
          },
        }}
      ></GlobalStyles>
      <Header />
      <NFTPanel />
    </AppProvider>
  )
}

export default NFTBridge
