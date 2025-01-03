import { Box, Stack, Typography } from "@mui/material"

import ContentCard from "./ContentCard"

const ContentSection = props => {
  const { title, icon: IconSvg, children, items } = props

  return (
    <>
      <Stack direction="column" spacing="4rem">
        <Stack direction="row" spacing="1.6rem">
          {!!IconSvg && <IconSvg className="w-[3.8rem] h-auto"></IconSvg>}
          <Typography sx={{ fontSize: "3.6rem", fontWeight: 500, lineHeight: "normal" }}>{title}</Typography>
        </Stack>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: ["repeat(auto-fill, minmax(25rem, 1fr))"],
            gridAutoRows: "23.6rem",
            gap: "2.4rem",
            mt: ["1.6rem", "4rem"],
          }}
        >
          {children.map((item, index) => (
            <ContentCard key={index} {...item}></ContentCard>
          ))}
        </Box>
      </Stack>
      {!!items && (
        <>
          {items.map((item, index) => (
            <Stack key={index} direction="column" spacing="4rem">
              <Typography sx={{ fontSize: "2.8rem", fontWeight: 500, lineHeight: "normal" }}>{item.title}</Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: ["repeat(auto-fill, minmax(25rem, 1fr))"],
                  gridAutoRows: "23.6rem",
                  gap: "2.4rem",
                  mt: ["1.6rem", "4rem"],
                }}
              >
                {item.children.map((child, index) => (
                  <ContentCard key={index} {...child}></ContentCard>
                ))}
              </Box>
            </Stack>
          ))}
        </>
      )}
    </>
  )
}

export default ContentSection
