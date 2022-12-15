import { useCallback, useMemo } from "react";
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
  Skeleton,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
import Link from "@/components/Link";
import { networks } from "@/constants";
import useSymbol from "@/hooks/useSymbol";
import { truncateHash, generateExploreLink } from "@/utils";
import { useApp } from "@/contexts/AppContextProvider";

const useStyles = makeStyles()((theme) => {
  return {
    tableContainer: {
      whiteSpace: "nowrap",
      [theme.breakpoints.down("sm")]: {
        paddingBottom: "1.6rem",
        overflowX: "scroll",
      },
    },
    tableWrapper: {
      boxShadow: "unset",
      border: "1px solid #C9CBCE",
      borderRadius: "1rem",
      width: "70rem",
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
    pagination: {
      ".MuiPaginationItem-text": {
        fontSize: "1.6rem",
      },
      ".MuiPaginationItem-root": {
        color: theme.palette.text.secondary,
      },
      ".MuiPaginationItem-root.Mui-selected": {
        fontWeight: 700,
        backgroundColor: "unset",
      },
      ".MuiSvgIcon-root": {
        fontSize: "2.4rem",
      },
    },
  };
});

const TxTable = (props: any) => {
  const { data, pagination, loading } = props;

  const { classes } = useStyles();

  const handleChangePage = (e, newPage) => {
    pagination?.onChange?.(newPage);
  };

  return (
    <>
      <div className={classes.tableContainer}>
        <TableContainer component={Paper} className={classes.tableWrapper}>
          <Table aria-label="Tx Table">
            <TableHead className={classes.tableHeader}>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Txn Hash</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <CircularProgress />
              ) : (
                <>
                  {data?.map((tx: any) => (
                    <TxRow key={tx.hash} tx={tx} />
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {pagination && (
        <div className="flex justify-end mt-[2.8rem]">
          <Pagination
            size="small"
            classes={{
              root: classes.pagination,
            }}
            page={pagination?.page}
            count={pagination?.count}
            onChange={handleChangePage}
          />
        </div>
      )}
    </>
  );
};

const TxRow = (props) => {
  const { tx } = props;

  const {
    txHistory: { blockNumbers },
  } = useApp();

  const { classes, cx } = useStyles();

  const statusWithConfirmations = useCallback(
    (blockNumber, isL1, to) => {
      if (!blockNumbers) {
        return ["Synchronizing", 0];
      }
      if (!blockNumber) {
        return ["Pending", 0];
      }
      const confirmations =
        blockNumbers[+!(isL1 ^ to)] - blockNumber > 0
          ? blockNumbers[+!(isL1 ^ to)] - blockNumber
          : 0;
      const waitConfirmations = networks[+!(isL1 ^ to)].waitConfirmations;
      if (confirmations >= waitConfirmations) {
        return ["Success", waitConfirmations];
      }
      return ["Pending", confirmations];
    },
    [blockNumbers]
  );

  const fromStatusConfirmations = useMemo(() => {
    return statusWithConfirmations(tx.fromBlockNumber, tx.isL1, false);
  }, [tx, statusWithConfirmations]);

  const toStatusConfirmations = useMemo(() => {
    return statusWithConfirmations(tx.toBlockNumber, tx.isL1, true);
  }, [tx, statusWithConfirmations]);

  const { loading: symbolLoading, symbol } = useSymbol(tx.symbolToken, tx.isL1);

  return (
    <TableRow key={tx.hash}>
      <TableCell>
        <Stack direction="column" spacing="1.4rem">
          {blockNumbers ? (
            <>
              <Chip
                label={fromStatusConfirmations[0]}
                className={cx(
                  classes.chip,
                  fromStatusConfirmations[0] === "Success"
                    ? classes.successChip
                    : classes.pendingChip
                )}
              />
              <Chip
                label={toStatusConfirmations[0]}
                className={cx(
                  classes.chip,
                  toStatusConfirmations[0] === "Success"
                    ? classes.successChip
                    : classes.pendingChip
                )}
              />
            </>
          ) : (
            <>
              <Skeleton
                variant="rectangular"
                width="12.6rem"
                height="3.8rem"
                className="rounded-[1.6rem]"
              />
              <Skeleton
                variant="rectangular"
                width="12.6rem"
                height="3.8rem"
                className="rounded-[1.6rem]"
              />
            </>
          )}
        </Stack>
      </TableCell>
      <TableCell className="w-full">
        <span>{tx.amount} </span>
        {symbolLoading ? (
          <Skeleton variant="text" width="5rem" className="inline-block" />
        ) : (
          <span>{symbol}</span>
        )}
      </TableCell>
      <TableCell>
        <Stack direction="column">
          <Typography variant="body1">From {tx.fromName}: </Typography>
          <Stack direction="row" spacing="0.8rem" className="align-center">
            <Link
              external
              href={generateExploreLink(tx.fromExplore, tx.hash)}
              className="leading-normal flex-1"
            >
              {truncateHash(tx.hash)}
            </Link>
            {!!networks[+!tx.isL1].waitConfirmations && (
              <Typography variant="body2" color="textSecondary">
                {fromStatusConfirmations[1]}/
                {networks[+!tx.isL1].waitConfirmations} confirmations
              </Typography>
            )}
          </Stack>
        </Stack>

        <Stack direction="column" className="mt-[1.2rem]">
          <Typography variant="body1">To {tx.toName}: </Typography>
          <Stack direction="row" spacing="0.8rem" className="align-center">
            {tx.toHash ? (
              <Link
                external
                href={generateExploreLink(tx.toExplore, tx.toHash)}
                className="leading-normal flex-1"
              >
                {truncateHash(tx.toHash)}
              </Link>
            ) : (
              <span className="leading-normal flex-1">-</span>
            )}
            {!!networks[+tx.isL1].waitConfirmations && (
              <Typography variant="body2" color="textSecondary">
                {toStatusConfirmations[1]}/
                {networks[+tx.isL1].waitConfirmations} confirmations
              </Typography>
            )}
          </Stack>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default TxTable;
