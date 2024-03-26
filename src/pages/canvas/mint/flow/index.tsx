import "swiper/css"
import "swiper/css/pagination"
import { Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import SectionWrapper from "@/components/SectionWrapper"

import FirstBadgeStep from "./FirstBadgeStep"
import MintStep from "./MintStep"
import NameStep from "./NameStep"

const MintFlow = props => {
  const { scrollTarget } = props

  return (
    <SectionWrapper dark full sx={{ p: "0 !important", "& .MuiTypography-root": { color: theme => theme.palette.primary.contrastText } }}>
      <Swiper
        style={{ zIndex: 0 }}
        pagination={{
          type: "progressbar",
        }}
        modules={[Pagination]}
        allowTouchMove={false}
      >
        <SwiperSlide>
          <NameStep scrollTarget={scrollTarget}></NameStep>
        </SwiperSlide>
        <SwiperSlide>
          <MintStep scrollTarget={scrollTarget}></MintStep>
        </SwiperSlide>
        <SwiperSlide>
          <FirstBadgeStep scrollTarget={scrollTarget}></FirstBadgeStep>
        </SwiperSlide>
      </Swiper>
    </SectionWrapper>
  )
}

export default MintFlow
