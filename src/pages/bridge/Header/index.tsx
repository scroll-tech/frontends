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

  console.log(buttonRef, "????");

  return (
    <div className="flex items-center justify-center">
      {address ? (
        <>
          <Button
            flat
            onClick={handleClickAddress}
            // px={ensAvatar ? 3 : 4}
            ref={buttonRef}
            // color="info"
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
          highlighted
          onClick={connectWallet}
          minWidth="12rem"
          // color="info"
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
