import { makeStyles } from "tss-react/mui"

import { Box, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as DownloadIcon } from "@/assets/images/brandkit/download.svg"

const useStyles = makeStyles<any>()((theme, { type, name }) => ({
  item: {
    marginBottom: "16rem",
    [theme.breakpoints.down("md")]: {
      marginBottom: "12rem",
    },
  },
  name: {
    color: "#101010",
    fontSize: "4.8rem",
    fontWeight: 500,
    lineHeight: "5rem",
    letterSpacing: "0.48px",
    marginBottom: "3.2rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "3.2rem",
      lineHeight: "4.3rem",
      marginBottom: "1.4rem",
    },
  },
  content: {
    display: "grid",
    gridTemplateColumns: type === "onlyImage" ? "repeat(2, 1fr)" : "1fr",
    gap: "3rem",
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr",
      gap: "2.4rem",
    },
  },
  detail: {
    display: "grid",
    gap: "3rem",
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
    lineHeight: "3.2rem",
    letterSpacing: "0.24px",
    gridArea: "versionTitle",
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
    backgroundColor: theme.palette.themeBackground.dark,
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
    gap: "1.8rem",
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
    lineHeight: "2.8rem",
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
  },
}))
const AssetCard = props => {
  const { name, versions, type } = props.data
  const { classes, cx } = useStyles({ name, type })

  return (
    <Box className={classes.item}>
      <Typography className={classes.name}>{name}</Typography>
      <Box className={classes.content}>
        {versions.map((version, index) => (
          <Box key={index} className={cx(classes.detail, classes[type])} sx={{ marginTop: !index || type !== "largeImage" ? 0 : ["4rem", "8rem"] }}>
            {version.title ? <Typography className={classes.versionTitle}>{version.title}</Typography> : null}
            <Box className={cx(classes.cover, classes[version.coverClass], classes[`cover${version.type}`])}>
              <img alt="" src={version.cover} />
            </Box>
            <Box className={classes.downloadBox}>
              <Typography className={classes.downloadButtons}>
                {Object.keys(version.formats).map((format, index) => (
                  <a key={index} href={version.formats[format]} download style={{ textTransform: "uppercase" }}>
                    {format} <SvgIcon sx={{ fontSize: "1.7rem" }} component={DownloadIcon} inheritViewBox />
                  </a>
                ))}
              </Typography>
            </Box>
            {version.samples.length ? <li className={classes.sampleTitle}>Examples</li> : null}
            {version.samples.map((sample, index) => (
              <img alt="" key={index} src={sample} className={classes["sampleImage" + index]} />
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default AssetCard
