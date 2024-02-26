import React, { useEffect, useMemo, useRef, useState } from "react"

import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { BADGES_VISIBLE_TYPE } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { useSkellyContext } from "@/contexts/SkellyContextProvider"
import { requireEnv } from "@/utils"

import Badge from "./Badge"

interface BadgeType {
  image: string
  left: number
  top: number
}

interface BadgeWallProps {
  badgeWidth: number
  gridNum: number
  windowDimensions: { width: number; height: number }
}

interface BadgePosition {
  image: string
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

const BadgeWall: React.FC<BadgeWallProps> = ({ badgeWidth, gridNum, windowDimensions }) => {
  const { walletCurrentAddress } = useRainbowContext()
  const divRef = useRef<HTMLDivElement>(null)

  const { profileInstance, badgesInstance } = useSkellyContext()
  const [badges, setBadges] = useState<BadgeType[]>([])

  const avatarSvgURL = useMemo(() => `${requireEnv("REACT_APP_SKELLY_URI")}/skelly/${walletCurrentAddress}.svg`, [walletCurrentAddress])

  useEffect(() => {
    setBadges(generatedBadges())
  }, [badgeWidth, badgesInstance, windowDimensions])

  const generateBadgePositions = (divRect: DOMRect, badgeWidth: number, badges: string[]): BadgePosition[] => {
    const positions: BadgePosition[] = []
    let cursor = { x: divRect.left, y: divRect.top - badgeWidth }
    let direction = 0 // 0: right, 1: down, 2: left, 3: up
    const limits = { left: divRect.left, right: divRect.right, top: divRect.top - badgeWidth, bottom: divRect.bottom }

    badges.forEach(image => {
      positions.push({ image, left: cursor.x, top: cursor.y })

      switch (direction) {
        case 0: // right
          cursor.x += badgeWidth
          if (cursor.x === limits.right) {
            limits.right += badgeWidth
            direction = 1
          }
          break
        case 1: // down
          cursor.y += badgeWidth
          if (cursor.y === limits.bottom) {
            limits.bottom += badgeWidth
            direction = 2
          }
          break
        case 2: // left
          cursor.x -= badgeWidth
          if (cursor.x === limits.left - badgeWidth) {
            limits.left -= badgeWidth
            direction = 3
          }
          break
        case 3: // up
          cursor.y -= badgeWidth
          if (cursor.y === limits.top - badgeWidth) {
            limits.top -= badgeWidth
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
      return generateBadgePositions(divRect, badgeWidth, badgesInstance[BADGES_VISIBLE_TYPE.VISIBLE])
    }
    return []
  }

  return (
    <>
      <Profile
        ref={divRef}
        sx={{
          width: `${(badgeWidth * gridNum) / 2}px`,
          height: `${(badgeWidth * gridNum) / 2}px`,
        }}
      >
        <Box sx={{ width: "66.67%", paddingTop: "12%" }}>
          <img src={avatarSvgURL} alt="avatar" width="100%"></img>
        </Box>
        <Name>{profileInstance.name}</Name>
      </Profile>
      {badges.map((badge, index) => (
        <Badge key={index} badge={badge} index={index} badgeWidth={badgeWidth} />
      ))}
    </>
  )
}

export default BadgeWall
