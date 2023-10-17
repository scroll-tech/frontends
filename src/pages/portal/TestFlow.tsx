import { Typography } from "@mui/material"

import Link from "@/components/Link"
import { NAVIGATIONS } from "@/constants"

import Descriptions, { DescriptionItem } from "./Descriptions"

const TestFlow = () => {
  return (
    <Descriptions title="Test the following">
      {NAVIGATIONS.map(item => (
        <DescriptionItem key={item.name} odd>
          <Link underline="hover" external={item.isExternal} href={item.subdomainOrPath}>
            {item.name}
          </Link>
          <Typography sx={{ width: ["100%", "60rem"] }}>{item.description}</Typography>
        </DescriptionItem>
      ))}
    </Descriptions>
  )
}

export default TestFlow
