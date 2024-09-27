import React, { useEffect, useMemo, useRef, useState } from "react"
import Img from "react-cool-img"
import { useParams } from "react-router-dom"

import { Box, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { getAvatarURL } from "@/apis/canvas"
import Skeleton from "@/components/Skeleton"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCanvasStore from "@/stores/canvasStore"
import { sentryDebug } from "@/utils"

import Tooltip from "../../components/Tooltip"
import Badge from "./Badge"
import EditProfile from "./EditProfile"

interface BadgeType {
  attester: string
  attributes: Array<any>
  badgeContract: string
  data: string
  description: string
  id: string
  image: string
  name: string
  time: number
  txid: string
}

interface BadgeWallProps {
  badgewidth: number
  gridNum: number
  windowDimensions: { width: number; height: number }
}

interface BadgePosition {
  metadata: BadgeType
  left: number
  top: number
}

const Profile = styled(Box)(({ theme }) => ({
  backgroundColor: "#101010",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
  // TODO: ???
  transform: "translate(0.25px, 0.25px)",
  [theme.breakpoints.down("lg")]: {
    transform: "translate(0.5px, 0.5px)",
  },
  [theme.breakpoints.down("sm")]: {
    transform: "translate(0.25px, 0.25px)",
  },
}))

const Name = styled(Typography)(({ theme }) => ({
  color: "#FFFFFF",
  textAlign: "center",
  fontSize: "3.2rem",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "3.2rem",
  height: "3.2rem",
  alignSelf: "center",
  flexShrink: 0,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.6rem",
    lineHeight: "2.4rem",
    height: "2.4rem",
  },
}))

const BadgeWall: React.FC<BadgeWallProps> = props => {
  const { address: othersWalletAddress } = useParams()
  const { badgewidth, gridNum, windowDimensions } = props
  const divRef = useRef<HTMLDivElement>(null)

  const { profileMinted, canvasUsername, queryUsernameLoading, userBadges, orderedAttachedBadges } = useCanvasStore()
  const [badges, setBadges] = useState<BadgePosition[]>([])
  const { walletCurrentAddress } = useRainbowContext()

  const realWalletAddress = useMemo(() => othersWalletAddress || walletCurrentAddress, [othersWalletAddress, walletCurrentAddress])
  const profileSize = useMemo(() => (badgewidth * gridNum) / 2 - 1, [badgewidth, gridNum])

  const visibleBadges = useMemo(() => {
    return orderedAttachedBadges.map(badgeId => userBadges.find(badge => badge.id === badgeId))
  }, [userBadges, orderedAttachedBadges])

  useEffect(() => {
    setBadges(generatedBadges())
  }, [badgewidth, windowDimensions, visibleBadges, userBadges])

  useEffect(() => {
    if (userBadges.length < orderedAttachedBadges.length) {
      sentryDebug(`EAS data loss:${othersWalletAddress || walletCurrentAddress}`)
    }
  }, [orderedAttachedBadges, userBadges, walletCurrentAddress, othersWalletAddress])

  const generateBadgePositions = (divRect: DOMRect, badgewidth: number, badges: BadgeType[]): BadgePosition[] => {
    const positions: BadgePosition[] = []
    let cursor = { x: divRect.left, y: divRect.top - badgewidth }
    let direction = 0 // 0: right, 1: down, 2: left, 3: up
    const limits = { left: divRect.left, right: divRect.right, top: divRect.top - badgewidth, bottom: divRect.bottom }

    badges.slice(0, 48).forEach(badge => {
      positions.push({ metadata: badge, left: cursor.x, top: cursor.y })

      switch (direction) {
        case 0: // right
          cursor.x += badgewidth
          if (cursor.x > limits.right) {
            limits.right += badgewidth
            direction = 1
          }
          break
        case 1: // down
          cursor.y += badgewidth
          if (cursor.y > limits.bottom) {
            limits.bottom += badgewidth
            direction = 2
          }
          break
        case 2: // left
          cursor.x -= badgewidth
          if (cursor.x < limits.left) {
            limits.left -= badgewidth
            direction = 3
          }
          break
        case 3: // up
          cursor.y -= badgewidth
          if (cursor.y < limits.top) {
            limits.top -= badgewidth
            direction = 0
          }
          break
      }
    })

    return positions
  }

  const generatedBadges = (): BadgePosition[] => {
    if (divRef.current) {
      const divRect = divRef.current.getBoundingClientRect()
      return generateBadgePositions(divRect, badgewidth, visibleBadges)
    }
    return []
  }

  const userInfo = useMemo(() => {
    return {
      name: canvasUsername,
      avatar: getAvatarURL(realWalletAddress),
    }
  }, [realWalletAddress, canvasUsername, profileMinted])

  return (
    <>
      <Profile
        ref={divRef}
        sx={{
          position: "relative",
          width: `${profileSize}px`,
          height: `${profileSize}px`,
        }}
      >
        <EditProfile sx={{ position: "absolute", top: "1.6rem", right: "1.6rem" }}></EditProfile>
        <Tooltip
          title={
            <Box sx={{ width: "21.4rem" }}>
              <b>Activity Heartbeat:</b>
              <br></br>
              Heart beats faster when you are more active on Scroll
            </Box>
          }
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
        >
          <Box sx={{ width: "66.67%" }}>
            <Img src={userInfo.avatar} placeholder="/imgs/canvas/avatarPlaceholder.svg" alt="avatar" width="100%"></Img>
          </Box>
        </Tooltip>
        {queryUsernameLoading ? <Skeleton dark sx={{ width: "6em", height: ["2.4rem", "3.2rem"] }}></Skeleton> : <Name>{userInfo.name}</Name>}
      </Profile>
      {badges.map((badge, index) => (
        <Badge key={badge.metadata?.id} badge={badge} index={index} badgewidth={badgewidth} />
      ))}
    </>
  )
}

export default BadgeWall
