import { isNull, isNumber } from "lodash"
import { useState } from "react"

import { Avatar, Box, Button, List, ListItem, ListItemIcon, ListItemText, Stack, SvgIcon, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { styled } from "@mui/system"

import { SESSIONS_ONE_ACTIVITIES } from "@/constants"
import { commafy, formatLargeNumber } from "@/utils"

import MarksTooltip from "../components/MarksTooltip"
import Statistic from "../components/Statistic"
import OthersModal from "./OthersModal"
import { PROJECT_MAP } from "./projectList"

export enum MarksType {
  ELIGIBLE_ASSETS,
  GAS_SPENT,
}

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  lineHeight: "2.8rem",
  fontWeight: 600,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.8rem",
  },
}))

const SectionDescription = styled(Typography)(({ theme }) => ({
  fontSize: "1.8rem",
  lineHeight: "2.4rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.4rem",
  },
}))

const MarkList = props => {
  const { id, icon, title, data, description, isLoading } = props
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  const handleOpenOthersModal = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Stack id={id} className="session-section" direction="row" gap="0.8rem" sx={{ mb: [0, "0.8rem"] }} alignItems="center">
        <SvgIcon sx={{ fontSize: "2.4rem" }} component={icon} inheritViewBox></SvgIcon>
        <SectionTitle>{title}</SectionTitle>
      </Stack>
      <SectionDescription>{description}</SectionDescription>
      <List
        sx={{
          p: 0,
          "& *": {
            fontFamily: "var(--developer-page-font-family) !important",
          },
        }}
      >
        {data?.map((item, index) => (
          <ListItem
            key={item.project}
            sx={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: ["repeat(2, max-content) 1fr", "repeat(2, max-content) 1fr"],
              columnGap: ["0.8rem", "1.6rem"],
              rowGap: ["1.6rem"],
              height: ["auto", "5.6rem"],
              m: ["2.4rem 0 !important", "3.2rem 0 !important"],
              p: 0,
            }}
          >
            {item.project === "Others" ? (
              <>
                <Stack direction="column" gap="4px">
                  <Typography sx={{ fontSize: "2rem", lineHeight: "2.4rem", fontWeight: 600 }}>Others</Typography>
                  <Stack direction="row" gap="4px">
                    {item?.items?.map(({ project, logo, website }) => (
                      <Avatar
                        key={project}
                        variant="square"
                        src={PROJECT_MAP[project].logo}
                        alt={project}
                        sx={{ width: "2rem", height: "2rem", borderRadius: "3px", backgroundColor: "background.default" }}
                      ></Avatar>
                    ))}
                  </Stack>
                </Stack>
                <div></div>
              </>
            ) : (
              <>
                <ListItemIcon sx={{ minWidth: "unset" }}>
                  <Avatar
                    variant="square"
                    sx={{
                      width: ["4rem", "4.8rem"],
                      height: ["4rem", "4.8rem"],
                      borderRadius: id === SESSIONS_ONE_ACTIVITIES ? "50%" : "7px",
                      backgroundColor: "background.default",
                    }}
                    src={PROJECT_MAP[item.project].logo}
                  ></Avatar>
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    sx: {
                      fontSize: ["1.6rem", "2rem"],
                      lineHeight: ["2.4rem", "3.2rem"],
                      fontWeight: 600,
                      maxWidth: ["15.2rem", "15.2rem", "unset"],
                    },
                  }}
                >
                  {PROJECT_MAP[item.project].name}
                </ListItemText>
              </>
            )}
            {isNull(item.marks) ? (
              <Box
                sx={{
                  justifySelf: "flex-end",
                  // will replace responsive css in Statistic
                  [theme.breakpoints.up("sm")]: {
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                  },
                }}
              >
                <Typography sx={{ fontSize: ["1.4rem", "1.6rem"] }}>Coming soon</Typography>
              </Box>
            ) : (
              <MarksTooltip key={item.marks} disabled={!item.marks} title={item.marks ? commafy(item.marks) : "--"}>
                <Box
                  sx={{
                    justifySelf: "flex-end",
                    // will replace responsive css in Statistic
                    [theme.breakpoints.up("sm")]: {
                      position: "absolute",
                      left: "50%",
                      transform: "translateX(-50%)",
                    },
                  }}
                >
                  <Statistic count={isNumber(item.marks) ? formatLargeNumber(item.marks, 2) : "--"} isLoading={isLoading} sx={{}}></Statistic>
                </Box>
              </MarksTooltip>
            )}

            {item.project === "Others" ? (
              <>
                <Button
                  sx={{
                    borderRadius: "0.8rem",
                    borderWidth: "1px",
                    borderColor: "text.primary",
                    fontSize: ["1.6rem", "1.8rem"],
                    fontWeight: 600,
                    height: "4.8rem",
                    width: ["100%", "18rem"],
                    p: 0,
                    justifySelf: "flex-end",
                    "&:hover": { borderWidth: "1px", borderColor: "primary.main" },
                    [theme.breakpoints.down("sm")]: {
                      gridColumn: "span 3",
                    },
                  }}
                  onClick={handleOpenOthersModal}
                >
                  View all protocols
                </Button>
                <OthersModal open={open} data={item.items} onClose={handleClose}></OthersModal>
              </>
            ) : (
              <Button
                sx={{
                  borderRadius: "0.8rem",
                  borderWidth: "1px",
                  borderColor: "text.primary",
                  fontSize: ["1.6rem", "1.8rem"],
                  fontWeight: 600,
                  height: "4.8rem",
                  width: ["100%", "18rem"],
                  p: 0,
                  justifySelf: "flex-end",
                  "&:hover": { borderWidth: "1px", borderColor: "primary.main" },
                  [theme.breakpoints.down("sm")]: {
                    gridColumn: "span 3",
                  },
                }}
                href={PROJECT_MAP[item.project].website}
                target="_blank"
              >
                {/* Go to {PROJECT_MAP[item.project].alias || PROJECT_MAP[item.project].name} */}
                Go to {PROJECT_MAP[item.project].name}
              </Button>
            )}
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default MarkList
