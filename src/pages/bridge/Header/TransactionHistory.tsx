import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { useWeb3Context } from "@/contexts/Web3ContextProvider";
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

  const { address } = useWeb3Context();
  const {
    txHistory: {
      total,
      frontTransactions,
      comboPageTransactions,
      pageTransactions,
    },
  } = useApp();

  const [page, setPage] = useState(1);

  useEffect(() => {
    comboPageTransactions(address, page, rowsPerPage);
  }, [address, page]);

  if (!pageTransactions?.length) {
    return (
      <Typography variant="body1" color="textSecondary">
        Your transactions will appear here...
      </Typography>
    );
  }

  const handleChangePage = (currentPage) => {
    setPage(currentPage);
  };

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
        data={pageTransactions}
        pagination={{
          count: Math.ceil((total + frontTransactions.length) / PAGE_SIZE),
          page,
          onChange: handleChangePage,
        }}
      ></TxTable>
    </>
  );
};

export default TransactionsList;
