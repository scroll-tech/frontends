import "inter-ui"
import { StrictMode } from "react"
import { Provider } from "react-redux"
import "./i18n"
import App from "./pages/App"
import store from "./state"
import ApplicationUpdater from "./state/application/updater"
import ListsUpdater from "./state/lists/updater"
import MulticallUpdater from "./state/multicall/updater"
import TransactionUpdater from "./state/transactions/updater"
import UserUpdater from "./state/user/updater"
import ThemeProvider, { FixedGlobalStyle, ThemedGlobalStyle } from "./theme"

if ("ethereum" in window) {
  ;(window.ethereum as any).autoRefreshOnNetworkChange = false
}

function Updaters() {
  return (
    <>
      <ListsUpdater />
      <UserUpdater />
      <ApplicationUpdater />
      <TransactionUpdater />
      <MulticallUpdater />
    </>
  )
}

const Swap = () => {
  return (
    <StrictMode>
      <FixedGlobalStyle />
      <Provider store={store}>
        <Updaters />
        <ThemeProvider>
          <ThemedGlobalStyle />
          <App />
        </ThemeProvider>
      </Provider>
    </StrictMode>
  )
}

export default Swap
