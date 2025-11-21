// TODO: a new section wrapper, but not ready to replace components/SectionWrapper yet
import { Box, Container, Stack, Typography } from "@mui/material"

interface SectionWrapperProps {
  title: string | React.ReactNode
  subTitle?: string
  children: React.ReactNode
  backgroundColor?: string
  color?: string
}

const SectionWrapper = (props: SectionWrapperProps) => {
  const { title, subTitle, children, backgroundColor = "themeBackground.light", color = "text.primary" } = props
  return (
    <Box sx={{ backgroundColor, py: ["4rem", "6rem", "8rem"] }}>
      <Container>
        <Stack sx={{ gap: ["1rem", "1.6rem"], mb: ["2rem", "3.2rem", "4.8rem"] }}>
          <Typography
            sx={{
              typography: "title",
              fontSize: ["2.4rem", "3.2rem"],
              lineHeight: 1.4,
              color,
            }}
          >
            {title}
          </Typography>
          {subTitle && (
            <Typography
              sx={{
                fontSize: ["2rem", "2.4rem"],
                lineHeight: 1.4,
                color,
              }}
            >
              {subTitle}
            </Typography>
          )}
        </Stack>
        {children}
      </Container>
    </Box>
  )
}

export default SectionWrapper
