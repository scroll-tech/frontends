import { useEffect, useState } from "react"

import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { fetchClaimableTxListUrl } from "@/apis/bridge"
import { BRIDGE_PAGE_SIZE } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import ClaimTable from "@/pages/new-bridge/components/ClaimTable"

const TableBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}))

const Claim = (props: any) => {
  const { walletCurrentAddress } = useRainbowContext()
  const [claimableTx, setclaimableTx] = useState<[] | null>(null)
  const [claimableTxPage, setClaimableTxPage] = useState(1)
  const [claimableTxTotal, setclaimableTxTotal] = useState(0)

  const fetchData = (page: number = 1) => {
    try {
      scrollRequest(`${fetchClaimableTxListUrl}?address=${walletCurrentAddress}&page=${page}&page_size=${BRIDGE_PAGE_SIZE}`).then(data => {
        setclaimableTx(data.data.result)
        setclaimableTxTotal(data.data.total)
      })
    } catch (error) {}
  }

  useEffect(() => {
    if (walletCurrentAddress) {
      fetchData()
    }
  }, [walletCurrentAddress])

  const handleChangePage = currentPage => {
    setClaimableTxPage(currentPage)
    fetchData(currentPage)
  }

  return (
    <TableBox>
      {claimableTx?.length ? (
        <ClaimTable
          data={claimableTx}
          pagination={{
            count: Math.ceil(claimableTxTotal / BRIDGE_PAGE_SIZE),
            page: claimableTxPage,
            onChange: handleChangePage,
          }}
        />
      ) : (
        <Typography variant="body1" color="textSecondary" sx={{ width: "40rem" }}>
          Your claimable transactions will appear here...
        </Typography>
      )}
    </TableBox>
  )
}

export default Claim
