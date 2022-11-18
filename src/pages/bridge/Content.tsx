import { Snackbar, Alert } from "@mui/material";
import { useApp } from "@/contexts/AppContextProvider";
import Send from "./Send";
import RencentTx from "./RencentTx";
import useBridgeStore from "@/stores/bridgeStore";

const Content = () => {
  const {
    txHistory: { errorMessage, changeErrorMessage },
  } = useApp();
  const { recentTxVisible } = useBridgeStore();

  const handleClose = () => {
    changeErrorMessage("");
  };
  return (
    <>
      {recentTxVisible ? <RencentTx></RencentTx> : <Send></Send>}

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
