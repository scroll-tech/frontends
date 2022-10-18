import { makeStyles } from "tss-react/mui";
import {
  Typography,
  Card,
  Divider,
  ClickAwayListener,
  Backdrop,
  Popper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useWeb3Context } from "@/contexts/Web3ContextProvider";
import ManageWallet from "./ManageWallet";
import TransactionsList from "./TransactionList";
import classNames from "classnames";

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      width: "64.4rem",
      boxSizing: "border-box",
      boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
      [theme.breakpoints.down("xs")]: {
        width: "calc(100vw - 3.2rem)",
        margin: "0 1.6rem",
        padding: "2rem",
      },
    },
    title: {
      [theme.breakpoints.down("xs")]: {
        fontSize: "1.8rem",
        fontWeight: 600,
      },
    },
    box: {
      position: "relative",
    },
    connectedWallet: {
      padding: "3rem 0",
      [theme.breakpoints.down("xs")]: {
        padding: "2.4rem 0",
      },
    },
    transactionsList: {
      margin: " 3rem 0",
      [theme.breakpoints.down("xs")]: {
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
      [theme.breakpoints.down("xs")]: {
        marginBottom: "2.4rem",
      },
    },
    copyButton: {
      marginRight: "2.4rem",
    },
    popper: {
      zIndex: theme.zIndex.modal,
      [theme.breakpoints.down("xs")]: {
        top: "50% !important",
        transform: "translateY(-50%) !important",
      },
    },
    backdrop: {
      zIndex: -1,
      [theme.breakpoints.down("xs")]: {
        zIndex: theme.zIndex.modal - 1,
      },
    },
  };
});

const AccountDetails = (props: any) => {
  const { open, onClose, anchorEl } = props;
  const { classes } = useStyles();
  const { address, disconnectWallet } = useWeb3Context();

  const handleDisconnect = () => {
    onClose();
    disconnectWallet();
  };
  // {
  //   offset: {
  //     offset: '0, 16',
  //   },
  //   preventOverflow: {
  //     padding: 0,
  //   },
  // },
  return (
    <Backdrop open={open} className={classes.backdrop}>
      <Popper
        open={open}
        anchorEl={anchorEl}
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
        transition
      >
        <>
          <ClickAwayListener onClickAway={onClose}>
            <Card className={classes.container}>
              <div className="flex justify-between">
                <Typography variant="h6" className={classes.title}>
                  Connected Wallet
                </Typography>
                <CloseIcon onClick={onClose} />
              </div>
              <div>
                {!!address && (
                  <ManageWallet
                    classes={classes}
                    onDisconnect={handleDisconnect}
                  />
                )}
                <Divider></Divider>
                <div
                  className={classNames("relative", classes.transactionsList)}
                >
                  <TransactionsList />
                </div>
              </div>
            </Card>
          </ClickAwayListener>
        </>
      </Popper>
    </Backdrop>
  );
};

export default AccountDetails;
