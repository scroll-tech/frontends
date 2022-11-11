import { useState, useRef } from "react";
import { makeStyles } from "tss-react/mui";
import {
  Popper,
  Typography,
  Card,
  Backdrop,
  Divider,
  ClickAwayListener,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useWeb3Context } from "@/contexts/Web3ContextProvider";
import { useApp } from "@/contexts/AppContextProvider";
import Button from "@/pages/bridge/components/Button";
import ManageWallet from "@/pages/bridge/Header/ManageWallet";
import TransactionHistory from "@/pages/bridge/Header/TransactionHistory";
import { truncateAddress } from "@/utils";
import useBridgeStore from "@/stores/bridgeStore";

const useStyles = makeStyles()((theme) => ({
  container: {
    width: "max-content",
    boxSizing: "border-box",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
    [theme.breakpoints.down("sm")]: {
      width: "calc(100vw - 3.2rem)",
      margin: "0 1.6rem",
      padding: "2rem",
    },
  },
  title: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.8rem",
      fontWeight: 600,
    },
  },
  box: {
    position: "relative",
  },
  connectedWallet: {
    padding: "3rem 0",
    [theme.breakpoints.down("sm")]: {
      padding: "2.4rem 0",
    },
  },
  transactionsList: {
    margin: " 3rem 0",
    [theme.breakpoints.down("sm")]: {
      margin: "2.4rem 0",
    },
  },
  changeButton: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    borderRadius: "1.5rem",
    boxShadow: "none",
  },
  disconnectButton: {
    position: "absolute",
    bottom: "1rem",
    right: "1rem",
    fontSize: "1.2rem",
    marginBottom: 0,
    borderRadius: "1.5rem",
    boxShadow: "none",
  },
  address: {
    cursor: "default",
    marginRight: "7.2rem",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2.4rem",
    },
  },
  copyButton: {
    marginRight: "2.4rem",
  },
  popper: {
    zIndex: theme.zIndex.modal,
  },
  backdrop: {
    zIndex: -1,
    [theme.breakpoints.down("sm")]: {
      zIndex: theme.zIndex.modal - 1,
    },
  },
}));

const AddressButton = () => {
  const { address, disconnectWallet } = useWeb3Context();
  const {
    txHistory: { refreshPageTransactions },
  } = useApp();
  const { historyVisible, changeHistoryVisible } = useBridgeStore();
  const buttonRef = useRef(null);

  const { classes, cx } = useStyles();

  const handleOpen = () => {
    changeHistoryVisible(true);
    refreshPageTransactions(1);
  };

  const handleClose = () => {
    changeHistoryVisible(false);
  };

  const handleDisconnect = () => {
    handleClose();
    disconnectWallet();
  };

  return (
    <>
      <Button ref={buttonRef} variant="outlined" large onClick={handleOpen}>
        {truncateAddress(address)}
      </Button>
      <Backdrop open={historyVisible} className={classes.backdrop}>
        <Popper
          open={historyVisible}
          anchorEl={buttonRef.current}
          placement="bottom-end"
          className={classes.popper}
          popperOptions={{
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, 16],
                },
              },
              {
                name: "preventOverflow",
                options: {
                  padding: 0,
                },
              },
            ],
          }}
        >
          <>
            <ClickAwayListener onClickAway={handleClose}>
              <Card className={classes.container}>
                <div className="flex justify-between">
                  <Typography variant="h6" className={classes.title}>
                    Connected Wallet
                  </Typography>
                  <CloseIcon onClick={handleClose} />
                </div>
                <div>
                  <ManageWallet
                    classes={classes}
                    onDisconnect={handleDisconnect}
                  />
                  <Divider></Divider>
                  <div className={cx("relative", classes.transactionsList)}>
                    <TransactionHistory />
                  </div>
                </div>
              </Card>
            </ClickAwayListener>
          </>
        </Popper>
      </Backdrop>
    </>
  );
};

export default AddressButton;
