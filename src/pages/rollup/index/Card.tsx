import React from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { styled } from "@mui/material/styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../constants";

interface DataType {
  title: string;
  value: string;
  description: string;
}

const Card = styled(Box)(({ theme }) => ({
  flex: "1",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "1rem",
  paddingLeft: "6rem",
  paddingTop: "2.7rem",
  paddingBottom: "2.2rem",
  // cursor: "pointer",
  "&:first-of-type": {
    marginRight: "3.2rem",
  },
  "&:hover": {},
  [theme.breakpoints.down("md")]: {
    paddingLeft: "1.4rem",
    paddingRight: "1rem",
    paddingTop: "1.4rem",
    paddingBottom: "1.1rem",
    "&:first-of-type": {
      marginRight: "2.4rem",
    },
  },
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  marginRight: "0.6rem",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.4rem",
    lineHeight: "2rem",
    marginRight: "0.2rem",
  },
}));

const InfoCard = ({ title, value, description }: any) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const moveToTargetPage = () => {
    // const pageSize = +(
    //     searchParams.get("per_page") || DEFAULT_PAGE_SIZE
    //   ) as number,
    //   current = +(searchParams.get("page") || DEFAULT_PAGE) as number;
    // navigate(`/rollupscan/?page=2&per_page=${pageSize}`, {
    //   replace: true,
    // });
  };
  const moveToBatchDetail = () => {
    // navigate(`/rollupscan/batch/${value}`);
  };

  return (
    <Card onClick={moveToTargetPage}>
      <Box display="flex" alignItems="center" sx={{ marginBottom: "0.8rem" }}>
        <CardTitle variant="body1">{title}</CardTitle>
        <Tooltip title={description}>
          <InfoOutlinedIcon sx={{ fontSize: "2rem" }} />
        </Tooltip>
      </Box>
      <Typography
        onClick={moveToBatchDetail}
        variant="h3"
        sx={{ fontWeight: 500, marginRight: "0.6rem" }}
      >
        {value}
      </Typography>
    </Card>
  );
};

export default InfoCard;
