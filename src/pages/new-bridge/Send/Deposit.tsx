import { Box } from "@mui/material"

import BalanceInput from "./BalanceInput"
import NetworkDirection from "./NetworkDirection"

const Deposit = () => {
  return (
    <Box>
      <NetworkDirection></NetworkDirection>
      <BalanceInput></BalanceInput>
    </Box>
  )
}

export default Deposit
