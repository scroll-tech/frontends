"use client"

import Link from "next/link"
import { useParams } from "next/navigation"

import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import { Box, Breadcrumbs, Typography } from "@mui/material"

import Header from "@/app/rollupscan/components/Header"
import Spinning from "@/app/rollupscan/components/Spinning"
import { BLOCK_LIST_TYPE, useBatchBlocks, useChunkBlocks } from "@/hooks/useRollupInfo"

import Table from "./Table"

const Blocks = () => {
  const params = useParams()
  const blocksType = !!params.chunkIndex ? BLOCK_LIST_TYPE.CHUNK : BLOCK_LIST_TYPE.BATCH
  const index = params.chunkIndex || params.batchIndex
  const fn = blocksType === BLOCK_LIST_TYPE.CHUNK ? useChunkBlocks : useBatchBlocks
  const { blocks, isLoading } = fn(index)

  return (
    <Box>
      <Header />
      <Box
        className="wrapper mx-auto"
        sx={{
          marginBottom: "16rem",
          "& *": {
            fontFamily: "var(--developer-page-font-family) !important",
          },
        }}
      >
        <Breadcrumbs aria-label="breadcrumb" sx={{ fontWeight: 600 }} separator={<NavigateNextIcon fontSize="large" />}>
          <Link href="/rollupscan?page=1&per_page=10">Batches</Link>
          <Link href={`/rollupscan/batch/${params.batchIndex}`}> Batch {params.batchIndex}</Link>
          {blocksType === BLOCK_LIST_TYPE.CHUNK && <Link href={`/rollupscan/batch/${params.batchIndex}/chunks`}>Chunks</Link>}
          {blocksType === BLOCK_LIST_TYPE.CHUNK && (
            <Link href={`/rollupscan/batch/${params.batchIndex}/chunk/${params.chunkIndex}`}>Chunk {params.chunkIndex}</Link>
          )}

          <Typography color="text.primary" sx={{ fontWeight: 600 }}>
            Blocks
          </Typography>
        </Breadcrumbs>
        {isLoading ? (
          <Spinning></Spinning>
        ) : (
          <>
            {blocks ? (
              <>
                <Table blocks={blocks} />
              </>
            ) : null}
          </>
        )}
      </Box>
    </Box>
  )
}

export default Blocks
