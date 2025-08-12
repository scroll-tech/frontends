import Image from "next/image"
import Marquee from "react-fast-marquee"

import { Box } from "@mui/material"

import ChatterPay from "@/assets/images/home/ChatterPay.webp"
import Polystream from "@/assets/images/home/Polystream.webp"
import ProjectMocha from "@/assets/images/home/ProjectMocha.webp"
import SynthOS from "@/assets/images/home/SynthOS.webp"
import Aave from "@/assets/svgs/landingpage/Aave.svg?url"
import Authgrow from "@/assets/svgs/landingpage/Authgrow.svg?url"
import Circle from "@/assets/svgs/landingpage/Circle.svg?url"
import EtherFi from "@/assets/svgs/landingpage/EtherFi.svg?url"
import Honeypop from "@/assets/svgs/landingpage/Honeypop.svg?url"
import Lido from "@/assets/svgs/landingpage/Lido.svg?url"
import Mellow from "@/assets/svgs/landingpage/Mellow.svg?url"
import QuillFinance from "@/assets/svgs/landingpage/QuillFinance.svg?url"
import Symbiotic from "@/assets/svgs/landingpage/Symbiotic.svg?url"
import Tempest from "@/assets/svgs/landingpage/Tempest.svg?url"
import VIFI from "@/assets/svgs/landingpage/VIFI.svg?url"

const PROTOCOL_LIST = [
  { label: "VIFI", image: VIFI, height: ["18px", "24px"] },
  { label: "Quill Finance", image: QuillFinance, height: ["18px", "24px"] },
  { label: "ChatterPay", image: ChatterPay },
  { label: "SynthOS", image: SynthOS },
  { label: "Project Mocha", image: ProjectMocha },
  { label: "Polystream", image: Polystream },
  { label: "Honeypop", image: Honeypop },
  { label: "Anthgrow", image: Authgrow },
  { label: "EtherFi", image: EtherFi },
  { label: "Circle", image: Circle },
  { label: "Aave", image: Aave, height: ["15px", "20px"] },
  { label: "Lido", image: Lido },
  { label: "Mellow", image: Mellow },
  { label: "Symbiotic", image: Symbiotic, height: ["15px", "20px"] },
  { label: "Tempest", image: Tempest, height: ["15px", "20px"] },
]

const Protocols = () => {
  return (
    <Box sx={{ my: ["3.2rem", "9.6rem"] }}>
      <Marquee autoFill className="">
        {PROTOCOL_LIST.map(({ label, image, height }) => (
          <Image
            src={image}
            alt={label}
            key={label}
            style={{ "--icon-height": height?.[1] ?? "32px", "--icon-height-xs": height?.[0] ?? "24px" }}
            title={label}
            loading="eager"
            className="h-[var(--icon-height-xs)] sm:h-[var(--icon-height)] w-auto pl-[4.8rem] sm:pl-[6.4rem]"
          ></Image>
        ))}
      </Marquee>
    </Box>
  )
}

export default Protocols
