import { VariantType, useSnackbar } from "notistack"
import { useCallback } from "react"

// min width 288px
const useScrollSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar()
  const enqueueScrollSnackbar = useCallback(
    (message, variant: VariantType = "default", key?) => {
      enqueueSnackbar(message, { key, autoHideDuration: 6000, anchorOrigin: { horizontal: "center", vertical: "bottom" }, variant })
    },
    [enqueueSnackbar],
  )
  return enqueueScrollSnackbar
}

export default useScrollSnackbar
