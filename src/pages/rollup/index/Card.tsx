import { useNavigate } from "react-router-dom"

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import { Box, Paper, Tooltip, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

const Card = styled(Paper)(({ theme }) => ({
  flex: "1",
  boxShadow: "none",
  borderRadius: "2.7rem",
  background: "#FFF0DD",
  paddingLeft: "6rem",
  paddingTop: "2.7rem",
  paddingBottom: "2.2rem",
  cursor: "pointer",

  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  [theme.breakpoints.down("md")]: {
    padding: "1.8rem 2rem 1.2rem",
  },

  [theme.breakpoints.down("sm")]: {
    paddingLeft: "1.4rem",
    paddingRight: "1rem",
    paddingTop: "1.4rem",
    paddingBottom: "1.1rem",
  },
}))

const CardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginRight: "0.6rem",
  color: theme.palette.text.primary,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.4rem",
    lineHeight: "2rem",
    marginRight: "0.2rem",
  },
}))

const BatchIndex = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  marginRight: "0.6rem",
  display: "inline-block",
  cursor: "pointer",
  "&:hover": {
    opacity: 0.8,
  },
}))

const InfoCard = ({ title, value, total, description, onClickCard }: any) => {
  const navigate = useNavigate()

  const moveToBatchDetail = e => {
    e.stopPropagation()
    navigate(`./batch/${value}`)
  }

  return (
    <Card onClick={onClickCard}>
      <Box display="flex" sx={{ marginBottom: "0.8rem" }}>
        <CardTitle variant="body1" color="textSecondary" sx={{ cursor: "pointer" }}>
          {title}
        </CardTitle>
        <Tooltip title={description}>
          <InfoOutlinedIcon sx={{ fontSize: "2rem", color: "text.secondary" }} />
        </Tooltip>
      </Box>
      <BatchIndex onClick={moveToBatchDetail} variant="h3">
        {value}
      </BatchIndex>
    </Card>
  )
}

export default InfoCard
