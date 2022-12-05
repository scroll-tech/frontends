import type {  TablePaginationConfig } from "antd/lib/table";
import type { SorterResult } from "antd/lib/table/interface";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { l1ExplorerUrl, l2ExplorerUrl } from "@/constants/index";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import Table from "../components/Table";
import TableCell from "../components/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link, Chip } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { isNil } from "lodash";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../constants"

import { TablePagination, Typography, Box } from "@mui/material";
import Tooltip from "../components/Tooltip"

import dayjs from "dayjs";
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const StyledTablePagination: any = styled(TablePagination)(({ theme }) => ({
  marginTop: "2rem",
  "*": {
    fontSize: "1.6rem !important",
    fontWeight: "500 !important",
    color: `${theme.palette.text.primary} !important`
  }
}));

const ExternalLink = styled(Link)(({ theme }) => ({
  color: "#00A6F2"
}));



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
  }
}));

interface DataType {
  block_height: number;
  header_hash: string;
  l1_tx_hash: string;
  status: string;
  block_timestamp: string;
  tx_num: number;
  finalize_tx_hash: string;
  rollup_tx_hash: string;
}

interface Params {
  pagination?: TablePaginationConfig;
  sorter?: SorterResult<any> | SorterResult<any>[];
  total?: number;
  sortField?: string;
  sortOrder?: string;
}

const App: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation()

  const [page, setPage] = React.useState<number | null>(null);
  const [rowsPerPage, setRowsPerPage] = React.useState<number | null>(null);
  const [total, setTotal] = React.useState(0);

  const renderStatusHeaderText = () => {
    return (
      <>
        <p>Pre-committed: Block included in Scroll L2 blockchain</p>
        <p>
          Committed: Block transaction data submitted to Scroll L1 blockchain
        </p>
        <p>
          Finalized: Validity proof submitted and verified on Scroll L1
          blockchain
        </p>
        <p>
          Skipped: Validity proof was skipped due to the lack of proving power
        </p>
      </>
    );
  };
  const BatchIndexTooltip = "A batch is a collection of blocks that share an L1 validity proof"
  const TxnTooltip = "Number of transactions in the batch"
  const CommitTxHashTooltip = "Hash of the transaction that commits the batch's data to L1"
  const FinalizedTxHashTooltip = "Hash of the transaction that posts the batch's proof to L1"


  const fetchData = (pagination: any) => {
    setLoading(true);
    fetch(
      `${process.env.REACT_APP_ROLLUPSCAN_BASE_API_URL}/batches?page=${pagination.current + 1}&per_page=${pagination.pageSize}`
    )
      .then((res) => res.json())
      .then(({ batches, total }) => {
        setData(batches);
        setTotal(total);
        setLoading(false);
      });
  };

  useEffect(() => {
    const pageSize = +(searchParams.get("per_page") || DEFAULT_PAGE_SIZE) as number,
      current = +(searchParams.get("page") || DEFAULT_PAGE) as number;
    setRowsPerPage(pageSize);
    setPage(current);
  }, []);

  useEffect(() => {
    const params = {
      current: page,
      pageSize: rowsPerPage,
    };
    if (!isNil(page) && !isNil(rowsPerPage)) {
      fetchData(params);
      navigate(`/rollupscan/?page=${page}&per_page=${rowsPerPage}`);
    }
  }, [rowsPerPage,page ]);

  const onPageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const truncatedHash = (hash: string) => {
    return `${hash.substring(0, 6)}…${hash.substring(62, 66)}`;
  };

  const formatDate = (hash: string) => {
    return dayjs(new Date(+hash * 1000))
      .fromNow()
      .toString();
  };

  return (
    <TableContainer sx={{ marginBottom: "4rem" }}>
      <Typography variant="body1" align="left">
        {total.toLocaleString()} results shown
      </Typography>
      {
        total ? <>
          <Table aria-label="Batch table">
            <TableHead>
              <TableRow>
                <TableCell><Tooltip title={BatchIndexTooltip} name="Batch Index" /></TableCell>
                <TableCell>Age</TableCell>
                <TableCell><Tooltip title={TxnTooltip} name="Transactions" /></TableCell>
                <TableCell><Tooltip title={CommitTxHashTooltip} name="Commit Tx Hash" /></TableCell>
                <TableCell><Tooltip title={FinalizedTxHashTooltip} name="Finalized Tx Hash" /></TableCell>
                <TableCell><Tooltip title={renderStatusHeaderText()} name="status" /></TableCell>
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
                    {
                      row.commit_tx_hash ? <ExternalLink href={`${l1ExplorerUrl}tx/${row.commit_tx_hash}`} sx={{ color: "#00A6F2", fontWeight: 600 }} underline="none">
                        {truncatedHash(row.commit_tx_hash)}
                      </ExternalLink> : "-"
                    }
                  </TableCell>
                  <TableCell>
                    {
                      row.finalize_tx_hash
                        ? <ExternalLink href={`${l1ExplorerUrl}tx/${row.finalize_tx_hash}`} sx={{ color: "#00A6F2", fontWeight: 600 }} underline="none">
                          {truncatedHash(row.finalize_tx_hash)}
                        </ExternalLink> : "-"
                    }
                  </TableCell>
                  <TableCell>
                    <StatusChip
                      label={row.rollup_status}
                      className={row.rollup_status}
                    ></StatusChip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <StyledTablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={total}
            page={page}
            onPageChange={onPageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </> : null
      }

    </TableContainer>
  );
};

export default App;
