import { styled } from "@mui/material/styles"
import Table, { tableClasses } from "@mui/material/Table"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#fff4f5",
    color: "#595959",
    fontWeight: "500",
    fontSize: 14,
    height: "6rem",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1.6rem",
    height: "10rem",
  },
  "&:nth-of-type(1)": {
    paddingLeft: "5rem",
  },
}))
export default StyledTableCell
