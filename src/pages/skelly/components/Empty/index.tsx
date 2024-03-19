import Img from "react-cool-img"
import { useNavigate } from "react-router-dom"

import { Stack, Typography } from "@mui/material"

import Button from "@/components/Button"
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
      <Img style={{ width: "20rem", height: "20rem" }} src="/imgs/skelly/Scrolly_Wen.webp" alt="Coding Scrolly" />
      <Typography sx={{ fontSize: "3.2rem", lineHeight: "4.8rem", fontWeight: 600, mb: "0.8rem", color: "primary.contrastText" }}>{title}</Typography>
      <Typography sx={{ fontSize: "1.8rem", lineHeight: "2.8rem", mb: "3.2rem", color: "primary.contrastText" }}>
        Explore protocols offering badges on the ecosystem page.
      </Typography>
      <Button color="primary" onClick={moveToEcosystem}>
        Go to ecosystem
      </Button>
    </Stack>
  )
}

export default Empty
