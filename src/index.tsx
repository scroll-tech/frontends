import { ThemeProvider } from "@mui/material/styles"
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./index.css"
import reportWebVitals from "./reportWebVitals"
import "./styles/globals.less"
import "./styles/index.less"
import themeLight from "./theme/light"
import LoadingPage from "@/components/LoadingPage"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

const App = React.lazy(() => import("./App"))
const Homepage = React.lazy(() => import("./Homepage"))

root.render(
  <React.StrictMode>
    <ThemeProvider theme={themeLight}>
      <BrowserRouter>
        <React.Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route path="/prealpha/*" element={<App />} />
            <Route path="/*" element={<Homepage />} />
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
