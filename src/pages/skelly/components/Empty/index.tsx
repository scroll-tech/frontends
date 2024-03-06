import { useNavigate } from "react-router-dom"

import { Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as EmptySvg } from "@/assets/svgs/skelly/empty.svg"
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
      <SvgIcon sx={{ width: "20rem", height: "20rem" }} component={EmptySvg} inheritViewBox></SvgIcon>
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
