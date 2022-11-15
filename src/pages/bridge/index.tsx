import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { QueryClient, QueryClientProvider } from "react-query";
import AppProvider from "@/contexts/AppContextProvider";
import ThemeProvider from "./theme";
import Header from "./Header";
import Content from "./Content";
import styles from "./index.module.css";

export const muiCache = createCache({
  key: "mui",
  prepend: true,
});

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
  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <div className={styles.bridge}>
              <Header />
              <Content />
            </div>
          </AppProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default Bridge;
