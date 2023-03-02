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
  display: "flex",
  alignItems: "center",
  marginBottom: "6.2rem",
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
    if (!page || !pageSize) {
      setSearchParams({ page: +page || DEFAULT_PAGE, per_page: +pageSize || DEFAULT_PAGE_SIZE })
    } else {
      fetchData({ page: +page, pageSize: +pageSize })
    }
  }, [searchParams])

  const fetchData = (pagination: any) => {
    changeBatchLoading(true)
    scrollRequest(`${fetchBatchListUrl}?page=${pagination.page}&per_page=${pagination.pageSize}`)
      .then(({ batches, total }) => {
        changeData(batches)
        changeTotal(total)
        changeEmptyBatch(!total)
      })
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

  const handleGoBatchRow = (value, total) => {
    changeBatchLoading(false)
    const pageSize = +(searchParams.get("per_page") || DEFAULT_PAGE_SIZE) as number
    const page = Math.floor((total - value) / pageSize) + 1
    scrollRequest(`${fetchBatchListUrl}?page=${page}&per_page=${pageSize}`)
      .then(({ batches, total }) => {
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
      .catch(() => {
        changeEmptyBatch(true)
        changeErrorMessage("Failed to fetch batch list")
      })
      .finally(() => {
        changeBatchLoading(false)
      })
  }

  return (
    <Box className="wrapper mx-auto">
      <Header />
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
      <Table ref={tableRowsRef} onPaginationChange={fetchData} />
      <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={handleChangeErrorMessage}>
        <Alert severity="error" onClose={handleChangeErrorMessage}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Rollup
