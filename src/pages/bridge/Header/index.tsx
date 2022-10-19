import { useState, useRef } from "react";
import { useWeb3Context } from "@/contexts/Web3ContextProvider";
import Button from "../components/Button";
import AccountDetails from "./AccountDetails";
import { truncateAddress } from "@/utils";

const Header = () => {
  const { address, connectWallet } = useWeb3Context();

  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);

  const handleCloseDetail = () => {
    setOpen(false);
  };

  const handleClickAddress = () => {
    setOpen(true);
  };

  return (
    <div className="flex items-center justify-end bg-white">
      {address ? (
        <>
          <Button
            onClick={handleClickAddress}
            ref={buttonRef}
            variant="outlined"
            large
          >
            {truncateAddress(address)}
          </Button>
          <AccountDetails
            open={open}
            onClose={handleCloseDetail}
            anchorEl={buttonRef.current}
          ></AccountDetails>
        </>
      ) : (
        <Button
          onClick={connectWallet}
          // minWidth="12rem"
          variant="outlined"
          large
        >
          Connect a Wallet
        </Button>
      )}
    </div>
  );
};

export default Header;
