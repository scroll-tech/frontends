import { useCallback } from "react";
import {
  Typography,
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  SvgIcon,
} from "@mui/material";
import classNames from "classnames";
import { makeStyles } from "tss-react/mui";
import { ReactComponent as RightArrowIcon } from "@/assets/svgs/arrow-right.svg";
// import { Flex } from '../ui';
import useTxHistory from "@/hooks/useTxHistory";
import { truncateHash } from "src/utils";
import Link from "@/components/Link";

const useStyles = makeStyles()((theme) => {
  return {
    tableWrapper: {
      boxShadow: "unset",
      border: "1px solid #C9CBCE",
      borderRadius: "1rem",
      [theme.breakpoints.down("xs")]: {
        border: "unset",
        borderRadius: "unset",
        margin: "0 -2rem",
        width: "calc(100% + 4rem)",
      },
    },
    hashLink: {
      marginBottom: "0.8rem",
    },
    rightArrowIcon: {
      fontSize: "1.8rem",
      margin: "0 1.2rem",
    },
    tableTitle: {
      marginTop: "2.8rem",
      marginBottom: "3rem",
      [theme.breakpoints.down("xs")]: {
        marginTop: "1.6rem",
        marginBottom: "1.6rem",
      },
    },
    tableHeader: {
      backgroundColor: "rgba(201, 203, 206, 0.2)",
    },

    txStatusInfo: {},
    txStatusCloseButton: {},
  };
});

const TransactionsList = (props: any) => {
  const { classes } = useStyles();
  const { transactions, clearTransaction } = useTxHistory();

  const explorerLink = useCallback(
    (tx: any) => `${tx.fromNetwork.explorer}tx/${tx.hash}`,
    []
  );

  if (!transactions?.length) {
    return (
      <Typography variant="body1" color="textSecondary">
        Your transactions will appear here...
      </Typography>
    );
  }

  return (
    <>
      <div className={classNames("flex", "items-center", classes.tableTitle)}>
        <Typography variant="h6" color="textSecondary">
          Recent Bridge Transactions
        </Typography>
        <Link component="button" underline="none" onClick={clearTransaction}>
          Clear All
        </Link>
      </div>
      <TableContainer component={Paper} className={classes.tableWrapper}>
        <Table aria-label="Tx Table">
          <TableHead className={classes.tableHeader}>
            <TableRow>
              {/* <TableCell>Status</TableCell> */}
              {/* <TableCell>Amount</TableCell> */}
              <TableCell>Tx Hash</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions?.map((tx: any) => (
              <TableRow key={tx.hash}>
                {/* <TableCell>
                  {tx.status}
                </TableCell> */}
                {/* <TableCell align="right">{tx.calories}</TableCell> */}
                <TableCell>
                  <div
                    className={classNames(
                      "flex",
                      "items-center",
                      classes.hashLink
                    )}
                  >
                    <Typography variant="body1">
                      {tx.fromNetwork.name}
                    </Typography>
                    <SvgIcon
                      className={classes.rightArrowIcon}
                      component={RightArrowIcon}
                      viewBox="0 0 15 8"
                    ></SvgIcon>
                    <Typography variant="body1">{tx.toNetwork.name}</Typography>
                  </div>
                  <Link external href={explorerLink(tx)}>
                    {truncateHash(tx.hash)}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TransactionsList;
