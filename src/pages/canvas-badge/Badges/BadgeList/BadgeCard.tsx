import Img from "react-cool-img"
import { makeStyles } from "tss-react/mui"

import { Box, Card, CardContent, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as TotalMintedSvg } from "@/assets/svgs/canvas-badge/total-minted.svg"
import { CATEGORY_LIST } from "@/constants"
import useCheckViewport from "@/hooks/useCheckViewport"
import BadgeDesc from "@/pages/canvas/components/BadgeDesc"
import { commafy } from "@/utils"

const useStyles = makeStyles()(theme => ({
  category: {
    position: "absolute",
    top: "0.8rem",
    right: "0.8rem",
    borderRadius: "1.6rem",
    padding: "0 0.8rem",
    fontSize: "1.6rem",
    fontWeight: 500,
    lineHeight: "3.2rem",
    color: theme.palette.primary.contrastText,
    backgroundColor: "rgba(255, 255, 255, 0.10)",
    height: "3.2rem",
    overflow: "hidden",
    willChange: "width, transform",
    cursor: "default",

    maxWidth: "3.2rem",
    transition: "all 0.3s cubic-bezier(0.34, 1.1, 0.64, 1)",
    "&:hover": {
      maxWidth: "20rem",
    },
  },
}))

const BadgeCard = props => {
  const { name, image, description, issuer, category, count, className, onClick } = props
  const { classes } = useStyles()
  const { isMobile } = useCheckViewport()

  return (
    <Card
      sx={{
        position: "relative",
        aspectRatio: "330 / 320",
        borderRadius: "2rem",
        backgroundColor: "#323232",
        boxShadow: "none",
        border: "none",
        cursor: "pointer",
        "& p": {
          cursor: "pointer !important",
        },
      }}
      className={className}
      onClick={onClick}
    >
      <CardContent
        sx={{
          padding: ["1.6rem !important", "2.4rem !important"],
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.8rem",

          "& p": {
            color: "primary.contrastText",
          },
        }}
      >
        {category === CATEGORY_LIST[1].key && <Box className={classes.category}>{CATEGORY_LIST[1].label}</Box>}
        {category === CATEGORY_LIST[2].key && <Box className={classes.category}>{CATEGORY_LIST[2].label}</Box>}
        {category === CATEGORY_LIST[3].key && <Box className={classes.category}>{CATEGORY_LIST[3].label}</Box>}
        <Img
          alt="logo"
          src={image}
          style={{ height: isMobile ? "4.8rem" : "6.4rem", aspectRatio: "1 / 1", borderRadius: "0.45rem", backgroundColor: "#fff" }}
        />
        <Typography sx={{ fontSize: ["1.8rem", "2rem"], lineHeight: "3.2rem", fontWeight: 600 }}>{name}</Typography>

        <Typography sx={{ fontSize: ["1.4rem", "1.6rem"], lineHeight: "2.4rem", fontWeight: 500, fontFamily: "var(--developer-page-font-family)" }}>
          <SvgIcon sx={{ fontSize: "0.6rem", mr: "0.8rem" }} component={TotalMintedSvg} inheritViewBox></SvgIcon>
          Total Minted: {commafy(count, 0)}
        </Typography>
        <Typography
          sx={{
            fontSize: ["1.6rem", "1.6rem"],
            fontWeight: 400,
            lineHeight: ["2.4rem", "2.4rem"],
            flex: 1,
            display: "-webkit-box",
            width: "100%",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: "3",
            overflow: "hidden",
          }}
        >
          <BadgeDesc>{description}</BadgeDesc>
        </Typography>
        <Typography sx={{ fontSize: ["1.8rem", "1.8rem"], lineHeight: ["2.8rem", "3.2rem"], fontWeight: 600, mt: [0, "1.6rem"] }}>
          <Img
            alt={issuer?.name}
            src={issuer?.logo}
            style={{
              backgroundColor: "white",
              width: isMobile ? "3.2rem" : "3.2rem",
              height: isMobile ? "3.2rem" : "3.2rem",
              borderRadius: "0.45rem",
              marginRight: "1.375rem",
              verticalAlign: "top",
            }}
          />
          {issuer?.name}
        </Typography>
      </CardContent>
    </Card>
  )
}
export default BadgeCard
