import { isNil } from "lodash"
import { useEffect } from "react"

import { Avatar, Box, Button, Link, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { styled } from "@mui/system"

import { EXPLORER_URL } from "@/constants"
import { commafy, generateExploreLink, truncateHash } from "@/utils"

import Statistic from "../components/Statistic"

export enum MarksType {
  ELIGIBLE_ASSETS,
  GAS_SPENT,
}

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  lineHeight: "2.8rem",
  fontWeight: 600,
  marginBottom: "0.8rem",
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
  fontFamily: "var(--developer-page-font-family)",
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

const TokenList = props => {
  const { title, data, description, type = MarksType.ELIGIBLE_ASSETS, isLoading } = props
  const theme = useTheme()

  useEffect(() => {
    console.log("TokenList useEffect", data)
  }, [data])

  return (
    <>
      <SectionTitle>{title}</SectionTitle>
      <SectionDescription>{description}</SectionDescription>
      <List sx={{ p: 0 }}>
        {data?.map((item, index) => (
          <ListItem
            key={index + type}
            sx={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: ["repeat(2, max-content) 1fr", "repeat(2, max-content) 1fr"],
              gap: "1.6rem",
              height: ["auto", "8.4rem"],
              m: ["1.6rem 0 !important", "2.4rem 0 !important"],
              p: [0],
            }}
          >
            <ListItemIcon sx={{ minWidth: "unset" }}>
              <Avatar variant="square" sx={{ width: ["4rem", "4.8rem", "5.6rem"], height: ["4rem", "4.8rem", "5.6rem"] }} src={item.logoURI}></Avatar>
            </ListItemIcon>
            <ListItemText sx={{ mt: 0, mb: 0 }}>
              {type === MarksType.GAS_SPENT && (
                <>
                  <Typography sx={{ fontSize: ["1.6rem", "2rem"], lineHeight: ["2.4rem", "3.2rem"], fontWeight: 600 }}>
                    {item.gasSpent ?? "--"} ETH
                  </Typography>
                  <Typography sx={{ fontSize: ["1.4rem", "1.6rem"], lineHeight: "2.4rem" }}>Gas spent</Typography>
                </>
              )}

              {type === MarksType.ELIGIBLE_ASSETS && (
                <>
                  <Typography sx={{ fontSize: ["1.6rem", "2rem"], lineHeight: ["2.4rem", "3.2rem"], fontWeight: 600 }}>{item.symbol}</Typography>
                  {item.address && (
                    <ListAddressStyled href={generateExploreLink(EXPLORER_URL["L2"], item.address, "token")} target="_blank">
                      {truncateHash(item.address)}
                    </ListAddressStyled>
                  )}
                </>
              )}
            </ListItemText>

            <Statistic
              count={isNil(item.points) ? "--" : commafy(item.points)}
              label="Masks earned"
              isLoading={isLoading}
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
            ></Statistic>

            {type === MarksType.ELIGIBLE_ASSETS && (
              <Button
                href={item.thirdPartyBridge ? item.thirdPartyBridge.url : `/bridge?token=${item.symbol}`}
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
                  fontFamily: "var(--developer-page-font-family)",
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
                  Apr 26 ,12pm UTC
                </Typography>
              </Box>
            )}
          </ListItem>
        ))}
      </List>
      {type === MarksType.ELIGIBLE_ASSETS && (
        <Typography sx={{ fontSize: ["1.8rem", "2rem"], lineHeight: ["2.8rem"], fontWeight: 600, mb: "2.4rem" }}>
          More eligible assets and bridges will be announced soon!
        </Typography>
      )}
    </>
  )
}

export default TokenList
