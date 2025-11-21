import Image from "next/image"

import { Box, Stack, Typography } from "@mui/material"

const AppCard = props => {
  const { imageURL, title, name, list, sx } = props
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: ["repeat(3, min-content)", "min-content 1fr"],
        gridTemplateAreas: [
          `
          "title"
          "image"
          "list"
        `,
          `
          "title image"
          "list image"
        `,
          `
          "title image"
          "list image"
        `,
        ],
        p: ["1.5rem 1.1rem 2rem", "2rem 3rem 2.4rem", "2rem 3rem 2.4rem", "2.7rem 4.5rem 2.7rem 5.2rem"],
        borderRadius: "2rem",
        backgroundColor: "rgba(235, 194, 142, 0.23)",
        rowGap: ["0.8rem", "1.4rem"],
        columnGap: ["0.8rem", "1.4rem", "2.8rem"],
        ...sx,
      }}
    >
      <Typography
        sx={{
          fontSize: ["1.6rem", "2.2rem"],
          lineHeight: 1.4,
          fontWeight: 500,
          pt: [0, 0, "0.5rem"],
          pl: ["8px", 0],
          gridArea: "title",
        }}
      >
        {title}
        <br />
        {name}
      </Typography>
      <Image
        className="h-[100px] sm:h-[126px] md:h-[160px] lg:h-[200px]"
        style={{
          width: "auto",
          objectFit: "contain",
          gridArea: "image",
          alignSelf: "center",
          justifySelf: "center",
        }}
        src={imageURL}
        alt={title}
      />

      <Stack
        component="ul"
        sx={{
          gridArea: "list",
          gap: ["3px", "3px", "6px"],
          listStyle: "none",
          "& li": {
            position: "relative",
            whiteSpace: "nowrap",
            pl: ["10px", "12px"],
            "&::before": {
              content: '""',
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "currentColor",
            },
          },
        }}
      >
        {list.map((item, index) => (
          <li key={index}>
            <Typography
              sx={{
                fontSize: ["1.4rem", "1.6rem"],
                lineHeight: 1.4,
                fontWeight: [400, 500],
              }}
            >
              {item}
            </Typography>
          </li>
        ))}
      </Stack>
    </Box>
  )
}

export default AppCard
