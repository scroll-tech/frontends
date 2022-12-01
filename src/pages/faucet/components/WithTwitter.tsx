import { Alert, Button, CircularProgress, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import TwitterIcon from "@mui/icons-material/Twitter";
import useStorage from "squirrel-gill";
import Link from "@/components/Link";
import { redirectSignInTwitter } from "../helper";

const WithTwitter = (props) => {
  const { loginLoading, requestLoading, onRequest } = props;

  const [user, setUser] = useStorage(localStorage, "user");

  const handleSignOut = () => {
    setUser(null);
  };

  if (user?.token) {
    return (
      <>
        <Alert
          severity="success"
          sx={{
            mx: "2.4rem",
            mt: "2rem",
            mb: {
              xs: "2.4rem",
              md: "3.2rem",
            },
            width: "30rem",
            flexDirection: "row !important",
            ".MuiAlert-icon": {
              marginRight: "1rem",
            },
          }}
        >
          Twitter account connected
        </Alert>
        <LoadingButton
          loading={requestLoading}
          loadingIndicator={
            <Stack direction="row" spacing={2}>
              <span>Requesting Tokens</span>
              <CircularProgress
                color="inherit"
                size={18}
                thickness={4}
              ></CircularProgress>
            </Stack>
          }
          variant="contained"
          onClick={onRequest}
        >
          Request Testnet Scroll Tokens
        </LoadingButton>
        <Link
          underline="always"
          sx={{
            color: "text.secondary",
            textDecorationColor: "unset",
            mt: "1.6rem",
          }}
          component="button"
          onClick={handleSignOut}
        >
          Sign out @{user.name}
        </Link>
      </>
    );
  }

  return (
    <>
      <Alert
        severity="info"
        sx={{
          mx: "2.4rem",
          mt: "2rem",
          mb: {
            xs: "2.4rem",
            md: "3.2rem",
          },
          width: {
            xs: "auto",
            md: "64.7rem",
          },
        }}
      >
        Log in to Twitter to prevent faucet botting. Read-only access is
        requested. Twitter account requirements: older than 1 month, 1 tweet, 30
        followers.
      </Alert>
      <LoadingButton
        loading={loginLoading}
        sx={{
          width: "24.5rem",
        }}
        variant="contained"
        loadingPosition="start"
        startIcon={<TwitterIcon />}
        onClick={redirectSignInTwitter}
      >
        Log in to Twitter
      </LoadingButton>
    </>
  );
};

export default WithTwitter;
