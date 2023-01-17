import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import { styled } from "@mui/material/styles"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.scaleBackground.secondary,
    color: theme.palette.text.secondary,
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
