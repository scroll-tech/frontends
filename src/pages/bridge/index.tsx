import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Web3Provider from "@/contexts/Web3ContextProvider";
import AppProvider from "@/contexts/AppContextProvider";
import ThemeProvider from "./theme";
import Header from "./Header";
import Send from "./Send";
import styles from "./index.module.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 20000,
      cacheTime: 1000 * 60 * 60,
      // By default, retries in React Query do not happen immediately after a request fails.
      // As is standard, a back-off delay is gradually applied to each retry attempt.
      // The default retryDelay is set to double (starting at 1000ms) with each attempt, but not exceed 30 seconds:
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      onError: (err) => {
        console.log("react-query error:", err);
      },
    },
  },
});

const Bridge = () => {
  // useEffect(() => {
  //   const onboard = document.getElementsByTagName("onboard-v2");
  //   onboard[0]["style"].display = "none";
  // }, []);
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Web3Provider>
          <AppProvider>
            <div className={styles.bridge}>
              <Header />
              <Send />
            </div>
          </AppProvider>
        </Web3Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default Bridge;
