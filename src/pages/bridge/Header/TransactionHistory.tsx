import { useMemo } from "react";
import { Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { useApp } from "@/contexts/AppContextProvider";
import Link from "@/components/Link";
import { PAGE_SIZE } from "@/hooks/useTxHistory";
import TxTable from "../components/TxTable";

const useStyles = makeStyles()((theme) => {
  return {
    tableWrapper: {
      boxShadow: "unset",
      border: "1px solid #C9CBCE",
      borderRadius: "1rem",
      [theme.breakpoints.down("sm")]: {
        border: "unset",
        borderRadius: "unset",
        margin: "0 -2rem",
        width: "calc(100% + 4rem)",
      },
    },
    tableTitle: {
      marginTop: "2.8rem",
      marginBottom: "3rem",
      [theme.breakpoints.down("sm")]: {
        marginTop: "1.6rem",
        marginBottom: "1.6rem",
      },
    },
    tableHeader: {
      backgroundColor: "rgba(201, 203, 206, 0.2)",
    },
  };
});

const rowsPerPage = 3;

const TransactionsList = (props: any) => {
  const { classes, cx } = useStyles();

  const {
    txHistory: { transactions, page, total, frontTransactions, changePage },
  } = useApp();

  const pageTxList = useMemo(() => {
    return transactions.slice(
      (page - 1) * rowsPerPage,
      (page - 1) * rowsPerPage + rowsPerPage
    );
  }, [transactions, page]);

  if (!transactions?.length) {
    return (
      <Typography variant="body1" color="textSecondary">
        Your transactions will appear here...
      </Typography>
    );
  }

  return (
    <>
      <div
        className={cx(
          "flex",
          "items-center",
          "justify-between",
          classes.tableTitle
        )}
      >
        <Typography variant="h6" color="textSecondary">
          Recent Bridge Transactions
        </Typography>
        <Link component="button" underline="none">
          Clear All
        </Link>
      </div>
      <TxTable
        data={pageTxList}
        pagination={{
          count: Math.ceil((total + frontTransactions.length) / PAGE_SIZE),
          page,
          onChange: changePage,
        }}
      ></TxTable>
    </>
  );
};

export default TransactionsList;
