import Web3Provider from "@/contexts/Web3ContextProvider";
import AppProvider from "@/contexts/AppContextProvider";
import Header from "./Header";

const Bridge = () => {
  return (
    <Web3Provider>
      <AppProvider>
        <Header />
      </AppProvider>
    </Web3Provider>
  );
};

export default Bridge;
