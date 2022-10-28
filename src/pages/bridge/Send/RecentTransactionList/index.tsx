import { Typography } from "@mui/material";
import { useApp } from "@/contexts/AppContextProvider";
import TransactionRow from "./TransactionRow";

function RecentTransactionsList(props: any) {
  const {
    txHistory: { frontTransactions },
  } = useApp();

  if (!frontTransactions || frontTransactions.length === 0) {
    return (
      <Typography variant="body1">
        Your recent transactions will appear here...
      </Typography>
    );
  }

  return (
    <>
      {frontTransactions?.map((tx) => (
        <TransactionRow key={tx.hash} {...tx} />
      ))}
    </>
  );
}

export default RecentTransactionsList;
