import { isNull, isNumber } from "lodash"

import { Avatar, Box, Button, Link, List, ListItem, ListItemIcon, ListItemText, Skeleton, Stack, SvgIcon, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { styled } from "@mui/system"

import useCheckViewport from "@/hooks/useCheckViewport"
import { commafy, formatLargeNumber, generateExploreLink, toPrecision, truncateHash } from "@/utils"

import MarksTooltip from "../components/MarksTooltip"
import Statistic from "../components/Statistic"

const TOKEN_BASE_URL = "https://scrollscan.com"

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

const ListAddressStyled = styled(Link)(({ theme }) => ({
  color: "#101010",
  fontSize: "1.8rem",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "2.4rem",
  letterSpacing: "0.15px",
  textDecorationLine: "underline",
  textDecorationColor: "unset",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.4rem",
  },
}))

const MarkList = props => {
  const { id, title, icon, data, description, type = MarksType.ELIGIBLE_ASSETS, isLoading } = props
  const theme = useTheme()
  const { isLandscape } = useCheckViewport()

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
            key={index + type}
            sx={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: ["repeat(2, max-content) 1fr", "repeat(2, max-content) 1fr"],
              columnGap: ["0.8rem", "1.6rem"],
              rowGap: ["1.6rem"],
              height: ["auto", "5.6rem"],
              m: ["2.4rem 0 !important", "3.2rem 0 !important"],
              p: [0],
            }}
          >
            <ListItemIcon sx={{ minWidth: "unset" }}>
              <Avatar
                variant="square"
                sx={{ width: ["4rem", "4.8rem", "5.6rem"], height: ["4rem", "4.8rem", "5.6rem"], borderRadius: "0.6rem" }}
                src={item.logoURI}
              ></Avatar>
            </ListItemIcon>
            <ListItemText sx={{ mt: 0, mb: 0 }}>
              {type === MarksType.GAS_SPENT && (
                <>
                  {isLoading ? (
                    <Skeleton variant="text" sx={{ fontSize: ["1.6rem", "2rem"], borderRadius: "4px" }}></Skeleton>
                  ) : (
                    <Typography
                      sx={{
                        fontSize: ["1.6rem", "2rem"],
                        lineHeight: ["2.4rem", "3.2rem"],
                        fontWeight: 600,
                      }}
                    >
                      {isNumber(item.amount) ? (item.amount > 0 ? `${toPrecision(item.amount)} ${item.symbol}` : " Less than $5 ") : "-- ETH"}
                    </Typography>
                  )}

                  <Typography sx={{ fontSize: ["1.4rem", "1.8rem"], lineHeight: "2.4rem" }}>Gas spent</Typography>
                </>
              )}

              {type === MarksType.ELIGIBLE_ASSETS && (
                <>
                  <Typography
                    sx={{ fontSize: ["1.6rem", "2rem"], lineHeight: ["2.4rem", "3.2rem"], fontWeight: 600, maxWidth: ["12rem", "15rem", "unset"] }}
                  >
                    {item.name}
                  </Typography>
                  {item.address && (
                    <ListAddressStyled href={generateExploreLink(TOKEN_BASE_URL, item.address, "token")} target="_blank">
                      {truncateHash(item.address)}
                    </ListAddressStyled>
                  )}
                  {isLandscape && item.containedTokens && (
                    <Stack direction="row">
                      {item.containedTokens.map(({ symbol, logoURI }) => (
                        <Avatar key={symbol} sx={{ width: "2.4rem", height: "2.4rem" }} alt={symbol} src={logoURI}></Avatar>
                      ))}
                    </Stack>
                  )}
                </>
              )}
            </ListItemText>

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
                      // p: "0.8rem 1.6rem",
                    },
                  }}
                >
                  <Statistic
                    count={isNumber(item.marks) && item.marks >= 0 ? formatLargeNumber(item.marks, 2) : "--"}
                    label="Marks earned"
                    isLoading={isLoading}
                    sx={{}}
                  ></Statistic>
                </Box>
              </MarksTooltip>
            )}

            {type === MarksType.ELIGIBLE_ASSETS && (
              <Button
                href={item.thirdPartyBridge ? item.thirdPartyBridge.url : `/bridge?token=${item.symbol}`}
                target={item.thirdPartyBridge ? "_blank" : "_self"}
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
                Go to {item.thirdPartyBridge ? item.thirdPartyBridge.name : "native bridge"}
              </Button>
            )}

            {type === MarksType.GAS_SPENT && (
              <Box
                sx={{
                  justifySelf: "flex-end",
                  width: ["100%", "18rem"],
                  display: "flex",
                  flexDirection: ["row", "column"],
                  justifyContent: "space-between",
                  textAlign: "right",
                  [theme.breakpoints.down("sm")]: {
                    gridColumn: "span 3",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: ["1.4rem", "1.6rem", "1.8rem"],
                    fontWeight: "600",
                  }}
                >
                  Cut-off time
                </Typography>
                <Typography
                  sx={{
                    fontSize: ["1.4rem", "1.6rem", "1.8rem"],
                  }}
                >
                  Apr 29th, 12pm UTC
                </Typography>
              </Box>
            )}
          </ListItem>
        ))}
      </List>
      {/* {type === MarksType.ELIGIBLE_ASSETS && (
        <Typography sx={{ fontSize: ["1.8rem", "2rem"], lineHeight: ["2.8rem"], fontWeight: 600, mb: "2.4rem" }}>
          More eligible assets will be announced soon!
        </Typography>
      )} */}
    </>
  )
}

export default MarkList
