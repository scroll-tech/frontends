import { useNavigate } from "react-router-dom"

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import { Box, Tooltip, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

const Card = styled(Box)(({ theme }) => ({
  flex: "1",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "1rem",
  paddingLeft: "6rem",
  paddingTop: "2.7rem",
  paddingBottom: "2.2rem",
  cursor: "pointer",
  "&:first-of-type": {
    marginRight: "3.2rem",
  },
  [theme.breakpoints.down("md")]: {
    paddingLeft: "1.4rem",
    paddingRight: "1rem",
    paddingTop: "1.4rem",
    paddingBottom: "1.1rem",
    "&:first-of-type": {
      marginRight: "2.4rem",
    },
  },
}))

const CardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  marginRight: "0.6rem",
  [theme.breakpoints.down("md")]: {
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
      <Box display="flex" alignItems="center" sx={{ marginBottom: "0.8rem" }}>
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
