import { useEffect, useMemo, useRef } from "react"
import { flushSync } from "react-dom"
import { useSearchParams } from "react-router-dom"

import { Alert, Box, Snackbar } from "@mui/material"
import { styled } from "@mui/material/styles"

import { fetchBatchListUrl } from "@/apis/rollupscan"
import { useLastBlockNums } from "@/hooks/useRollupInfo"
import useRollupStore from "@/stores/rollupStore"

import Header from "../components/Header"
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../constants"
import Card from "./Card"
import Searchbar from "./Searchbar"
import Table from "./Table"

const InfoBox = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  columnGap: "3rem",
  marginBottom: "6.4rem",
  [theme.breakpoints.down("sm")]: {
    columnGap: "2rem",
    marginBottom: "3.5rem",
  },
}))

const Rollup = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const { lastBlockNums } = useLastBlockNums()
  const { errorMessage, changeErrorMessage, changeEmptyBatch, changeBatchLoading, changeData, changeTotal, changeCurrentClickedBatch } =
    useRollupStore()

  const page = useMemo(() => +searchParams.get("page"), [searchParams])
  const pageSize = useMemo(() => +searchParams.get("per_page"), [searchParams])

  const tableRowsRef = useRef<HTMLTableSectionElement | null>(null)

  const timerRef = useRef<any>()

  useEffect(() => {
    if (page && pageSize) {
      handlePaginationChange({ page, pageSize })
    }
  }, [])

  useEffect(() => {
    if (!page || !pageSize) {
      const curPage = page || DEFAULT_PAGE
      const curPageSize = pageSize || DEFAULT_PAGE_SIZE
      setSearchParams({ page: curPage, per_page: curPageSize })
      handlePaginationChange({ page: curPage, pageSize: curPageSize })
    }
  }, [page, pageSize])

  const fetchData = pagination => {
    changeBatchLoading(true)
    return scrollRequest(`${fetchBatchListUrl}?page=${pagination.page}&per_page=${pagination.pageSize}`)
      .then(data => data)
      .catch(() => {
        changeEmptyBatch(true)
        changeErrorMessage("Failed to fetch batch list")
      })
      .finally(() => {
        changeBatchLoading(false)
      })
  }

  const handleChangeErrorMessage = () => {
    changeErrorMessage("")
  }

  const handlePaginationChange = pagination => {
    fetchData(pagination).then(({ batches, total }) => {
      changeData(batches)
      changeTotal(total)
      changeEmptyBatch(!total)
    })
  }

  const handleGoBatchRow = (value, total) => {
    const curPage = Math.floor((total - value) / pageSize) + 1
    setSearchParams({ page: curPage, per_page: pageSize })
    fetchData({ page: curPage, pageSize }).then(({ batches, total }) => {
      flushSync(() => {
        changeData(batches)
        changeTotal(total)
      })
      const currentRow = tableRowsRef.current?.children
        ? Array.from(tableRowsRef.current?.children).find(item => Array.from(item.classList)?.includes(`rollup-batch-${value}`))
        : null
      changeCurrentClickedBatch(value)
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        changeCurrentClickedBatch(-1)
      }, 5000)
      currentRow?.scrollIntoView({ behavior: "smooth", block: "center" })
      changeEmptyBatch(!total)
    })
  }

  return (
    <Box>
      <Header />
      <Box
        sx={{
          maxWidth: "130rem",
          px: ["2rem", "2rem", "6rem"],
          mx: "auto",
          mb: ["12rem", "14rem"],
          "& *": {
            fontFamily: "var(--developer-page-font-family) !important",
          },
        }}
      >
        <InfoBox>
          <Card
            title="Last Committed Batch"
            value={lastBlockNums?.committed_index ?? 0}
            total={lastBlockNums?.all_index ?? 0}
            description="Indicates the transaction data of this batch has been posted on the rollup contract on L1."
            onClickCard={() => handleGoBatchRow(lastBlockNums?.committed_index ?? 0, lastBlockNums?.all_index ?? 0)}
          ></Card>
          <Card
            title="Last Finalized Batch"
            value={lastBlockNums?.finalized_index ?? 0}
            total={lastBlockNums?.all_index ?? 0}
            description="Indicates the validity proof of this batch has been posted and verified on L1."
            onClickCard={() => handleGoBatchRow(lastBlockNums?.finalized_index ?? 0, lastBlockNums?.all_index ?? 0)}
          />
        </InfoBox>
        <Searchbar />
        <Table ref={tableRowsRef} onPaginationChange={handlePaginationChange} />
        <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={handleChangeErrorMessage}>
          <Alert severity="error" onClose={handleChangeErrorMessage}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  )
}

export default Rollup
