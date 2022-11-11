import useTxStore from "@/stores/txStore";
import useBridgeStore from "@/stores/bridgeStore";
import { makeStyles } from "tss-react/mui";
import Button from "../components/Button";
import TxTable from "../components/TxTable";

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    width: "max-content",
    margin: "6.4rem auto 0",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      padding: "0 1.6rem",
      width: "100%",
    },
  },
  button: {
    width: "28.2rem",
    marginTop: "4rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

const RencentTx = (props: any) => {
  const { transactions } = useTxStore();
  const { changeBridgeFormVisible } = useBridgeStore();

  const { classes } = useStyles();

  const handleGoBridge = () => {
    changeBridgeFormVisible(true);
  };
  return (
    <div className={classes.wrapper}>
      <TxTable data={transactions.slice(0, 2)}></TxTable>
      <Button
        className={classes.button}
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
