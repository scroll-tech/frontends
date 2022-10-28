import RightArrow from "@mui/icons-material/ArrowRightAlt";
import TransactionStatus from "./TransactionStatus";

function TransactionRow(props) {
  const {
    hash,
    toHash,
    fromName,
    toName,
    fromExplore,
    toExplore,
    fromStatus,
    toStatus,
    isL1,
    fromBlockNumber,
    toBlockNumber,
  } = props;
  console.log(fromBlockNumber, toBlockNumber, "from", "to");

  return (
    <div className="flex justify-between items-center">
      <div className="flex justify-between items-center">
        <TransactionStatus
          hash={hash}
          explorer={fromExplore}
          name={fromName}
          status={fromStatus}
          isL1={isL1}
          blockNumber={fromBlockNumber}
        />
        <div>
          <RightArrow fontSize="large" color="primary" />
        </div>
        <TransactionStatus
          hash={toHash}
          name={toName}
          status={toStatus}
          explorer={toExplore}
          to
          blockNumber={toBlockNumber}
          isL1={isL1}
        />
      </div>
    </div>
  );
}

export default TransactionRow;
