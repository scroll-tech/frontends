import { Box } from "@mui/material"

import BadgePlaceholderSvg from "@/assets/svgs/canvas-perks/badge-placeholder.svg"
import Link from "@/components/Link"

import BadgeImage from "../BadgeImage"
import Tooltip from "../Tooltip"

interface PerksBadgeProps {
  imageURL: string
  gray: boolean // not own the badge

  viewOnly?: boolean // disable tooltip and link

  name?: string // for tooltip
  badgeContract?: string // for link
  style?: React.CSSProperties // img style
}

const PerksBadge = (props: PerksBadgeProps & React.ComponentProps<typeof BadgeImage>) => {
  const { name, imageURL, badgeContract, viewOnly, gray, style, ...restProps } = props
  return (
    <Tooltip disabled={viewOnly} title={name}>
      <Box>
        <Link href={`/canvas/badge-contract/${badgeContract}`} external disabled={viewOnly}>
          <BadgeImage
            src={imageURL ?? BadgePlaceholderSvg}
            placeholder={BadgePlaceholderSvg}
            style={{ filter: gray ? "grayscale(100%)" : "unset", ...style }}
            {...restProps}
          ></BadgeImage>
        </Link>
      </Box>
    </Tooltip>
  )
}

export default PerksBadge
