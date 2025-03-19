import Image from "next/image"
import Marquee from "react-fast-marquee"

import { Box } from "@mui/material"

import Lido from "@/assets/images/home/Lido.png"
import QuillFinance from "@/assets/images/home/QuillFinance.png"
import Aave from "@/assets/svgs/landingpage/Aave.svg?url"
import Ambient from "@/assets/svgs/landingpage/Ambient.svg?url"
import Axiom from "@/assets/svgs/landingpage/Axiom.svg?url"
import Circle from "@/assets/svgs/landingpage/Circle.svg?url"
import Compound from "@/assets/svgs/landingpage/Compound.svg?url"
import Ethena from "@/assets/svgs/landingpage/Ethena.svg?url"
import EtherFi from "@/assets/svgs/landingpage/EtherFi.svg?url"
import Kelp from "@/assets/svgs/landingpage/Kelp.svg?url"
import Mellow from "@/assets/svgs/landingpage/Mellow.svg?url"
import Orbiter from "@/assets/svgs/landingpage/Orbiter.svg?url"
import Puffer from "@/assets/svgs/landingpage/Puffer.svg?url"
import Symbiotic from "@/assets/svgs/landingpage/Symbiotic.svg?url"
import Tempest from "@/assets/svgs/landingpage/Tempest.svg?url"
import VIFI from "@/assets/svgs/landingpage/VIFI.svg?url"

const PROTOCOL_LIST = [
  { label: "EtherFi", image: EtherFi },
  { label: "Ambient", image: Ambient },
  { label: "Lido", image: Lido },
  { label: "Axiom", image: Axiom },
  { label: "Aave", image: Aave, height: ["15px", "20px"] },
  { label: "VIFI", image: VIFI, height: ["18px", "24px"] },
  { label: "Quill Finance", image: QuillFinance, height: ["18px", "24px"] },
  { label: "Compound", image: Compound },
  { label: "Orbiter Finance", image: Orbiter },
  { label: "Mellow", image: Mellow },
  { label: "Symbiotic", image: Symbiotic, height: ["15px", "20px"] },
  { label: "Kelp", image: Kelp },
  { label: "Puffer", image: Puffer },
  { label: "Ethena", image: Ethena },
  { label: "Tempest", image: Tempest, height: ["15px", "20px"] },
  { label: "Circle", image: Circle },
]

const Protocols = () => {
  return (
    <Box sx={{ mt: ["3.2rem", "9.6rem"] }}>
      <Marquee autoFill>
        {PROTOCOL_LIST.map(({ label, image, height }) => (
          <Image
            src={image}
            alt={label}
            key={label}
            style={{ "--icon-height": height?.[1] ?? "32px", "--icon-height-xs": height?.[0] ?? "24px" }}
            title={label}
            className="h-[var(--icon-height-xs)] sm:h-[var(--icon-height)] w-auto mr-[48px] sm:mr-[64px]"
          ></Image>
        ))}
      </Marquee>
    </Box>
  )
}

export default Protocols
