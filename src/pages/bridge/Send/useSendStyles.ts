import { createContext } from "react";
import { makeStyles } from "tss-react/mui";

export const StyleContext = createContext({} as any);

export const useSendStyles = makeStyles()((theme) => ({
  sendWrapper: {
    [theme.breakpoints.down("sm")]: {
      padding: "0 1.6rem",
    },
  },
  sendPanel: {
    width: "56.8rem",
    padding: "3.6rem 2.8rem",
    backgroundColor: "rgba(201, 203, 206, 0.2)",
    borderRadius: "1rem",
    marginTop: "6rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: "2.8rem 1.6rem",
    },
  },
  header: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    marginTop: "8rem",
    transition: "all 0.15s ease-out",
    [theme.breakpoints.down("sm")]: {
      marginTop: "4rem",
    },
  },
  sendSelect: {
    marginBottom: "4.2rem",
  },
  sendLabel: {
    marginBottom: "1.2rem",
  },
  sendDesc: {
    width: "calc(56.8rem - 8rem)",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 12rem)",
    },
    letterSpacing: "0.025rem",
  },
  sendTransfer: {
    margin: "-1rem 0",
    borderRadius: "50%",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    position: "relative",
  },
  sendTransferIcon: {
    fontSize: "2.5rem",
    color: "#00A6F2",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.8rem",
    },
  },

  button: {
    marginTop: "2rem",
  },
}));
