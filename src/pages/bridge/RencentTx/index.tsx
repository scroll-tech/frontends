import { useApp } from "@/contexts/AppContextProvider";
import { cx } from "@emotion/css";
import Button from "../components/Button";
import TxTable from "../components/TxTable";

const RencentTx = (props: any) => {
  const {
    txHistory: { transactions },
    switchBridgeForm,
  } = useApp();

  const handleGoBridge = () => {
    switchBridgeForm(true);
  };
  return (
    <div className={cx("w-[70rem]", "mx-[auto]", "text-center", "mt-[6.4rem]")}>
      <TxTable data={transactions.slice(0, 2)}></TxTable>
      <Button
        className="w-[28.2rem] mt-[4rem]"
        variant="outlined"
        large
        onClick={handleGoBridge}
      >
        Move More Funds
      </Button>
    </div>
  );
};

export default RencentTx;
