import { List, Tag } from "antd";
import type { PaginationConfig } from "antd/lib/pagination";
import React, { useEffect, useState } from "react";
import { l1ExplorerUrl, l2ExplorerUrl } from "@/constants/index";
import moment from "moment";

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

const App: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationConfig>({
    current: 1,
    pageSize: 10,
  });

  const fetchData = (pagination: PaginationConfig = {}) => {
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
        });
      });
  };

  useEffect(() => {
    fetchData(pagination);
  }, []);

  const handleListChange = (newPagination: PaginationConfig) => {
    fetchData(newPagination);
  };

  const truncatedHash = (hash: string) => {
    return hash ? `${hash.substring(0, 8)}…${hash.substring(60, 66)}` : "-";
  };

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      bordered
      loading={loading}
      pagination={{
        simple: true,
        total: pagination.total,
        onChange: (current, pageSize) =>
          handleListChange({
            current,
            pageSize,
          }),
      }}
      className="bg-white !rounded !border-transparent shadow"
      renderItem={(item: DataType) => (
        <List.Item>
          <div>
            <div className="mb-[2px]">
              <span>L2 Block No. {item.block_height}</span>
              <span className="ml-[12px] text-[#77838f] text-[12px]">
                {moment(new Date(+item.block_timestamp * 1000)).fromNow()}
              </span>
            </div>
            <div className="mb-[2px]">
              Status {""}{" "}
              <Tag className={`scroll-tag-${item.status} capitalize`}>
                {item.status}
              </Tag>
              {item.tx_num} Tx(s)
            </div>
            <div className="mb-[2px]">
              Block Hash{" "}
              <a
                className="text-[#4e46e5] hover:text-[#6366f1] hover:underline"
                href={`${l2ExplorerUrl}/block/${item.header_hash}`}
              >
                {truncatedHash(item.header_hash)}
              </a>
            </div>
            <div className="mb-[2px]">
              Commit Tx Hash{" "}
              <a
                className="text-[#4e46e5] hover:text-[#6366f1] hover:underline "
                href={`${l1ExplorerUrl}/tx/${item.rollup_tx_hash}`}
              >
                {truncatedHash(item.rollup_tx_hash)}
              </a>
            </div>
            <div className="mb-[2px]">
              Finalize Tx Hash{" "}
              <a
                className="text-[#4e46e5] hover:text-[#6366f1] hover:underline"
                href={`${l1ExplorerUrl}/tx/${item.finalize_tx_hash}`}
              >
                {truncatedHash(item.finalize_tx_hash)}
              </a>
            </div>
          </div>
        </List.Item>
      )}
    />
  );
};

export default App;
