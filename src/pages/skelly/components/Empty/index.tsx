import Img from "react-cool-img"
import { useNavigate } from "react-router-dom"

import { Stack, Typography } from "@mui/material"

import Button from "@/pages/skelly/components/Button"
import useSkellyStore from "@/stores/skellyStore"

const Empty = ({ title }) => {
  const navigate = useNavigate()
  const { changeUpgradeDialog, changeBadgesDialog } = useSkellyStore()

  const moveToEcosystem = () => {
    navigate("/ecosystem")
    changeUpgradeDialog(false)
    changeBadgesDialog(false)
  }
  return (
    <Stack justifyContent="center" alignItems="center" height="100%">
      <Img style={{ width: "20rem", height: "20rem" }} src="/imgs/skelly/Scrolly_Wen.png" alt="Coding Scrolly" />
      <Typography sx={{ fontSize: "3.2rem", lineHeight: "4.8rem", fontWeight: 600, mb: "0.8rem", color: "#fff" }}>{title}</Typography>
      <Typography sx={{ fontSize: "1.8rem", lineHeight: "2.8rem", mb: "4rem", color: "#fff" }}>
        Explore protocols offering badges on the ecosystem page.
      </Typography>
      <Button sx={{ width: "15.6rem", height: "4rem", fontSize: "1.6rem" }} color="primary" onClick={moveToEcosystem}>
        Go to ecosystem
      </Button>
    </Stack>
  )
}

export default Empty
