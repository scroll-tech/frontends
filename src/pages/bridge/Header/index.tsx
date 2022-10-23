import { useWeb3Context } from "@/contexts/Web3ContextProvider";
import Button from "../components/Button";
import AddressButton from "./AddressButton";

const Header = () => {
  const { address, connectWallet } = useWeb3Context();

  return (
    <div className="flex items-center justify-end bg-white mt-4 lg:px-[4.2rem] px-4">
      {address ? (
        <>
          <AddressButton></AddressButton>
        </>
      ) : (
        <Button onClick={connectWallet} variant="outlined" large>
          Connect a Wallet
        </Button>
      )}
    </div>
  );
};

export default Header;
