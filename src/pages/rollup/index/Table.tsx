import dayjs from "dayjs"
import React, { useEffect, useMemo, useState } from "react"
import { Link as RouterLink, useSearchParams } from "react-router-dom"

import { Chip, Link, Pagination, TableBody, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import { fetchBatchListUrl } from "@/apis/rollupscan"
import { l1ExplorerUrl } from "@/constants/index"
import useRollupStore from "@/stores/rollupStore"

import Spinning from "../components/Spinning"
import Table from "../components/Table"
import TableCell from "../components/TableCell"
import Tooltip from "../components/Tooltip"
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../constants"
import NoData from "./NoData"

const relativeTime = require("dayjs/plugin/relativeTime")
dayjs.extend(relativeTime)

const StyledTablePagination: any = styled(TablePagination)(({ theme }) => ({
  marginTop: "2rem",
  fontSize: "1.6rem",
  ".MuiTablePagination-root": {
    fontSize: "1.6rem",
  },
  ".MuiSelect-select": {
    fontWeight: "500 ",
  },
  ".MuiTablePagination-selectLabel": {
    color: `${theme.palette.text.primary}`,
    fontSize: "1.6rem",
    fontWeight: "500 ",
  },
  ".MuiTablePagination-selectIcon": {
    fontSize: "1.6rem",
    color: `${theme.palette.text.primary}`,
  },
  ".MuiTablePagination-displayedRows": {
    fontSize: "1.6rem",
    fontWeight: "500 ",
    color: `${theme.palette.text.primary}`,
  },
  // "*": {
  //   fontSize: "1.6rem !important",
  //   fontWeight: "500 !important",
  //   color: `${theme.palette.text.primary} !important`,
  // },
}))

const ExternalLink = styled(Link)(({ theme }) => ({
  color: "#00A6F2",
}))

const StatusChip = styled(Chip)(({ theme }) => ({
  color: "#ffffff",
  textTransform: "capitalize",
  "&.precommitted": {
    backgroundColor: "#ffb21c1A",
    color: "#ffb21c",
  },
  "&.committed": {
    backgroundColor: "#29c2ce1A",
    color: "#29c2ce",
  },
  "&.finalized": {
    backgroundColor: "#07C7761A",
    color: "#07c776",
  },
  "&.skipped": {
    backgroundColor: "#BD63E21A",
    color: "#BD63E2",
  },
  "&.unknown": {
    backgroundColor: "#f13b761A",
    color: "#f13b76",
  },
  "& > .MuiChip-label": {
    fontWeight: 500,
  },
}))

const CustomPagination = styled(Pagination)(({ theme }) => ({
  ".MuiPaginationItem-text": {
    fontSize: "1.6rem",
  },
  ".MuiPaginationItem-root": {
    color: theme.palette.text.primary,
  },
  ".MuiPaginationItem-root.Mui-selected": {
    fontWeight: 700,
    backgroundColor: "unset",
  },
  ".MuiSvgIcon-root": {
    fontSize: "2.4rem",
  },
}))

const App = () => {
  const { changeEmptyBatch, changeBatchLoading, changeErrorMessage, emptyBatch, searchLoading, batchLoading } = useRollupStore()

  const [data, setData] = useState([])

  const [searchParams, setSearchParams] = useSearchParams()

  const [total, setTotal] = useState(0)

  const renderStatusHeaderText = () => {
    return (
      <>
        <p>Pre-committed: Block included in Scroll L2 blockchain</p>
        <p>Committed: Block transaction data submitted to Scroll L1 blockchain</p>
        <p>Finalized: Validity proof submitted and verified on Scroll L1 blockchain</p>
        <p>Skipped: Validity proof was skipped due to the lack of proving power</p>
      </>
    )
  }
  const BatchIndexTooltip = "A batch is a collection of blocks that share an L1 validity proof"
  const TxnTooltip = "Number of transactions in the batch"
  const CommitTxHashTooltip = "Hash of the transaction that commits the batch's data to L1"
  const FinalizedTxHashTooltip = "Hash of the transaction that posts the batch's proof to L1"

  const page = useMemo(() => +searchParams.get("page"), [searchParams])
  const pageSize = useMemo(() => +searchParams.get("per_page"), [searchParams])

  useEffect(() => {
    if (!page || !pageSize) {
      setSearchParams({ page: +page || DEFAULT_PAGE, per_page: +pageSize || DEFAULT_PAGE_SIZE })
    }
  }, [searchParams])

  useEffect(() => {
    if (page && pageSize) {
      fetchData({ page: +page, pageSize: +pageSize })
    }
  }, [page, pageSize])

  const fetchData = (pagination: any) => {
    changeBatchLoading(true)
    scrollRequest(`${fetchBatchListUrl}?page=${pagination.page}&per_page=${pagination.pageSize}`)
      .then(({ batches, total }) => {
        setData(batches)
        setTotal(total)
        changeEmptyBatch(!total)
      })
      .catch(() => {
        changeEmptyBatch(true)
        changeErrorMessage("Fail to fetch batch list, something wrong...")
      })
      .finally(() => {
        changeBatchLoading(false)
      })
  }

  const onPageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    searchParams.set("page", newPage + 1)
    setSearchParams(searchParams)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchParams({ page: 1, per_page: parseInt(event.target.value, 10) })
  }

  const truncatedHash = (hash: string) => {
    return `${hash.substring(0, 6)}…${hash.substring(62, 66)}`
  }

  const formatDate = (hash: string) => {
    return dayjs(new Date(+hash * 1000))
      .fromNow()
      .toString()
  }

  const handleChangePage = (e, newPage) => {
    searchParams.set("page", newPage)
    setSearchParams(searchParams)
  }

  if (emptyBatch) {
    return <NoData />
  }

  return (
    <TableContainer sx={{ marginBottom: "4rem", minHeight: 300 }}>
      {searchLoading || batchLoading ? (
        <Spinning />
      ) : (
        <>
          <Typography variant="body1" align="left">
            {total.toLocaleString()} results shown
          </Typography>
          <Table aria-label="Batch table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Tooltip title={BatchIndexTooltip} name="Batch Index" />
                </TableCell>
                <TableCell>Age</TableCell>
                <TableCell>
                  <Tooltip title={TxnTooltip} name="Transactions" />
                </TableCell>
                <TableCell>
                  <Tooltip title={CommitTxHashTooltip} name="Commit Tx Hash" />
                </TableCell>
                <TableCell>
                  <Tooltip title={FinalizedTxHashTooltip} name="Finalized Tx Hash" />
                </TableCell>
                <TableCell>
                  <Tooltip title={renderStatusHeaderText()} name="Status" />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row: any) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <RouterLink to={`batch/${row.index}`}>
                      <Typography sx={{ color: "#00A6F2", fontWeight: 600 }}>{row.index}</Typography>
                    </RouterLink>{" "}
                  </TableCell>
                  <TableCell>{formatDate(row.created_at)}</TableCell>
                  <TableCell>{row.total_tx_num}</TableCell>
                  <TableCell>
                    {row.commit_tx_hash ? (
                      <ExternalLink href={`${l1ExplorerUrl}/tx/${row.commit_tx_hash}`} sx={{ color: "#00A6F2", fontWeight: 600 }} underline="none">
                        {truncatedHash(row.commit_tx_hash)}
                      </ExternalLink>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
                    {row.finalize_tx_hash ? (
                      <ExternalLink href={`${l1ExplorerUrl}/tx/${row.finalize_tx_hash}`} sx={{ color: "#00A6F2", fontWeight: 600 }} underline="none">
                        {truncatedHash(row.finalize_tx_hash)}
                      </ExternalLink>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
                    <StatusChip label={row.rollup_status} className={row.rollup_status}></StatusChip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}

      <StyledTablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={total}
        page={(+page || DEFAULT_PAGE) - 1}
        onPageChange={onPageChange}
        rowsPerPage={+pageSize || DEFAULT_PAGE_SIZE}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={({ count, page }) => {
          return <CustomPagination page={page + 1} count={Math.ceil(count / pageSize)} onChange={handleChangePage} />
        }}
        ActionsComponent={() => null}
      />
    </TableContainer>
  )
}

export default App
