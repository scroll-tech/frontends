import React from "react"
import { styled } from "@mui/material/styles"
import TableBody from "@mui/material/TableBody"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { Link } from "@mui/material"
import { l2ExplorerUrl } from "@/constants/index"
import Tooltip from "../components/Tooltip"

import Table from "../components/Table"
import TableCell from "../components/TableCell"
import dayjs from "dayjs"
const relativeTime = require("dayjs/plugin/relativeTime")
dayjs.extend(relativeTime)

const StyledTableRow = styled(TableRow)(({ theme }) => ({}))
const TxnTooltip = "Number of transactions in the block"
const HashTooltip = "Hash of the block's header"

interface BlockTableProps {
  blocks: any
}

const BlockTable: React.FC<BlockTableProps> = (props: { blocks: any }) => {
  const truncatedHash = (hash: string) => {
    return `${hash.substring(0, 6)}…${hash.substring(62, 66)}`
  }

  const formatDate = (hash: string) => {
    return dayjs(new Date(+hash * 1000))
      .fromNow()
      .toString()
  }

  return (
    <TableContainer sx={{ marginTop: "0.7rem" }}>
      <Table sx={{ minWidth: 700 }} aria-label="block table">
        <TableHead>
          <TableRow>
            <TableCell>Block</TableCell>
            <TableCell>
              <Tooltip title={HashTooltip} name="Hash" />
            </TableCell>
            <TableCell>Age</TableCell>
            <TableCell>
              <Tooltip title={TxnTooltip} name="Transactions" />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.blocks.map((row: any) => (
            <StyledTableRow key={row.hash}>
              <TableCell scope="row">
                <Link href={`${l2ExplorerUrl}/block/${row.hash}`} underline="none" sx={{ fontWeight: 600, color: "#00A6F2" }}>
                  {row.number}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`${l2ExplorerUrl}/block/${row.hash}`} underline="none" sx={{ fontWeight: 600, color: "#00A6F2" }}>
                  {truncatedHash(row.hash)}
                </Link>
              </TableCell>
              <TableCell>{formatDate(row.block_timestamp)}</TableCell>
              <TableCell>{row.tx_num}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BlockTable
