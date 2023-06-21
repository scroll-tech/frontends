import { useMemo } from "react"
import { Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

import { Box } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import { styled } from "@mui/system"

import ArticleCard from "@/components/ArticleCard"
import useIsMobile from "@/hooks/useIsMobile"

const ArticleBox = styled(Box)(
  ({ theme }) => `
          display: flex;
          justify-content: space-between;
          margin-top: 2.7rem;
          ${theme.breakpoints.down("md")} {
            margin-bottom: 4rem;
            justify-content: center;
        };
        `,
)

const Articles = props => {
  const theme = useTheme()
  const { isMobileView } = useIsMobile("md")
  const isUnderLarge = useMediaQuery(theme.breakpoints.down("lg"))

  const slidesPerView = useMemo(() => {
    if (isMobileView) {
      return 1
    } else if (isUnderLarge) {
      return 2
    }
    return 3
  }, [isMobileView, isUnderLarge])

  return (
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={0}
      centeredSlides={isMobileView}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className={!isMobileView ? "wrapper" : ""}
    >
      {props.blogs.map(blog => (
        <SwiperSlide key={blog.title}>
          <ArticleBox className="wrapper">
            <ArticleCard small={true} blog={blog} />
          </ArticleBox>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Articles
