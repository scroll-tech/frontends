import { Box, Container, Typography } from "@mui/material"

import AdminSvg from "@/assets/svgs/cloak/admin.svg"
import DisclosureSvg from "@/assets/svgs/cloak/disclosure.svg"
import ModularSvg from "@/assets/svgs/cloak/modular.svg"
import SelfHostedSvg from "@/assets/svgs/cloak/self-hosted.svg"
import WorkflowSvg from "@/assets/svgs/cloak/workflow.svg"
import { CLOAK_CONTROL_DESCS } from "@/constants"

import SectionWrapper from "../SectionWrapper"
import ControlCard from "./ControlCard"

const iconMap = {
  "self-hosted": SelfHostedSvg,
  admin: AdminSvg,
  modular: ModularSvg,
  workflow: WorkflowSvg,
  disclosure: DisclosureSvg,
}

const Control = () => {
  return (
    <SectionWrapper
      title="Sovereignty & Enterprise Control"
      subTitle="Cloak empowers you with full organizational control:"
      backgroundColor="#D2FCF6"
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: ["repeat(auto-fit, minmax(330px, 1fr))", "repeat(auto-fit, minmax(380px, 1fr))"],
          columnGap: "1.2rem",
          rowGap: ["1.2rem", "2.4rem", "4.8rem"],
        }}
      >
        {CLOAK_CONTROL_DESCS.map(({ key, title, content }, index) => (
          <ControlCard
            key={key}
            sx={{
              backgroundColor: index % 2 ? "#D0F3F2" : "#A9F0E6",
            }}
            Icon={iconMap[key]}
            title={title}
            content={content}
          ></ControlCard>
        ))}
      </Box>
    </SectionWrapper>
  )
}
export default Control
