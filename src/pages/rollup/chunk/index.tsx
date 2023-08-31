import { Link, useParams } from "react-router-dom"

import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import { Box, Breadcrumbs, Typography } from "@mui/material"

import { useChunkList } from "@/hooks/useRollupInfo"

import Header from "../components/Header"
import Spinning from "../components/Spinning"
import Table from "./Table"

const Blocks = () => {
  const params = useParams()
  const index = params.batchIndex
  const { chunks, isLoading } = useChunkList(index)

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
          <Link to="/rollupscan?page=1&per_page=10">Batches</Link>
          <Link to={`/rollupscan/batch/${index}`}>Batch {index}</Link>
          <Typography color="text.primary" sx={{ fontWeight: 600 }}>
            Chunks
          </Typography>
        </Breadcrumbs>
        {isLoading ? (
          <Spinning></Spinning>
        ) : (
          <>
            {chunks ? (
              <>
                <Table chunks={chunks} batchIndex={index} />
              </>
            ) : null}
          </>
        )}
      </Box>
    </Box>
  )
}

export default Blocks
