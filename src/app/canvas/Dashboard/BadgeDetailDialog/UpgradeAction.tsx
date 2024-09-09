import { Box } from "@mui/material"
import { styled } from "@mui/material/styles"

import Button from "@/app/canvas/components/Button"

const UpgradedBox = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  width: "max-content",
  gap: "1.6rem",
  backgroundColor: theme.palette.primary.main,
  padding: "0 1.6rem",
  height: "4.8rem",
  alignItems: "center",
  color: "#FFEBD7",
  fontSize: "1.6rem",
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.4rem",
    gap: "0.8rem",
  },
}))

const UpgradedButton = styled(Button)(({ theme }) => ({
  borderRadius: "0.4rem",
  fontSize: "1.6rem",
  fontWeight: 600,
  height: "3.4rem !important",
  width: "12.2rem",
  border: "1px solid #FFEBD7",
  color: "#FFEBD7",
  padding: 0,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.4rem",
    width: "10rem",
  },
}))

const UpgradeAction = props => {
  const { sx, loading, onClick } = props
  return (
    <UpgradedBox sx={sx}>
      UPGRADE AVAILABLE
      <UpgradedButton loading={loading} variant="contained" color="tertiary" onClick={onClick ? onClick : "void 0"}>
        {loading ? "Upgrading" : "Upgrade now"}
      </UpgradedButton>
    </UpgradedBox>
  )
}

export default UpgradeAction
