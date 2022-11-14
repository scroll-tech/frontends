import { useMemo } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useApp } from "@/contexts/AppContextProvider";
import Send from "./Send";
import RencentTx from "./RencentTx";
import useBridgeStore from "@/stores/bridgeStore";
import useTxStore from "@/stores/txStore";

const Content = () => {
  const {
    txHistory: { errorMessage, changeErrorMessage },
  } = useApp();
  const { transactions } = useTxStore();
  const { bridgeFormVisible } = useBridgeStore();

  const formVisible = useMemo(() => {
    if (bridgeFormVisible) return true;
    else if (transactions?.length) return false;
    return true;
  }, [bridgeFormVisible, transactions]);

  const handleClose = () => {
    changeErrorMessage("");
  };
  return (
    <>
      {formVisible ? <Send></Send> : <RencentTx></RencentTx>}

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
    </>
  );
};

export default Content;
