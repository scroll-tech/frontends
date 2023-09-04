import React, { useEffect, useState } from "react"

import { InputBase, styled } from "@mui/material"

import { fetchTxByHashUrl } from "@/apis/bridge"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useTxStore, { TxPosition } from "@/stores/txStore"
import { isValidTransactionHash } from "@/utils"

const InputBaseStyled = styled(InputBase)(({ theme }) => ({
  width: "60%",
  borderRadius: "1rem",
  border: `1px solid ${theme.palette.text.primary}`,
  fontFamily: "var(--developer-page-font-family)",
  height: "4.8rem",
  [theme.breakpoints.down("sm")]: {
    height: "4.8rem",
    fontSize: "1.5rem",
    marginRight: "0",
  },
}))

function ImportTx(props) {
  const [txHash, setTxHash] = useState("")
  const { orderedTxDB, updateOrderedTxs } = useTxStore()
  const { walletCurrentAddress } = useRainbowContext()

  useEffect(() => {
    const orderedTxs = orderedTxDB[walletCurrentAddress as string] ?? []
    const exist = orderedTxs.find(tx => tx.hash === txHash)

    if (exist) {
      alert("The transaction already exists")
      return
    }

    if (isValidTransactionHash(txHash)) {
      scrollRequest(fetchTxByHashUrl, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ txs: [txHash] }),
      }).then(data => {
        const tx = data.data.result[0]
        if (!tx) {
          alert("The transaction does not exist")
        } else if (tx.to.toLowerCase() !== walletCurrentAddress!.toLowerCase()) {
          alert("The transaction does not belong to the current address")
        } else {
          updateOrderedTxs(walletCurrentAddress, tx.hash, TxPosition.Backend)
        }
      })
    }
  }, [txHash])

  return (
    <InputBaseStyled
      startAdornment={
        <svg style={{ margin: "0 1rem 0 1.4rem" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 6.66199C0 2.98506 2.97711 0 6.65591 0C10.3338 0 13.3179 2.98413 13.3179 6.66199C13.3179 8.24418 12.7664 9.70161 11.8426 10.8447L15.7948 14.8024C16.0687 15.0766 16.0684 15.5209 15.7941 15.7948C15.5199 16.0687 15.0756 16.0684 14.8017 15.7941L10.3802 11.3665C10.1064 11.0924 10.1066 10.6483 10.3805 10.3744C11.3299 9.42503 11.9144 8.11169 11.9144 6.66199C11.9144 3.75926 9.55863 1.40351 6.65591 1.40351C3.75412 1.40351 1.40351 3.75833 1.40351 6.66199C1.40351 9.56471 3.75926 11.9205 6.66199 11.9205C7.0142 11.9205 7.36472 11.8831 7.70244 11.8177C8.08295 11.7441 8.45111 11.9928 8.52476 12.3733C8.5984 12.7538 8.34964 13.122 7.96914 13.1956C7.55271 13.2762 7.11259 13.324 6.66199 13.324C2.98413 13.324 0 10.3398 0 6.66199Z"
            fill="#473835"
          />
        </svg>
      }
      value={txHash}
      onChange={v => setTxHash(v.target.value)}
      placeholder="Import your transaction"
    ></InputBaseStyled>
  )
}

export default ImportTx
