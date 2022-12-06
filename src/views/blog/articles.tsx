import { Box } from "@mui/material";

import { styled } from "@mui/system";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import ArticleCard from "@/components/ArticleCard";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const ArticleBox = styled(Box)(
  ({ theme }) => `
          display: flex;
          justify-content: space-between;
          margin-top: 2.7rem;
          ${theme.breakpoints.down("md")} {
            margin-bottom: 4rem;
            justify-content: center;
        };
        `
);

const Articles = (props) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Swiper
      slidesPerView={isDesktop ? 3 : 1}
      spaceBetween={0}
      centeredSlides={!isDesktop}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className={isDesktop ? "wrapper" : ""}
    >
      {props.blogs.map((blog) => (
        <SwiperSlide key={blog.title}>
          <ArticleBox className="wrapper">
            <ArticleCard small={true} blog={blog} />
          </ArticleBox>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Articles;
