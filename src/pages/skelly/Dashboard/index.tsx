import React, { useEffect, useMemo, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Box, SvgIcon, Tooltip, Typography } from "@mui/material"
import { tooltipClasses } from "@mui/material/Tooltip"
import { styled } from "@mui/system"

import { ReactComponent as DefaultAvatarSvg } from "@/assets/svgs/skelly/default-avatar.svg"
import { BADGES_VISIBLE_TYPE } from "@/constants"
import { useSkellyContext } from "@/contexts/SkellyContextProvider"
import useSkellyStore, { BadgeDetailDialogTpye } from "@/stores/skellyStore"

import NameTip from "../components/NameTip"
import BadgeDetailDialog from "./BadgeDetailDialog"
import BadgesDialog from "./BadgesDialog"
import NameDialog from "./NameDialog"
import ReferDialog from "./ReferDialog"
import UpgradeDialog from "./UpgradeDialog"
import ActionBox from "./actionBox"

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "calc(100vh - 6.5rem)",
  backgroundColor: "#101010",
  backgroundImage:
    "linear-gradient(90deg, rgba(255,255,255, 0.3) 1px, transparent 1px), linear-gradient( rgba(255,255,255, 0.3) 1px, transparent 1px)",
  "&::before, &::after": {
    content: "''",
    height: "100%",
    position: "absolute",
    top: 0,
    width: "25% !important",
    zIndex: 42,
  },
  "&::before": {
    background: "linear-gradient(90deg, #101010 50.5%, rgba(16, 16, 16, 0) 100%)",
    left: 0,
  },
  "&::after": {
    background: "linear-gradient(270deg, #101010 50.5%, rgba(16, 16, 16, 0) 100%)",
    right: 0,
  },
  [theme.breakpoints.down("md")]: {
    height: "calc(100vh - 6.2rem)",
  },
}))

const Profile = styled(Box)(({ theme }) => ({
  backgroundColor: "#101010",
  border: "1px solid rgba(255,255,255, 0.3)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: "4rem",
}))

const Name = styled(Typography)(({ theme }) => ({
  color: "#FFFFFF",
  textAlign: "center",
  fontSize: "3.2rem",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "3.2rem",
  marginBottom: "2.4rem",
  marginTop: "3rem",
  alignSelf: "center",
  flexShrink: 0,
}))

const Badge = styled(Box)(({ theme }) => ({
  // padding: "2.5rem",
}))

const Dashboard = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const divRef = useRef<HTMLDivElement>(null)

  const { profileInstance, badgesInstance } = useSkellyContext()
  const navigate = useNavigate()
  const [badges, setBadges] = useState([])
  const { changeBadgeDetailDialog } = useSkellyStore()

  const [gridNum, setGridNum] = useState(badgesInstance[BADGES_VISIBLE_TYPE.VISIBLE].length > 12 ? 8 : 4)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)
  const badgeWidth = useMemo(() => {
    if (windowWidth < windowHeight - 62) {
      return (windowWidth - 62) / gridNum // 65 is the height of the navbar, 80 is the width of the action box
    } else {
      return (windowHeight - 65 - 80) / gridNum
    }
  }, [windowWidth, windowHeight, gridNum, badgesInstance])

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
      setBadges(generatedBadges())
    }

    window.addEventListener("resize", handleResize)
    setGridNum(badgesInstance[BADGES_VISIBLE_TYPE.VISIBLE].length > 12 ? 8 : 4)
    setBadges(generatedBadges())
    return () => window.removeEventListener("resize", handleResize)
  }, [badgeWidth, badgesInstance])

  const generatedBadges = () => {
    if (containerRef.current && divRef.current) {
      const divRect = divRef.current.getBoundingClientRect()
      let cursor = [divRect.top, divRect.left + badgeWidth, divRect.top + badgeWidth, divRect.left]
      let range = [divRect.top, divRect.right, divRect.bottom, divRect.left]

      let direction = 0
      return badgesInstance[BADGES_VISIBLE_TYPE.VISIBLE].map((image, index) => {
        let badge = {
          image,
          left: 0,
          top: 0,
        }
        if (direction === 0) {
          // direction is top
          if (cursor[direction] === range[direction]) {
            direction++
            range[0] = cursor[0] - badgeWidth
          }
          cursor = [cursor[0] - badgeWidth, cursor[1], cursor[2] - badgeWidth, cursor[3]]
        } else if (direction === 1) {
          // direction is right
          if (cursor[direction] === range[direction]) {
            direction++
            range[1] = cursor[1] + badgeWidth
          }
          cursor = [cursor[0], cursor[1] + badgeWidth, cursor[2], cursor[3] + badgeWidth]
        } else if (direction === 2) {
          // direction is bottom
          if (cursor[direction] === range[direction]) {
            direction++
            range[2] = cursor[2] + badgeWidth
          }
          cursor = [cursor[0] + badgeWidth, cursor[1], cursor[2] + badgeWidth, cursor[3]]
        } else if (direction === 3) {
          // direction is left
          if (cursor[direction] === range[direction]) {
            direction = 0
            range[3] = cursor[3] - badgeWidth
          }
          cursor = [cursor[0], cursor[1] - badgeWidth, cursor[2], cursor[3] - badgeWidth]
        }

        badge.left = cursor[3]
        badge.top = cursor[0]
        return badge
      })
    }
    return []
  }

  return (
    <Container
      ref={containerRef}
      sx={{
        backgroundSize: `${badgeWidth}px ${badgeWidth}px`,
        backgroundPosition: `calc(50% - ${badgeWidth / 2}px) calc(50% - ${badgeWidth / 2}px)`,
      }}
    >
      <Profile
        ref={divRef}
        sx={{
          width: `${(badgeWidth * gridNum) / 2}px`,
          height: `${(badgeWidth * gridNum) / 2}px`,
        }}
      >
        <SvgIcon sx={{ flex: 1, width: "100%" }} component={DefaultAvatarSvg} inheritViewBox />
        <Name>{profileInstance.name}</Name>
      </Profile>
      {(badges as any).map((badge, index) => {
        return (
          <Tooltip
            title={<NameTip />}
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
            <Badge
              key={index}
              style={{
                position: "absolute",
                top: `${badge.top}px`,
                left: `${badge.left}px`,
                cursor: "pointer",
                width: `${badgeWidth}px`,
                height: `${badgeWidth}px`,
                padding: `${badgeWidth / 10}px`,
              }}
              onClick={() => changeBadgeDetailDialog(BadgeDetailDialogTpye.UPGRADE)}
            >
              <img style={{ borderRadius: "50%" }} src={badge.image} />
            </Badge>
          </Tooltip>
        )
      })}
      <ActionBox />
      <NameDialog />
      <BadgesDialog />
      <ReferDialog />
      <UpgradeDialog />
      <BadgeDetailDialog />
    </Container>
  )
}

export default Dashboard
