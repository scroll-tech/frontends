import { useMemo } from "react"

import { Stack, Typography } from "@mui/material"

const PerkItem = ({ perk }) => {
  const { title, description, onClick, requires, isClaimed } = perk

  const status = useMemo(() => {
    const data = requires.map(require => require())
    return {
      badges: data.map(item => item.badge),
    }
  }, [requires])

  return (
    <Stack
      textAlign="center"
      p="2.4rem"
      gap="2.4rem"
      sx={{
        background: "rgba(255, 255, 255, 0.10)",
        borderRadius: "2rem",
        cursor: "pointer",
        position: "relative",
        "*:hover": {
          cursor: "pointer",
        },
      }}
      onClick={onClick}
    >
      {isClaimed && (
        <Typography
          sx={{
            fontSize: ["1.2rem"],
            fontWeight: 600,
            color: "#90F8EA",
            padding: "0.4rem 0.8rem",
            background: "rgba(144, 248, 234, 0.20)",
            borderRadius: "1.2rem",
            position: "absolute",
            right: "0.8rem",
            top: "0.8rem",
          }}
        >
          Claimed
        </Typography>
      )}
      <Typography sx={{ fontSize: ["2.4rem"], fontWeight: 600, color: "primary.contrastText" }}>{title}</Typography>
      <Typography sx={{ fontSize: ["1.8rem"], color: "primary.contrastText" }}>{description}</Typography>
      <Stack direction="row" justifyContent="center" gap={"2.4rem"}>
        {status.badges.map((badge, index) => {
          return <img alt="" src={badge} style={{ width: "6.4rem", height: "6.4rem" }} key={index} />
        })}
      </Stack>
    </Stack>
  )
}

export default PerkItem
