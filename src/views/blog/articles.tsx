import { Box } from "@mui/material"

import { styled } from "@mui/system"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper"
import ArticleCard from "@/components/ArticleCard"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"

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
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const isUnderLarge = useMediaQuery(theme.breakpoints.down("lg"))
  let slidesPerView = 3
  if (isMobile) {
    slidesPerView = 1
  } else if (isUnderLarge) {
    slidesPerView = 2
  }
  return (
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={0}
      centeredSlides={isMobile}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className={!isMobile ? "wrapper" : ""}
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
