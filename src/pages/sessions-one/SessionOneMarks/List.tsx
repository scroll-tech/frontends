import { isNumber } from "lodash"
import { makeStyles } from "tss-react/mui"

import { Avatar, Box, Button, List, ListItem, ListItemIcon, ListItemText, Stack, SvgIcon, Tooltip, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { styled } from "@mui/system"

// import Button from "@/components/Button"
// import useCheckViewport from "@/hooks/useCheckViewport"
import { commafy, formatLargeNumber } from "@/utils"

import Statistic from "../components/Statistic"

export enum MarksType {
  ELIGIBLE_ASSETS,
  GAS_SPENT,
}

const useStyles = makeStyles()(theme => ({
  tooltip: {
    background: "linear-gradient(180deg, #262626 0%, #111 100%)",
    padding: "1.2rem 1.4rem",
    fontSize: "1.8rem",
    lineHeight: "2.4rem",
    fontFamily: "var(--developer-page-font-family)",
  },
}))

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
  const { classes } = useStyles()
  const theme = useTheme()
  // const { isLandscape } = useCheckViewport()

  return (
    <>
      <Stack id={id} direction="row" gap="0.8rem" sx={{ mb: "0.8rem" }} alignItems="center">
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
              m: "3.2rem 0 !important",
              p: [0],
            }}
          >
            {item.project === "Others" ? (
              <>
                <Stack direction="column" gap="4px">
                  <Typography sx={{ fontSize: "2rem", lineHeight: "2.4rem", fontWeight: 600 }}>Others</Typography>
                  <Stack direction="row" gap="4px">
                    {item.items.map(({ project, logo, website }) => (
                      <Avatar variant="square" src={logo} alt={project} sx={{ width: "2rem", height: "2rem", borderRadius: "3px" }}></Avatar>
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
                    sx={{ width: ["4rem", "4.8rem"], height: ["4rem", "4.8rem"], borderRadius: "6px" }}
                    src={item.logo}
                  ></Avatar>
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ sx: { fontSize: "2rem", lineHeight: "3.2rem", fontWeight: 600 } }}>
                  {item.project}
                </ListItemText>
              </>
            )}

            <Tooltip
              key={item.marks}
              disableHoverListener={!item.marks}
              title={item.marks ? commafy(item.marks) : "--"}
              followCursor
              classes={{ tooltip: classes.tooltip }}
            >
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
            </Tooltip>
            {item.project === "Others" ? (
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
              >
                View all protocols
              </Button>
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
              >
                Go to {item.alias || item.project}
              </Button>
            )}

            {/* <Button
              href={item.project === "others" ? "void 0" : item.website}
              target="_blank"
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
            >
              {item.project === "others" ? "View all protocols" : `Go to ${item.project}`}
            </Button> */}
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default MarkList
