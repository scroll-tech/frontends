import { Typography as MuiTypography, Stack } from "@mui/material"
import { styled } from "@mui/material/styles"

import Button from "@/components/Button"
import TxAlert from "@/components/TxAlert"
import useCheckViewport from "@/hooks/useCheckViewport"
import useBridgeStore from "@/stores/bridgeStore"

const Typography = styled(MuiTypography)(({ theme }) => ({
  wordBreak: "break-all",
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.themeBackground.normal,
    borderRadius: "8px",
  },
  "&::-webkit-scrollbar": {
    width: "8px",
  },
}))

// TODO: In order to prevent withdraw from having more displays, do not merge first
const TxFailure = () => {
  const { isMobile } = useCheckViewport()
  const { txError, changeTxError, txType, withDrawStep } = useBridgeStore()

  const handleGoback = () => {
    changeTxError(null)
  }

  if (txType === "Deposit") {
    return (
      <Stack sx={{ height: "34rem" }} direction="column" spacing="2.5rem">
        <TxAlert severity="error">Failed</TxAlert>
        <Typography sx={{ fontSize: "1.8rem", overflow: "auto" }}>{txError?.message}</Typography>
        <Stack flex={1} direction="column" justifyContent="flex-end" alignItems="center">
          <Button color="primary" width={isMobile ? "100%" : "35rem"} onClick={handleGoback}>
            Return to Deposit
          </Button>
        </Stack>
      </Stack>
    )
  } else if (txType === "Withdraw" && withDrawStep === "1") {
    return (
      <Stack sx={{ height: "34rem" }} direction="column" spacing="2.5rem">
        <TxAlert severity="error">Failed</TxAlert>
        <Typography sx={{ fontSize: "1.8rem", overflow: "auto" }}>{txError?.message}</Typography>
        <Stack flex={1} direction="column" justifyContent="flex-end" alignItems="center">
          <Button color="primary" width={isMobile ? "100%" : "35rem"} onClick={handleGoback}>
            Return to Withdraw
          </Button>
        </Stack>
      </Stack>
    )
  }
  return null
}

export default TxFailure
