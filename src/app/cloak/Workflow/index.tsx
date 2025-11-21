import { Stack, Typography } from "@mui/material"

import WorkflowLinesMobileSvg from "@/assets/svgs/cloak/workflow-double-lines-mobile.svg"
import WorkflowLinesSvg from "@/assets/svgs/cloak/workflow-double-lines.svg"
import { CLOAK_WORKFLOW_APPS, CLOAK_WORKFLOW_STEPS } from "@/constants/cloak"

import SectionWrapper from "../SectionWrapper"
import AppCard from "./AppCard"
import StepCard from "./StepCard"
import StepLine from "./StepLine"

const Workflow = () => {
  return (
    <SectionWrapper title="How Cloak Works" subTitle="Each application owns its unique Cloak private execution layer">
      <Stack sx={{ alignItems: "center", maxWidth: "100rem", mx: "auto" }}>
        <Stack direction="row" sx={{ gap: ["1.4rem", "1.4rem", "10.4rem"], width: "100%" }}>
          {CLOAK_WORKFLOW_APPS.map(({ key, imageURL, title, name, list }) => (
            <AppCard key={key} sx={{ flex: 1 }} imageURL={imageURL} title={title} name={name} list={list}></AppCard>
          ))}
        </Stack>
        <Stack
          sx={{
            position: "relative",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <WorkflowLinesSvg className="!hidden md:!block"></WorkflowLinesSvg>
          <WorkflowLinesMobileSvg className="block md:!hidden"></WorkflowLinesMobileSvg>
          <Typography
            sx={{
              position: "absolute",
              bottom: ["-18px", 0],
              left: ["calc(50% + 5.4rem)", "calc(50% + 5.4rem)", "calc(50% + 8rem)"],
              fontSize: ["1.2rem", "1.6rem"],
              lineHeight: ["1.5rem", "2.4rem"],
              maxWidth: ["10.4rem", "unset"],
              color: "#3B3B3B",
            }}
          >
            <p>Only send validity proofs.</p>
            <p className="mt-[12px] md:mt-[2px]">No specific data can be accessed.</p>
          </Typography>
        </Stack>

        {CLOAK_WORKFLOW_STEPS.map(({ key, imageURL, content, content2, backgroundColor, stepMark }) => (
          <>
            <StepCard
              key={key}
              sx={{
                width: "100%",
              }}
              backgroundColor={backgroundColor}
              imageURL={imageURL}
              content={content}
              content2={content2}
            ></StepCard>
            {stepMark && <StepLine content={stepMark}></StepLine>}
          </>
        ))}
      </Stack>
    </SectionWrapper>
  )
}
export default Workflow
