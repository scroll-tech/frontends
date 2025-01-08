import Link from "next/link"
import { Fragment } from "react"

import { Box, Stack, Typography } from "@mui/material"

import ContentCard from "./ContentCard"

const ContentSection = props => {
  const { title, icon: IconSvg, children, items, index } = props

  return (
    <>
      <Stack direction="column" gap={["2.4rem", "4rem"]}>
        <Stack direction="row" spacing="1.6rem" id={`builder-portal-${index}`}>
          {!!IconSvg && <IconSvg className="w-[2.8rem] sm:w-[3.8rem] h-auto"></IconSvg>}
          <Typography sx={{ fontSize: ["2rem", "3.6rem"], fontWeight: [600, 500], lineHeight: ["2.8rem", "normal"] }}>{title}</Typography>
        </Stack>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: ["repeat(auto-fill, minmax(28rem, 1fr))"],
            gridAutoRows: ["auto", "23.6rem"],
            gap: ["1.2rem", "2.4rem"],
          }}
        >
          {children.map((item, index) => (
            <Fragment key={index}>
              {item.upcoming || !item.href ? (
                <ContentCard {...item}></ContentCard>
              ) : (
                <Link href={item.href} target={item.href.startsWith("https") ? "_blank" : "_self"} rel="noopener noreferrer">
                  <ContentCard {...item}></ContentCard>
                </Link>
              )}
            </Fragment>
          ))}
        </Box>
      </Stack>
      {!!items && (
        <>
          {items.map((item, index) => (
            <Stack key={index} direction="column" gap={["2.4rem", "4rem"]}>
              <Typography sx={{ fontSize: ["1.6rem", "2.8rem"], fontWeight: [600, 500], lineHeight: "normal" }}>{item.title}</Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: ["repeat(auto-fill, minmax(28rem, 1fr))"],
                  gridAutoRows: ["auto", "23.6rem"],
                  gap: ["1.2rem", "2.4rem"],
                }}
              >
                {item.children.map((child, index) => (
                  <Fragment key={index}>
                    {child.upcoming || !child.href ? (
                      <ContentCard {...child}></ContentCard>
                    ) : (
                      <Link href={child.href} target={child.href.startsWith("https") ? "_blank" : "_self"} rel="noopener noreferrer">
                        <ContentCard {...child}></ContentCard>
                      </Link>
                    )}
                  </Fragment>
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
