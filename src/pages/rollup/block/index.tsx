import { useBlockList } from "@/hooks/useRollupInfo"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import { Box, Breadcrumbs, Typography } from "@mui/material"
import "antd/dist/antd.min.css"
import { Link, useParams } from "react-router-dom"
import Header from "../components/Header"
import Table from "./Table"

const Blocks = () => {
  const params = useParams();
  const { blocks } = useBlockList(params.batchIndex);

  return (
    <Box className="wrapper mx-auto" sx={{ marginBottom: "16rem" }}>
      <Header />
      {blocks ? (
        <>
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{ fontWeight: 600 }}
            separator={<NavigateNextIcon fontSize="large" />}
          >
            <Link to="./">All results</Link>
            <Link to={`./batch/${params.batchIndex}`}>
              Batch {params.batchIndex}
            </Link>
            <Typography color="text.primary" sx={{ fontWeight: 600 }}>
              Block {params.blockId}
            </Typography>
          </Breadcrumbs>
          <Table blocks={blocks} />
        </>
      ) : null}
    </Box>
  );
};

export default Blocks;
