import Table from "./Table";
import MTable from "./MTable";
import Card from "./Card";
import { Row } from "antd";
import { useLastBlockNums } from "@/hooks/useLastBlockNums";
import "antd/dist/antd.min.css";
import "./index.less";

const Blocks = () => {
  const { lastBlockNums } = useLastBlockNums();
  return (
    <div className="rollup-app">
      <main>
        <div>
          <div className="wrapper py-[40px] min-h-[calc(100vh_-_544px)] md:!py-[60px] md:min-h-[calc(100vh_-_556px)] ">
            <Row className=" flex mb-[20px]" gutter={16}>
              <Card
                title="Last Pre-committed Block No."
                value={lastBlockNums?.precommitted_num ?? 0}
                description="Indicates a block has been included in the L2 blockchain."
              />
              <Card
                title="Last Committed Block No."
                value={lastBlockNums?.committed_num ?? 0}
                description="Indicates the transaction data of this block has been posted on the rollup contract on L1."
              />
              <Card
                title="Last Finalized Block No."
                value={lastBlockNums?.finalized_num ?? 0}
                description="Indicates the validity proof of this block has been posted and verified on L1."
              />
            </Row>
            <div className="md:hidden">
              <MTable />
            </div>
            <div className="hidden md:block">
              <Table />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blocks;
