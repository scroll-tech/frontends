import Image from "next/image"

import { Box } from "@mui/material"

import WorkflowImage from "@/assets/images/cloak/cloak-flow.png"

import SectionWrapper from "../SectionWrapper"

const Workflow = () => {
  return (
    <SectionWrapper title="How Cloak Works" subTitle="Each application owns its unique Cloak private execution layer">
      <Box sx={{ maxWidth: "1000px", mx: "auto" }}>
        <Image src={WorkflowImage} className="w-full h-auto" alt="Cloak Workflow" />
      </Box>
    </SectionWrapper>
  )
}
export default Workflow
