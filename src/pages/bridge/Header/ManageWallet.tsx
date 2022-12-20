import classNames from "classnames"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import Link from "@/components/Link"
import MiniButton from "../components/Button/MiniButton"
import CopyButton from "./CopyButton"
import { ReactComponent as ExitIcon } from "@/assets/svgs/exit.svg"
import { truncateAddress } from "@/utils"

const ManageWallet = (props: any) => {
  const { classes, onDisconnect } = props
  const { walletCurrentAddress } = useWeb3Context()

  return (
    <div className={classNames("flex", "items-center", "flex-wrap", classes.connectedWallet)}>
      <Link className={classes.address} component="span" underline="none">
        {truncateAddress(walletCurrentAddress as string)}
      </Link>
      <div className="flex">
        <CopyButton value={walletCurrentAddress} className={classes.copyButton} />
        <MiniButton icon={ExitIcon} viewBox="0 0 17 17" label="Disconnect" onClick={onDisconnect} />
      </div>
    </div>
  )
}

export default ManageWallet
