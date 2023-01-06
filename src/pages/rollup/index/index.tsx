import { Alert, Box, Snackbar } from "@mui/material"
import { styled } from "@mui/material/styles"

import { useLastBlockNums } from "@/hooks/useRollupInfo"
import useRollupStore from "@/stores/rollupStore"

import Header from "../components/Header"
import Card from "./Card"
import Searchbar from "./Searchbar"
import Table from "./Table"

const InfoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "6.2rem",
}))

const Blocks = () => {
  const { lastBlockNums } = useLastBlockNums()
  const { errorMessage, changeErrorMessage } = useRollupStore()

  const handleChangeErrorMessage = () => {
    changeErrorMessage("")
  }

  return (
    <Box className="wrapper mx-auto">
      <Header />
      <InfoBox>
        <Card
          title="Last Committed Batch"
          value={lastBlockNums?.committed_index ?? 0}
          total={lastBlockNums?.all_index ?? 0}
          description="Indicates the transaction data of this batch has been posted on the rollup contract on L1."
        ></Card>
        <Card
          title="Last Finalized Batch"
          value={lastBlockNums?.finalized_index ?? 0}
          total={lastBlockNums?.all_index ?? 0}
          description="Indicates the validity proof of this batch has been posted and verified on L1."
        />
      </InfoBox>
      <Searchbar />
      <Table />
      <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={handleChangeErrorMessage}>
        <Alert severity="error" onClose={handleChangeErrorMessage}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Blocks
