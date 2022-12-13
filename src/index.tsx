import { ThemeProvider } from "@mui/material/styles"
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from "./App"
import Homepage from "./Homepage"
import "./index.css"
import reportWebVitals from "./reportWebVitals"
import "./styles/globals.less"
import "./styles/index.less"
import themeLight from "./theme/light"
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={themeLight}>
      <BrowserRouter>
        <Routes>
          <Route path="/prealpha/*" element={<App />} />
          <Route path="/*" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
