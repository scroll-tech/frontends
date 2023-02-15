import { ethers } from "ethers"
// import { nanoid } from "nanoid"
import { useMemo, useState } from "react"

import { Alert, Button, Snackbar, Typography } from "@mui/material"

import ERC721ABI from "@/assets/abis/ERC721ABI.json"
// import ERC1155ABI from "@/assets/abis/ERC1155ABI.json"
import LoadingButton from "@/components/LoadingButton"
import { Addresses, ChainId, TESTNET_NAME } from "@/constants"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import { requireEnv, truncateAddress } from "@/utils"

const L1_SCROLL721_ADDR = requireEnv("REACT_APP_L1_SCROLL721_ADDRESS")
// const L1_SCROLL1155_ADDR = requireEnv("REACT_APP_L1_SCROLL1155_ADDRESS")

const NFTFaucet = () => {
  const { walletCurrentAddress, connectWallet, provider, chainId } = useWeb3Context()

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const networkStatus = useMemo(() => {
    if (chainId === ChainId.SCROLL_LAYER_1) {
      return 1
    } else if (chainId) {
      return 2
    }
    return 3
  }, [chainId])

  const switchNetwork = async () => {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [Addresses[ChainId.SCROLL_LAYER_1].autoconnect],
    })
  }

  const handleRequest = async () => {
    setLoading(true)
    try {
      const signer = await provider?.getSigner(0)
      // for 721
      const instance721 = new ethers.Contract(L1_SCROLL721_ADDR, ERC721ABI, signer)
      const tx721 = instance721["mintBatch(address,uint256[])"](walletCurrentAddress, [0, 1])

      // for 1155
      // const instance1155 = new ethers.Contract(L1_SCROLL1155_ADDR, ERC1155ABI, signer)
      // // token type id auto increase in contract according to amount array
      // const tx1155 = instance1155["mintBatch(address,uint256[],bytes)"](walletCurrentAddress, [1, 1], "0x")

      const txAll = await Promise.allSettled([tx721])
      const txResultAll = await Promise.allSettled(
        txAll.filter((item): item is PromiseFulfilledResult<any> => item.status === "fulfilled").map(item => item.value.wait()),
      )

      console.log(txResultAll, "mint res")
    } catch (e) {
      setErrorMessage(e.toString())
      console.log(e, "mint error message")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setErrorMessage("")
  }

  const renderOperation = () => {
    if (networkStatus === 1) {
      return (
        <LoadingButton loading={loading} loadingText="Requesting Tokens" variant="contained" onClick={handleRequest}>
          Request Testnet Scroll NFTs
        </LoadingButton>
      )
    } else if (networkStatus === 2) {
      return (
        <Button color="secondary" onClick={switchNetwork}>
          Click here to switch to Scroll L1 {TESTNET_NAME}
        </Button>
      )
    }
    return (
      <Button color="secondary" onClick={connectWallet}>
        Click here to connect wallet
      </Button>
    )
  }

  return (
    <>
      <main className="px-[16px] faucet-app">
        <div className="w-full flex items-center flex-col mb-[120px] md:h-[630px]">
          <div className=" mt-[30px] mb-[80px] text-right max-w-[1268px] px-[8px] w-full">
            {walletCurrentAddress ? (
              <Button className="w-[178px] p-[unset] pointer-events-none">{truncateAddress(walletCurrentAddress as string)}</Button>
            ) : (
              <Button onClick={connectWallet}>Connect Wallet</Button>
            )}
          </div>
          <Typography variant="h3" align="center" sx={{ marginBottom: "1.6rem" }}>
            Request NFTs
          </Typography>
          <Typography
            color="textSecondary"
            align="center"
            sx={{
              maxWidth: "56rem",
              mx: "2.4rem",
              mb: "2rem",
            }}
          >
            Receive 2 ERC721 NFTs & 2 ERC1155 NFTs per request.
          </Typography>
          {renderOperation()}
        </div>
        <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={handleClose}>
          <Alert elevation={6} variant="filled" onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </main>
    </>
  )
}

export default NFTFaucet
