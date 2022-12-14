import { Typography, Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useWeb3Context } from "@/contexts/Web3ContextProvider";

const Description = styled(Typography)(({ theme }) => ({
  maxWidth: "58.6rem",
  margin: "0 auto 7.5rem",
  [theme.breakpoints.down("md")]: {
    backgroundColor: "transparent",
  },
}));

const AccountBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: "8rem",
}));

const AccountButton = styled(Button)(({ theme }) => ({
  display: "flex",
  pointerEvents: "none",
  width: "17.8rem",
  height: "5rem",
  fontSize: "1.6rem",
  lineHeight: "2.6rem",
  borderRadius: "0.4rem",
}));

const Header = () => {
  const { walletCurrentAddress, connectWallet } = useWeb3Context();
  const truncatedAccountHash = (hash: string) => {
    return hash ? `${hash.substring(0, 6)}…${hash.substring(38, 42)}` : "-";
  };
  return (
    <Box className=" mx-auto">
      <AccountBox>
        {walletCurrentAddress ? (
          <AccountButton>
            {truncatedAccountHash(walletCurrentAddress as string)}
          </AccountButton>
        ) : (
          <Button onClick={connectWallet} variant="outlined">
            Connect Wallet
          </Button>
        )}
      </AccountBox>
      <Typography variant="h3" align="center" sx={{ marginBottom: "1.2rem" }}>
        Rollup Explorer
      </Typography>
      <Description variant="body1" align="center">
        Track the status of blocks and transactions as they are committed and
        finalized.
      </Description>
    </Box>
  );
};

export default Header;
