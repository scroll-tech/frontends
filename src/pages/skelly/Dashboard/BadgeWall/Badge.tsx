import { useMemo } from "react"

import { Box, Tooltip } from "@mui/material"
import { tooltipClasses } from "@mui/material/Tooltip"
import { styled } from "@mui/system"

import useSkellyStore, { BadgeDetailDialogTpye } from "@/stores/skellyStore"

import NameTip from "../../components/NameTip"

const BadgeBox = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  position: "absolute",
}))

const CustomTooltip = styled(Tooltip)(({ theme }) => ({}))

const Badge = ({ badge, index, badgewidth }) => {
  const { changeBadgeDetailDialog } = useSkellyStore()

  const badgeImageURI = useMemo(() => {
    return badge.metadata.image.replace(/^ipfs:\/\/(.*)/, "https://cloudflare-ipfs.com/ipfs/$1")
  }, [badge.metadata])

  const handleShowBadgeDetailDialog = () => {
    changeBadgeDetailDialog(BadgeDetailDialogTpye.UPGRADE)
  }

  return (
    <CustomTooltip
      title={<NameTip metadata={badge.metadata}></NameTip>}
      followCursor
      PopperProps={{
        popperOptions: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: ({ placement, reference, popper }) => {
                  if (placement === "bottom") {
                    return [popper.width / 4, 27]
                  } else {
                    return [popper.width / 4, 12]
                  }
                },
              },
            },
          ],
        },
      }}
      slotProps={{
        popper: {
          sx: {
            [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]: {
              marginTop: "-6px",
              background: "transparent",
            },
            [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]: {
              marginBottom: "-6px",
              background: "transparent",
            },
            [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]: {
              marginLeft: "-6px",
              background: "transparent",
            },
            [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]: {
              marginRight: "-6px",
              background: "transparent",
            },
          },
        },
      }}
    >
      <BadgeBox
        key={index}
        style={{
          top: `${badge.top}px`,
          left: `${badge.left}px`,
          width: `${badgewidth}px`,
          height: `${badgewidth}px`,
          padding: `${badgewidth / 10}px`,
        }}
        onClick={handleShowBadgeDetailDialog}
      >
        <img alt="" style={{ width: "100%", borderRadius: "50%" }} src={badgeImageURI} />
      </BadgeBox>
    </CustomTooltip>
  )
}

export default Badge
