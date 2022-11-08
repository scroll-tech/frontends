import {
  CircularProgress,
  Typography,
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { useWeb3Context } from "@/contexts/Web3ContextProvider";
import Link from "@/components/Link";
import { useTxStore } from "@/stores/txStore";
import TxTable from "../components/TxTable";
import { BRIDGE_PAGE_SIZE } from "@/constants";

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

const TransactionsList = (props: any) => {
  const { classes, cx } = useStyles();

  const { address } = useWeb3Context();

  const {
    page,
    total,
    loading,
    error,
    frontTransactions,
    pageTransactions,
    clearTransactions,
    comboPageTransactions,
  } = useTxStore();

  if (!pageTransactions?.length) {
    return (
      <Typography variant="body1" color="textSecondary">
        Your transactions will appear here...
      </Typography>
    );
  }

  const handleChangePage = (currentPage) => {
    comboPageTransactions(address, currentPage, BRIDGE_PAGE_SIZE);
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
        <Stack direction="row" spacing="2rem">
          <Typography variant="h6" color="textSecondary">
            Recent Bridge Transactions
          </Typography>
          {loading && <CircularProgress size={24}></CircularProgress>}
        </Stack>

        <Link component="button" underline="none" onClick={clearTransactions}>
          Clear All
        </Link>
      </div>
      <TxTable
        // loading={loading}
        data={pageTransactions}
        pagination={{
          count: Math.ceil(
            (total + frontTransactions.length) / BRIDGE_PAGE_SIZE
          ),
          page,
          onChange: handleChangePage,
        }}
      ></TxTable>
      {error && (
        <Snackbar autoHideDuration={6000}>
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      )}
    </>
  );
};

export default TransactionsList;
