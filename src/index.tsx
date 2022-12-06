import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Homepage from "./Homepage";
import "./index.css";
import "./styles/globals.less";
import { ThemeProvider } from "@mui/material/styles";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import themeLight from "./theme/light";
import "./styles/index.less";
import { AppType } from "@/constants";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={themeLight}>
      <BrowserRouter>
        {process.env.REACT_APP_BUILD_TARGET === AppType.HOMEPAGE ? (
          <Homepage />
        ) : (
          <App />
        )}
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
