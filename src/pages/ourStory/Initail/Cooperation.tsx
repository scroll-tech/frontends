import { Avatar, Paper, Typography } from "@mui/material"
import { styled } from "@mui/system"

const PARTNER_LIST = ["NEST Protocol", "LI.FI", "QuestN", "Owlto Finance", "JOJO Exchange", "Carrot"]

const PARTNER_LOGO_PUBLIC_URL = "https://scroll-eco-list.netlify.app/logos/"

const Logo = styled(Avatar)(({ theme }) => ({
  width: "8.8rem",
  height: "8.8rem",
  position: "absolute",
  "&:nth-of-type(1)": {
    top: 0,
    left: "20%",
    transform: "translateY(-50%)",
  },
  "&:nth-of-type(2)": {
    top: 0,
    right: "18%",
    transform: "translateY(-30%)",
  },
  "&:nth-of-type(3)": {
    bottom: 0,
    right: 0,
    transform: "translate(20%, 20%)",
  },
  "&:nth-of-type(4)": {
    bottom: 0,
    right: "30%",
    transform: "translateY(70%)",
  },
  "&:nth-of-type(5)": {
    bottom: 0,
    left: "26%",
    transform: "translateY(90%)",
  },
  "&:nth-of-type(6)": {
    top: "50%",
    left: 0,
    transform: "translateX(-50%)",
  },
}))

const Cooperation = () => {
  return (
    <Paper elevation={0} sx={{ backgroundColor: "themeBackground.normal", borderRadius: "2.5rem", p: "4.4rem 4rem 5.4rem", position: "relative" }}>
      <Typography sx={{ fontSize: "3.2rem" }}>
        From Day One,<br></br>Scroll embraced openness by choosing to be an open-source project. Collaboration from various projects and active
        community participation make our platform more robust and battle-tested. 
      </Typography>
      {PARTNER_LIST.map(item => (
        <Logo key={item} src={`${PARTNER_LOGO_PUBLIC_URL}${item}.png`}></Logo>
      ))}
    </Paper>
  )
}

export default Cooperation
