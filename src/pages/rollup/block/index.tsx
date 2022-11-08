import { Row } from "antd";
import { useBlockList } from "@/hooks/useRollupInfo";
import "antd/dist/antd.min.css";
import { Typography, Theme, Box, Breadcrumbs } from "@mui/material";
import Header from "../components/Header";
import { useParams, Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Table from "./Table";

const Blocks = () => {
  const params = useParams();
  const { blocks } = useBlockList(params.batchId);

  return (
    <Box className="wrapper mx-auto" sx={{ marginBottom: "16rem" }}>
      <Header />
      {blocks ? (
        <>
          <Breadcrumbs
            aria-label="breadcrumb"
            separator={<NavigateNextIcon fontSize="large" />}
          >
            <Link to="/rollupscan">All results</Link>
            <Link to={`/rollupscan/batch/${params.batchId}`}>Batch 1</Link>
            <Typography color="text.primary">Block {params.blockId}</Typography>
          </Breadcrumbs>
          <Table blocks={blocks} />
        </>
      ) : null}
    </Box>
  );
};

export default Blocks;
