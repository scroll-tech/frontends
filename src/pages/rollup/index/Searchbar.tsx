import { useState } from "react"
import { useNavigate } from "react-router-dom"

import SearchIcon from "@mui/icons-material/Search"
import { Button, CircularProgress, IconButton, InputBase, Paper, Stack } from "@mui/material"
import { styled } from "@mui/material/styles"

import { searchUrl } from "@/apis/rollupscan"
import useRollupStore from "@/stores/rollupStore"

const SearchbarContainer = styled(Paper)(({ theme }) => ({
  width: "100%",
  background: theme.palette.scaleBackground.primary,
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
}))

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
}))

export default function Searchbar(props) {
  const { changeEmptyBatch, changeSearchLoading, changeErrorMessage, searchLoading } = useRollupStore()
  const [value, setValue] = useState("")
  const navigate = useNavigate()

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleKeyUp = e => {
    setValue(e.target.value)
    if (e.target.value === "") {
      changeEmptyBatch(false)
    }
  }

  const handleSearch = () => {
    if (value === "") return
    changeSearchLoading(true)
    scrollRequest(`${searchUrl}?keyword=${value}`)
      .then(({ batch_index }) => {
        if (~batch_index) {
          navigate(`./batch/${batch_index}/blocks`)
        } else {
          changeEmptyBatch(true)
        }
      })
      .catch(() => {
        changeEmptyBatch(true)
        changeErrorMessage("Failure when searching block")
      })
      .finally(() => {
        changeSearchLoading(false)
      })
  }

  return (
    <SearchbarContainer>
      <IconButton sx={{ paddingLeft: "3rem", color: "text.secondary", pointerEvents: "none" }} component="label" aria-label="search">
        <SearchIcon sx={{ fontSize: "2rem" }} />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        autoFocus
        placeholder="Search by block height / block hash"
        inputProps={{ "aria-label": "Search by block height / block hash" }}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      />
      <SearchbarButton color="primary" variant="contained" disabled={searchLoading} onClick={handleSearch}>
        <Stack direction="row" spacing="10px">
          <span>Search</span>
          {searchLoading && <CircularProgress size="1em" sx={{ color: "inherit" }} thickness={4} />}
        </Stack>
      </SearchbarButton>
    </SearchbarContainer>
  )
}
