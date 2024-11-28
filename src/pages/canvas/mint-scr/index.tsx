import { ethers } from "ethers"
import { useState } from "react"

import { Stack, TextField } from "@mui/material"

import ERC20ABI from "@/assets/abis/L1_erc20ABI.json"
import { CHAIN_ID, NORMAL_HEADER_HEIGHT } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useSnackbar from "@/hooks/useSnackbar"
import { amountToBN, isUserRejected, sanitizeNumericalString } from "@/utils"

import PerksButton from "../components/PerksButton"

const SCR_TOKEN_ADDRESS = "0x22047Da3730F76928dD9A31eb8f3A3d472B69AD7"

const MintScr = () => {
  const { walletCurrentAddress, provider, chainId } = useRainbowContext()
  const alertWarning = useSnackbar()
  const [scrAmount, setSCRAmount] = useState("")
  const [mintLoading, setMintLoading] = useState(false)
  // const [burnLoading, setBurnLoading] = useState(false)

  const handleChangeSCRAmount = e => {
    setSCRAmount(sanitizeNumericalString(e.target.value))
  }

  const handleMintToken = async () => {
    if (chainId !== CHAIN_ID.L2) {
      alertWarning("please switch to L2")
      return
    }
    try {
      setMintLoading(true)
      const signer = await provider?.getSigner(0)
      const tokenInterface = new ethers.Contract(SCR_TOKEN_ADDRESS, ERC20ABI, signer)
      const amount = amountToBN(scrAmount)
      const tx = await tokenInterface.mint(walletCurrentAddress, amount)
      const txReceipt = await tx.wait()
      if (txReceipt?.status === 1) {
        alertWarning(`Minted ${scrAmount} SCR successfully`, "success")
        setSCRAmount("")
      }
    } catch (e) {
      if (!isUserRejected(e)) {
        alertWarning(e.message)
      }
    } finally {
      setMintLoading(false)
    }
  }

  // const handleBurnToken = async () => {
  //   if (chainId !== CHAIN_ID.L2) {
  //     alertWarning("please switch to L2")
  //     return
  //   }
  //   try {
  //     setBurnLoading(true)
  //     const signer = await provider?.getSigner(0)
  //     const tokenInterface = new ethers.Contract(SCR_TOKEN_ADDRESS, ERC20ABI, signer)
  //     const amount = amountToBN(scrAmount)
  //     const tx = await tokenInterface.burn(walletCurrentAddress, amount)
  //     const txReceipt = await tx.wait()
  //     if (txReceipt?.status === 1) {
  //       alertWarning(`Burned ${scrAmount} SCR successfully`, "success")
  //       setSCRAmount("")
  //     }
  //   } catch (e) {
  //     if (!isUserRejected(e)) {
  //       alertWarning(e.message)
  //     }
  //   } finally {
  //     setBurnLoading(false)
  //   }
  // }
  return (
    <Stack direction="column" justifyContent="center" alignItems="center" sx={{ width: "100%", height: `calc(100vh - ${NORMAL_HEADER_HEIGHT})` }}>
      <TextField
        id="filled-basic"
        variant="filled"
        placeholder="0.0"
        autoComplete="off"
        sx={{ width: "25rem", backgroundColor: "#fff", ".MuiInputBase-root": { fontSize: "2rem", backgroundColor: "#fff" } }}
        value={scrAmount}
        onChange={handleChangeSCRAmount}
      />
      <Stack sx={{ width: "25rem", mt: "2rem" }} gap="2rem">
        <PerksButton loading={mintLoading} disabled={!scrAmount} onClick={handleMintToken}>
          Mint
        </PerksButton>
        {/* <PerksButton loading={burnLoading} onClick={handleBurnToken}>
          Burn
        </PerksButton> */}
      </Stack>
    </Stack>
  )
}

export default MintScr
