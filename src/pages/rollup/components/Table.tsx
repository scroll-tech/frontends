import Table from "@mui/material/Table"
import { styled } from "@mui/material/styles"

const StyledTable = styled(Table)(({ theme }) => ({
  marginTop: "1.7rem",
  minWidth: 700,
  borderRadius: "10px",
  border: `1px solid ${theme.palette.divider}`,
  borderCollapse: "separate",
  overflow: "hidden",
}))

export default StyledTable
