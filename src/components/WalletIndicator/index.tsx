import { useRef } from "react"

import { Backdrop, Button, ClickAwayListener, Popper } from "@mui/material"

import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import { truncateAddress } from "@/utils"

const WalletIndicator = props => {
  const { popup = false, children, open, onClose, onOpen } = props
  const { walletCurrentAddress, connectWallet } = useWeb3Context()
  const buttonRef = useRef(null)

  return (
    <>
      {walletCurrentAddress ? (
        <>
          {popup ? (
            <>
              <Button sx={{ w: "17.8rem" }} ref={buttonRef} variant="outlined" onClick={onOpen}>
                {truncateAddress(walletCurrentAddress as string)}
              </Button>
              <Backdrop
                open={open}
                sx={{
                  zIndex: theme => [theme.zIndex.modal - 1, -1],
                }}
              >
                <Popper
                  open={open}
                  anchorEl={buttonRef.current}
                  placement="bottom-end"
                  sx={{ zIndex: "modal" }}
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
                >
                  <>
                    <ClickAwayListener onClickAway={onClose}>
                      <div>{children}</div>
                    </ClickAwayListener>
                  </>
                </Popper>
              </Backdrop>
            </>
          ) : (
            <Button sx={{ w: "17.8rem" }} variant="outlined">
              {truncateAddress(walletCurrentAddress as string)}
            </Button>
          )}
        </>
      ) : (
        <Button sx={{ w: "17.8rem" }} onClick={connectWallet} variant="outlined">
          Connect Wallet
        </Button>
      )}
    </>
  )
}

export default WalletIndicator
