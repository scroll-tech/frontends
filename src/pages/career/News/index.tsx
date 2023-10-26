import { makeStyles } from "tss-react/mui"

import { Box, Link, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as SecuritySvg } from "@/assets/svgs/career/news-cover-1.svg"
import { ReactComponent as YeAvatar } from "@/assets/svgs/members/Ye-avatar.svg"
import OrientationToView from "@/components/Motion/OrientationToView"
import SuccessionToView, { SuccessionItem } from "@/components/Motion/SuccessionToView"
import SectionWrapper from "@/components/SectionWrapper"
import useCheckViewport from "@/hooks/useCheckViewport"

const NEWS = [
  {
    cover: SecuritySvg,
    title: <>Scroll 🛠 Scaling Ethereum with Rollups and Zero Knowledge Proofs</>,
    mobileTitle: "Medical, dental & vision",
    mobileScale: "0.88",
    link: "https://ethglobal.com",
  },
  {
    cover: SecuritySvg,
    title: <>Scroll 🛠 Scaling Ethereum with Rollups and Zero Knowledge Proofs</>,
    mobileTitle: "Medical, dental & vision",
    mobileScale: "0.88",
    link: "https://ethglobal.com",
  },
  {
    cover: SecuritySvg,
    title: <>Scroll 🛠 Scaling Ethereum with Rollups and Zero Knowledge Proofs</>,
    mobileTitle: "Medical, dental & vision",
    mobileScale: "0.88",
    link: "https://ethglobal.com",
  },
]

const useStyles = makeStyles()(theme => ({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    paddingBottom: "16rem",
    gap: "3.2rem",
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "repeat(1, 1fr)",
    },
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "7.2rem",
    },
  },
}))

const ExternalLink = styled(Link)(({ theme }) => ({
  fontWeight: 400,
  fontSize: "2rem",
  height: "2.1rem",
  lineHeight: "2.1rem",
  display: "flex",
  alignItems: "center",
  color: theme.palette.text.primary,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.6rem",
  },
}))

const News = () => {
  const { classes } = useStyles()
  const { isMobile } = useCheckViewport()

  return (
    <SectionWrapper>
      <Typography variant="h1" sx={{ mb: ["3.2rem", "5.6rem"] }}>
        In the news
      </Typography>
      <SuccessionToView className={classes.grid}>
        {NEWS.map((item, index) => (
          <SuccessionItem>
            <Box>
              <SvgIcon sx={{ width: "100%", height: "auto" }} component={item.cover} inheritViewBox></SvgIcon>
              <Typography
                sx={{ fontSize: ["2rem", "2.4rem"], fontWeight: 600, mt: ["1.3rem", "1.8rem", "2.2rem"], mb: ["0.8rem", "1.4rem", "2rem"] }}
              >
                {isMobile ? item.mobileTitle : item.title}
              </Typography>
              <ExternalLink underline="none" href={item.link}>
                {item.link}
                <svg style={{ marginLeft: "0.5rem" }} xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M9 1V7.86538L7.83812 6.7035V2.96385C5.46463 5.26924 3.29542 7.77999 0.853849 10L0 9.16344C2.42536 6.94344 4.5762 4.46728 6.93347 2.1781H3.31272L2.13462 1H9Z"
                    fill="currentColor"
                  />
                </svg>
              </ExternalLink>
            </Box>
          </SuccessionItem>
        ))}
      </SuccessionToView>
      <OrientationToView>
        <Typography sx={{ fontSize: ["2rem", "3.2rem"], marginBottom: "1rem", textAlign: "center" }}>“Some inspiring quote from Ye”</Typography>
        <Typography sx={{ fontSize: ["1.6rem", "2rem"], marginBottom: ["7.2rem", "16rem"], textAlign: "center" }}>
          Scroll Co-founder
          <SvgIcon sx={{ width: ["4rem", "5rem"], height: ["4rem", "5rem"], mx: "0.6rem" }} component={YeAvatar} inheritViewBox></SvgIcon> Ye
        </Typography>
      </OrientationToView>
    </SectionWrapper>
  )
}

export default News
