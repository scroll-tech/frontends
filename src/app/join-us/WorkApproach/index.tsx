import { useEffect, useRef, useState } from "react"

import { Box, Container as MuiContainer } from "@mui/material"
import { styled } from "@mui/system"

import { FadeInUp } from "@/components/Animation"
import SectionHeader from "@/components/SectionHeader"

const Photos = [
  {
    src: "/imgs/career/work-approach-1.jpg",
    alt: "work-approach-1",
  },
  {
    src: "/imgs/career/work-approach-2.jpg",
    alt: "work-approach-2",
  },
  {
    src: "/imgs/career/work-approach-3.jpg",
    alt: "work-approach-3",
  },
  {
    src: "/imgs/career/work-approach-4.jpg",
    alt: "work-approach-4",
  },
  {
    src: "/imgs/career/work-approach-5.jpg",
    alt: "work-approach-5",
  },
  {
    src: "/imgs/career/work-approach-6.jpg",
    alt: "work-approach-6",
  },
]

const Container = styled(Box)(({ theme }) => ({
  borderRadius: "40px 40px 0px 0px",
  paddingTop: "15.4rem",
  maxWidth: "152rem",
  background: "transparent",
  display: "flex !important",
  justifyContent: "center",
  position: "relative",
  margin: "0 auto 16rem",
  "& .MuiContainer-root": {
    position: "relative",
    maxWidth: "152rem",
  },
  [theme.breakpoints.down("md")]: {
    paddingTop: "5.4rem",
    paddingBottom: "0",
    margin: "0 auto 4rem",
  },
}))

const InnerBox = styled(MuiContainer)(({ theme }) => ({
  position: "relative",
  width: "100%",
}))

const Background = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "0",
  bottom: "0",
  width: "100%",
  background: "#101010",
  willChange: "width, height",
  borderRadius: "40px 40px 0px 0px",
}))

const PhotoContainer = styled("div")(({ theme }) => ({
  display: "grid",
  margin: "0 auto",
  maxWidth: "115.4rem",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "2.3%",
  marginBottom: "-9.2%",
  "& img": {
    height: "auto",
    borderRadius: "2.1rem",
  },
  "& > div:nth-of-type(1)": {
    gridRow: "1 / 3",
  },
  "& > div:nth-of-type(6)": {
    gridRow: "3 / 5",
    gridColumn: 2,
  },
}))

const WorkApproach = () => {
  const [, setScrollPosition] = useState(0)
  const sectionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const calculateWidth = () => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect()
      const viewTop = window.innerHeight

      if (rect.top <= viewTop) {
        const scrolledDistance = viewTop - rect.top
        const percentageScrolled = Math.min(scrolledDistance / viewTop, 1)
        let ratio = 0.5
        if (window.innerWidth <= 1920 && window.innerWidth > 1680) {
          ratio = 1
        }
        if (window.innerWidth > 1920) {
          ratio = 2
        }
        const widthIncrease = ratio * percentageScrolled
        const targetWidthPercentage = 100 + widthIncrease * 100

        return `${targetWidthPercentage}%`
      }
    }
    return "100%" //default value
  }

  return (
    <Container>
      <Background sx={{ width: calculateWidth() }} />
      <InnerBox ref={sectionRef}>
        <FadeInUp>
          <SectionHeader
            dark
            sx={{ mb: ["4rem", "10rem", "12.5rem"] }}
            title="How we work"
            content={
              <>
                We are a <span style={{ color: "#FF684B", fontWeight: "bold" }}>remote-first, globally distributed </span>team spanning across 19
                countries. We are impact-driven, collaborative, and always willing to go above and beyond to help each other succeed.
                <br />
                <br />
                We come together at conferences and events around the world, and at our regular global offsites, where we enjoy spending time with
                each other in person.
              </>
            }
          ></SectionHeader>
        </FadeInUp>
        <PhotoContainer>
          <FadeInUp duration={300} damping={0}>
            {Photos.map((photo, idx) => (
              <div key={idx}>
                <img src={photo.src} alt={photo.alt} />
              </div>
            ))}
          </FadeInUp>
        </PhotoContainer>
      </InnerBox>
    </Container>
  )
}

export default WorkApproach
