import { Tooltip as MuiTooltip, Typography, Box } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const Tooltip = (props) => {
  return (
    <MuiTooltip title={props.title}>
      <Box display="inline-flex" alignItems="center">
        <Typography align="left" sx={{ fontWeight: 500, fontSize: "1.4rem" }}>
          {props.name}
        </Typography>
        <InfoOutlinedIcon sx={{ fontSize: "2rem", marginLeft: "0.4rem" }} />
      </Box>
    </MuiTooltip>
  );
};

export default Tooltip;
