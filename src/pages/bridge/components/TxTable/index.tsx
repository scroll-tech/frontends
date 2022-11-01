import { useEffect, useMemo } from "react";
import {
  Typography,
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Stack,
  Chip,
  Pagination,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
import Link from "@/components/Link";
import { WAIT_CONFIRMATIONS, PAGE_SIZE } from "@/hooks/useTxHistory";
import { truncateHash, generateExploreLink } from "@/utils";
import { useApp } from "@/contexts/AppContextProvider";

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
    chip: {
      width: "12.6rem",
      height: "3.8rem",
      fontSize: "1.6rem",
      fontWeight: 500,
    },
    pendingChip: {
      color: "#FFB21C",
      backgroundColor: "rgba(255, 178, 28, 0.1)",
    },
    successChip: {
      color: "#2FCE74",
      backgroundColor: "rgba(47, 206, 116, 0.1)",
    },
  };
});

const TransactionsList = (props: any) => {
  const { data, pagination } = props;

  const { classes, cx } = useStyles();

  const {
    txHistory: { page, total, changePage },
  } = useApp();

  const handleChangePage = (e, newPage) => {
    changePage(newPage);
  };

  return (
    <>
      <TableContainer component={Paper} className={classes.tableWrapper}>
        <Table aria-label="Tx Table">
          <TableHead className={classes.tableHeader}>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Tx Hash</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((tx: any) => (
              <TxRow key={tx.hash} tx={tx}></TxRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex justify-end mt-[2.8rem]">
        {pagination && (
          <Pagination
            page={page}
            count={Math.ceil(total / PAGE_SIZE)}
            onChange={handleChangePage}
          />
        )}
      </div>
    </>
  );
};

const TxRow = (props) => {
  const { tx } = props;

  const {
    txHistory: { blockNumbers, updateTransaction },
  } = useApp();

  const { classes, cx } = useStyles();

  // useEffect(() => {
  //   const fromConfirmations =
  //     tx.fromBlockNumber && blockNumbers
  //       ? blockNumbers[+!tx.isL1] - tx.fromBlockNumber
  //       : 0;
  //   const toConfirmations =
  //     tx.toBlockNumber && blockNumbers
  //       ? blockNumbers[+tx.isL1] - tx.toBlockNumber
  //       : 0;

  //   if (
  //     fromConfirmations >= WAIT_CONFIRMATIONS &&
  //     toConfirmations >= WAIT_CONFIRMATIONS
  //   ) {
  //     updateTransaction(tx, { replaced: true });
  //   }
  // }, [tx, blockNumbers]);

  const statusWithConfirmations = (blockNumber, isL1, to) => {
    const confirmations =
      blockNumber && blockNumbers
        ? blockNumbers[+!(isL1 ^ to)] - blockNumber
        : 0;
    if (confirmations >= WAIT_CONFIRMATIONS) {
      return ["Success", WAIT_CONFIRMATIONS];
    }
    return ["Pending", confirmations];
  };

  const fromStatusConfirmations = useMemo(() => {
    return statusWithConfirmations(tx.fromBlockNumber, tx.isL1, false);
  }, [tx]);

  const toStatusConfirmations = useMemo(() => {
    return statusWithConfirmations(tx.toBlockNumber, tx.isL1, true);
  }, [tx]);
  return (
    <TableRow key={tx.hash}>
      <TableCell>
        <Stack direction="column" spacing="1.4rem">
          <Chip
            label={fromStatusConfirmations[0]}
            className={cx(
              classes.chip,
              fromStatusConfirmations[0] === "Success"
                ? classes.successChip
                : classes.pendingChip
            )}
          ></Chip>
          <Chip
            label={toStatusConfirmations[0]}
            className={cx(
              classes.chip,
              toStatusConfirmations[0] === "Success"
                ? classes.successChip
                : classes.pendingChip
            )}
          ></Chip>
        </Stack>
      </TableCell>
      <TableCell>{`${tx.amount} ETH`}</TableCell>
      <TableCell>
        <Stack direction="column">
          <Stack direction="row" spacing="0.8rem">
            <Typography variant="body1">{tx.fromName}: </Typography>
            <Link external href={generateExploreLink(tx.fromExplore, tx.hash)}>
              {truncateHash(tx.hash)}
            </Link>
          </Stack>

          <Typography variant="body2" color="textSecondary">
            {fromStatusConfirmations[1]}/{WAIT_CONFIRMATIONS} confirmations
          </Typography>
        </Stack>

        <Stack direction="column" className="mt-[1.2rem]">
          <Stack direction="row" spacing="0.8rem">
            <Typography variant="body1">{tx.toName}: </Typography>
            {tx.toHash ? (
              <Link
                external
                href={generateExploreLink(tx.toExplore, tx.toHash)}
              >
                {truncateHash(tx.toHash)}
              </Link>
            ) : (
              "-"
            )}
          </Stack>
          <Typography variant="body2" color="textSecondary">
            {toStatusConfirmations[1]}/{WAIT_CONFIRMATIONS} confirmations
          </Typography>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default TransactionsList;
