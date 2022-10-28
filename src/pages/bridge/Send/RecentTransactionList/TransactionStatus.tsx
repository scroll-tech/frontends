import { Check, HourglassTop } from "@mui/icons-material";
import { Link, Typography, CircularProgress, Stack, Chip } from "@mui/material";
import { generateExploreLink, truncateHash } from "@/utils";
import { useApp } from "@/contexts/AppContextProvider";
import { useMemo } from "react";

const waitConfirmations = 6;

function TransactionStatus(props) {
  const { name, hash, status, explorer, to, isL1, blockNumber } = props;

  const {
    txHistory: { blockNumbers },
  } = useApp();

  const confirmations = useMemo(() => {
    return blockNumber ? blockNumbers[+(isL1 ^ to)] - blockNumber : 0;
  }, [blockNumbers, blockNumber, isL1, to]);

  const renderStatus = () => {
    if (status === "success" && confirmations < waitConfirmations) {
      return (
        <Chip label={`${status} ${confirmations}/${waitConfirmations}`}></Chip>
      );
    } else if (status === "success" && confirmations >= waitConfirmations) {
      return <Chip label="confirmed"></Chip>;
    }
    return <Chip label={status}></Chip>;
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <Typography>{name}</Typography>
        <Stack direction="row" spacing="4px">
          {status === "success" ? (
            <Check fontSize="large" />
          ) : to && status === "waiting" ? (
            <HourglassTop fontSize="large" />
          ) : (
            <CircularProgress size={20} thickness={5} />
          )}
          {renderStatus()}
          {/* <Typography>{status}</Typography> */}
        </Stack>

        <div>
          {hash ? (
            <Link
              color="inherit"
              href={generateExploreLink(explorer, hash)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Typography>{truncateHash(hash)}</Typography>
            </Link>
          ) : (
            <Typography>-</Typography>
          )}
        </div>
      </div>
    </>
  );
}

export default TransactionStatus;
