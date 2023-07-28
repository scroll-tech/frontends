import dayjs from "dayjs"
import React from "react"
import { Link as RouterLink } from "react-router-dom"

import TableBody from "@mui/material/TableBody"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { styled } from "@mui/material/styles"

import Link from "@/components/Link"

import Table from "../components/Table"
import TableCell from "../components/TableCell"
import Tooltip from "../components/Tooltip"

const relativeTime = require("dayjs/plugin/relativeTime")
dayjs.extend(relativeTime)

const StyledTableRow = styled(TableRow)(({ theme }) => ({}))
const TxnTooltip = "Number of transactions in the chunk"
const HashTooltip = "Hash of the chunk's header"

interface ChunkTableProps {
  chunks: any
  batchIndex: number
}

const ChunkTable: React.FC<ChunkTableProps> = (props: { chunks: any; batchIndex: number }) => {
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
            <TableCell>Chunk</TableCell>
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
          {props.chunks.map((row: any) => (
            <StyledTableRow key={row.hash}>
              <TableCell scope="row">
                <Link component={RouterLink} to={`/rollupscan/batch/${props.batchIndex}/chunk/${row.index}`}>
                  {row.index}
                </Link>
              </TableCell>
              <TableCell>
                <Link component={RouterLink} to={`/rollupscan/batch/${props.batchIndex}/chunk/${row.index}`}>
                  {truncatedHash(row.hash)}
                </Link>
              </TableCell>
              <TableCell>{formatDate(row.created_at)}</TableCell>
              <TableCell>{row.total_tx_num}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ChunkTable
