import { Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import { Box } from "@mui/material"
import { styled } from "@mui/system"

import ArticleCard from "@/components/ArticleCard"
import useCheckViewport from "@/hooks/useCheckViewport"

const ArticleBox = styled(Box)(
  ({ theme }) => `
          display: flex;
          justify-content: space-between;
          ${theme.breakpoints.down("md")} {
            justify-content: center;
        };
        `,
)

const Articles = props => {
  const { isPortrait, isTabletLandscape } = useCheckViewport()
  let slidesPerView = 3
  if (isTabletLandscape) {
    slidesPerView = 2
  } else if (isPortrait) {
    slidesPerView = 1
  }
  return (
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={0}
      centeredSlides={isPortrait}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className={!isPortrait ? "wrapper" : ""}
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
