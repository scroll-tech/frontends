import React from "react";
import { Col, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

interface DataType {
  title: string;
  value: string;
  description: string;
}

const Card: React.FC<DataType> = ({ title, value, description }: DataType) => {
  return (
    <Col sm={24} md={8} className="w-full">
      <div className="bg-white  py-[16px] px-[20px] rounded mb-[20px] border-[1px] border-outline">
        <div className="text-[16px] text-[#00000073] mb-[20px]">
          {title}
          <Tooltip title={description}>
            <InfoCircleOutlined className="!align-text-bottom ml-[4px]" />
          </Tooltip>
        </div>
        <div className="text-[28px] text-[#000] font-bold">{value}</div>
      </div>
    </Col>
  );
};

export default Card;
