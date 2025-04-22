import clsx from "clsx"
import Image from "next/image"
import { makeStyles } from "tss-react/mui"

import { Box, SvgIcon, Typography } from "@mui/material"

import DownloadIcon from "@/assets/images/brandkit/download.svg"

const useStyles = makeStyles<any>()((theme, { type, noSubtitle }) => ({
  item: {
    marginBottom: "16rem",
    [theme.breakpoints.down("md")]: {
      marginBottom: "12rem",
    },
  },
  name: {
    fontSize: "3.2rem",
    lineHeight: "5.6rem",
    marginBottom: noSubtitle ? "4.8rem" : "5.6rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "2.4rem",
      lineHeight: "4rem",
      marginBottom: "3.2rem",
    },
  },
  content: {
    display: "grid",
    gridTemplateColumns: type === "onlyImage" ? "repeat(2, 1fr)" : "1fr",
    columnGap: "3rem",

    rowGap: type === "largeImage" ? "8rem" : 0,

    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr",
      columnGap: "2.4rem",

      rowGap: type === "largeImage" ? "9rem" : type === "onlyImage" ? "4rem" : 0,
    },
  },
  detail: {
    display: "grid",
    gap: "3rem",
    [theme.breakpoints.down("md")]: {
      gap: "2.4rem",
    },
  },
  largeImage: {
    gridTemplateColumns: "2fr 1fr",
    gridTemplateAreas: `
      "versionTitle versionTitle sampleTitle"
      "cover cover sample1"
      "cover cover sample2"
      "download download download"
    `,
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr 1fr",
      gridTemplateAreas: `
        "versionTitle versionTitle"
        "cover cover"
        "download download"
        "sampleTitle sampleTitle"
        "sample1 sample2"
      `,
    },
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr",
      gridTemplateAreas: `
        "versionTitle"
        "cover"
        "download"
        "sampleTitle"
        "sample1"
        "sample2"
      `,
    },
  },
  normalImage: {
    gridTemplateColumns: "1fr 1fr 1fr",
    gridTemplateAreas: `
      "versionTitle sampleTitle sampleTitle"
      "cover sample1 sample2"
      "download . ."
    `,
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr 1fr",
      gridTemplateAreas: `
        "versionTitle versionTitle"
        "cover cover"
        "download download"
        "sampleTitle sampleTitle"
        "sample1 sample2"
      `,
    },
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr",
      gridTemplateAreas: `
        "versionTitle"
        "cover"
        "download"
        "sampleTitle"
        "sample1"
        "sample2"
      `,
    },
  },
  onlyImage: {
    gridTemplateColumns: "1fr 1fr 1fr",
    gridTemplateAreas: `
      "cover cover cover"
      "download download download"
    `,
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr",
      gridTemplateAreas: `
        "cover"
        "download"
      `,
    },
  },

  onlyOneImage: {
    gridTemplateColumns: "1fr 1fr 1fr",
    gridTemplateAreas: `
      "cover cover cover"
      "download download download"
    `,
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr",
      gridTemplateAreas: `
        "cover"
        "download"
      `,
    },
  },

  versionTitle: {
    color: "#101010",
    fontSize: "2.4rem",
    fontWeight: 600,
    lineHeight: "2.4rem",
    letterSpacing: "0.24px",
    gridArea: "versionTitle",
    [theme.breakpoints.down("md")]: {
      fontSize: "2rem",
      lineHeight: "3.2rem",
    },
  },

  cover: {
    border: "1px solid #101010",
    borderRadius: "2.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    gridRow: "2 / 4",
    gridArea: "cover",
  },

  coverdark: {
    backgroundColor: theme.vars.palette.themeBackground.dark,
  },

  sampleImage0: {
    gridArea: "sample1",
    width: "100%",
  },
  sampleImage1: {
    gridArea: "sample2",
    width: "100%",
  },

  LogoDemo: {
    maxHeight: "53.3rem",
    "& img": {
      height: "13.8rem",
    },
    [theme.breakpoints.down("md")]: {
      height: "10.6rem",
      "& img": {
        height: "3.4rem",
      },
    },
  },
  downloadBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gridArea: "download",
    marginTop: "-0.8rem",
    [theme.breakpoints.down("md")]: {
      marginTop: 0,
    },
  },
  downloadNote: {
    color: "#101010",
    fontSize: "2rem",
    fontWeight: 400,
    lineHeight: "2.8rem",
    letterSpacing: "0.2px",
    margin: "0 0 2.4rem 0 ",
  },
  downloadButtons: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "2rem",
    maxWidth: "44rem",
    width: "100%",
    "& a": {
      display: "flex",
      height: "5.6rem",
      justifyContent: "center",
      alignItems: "center",
      gap: "0.8rem",
      flexShrink: 0,
      backgroundColor: "#ffffff",
      border: "1px solid #101010",
      borderRadius: "10rem",
      fontSize: "2rem",
      fontWeight: 600,
    },
    [theme.breakpoints.down("md")]: {
      maxWidth: "36rem",
      justifyContent: "space-between",
      "& a": {
        width: "16rem",
        height: "5.6rem",
        marginRight: "0",
      },
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      gap: "1.8rem",
      justifyContent: "space-between",
      "& a": {
        width: "100%",
      },
    },
  },
  sampleTitle: {
    gridArea: "sampleTitle",
    color: "#101010",
    fontSize: "2rem",
    fontWeight: 500,
    lineHeight: "2.4rem",
    letterSpacing: "0.2px",
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    "&::before": {
      content: '""',
      width: "1rem",
      height: "1rem",
      display: "inline-block",
      borderRadius: "50%",
      border: "1px solid #101010",
      marginRight: "1.6rem",
      backgroundColor: "#D2FCF6",
    },

    [theme.breakpoints.down("md")]: {
      fontSize: "1.6rem",
      marginTop: "1.6rem",

      "&::before": {
        marginRight: "1rem",
      },
    },
  },
}))
const AssetCard = props => {
  const { name, versions, type } = props.data
  const { classes, cx } = useStyles({ type, noSubtitle: ["onlyImage", "onlyOneImage"].includes(type) })

  return (
    <Box className={classes.item}>
      <Typography className={classes.name} sx={{ typography: "title" }}>
        {name}
      </Typography>
      <Box className={classes.content}>
        {versions.map((version, index) => (
          <Box key={index} className={cx(classes.detail, classes[type])}>
            {version.title ? <Typography className={classes.versionTitle}>{version.title}</Typography> : null}
            <Box className={cx(classes.cover, classes[version.coverClass], classes[`cover${version.type}`])}>
              <Image alt={version.title} src={version.cover} />
            </Box>
            <Box className={classes.downloadBox}>
              <Typography className={classes.downloadButtons}>
                {Object.keys(version.formats).map((format, index) => (
                  <a key={index} href={version.formats[format].src} download style={{ textTransform: "uppercase", cursor: "pointer" }}>
                    {format} <SvgIcon sx={{ fontSize: "1.7rem" }} component={DownloadIcon} inheritViewBox />
                  </a>
                ))}
              </Typography>
            </Box>
            {version.samples.length ? <li className={classes.sampleTitle}>Examples</li> : null}
            {version.samples.map((sample, index) => (
              <Image alt="" key={index} src={sample} className={clsx(classes["sampleImage" + index], "border border-[#101010] rounded-[2.5rem]")} />
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default AssetCard
