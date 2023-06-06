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
    <Box>
      <Header />
      <Box className="wrapper mx-auto" sx={{ marginBottom: "16rem" }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ fontWeight: 600 }} separator={<NavigateNextIcon fontSize="large" />}>
          <Link to="/rollupscan">All results</Link>
          <Link to={`/rollupscan/batch/${params.batchIndex}`}>Batch {params.batchIndex}</Link>
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
