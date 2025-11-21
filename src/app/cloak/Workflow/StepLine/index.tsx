import { Stack } from "@mui/material"
import { Typography } from "@mui/material"

import WorkflowLineSvg from "@/assets/svgs/cloak/workflow-line.svg"

const StepLine = props => {
  const { content } = props
  return (
    <Stack sx={{ position: "relative", width: "100%", alignItems: "center", justifyContent: "center" }}>
      <WorkflowLineSvg></WorkflowLineSvg>
      <Typography
        sx={{
          position: "absolute",
          left: ["calc(50% + 1.4rem)", "calc(50% + 1.4rem)", "calc(50% + 8rem)"],
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: ["1.2rem", "1.6rem"],
          lineHeight: ["1.5rem", "2.4rem"],
          maxWidth: "calc(50% - 2rem)",
          color: "text.primary",
        }}
      >
        {content}
      </Typography>
    </Stack>
  )
}

export default StepLine
