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
  Stack,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { ReactComponent as RightArrowIcon } from "@/assets/svgs/arrow-right.svg";
import { useApp } from "@/contexts/AppContextProvider";
import { truncateHash, generateExploreLink } from "@/utils";
import Link from "@/components/Link";

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
      [theme.breakpoints.down("sm")]: {
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
  const { classes, cx } = useStyles();

  const {
    txHistory: { transactions },
  } = useApp();

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
      <TableContainer component={Paper} className={classes.tableWrapper}>
        <Table aria-label="Tx Table">
          <TableHead className={classes.tableHeader}>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell>Tx Hash</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions?.map((tx: any) => (
              <TableRow key={tx.fromHash}>
                <TableCell align="right">{tx.amount}</TableCell>
                <TableCell>
                  <div className={cx("flex", "items-center", classes.hashLink)}>
                    <Stack direction="column">
                      <Typography variant="body1">{tx.fromName}</Typography>
                      <Link
                        external
                        href={generateExploreLink(tx.fromExplore, tx.fromHash)}
                      >
                        {truncateHash(tx.fromHash)}
                      </Link>
                    </Stack>

                    <SvgIcon
                      className={classes.rightArrowIcon}
                      component={RightArrowIcon}
                      viewBox="0 0 15 8"
                    ></SvgIcon>
                    <Stack direction="column">
                      <Typography variant="body1">{tx.toName}</Typography>
                      <Link
                        external
                        href={generateExploreLink(tx.toExplore, tx.toHash)}
                      >
                        {tx.toHash ? truncateHash(tx.toHash) : "-"}
                      </Link>
                    </Stack>
                  </div>
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
