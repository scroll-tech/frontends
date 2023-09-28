import SectionWrapper from "@/components/SectionWrapper"

import CheckElegbility from "./CheckElegbility"
import Header from "./Header"
import Statement from "./Statement"
import Stepper from "./Stepper"

const ComingSoon = () => {
  return (
    <SectionWrapper
      dark
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pb: ["8rem", "16rem"],
        pt: 0,
        "& .MuiTypography-root": { color: theme => theme.palette.primary.contrastText },
      }}
    >
      <Header></Header>
      <Stepper></Stepper>
      <Statement></Statement>
      <CheckElegbility></CheckElegbility>
    </SectionWrapper>
  )
}

export default ComingSoon
