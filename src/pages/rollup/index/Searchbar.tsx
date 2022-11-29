import { useEffect, useState } from "react";
import { Paper, Button } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const SearchbarContainer = styled(Paper)(({ theme }) => ({
  width: "100%",
  background: "rgba(201, 203, 206, 0.2)",
  borderRadius: "6px",
  paddingRight: "0.5rem",
  display: "flex",
  alignItems: "center",
  marginBottom: "3.5rem",
  boxShadow: "none",
  [theme.breakpoints.down("md")]: {
    padding: "0",
    overflow: "hidden",
  },
}));

const SearchbarButton = styled(Button)(({ theme }) => ({
  width: "22rem",
  margin: "0.5rem 0",
  ":hover": {
    boxShadow: "none",
  },
  [theme.breakpoints.down("md")]: {
    width: "10.3rem",
    margin: "0",
    borderRadius: 0,
  },
}));

export default function Searchbar(props) {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleKeyUp = (e) => {
    setValue(e.target.value);
    if (e.target.value === "") {
      props.setNoData(false);
    }
  };

  const handleSearch = () => {
    if (value === "") return;
    fetch(
      `${process.env.REACT_APP_ROLLUPSCAN_BASE_API_URL}/batch?batch_id=${value}`
    )
      .then((res) => res.json())
      .then(({ batch }) => {
        if (batch) {
          navigate(`/rollupscan/batch/${value}`);
        } else {
          props.setNoData(true);
        }
      });
  };

  return (
    <SearchbarContainer>
      <IconButton
        sx={{ paddingLeft: "3rem", color: "#595959", pointerEvents: "none" }}
        component="label"
        aria-label="search"
      >
        <SearchIcon sx={{ fontSize: "2rem" }} />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        autoFocus
        placeholder="Search by batch hash"
        inputProps={{ "aria-label": "Search by batch hash" }}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      />
      <SearchbarButton
        color="primary"
        variant="contained"
        onClick={handleSearch}
      >
        Search
      </SearchbarButton>
    </SearchbarContainer>
  );
}
