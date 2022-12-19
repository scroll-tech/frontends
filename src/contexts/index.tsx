import React, { FC, useMemo, createContext, useContext } from "react";
import useTheme, { Theme } from "./useTheme";

interface AppContextProps {
  theme: Theme;
}

interface Props {
  children?: any;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

const AppContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const theme = useTheme();

  return (
    <AppContext.Provider
      value={{
        theme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp() {
  const ctx = useContext(AppContext);
  if (ctx === undefined) {
    throw new Error("useApp must be used within AppProvider");
  }
  return ctx;
}

export default AppContextProvider;
