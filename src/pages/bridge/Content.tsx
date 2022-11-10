import { useMemo } from "react";
import Send from "./Send";
import RencentTx from "./RencentTx";
import useBridgeVisibleStore from "@/stores/bridgeVisibleStore";
import useTxStore from "@/stores/txStore";

const Content = () => {
  const { transactions } = useTxStore();
  const { bridgeFormVisible } = useBridgeVisibleStore();

  const formVisible = useMemo(() => {
    if (bridgeFormVisible) return true;
    else if (transactions?.length) return false;
    return true;
  }, [bridgeFormVisible, transactions]);

  if (formVisible) {
    return <Send></Send>;
  }
  return <RencentTx></RencentTx>;
};

export default Content;
