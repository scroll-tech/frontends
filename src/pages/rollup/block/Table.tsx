import dayjs from "dayjs"
import React from "react"

import TableBody from "@mui/material/TableBody"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { styled } from "@mui/material/styles"

import Link from "@/components/Link"
import { EXPLORER_URL } from "@/constants"

import Table from "../components/Table"
import TableCell from "../components/TableCell"
import Tooltip from "../components/Tooltip"

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
                <Link href={`${EXPLORER_URL.L2}/block/${row.hash}`} underline="none">
                  {row.number}
                </Link>
              </TableCell>
              <TableCell>
                <Link external href={`${EXPLORER_URL.L2}/block/${row.hash}`} underline="none">
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
