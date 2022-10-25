import { Table, Tag } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/lib/table";
import type { SorterResult } from "antd/lib/table/interface";
import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { l1ExplorerUrl, l2ExplorerUrl } from "@/constants/index";

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

const DEFAULT_PAGE = 1,
  DEFAULT_PAGE_SIZE = 20;

const App: React.FC = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [pagination, setPagination] = useState<TablePaginationConfig>({});

  const renderTableStatusHeaderText = () => {
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

  const renderTableStatusHeader = () => {
    return (
      <>
        <span>Status</span>
        <Tooltip title={renderTableStatusHeaderText}>
          <InfoCircleOutlined className="!align-text-bottom ml-4px" />
        </Tooltip>
      </>
    );
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "L2 Block No.",
      dataIndex: "block_height",
      key: "block_height",
    },
    {
      title: "Block Hash",
      dataIndex: "header_hash",
      key: "header_hash",
      render: (hash) => (
        <a
          className="text-[#4e46e5] hover:text-[#6366f1]  hover:underline"
          href={`${l2ExplorerUrl}/block/${hash}`}
        >
          {truncatedHash(hash)}
        </a>
      ),
    },
    {
      title: "Tx(s)",
      dataIndex: "tx_num",
      key: "tx_num",
    },
    {
      title: "Timestamp",
      dataIndex: "block_timestamp",
      key: "block_timestamp",
      render: (_, { block_timestamp }) => (
        // <>{moment(new Date(+block_timestamp * 1000)).fromNow()}</>
        <>{block_timestamp}</>
      ),
    },
    {
      title: renderTableStatusHeader,
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => (
        <Tag className={`scroll-tag-${status} capitalize`}>{status}</Tag>
      ),
    },
    {
      title: "Commit Tx Hash",
      dataIndex: "rollup_tx_hash",
      key: "rollup_tx_hash",

      render: (_, { rollup_tx_hash }) =>
        rollup_tx_hash ? (
          <a
            className="text-[#4e46e5] hover:text-[#6366f1] hover:underline"
            href={`${l1ExplorerUrl}/tx/${rollup_tx_hash}`}
          >
            {truncatedHash(rollup_tx_hash)}
          </a>
        ) : (
          "-"
        ),
    },
    {
      title: "Finalize Tx Hash",
      dataIndex: "finalize_tx_hash",
      key: "finalize_tx_hash",

      render: (_, { finalize_tx_hash }) =>
        finalize_tx_hash ? (
          <a
            className="text-[#4e46e5] hover:text-[#6366f1] hover:underline"
            href={`${l1ExplorerUrl}/tx/${finalize_tx_hash}`}
          >
            {truncatedHash(finalize_tx_hash)}
          </a>
        ) : (
          "-"
        ),
    },
  ];

  const fetchData = (pagination: TablePaginationConfig = {}) => {
    setLoading(true);
    fetch(
      `${process.env.REACT_APP_ROLLUPSCAN_BASE_API_URL}/l2_blocks?page=${pagination.current}&per_page=${pagination.pageSize}`
    )
      .then((res) => res.json())
      .then(({ blocks, total }) => {
        setData(blocks);
        setLoading(false);
        setPagination({
          ...pagination,
          total,
          showSizeChanger: true,
        });
      });
  };

  useEffect(() => {
    const params = {
      current: +(searchParams.get("page") || DEFAULT_PAGE) as number,
      pageSize: +(searchParams.get("per_page") || DEFAULT_PAGE_SIZE) as number,
    };
    fetchData(params);
  }, []);

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    navigate(
      `/rollupscan/?page=${newPagination.current}&per_page=${newPagination.pageSize}`
    );
    fetchData(newPagination);
  };

  const truncatedHash = (hash: string) => {
    return `${hash.substring(0, 6)}…${hash.substring(62, 66)}`;
  };

  return (
    <Table
      columns={columns}
      rowKey={(record) => record.block_height}
      dataSource={data}
      pagination={pagination}
      loading={loading}
      onChange={handleTableChange}
      className="border-[1px] border-outline rounded overflow-hidden"
    />
  );
};

export default App;
