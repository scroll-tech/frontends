import { useSnackbar } from "notistack"
import { useCallback } from "react"

// min width 288px
const useScrollSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar()
  const enqueueScrollSnackbar = useCallback(
    (message, key?) => {
      enqueueSnackbar(message, { key, autoHideDuration: 6000, anchorOrigin: { horizontal: "center", vertical: "bottom" } })
    },
    [enqueueSnackbar],
  )
  return enqueueScrollSnackbar
}

export default useScrollSnackbar
