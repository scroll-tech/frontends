import { Link, useParams } from "react-router-dom"

import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import { Box, Breadcrumbs, Typography } from "@mui/material"

import { useBlockList } from "@/hooks/useRollupInfo"

import Header from "../components/Header"
import Spinning from "../components/Spinning"
import Table from "./Table"

const Blocks = () => {
  const params = useParams()
  const { blocks, isLoading } = useBlockList(params.batchIndex)

  return (
    <Box className="wrapper mx-auto" sx={{ marginBottom: "16rem" }}>
      <Header />
      <Breadcrumbs aria-label="breadcrumb" sx={{ fontWeight: 600 }} separator={<NavigateNextIcon fontSize="large" />}>
        <Link to="/alpha/rollupscan">All results</Link>
        <Link to={`/alpha/rollupscan/batch/${params.batchIndex}`}>Batch {params.batchIndex}</Link>
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
  )
}

export default Blocks
