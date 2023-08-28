import Table from "@mui/material/Table"
import { styled } from "@mui/material/styles"

const StyledTable = styled(Table)(({ theme }) => ({
  marginTop: "3rem",
  minWidth: 700,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  borderCollapse: "separate",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    marginTop: "1.2rem",
  },
  ".MuiTableCell-root": {
    whiteSpace: "nowrap",
  },
}))

export default StyledTable
