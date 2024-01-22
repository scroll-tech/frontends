import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import { styled } from "@mui/material/styles"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "500",
  color: theme.palette.text.primary,
  [`&.${tableCellClasses.head}`]: {
    fontSize: 16,
    height: "6rem",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1.6rem",
    height: "10rem",
    fontWeight: "500",
  },
  "&:nth-of-type(1)": {
    paddingLeft: "2.7rem",
  },
}))
export default StyledTableCell
