import { Box } from "@mui/material"

import BadgePlaceholderSvg from "@/assets/svgs/canvas-perks/badge-placeholder.svg"
import Link from "@/components/Link"

import BadgeImage from "../BadgeImage"
import Tooltip from "../Tooltip"

const PerksBadge = props => {
  const { name, imageURL, badgeContract, ...restProps } = props
  return (
    <Tooltip title={name}>
      <Box>
        <Link href={`/canvas/badge-contract/${badgeContract}`} external>
          <BadgeImage src={imageURL ?? BadgePlaceholderSvg} placeholder={BadgePlaceholderSvg} {...restProps}></BadgeImage>
        </Link>
      </Box>
    </Tooltip>
  )
}

export default PerksBadge
