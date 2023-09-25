import "swiper/css"
import "swiper/css/pagination"
import { Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { makeStyles } from "tss-react/mui"

import SectionWrapper from "@/components/SectionWrapper"
import { FLOW_QUESTIONS } from "@/constants"

import FinalStep from "./FinalStep"
import InitialStep from "./InitialStep"
import QuestionStep from "./QuestionStep"

const useStyles = makeStyles()(theme => ({
  flowSwiper: {
    "&": {
      // color: theme.palette.primary.contrastText,
    },
  },
}))

const MintFlow = () => {
  const { classes } = useStyles()
  return (
    <SectionWrapper dark full sx={{ p: "0 !important" }}>
      <Swiper
        pagination={{
          type: "progressbar",
        }}
        modules={[Pagination]}
        className={classes.flowSwiper}
      >
        <SwiperSlide>
          <InitialStep></InitialStep>
        </SwiperSlide>
        {FLOW_QUESTIONS.map(item => (
          <SwiperSlide key={item.subject}>
            <QuestionStep {...item}></QuestionStep>
          </SwiperSlide>
        ))}
        <SwiperSlide>
          <FinalStep></FinalStep>
        </SwiperSlide>
      </Swiper>
    </SectionWrapper>
  )
}

export default MintFlow
