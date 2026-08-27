import { Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import { Box, Stack, Typography } from "@mui/material"

import ArticleCard from "@/components/ArticleCard"

const MoreBlogs = props => {
  const { blogs, title, ...restProps } = props

  return (
    <Box {...restProps}>
      <Typography
        variant="h1"
        sx={{
          textAlign: "center",
          mt: ["3rem", "5rem"],
          mb: ["2rem", "3rem"],
        }}
      >
        {title}
      </Typography>

      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        centeredSlides
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="!pb-[16px] !sm:pb-[28px]"
      >
        {props.blogs.map(blog => (
          <SwiperSlide key={blog.title}>
            <Stack
              direction="row"
              sx={{
                justifyContent: ["center", "center", "space-between"],
              }}
              className="wrapper"
            >
              <ArticleCard blog={blog} />
            </Stack>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}

export default MoreBlogs
