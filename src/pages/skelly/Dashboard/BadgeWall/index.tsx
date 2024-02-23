import React, { useEffect, useMemo, useRef, useState } from "react"

import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

// import { ReactComponent as DefaultAvatarSvg } from "@/assets/svgs/skelly/default-avatar.svg"
// import { BADGES_VISIBLE_TYPE } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { useSkellyContext } from "@/contexts/SkellyContextProvider"
import { requireEnv } from "@/utils"

import Badge from "./Badge"

interface BadgeType {
  metadata: string
  left: number
  top: number
}

interface BadgeWallProps {
  badgewidth: number
  gridNum: number
  windowDimensions: { width: number; height: number }
}

interface BadgePosition {
  metadata: string
  left: number
  top: number
}

const Profile = styled(Box)(({ theme }) => ({
  backgroundColor: "#101010",
  border: "1px solid rgba(255,255,255, 0.3)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
}))

const Name = styled(Typography)(({ theme }) => ({
  color: "#FFFFFF",
  textAlign: "center",
  fontSize: "3.2rem",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "3.2rem",
  marginBottom: "6%",
  marginTop: "3rem",
  alignSelf: "center",
  flexShrink: 0,
}))

const BadgeWall: React.FC<BadgeWallProps> = ({ badgewidth, gridNum, windowDimensions }) => {
  const divRef = useRef<HTMLDivElement>(null)

  const { hasMintedProfile, username, userBadges, attachBadges } = useSkellyContext()
  const [badges, setBadges] = useState<BadgeType[]>([])
  const { walletCurrentAddress } = useRainbowContext()

  const avatarSvgURL = useMemo(() => `${requireEnv("REACT_APP_SKELLY_URI")}/skelly/${walletCurrentAddress}.svg`, [walletCurrentAddress])

  useEffect(() => {
    if (hasMintedProfile) {
      // queryUserBadges()
    }
  }, [hasMintedProfile])

  const visibleBadges = useMemo(() => {
    return userBadges
  }, [userBadges, attachBadges])

  useEffect(() => {
    console.log("visibleBadges", generatedBadges())
    setBadges(generatedBadges())
  }, [badgewidth, windowDimensions, visibleBadges])

  const generateBadgePositions = (divRect: DOMRect, badgewidth: number, badges: string[]): BadgePosition[] => {
    const positions: BadgePosition[] = []
    let cursor = { x: divRect.left, y: divRect.top - badgewidth }
    let direction = 0 // 0: right, 1: down, 2: left, 3: up
    const limits = { left: divRect.left, right: divRect.right, top: divRect.top - badgewidth, bottom: divRect.bottom }

    badges.forEach(badge => {
      positions.push({ metadata: badge, left: cursor.x, top: cursor.y })

      switch (direction) {
        case 0: // right
          cursor.x += badgewidth
          if (cursor.x === limits.right) {
            limits.right += badgewidth
            direction = 1
          }
          break
        case 1: // down
          cursor.y += badgewidth
          if (cursor.y === limits.bottom) {
            limits.bottom += badgewidth
            direction = 2
          }
          break
        case 2: // left
          cursor.x -= badgewidth
          if (cursor.x === limits.left - badgewidth) {
            limits.left -= badgewidth
            direction = 3
          }
          break
        case 3: // up
          cursor.y -= badgewidth
          if (cursor.y === limits.top - badgewidth) {
            limits.top -= badgewidth
            direction = 0
          }
          break
      }
    })

    return positions
  }

  const generatedBadges = (): BadgeType[] => {
    if (divRef.current) {
      const divRect = divRef.current.getBoundingClientRect()
      return generateBadgePositions(divRect, badgewidth, visibleBadges)
    }
    return []
  }

  return (
    <>
      <Profile
        ref={divRef}
        sx={{
          width: `${(badgewidth * gridNum) / 2}px`,
          height: `${(badgewidth * gridNum) / 2}px`,
        }}
      >
        <Box sx={{ width: "66.67%", paddingTop: "12%" }}>
          <img src={avatarSvgURL} alt="avatar" width="100%"></img>
        </Box>
        <Name>{username}</Name>
      </Profile>
      {badges.map((badge, index) => (
        <Badge key={index} badge={badge} index={index} badgewidth={badgewidth} />
      ))}
    </>
  )
}

export default BadgeWall
