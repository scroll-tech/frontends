import { useRef, useState } from "react"
import Img from "react-cool-img"
import { makeStyles } from "tss-react/mui"

import { Box, Button, Stack, SvgIcon, Typography } from "@mui/material"

import { ecosystemListLogoUrl } from "@/apis/ecosystem"
import { ReactComponent as ArrowSvg } from "@/assets/svgs/ecosystem/arrow.svg"
import { ReactComponent as TwitterSvg } from "@/assets/svgs/ecosystem/twitter.svg"
import LinesEllipsis from "@/components/LinesEllipsis"
import Link from "@/components/Link"
import TextButton from "@/components/TextButton"
import { TWITTER_ORIGIN } from "@/constants"
import useCheckViewport from "@/hooks/useCheckViewport"

import NetworkLabel from "./NetworkLabel"

const useStyles = makeStyles()(theme => ({
  grid: {
    marginTop: "2rem",
    backgroundColor: theme.palette.themeBackground.normal,
    padding: "2.4rem",
    borderRadius: "2rem",
    position: "relative",

    display: "grid",
    gridTemplateColumns: "max-content 1fr max-content",
    gridTemplateAreas: ` 
      "logo name action"
      "logo desc action";
      `,
    columnGap: "2.4rem",
    rowGap: "0.8rem",

    [theme.breakpoints.down("lg")]: {
      gridTemplateAreas: ` 
      "logo name action"
      "logo tag action"
      "logo desc action";
      `,
      columnGap: "2rem",
    },
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "max-content 1fr",
      gridTemplateAreas: ` 
      "logo name"
      "tag tag"
      "desc desc"
      "action action"
      `,
      columnGap: "0.8rem",
      rowGap: "1.6rem",
      padding: "2.4rem 1.6rem",
    },
  },
  logo: {
    width: "8.8rem",
    height: "8.8rem",
    borderRadius: "0.8rem",
    overflow: "hidden",
    alignSelf: "center",
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down("sm")]: {
      width: "4.8rem",
      height: "4.8rem",
    },
  },
  name: {
    gridArea: "name",
    [theme.breakpoints.up("sm")]: {
      alignSelf: "flex-end",
    },
  },
  desc: {
    gridArea: "desc",
    fontSize: "1.6rem",
    lineHeight: "2.4rem",
    color: "#5b5b5b",
    maxWidth: "72rem",
  },

  tagWrapper: {
    display: "flex",
    gridArea: "tag",
    [theme.breakpoints.down("sm")]: {
      alignItems: "start",
      margin: "-4px",
      justifyContent: "flex-start",
    },
  },
  tag: {
    display: "inline-block",
    color: "#84623A",
    backgroundColor: theme.palette.themeBackground.highlight,
    borderRadius: "1.6rem",
    padding: "0.4rem 1.2rem",
    fontSize: "1.6rem",
    lineHeight: 1.5,
    "&:nth-of-type(n + 2)": {
      marginLeft: "0.8rem",
    },
  },
  networkLabel: {
    position: "absolute",
    top: "4px",
    right: "4px",
  },
  action: {
    gridArea: "action",
    alignSelf: "center",

    borderRadius: "0.8rem",
    padding: "0.8rem 2.4rem",
    fontSize: "1.8rem",
    height: "4rem",
    width: "10.6rem",
    fontWeight: 600,
    [theme.breakpoints.down("sm")]: {
      justifySelf: "flex-start",
      fontSize: "1.6rem",
      width: "9.6rem",
    },
  },
}))

const ProtocolCard = props => {
  const { name, hash, ext, tags, desc, website, twitterHandle, networkLabel, onResize, className, ...restProps } = props
  const { classes, cx } = useStyles()
  const { isMobile, isDesktop } = useCheckViewport()

  const [isExpended, setIsExpended] = useState(false)

  const cardRef = useRef<HTMLElement>()

  const handleClickMore = () => {
    setIsExpended(true)
  }

  const handleReflow = value => {
    // don't trigger measure when the height exceeds the standard height by default
    const standardHeight = isDesktop ? 156 : isMobile ? 324 : 196
    if (!isExpended && cardRef.current!.clientHeight > standardHeight) {
      return
    }
    onResize()
  }
  return (
    <Box className={cx(classes.grid, className)} ref={cardRef} {...restProps}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        className={classes.logo}
        sx={{
          gridArea: "logo",
        }}
      >
        <Img alt={name} src={`${ecosystemListLogoUrl}${name}${ext}`} placeholder={hash} width={isMobile ? 48 : 88} height={isMobile ? 48 : 88}></Img>
      </Stack>
      <Stack direction="row" alignItems="center" gap="0.8rem" className={classes.name}>
        <Typography sx={{ fontSize: ["2rem", "2.4rem"], lineHeight: ["2.8rem", "3.2rem"], fontWeight: 600 }}>{name}</Typography>
        <Link
          external
          href={TWITTER_ORIGIN + twitterHandle}
          sx={{
            color: "inherit",
            "&:hover": {
              color: theme => theme.palette.primary.main,
            },
          }}
        >
          <SvgIcon sx={{ fontSize: "1.4rem" }} component={TwitterSvg} inheritViewBox></SvgIcon>
        </Link>
        {isDesktop && (
          <Box className={classes.tagWrapper}>
            {tags
              ? (tags as string[]).map(value => (
                  <span className={classes.tag} key={value}>
                    {value.trim()}
                  </span>
                ))
              : null}
          </Box>
        )}
      </Stack>
      {desc ? (
        <LinesEllipsis
          className={classes.desc}
          text={desc}
          maxLine={isExpended ? 100 : isMobile ? 4 : 2}
          ellipsis={
            <>
              &thinsp;...&thinsp;
              <TextButton sx={{ fontWeight: 400, color: "#5b5b5b" }} underline="always" onClick={handleClickMore}>
                More
              </TextButton>
            </>
          }
          basedOn="words"
          onReflow={handleReflow}
        />
      ) : (
        <Typography className={classes.desc}>(empty)</Typography>
      )}

      {!isDesktop && (
        <Box className={classes.tagWrapper}>
          {tags
            ? (tags as string[]).map(value => (
                <span className={classes.tag} key={value}>
                  {value.trim()}
                </span>
              ))
            : null}
        </Box>
      )}
      <Button
        href={website}
        target="_blank"
        classes={{ root: classes.action }}
        endIcon={<SvgIcon sx={{ fontSize: ["1.2rem !important", "1.4rem !important"] }} component={ArrowSvg} inheritViewBox></SvgIcon>}
      >
        Visit
      </Button>
      {networkLabel !== "Mainnet" && <NetworkLabel className={classes.networkLabel}>{networkLabel}</NetworkLabel>}
    </Box>
  )
}
export default ProtocolCard
