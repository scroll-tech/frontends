import { useMemo } from "react"

import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, SvgIcon } from "@mui/material"
import useScrollTrigger from "@mui/material/useScrollTrigger"

import { ReactComponent as ActivitiesSvg } from "@/assets/svgs/sessions/activities.svg"
import { ReactComponent as AssetsSvg } from "@/assets/svgs/sessions/assets.svg"
import { ReactComponent as DexSvg } from "@/assets/svgs/sessions/dex.svg"
import { ReactComponent as GasSvg } from "@/assets/svgs/sessions/gas.svg"
import { ReactComponent as LendingSvg } from "@/assets/svgs/sessions/lending.svg"
import { NORMAL_HEADER_HEIGHT } from "@/constants"
import useSessionsStore from "@/stores/sessionsStore"

const SESSIONS_SECTION = [
  {
    label: "Session One",
    key: 1,
    items: [
      {
        label: "Decentralized Exchanges",
        key: "dex",
        icon: DexSvg,
      },
      {
        label: "Lending & Borrowing",
        key: "lending",
        icon: LendingSvg,
      },
      {
        label: "Platform activities",
        key: "activities",
        icon: ActivitiesSvg,
      },
    ],
  },
  {
    label: "Session Zero",
    key: 0,
    items: [
      {
        label: "Bridged eligible assets",
        key: "assets",
        icon: AssetsSvg,
      },
      {
        label: "Gas spent on Scroll",
        key: "gas",
        icon: GasSvg,
      },
    ],
  },
]

export const SESSIONS_SECTION_MAP = new Proxy(SESSIONS_SECTION, {
  get(target, prop: string) {
    const [session, section] = prop.split("-")
    const sessionTarget = target.find(item => item.key === +session)?.items
    return sessionTarget?.find(item => item.key === section)
  },
})

const AnchorNavigation = () => {
  const trigger = useScrollTrigger()
  const { selectedSection, changeSelectedSection } = useSessionsStore()

  const stickyTop = useMemo(() => (trigger ? "2rem" : NORMAL_HEADER_HEIGHT), [trigger])

  const handleClick = (sessionKey, sectionKey) => {
    changeSelectedSection(sectionKey)
    const targetEl = document.getElementById(`session-${sessionKey}-${sectionKey}`)
    const offsetTop = targetEl!.getBoundingClientRect().top + window.pageYOffset
    window.scrollTo({
      top: offsetTop - parseFloat(NORMAL_HEADER_HEIGHT) * 10 - 20,
      behavior: "smooth",
    })
  }

  const renderItems = (items, sessionKey) => {
    return items.map(({ icon, key, label }) => (
      <ListItemButton
        selected={key === selectedSection}
        sx={{
          py: "1.6rem",

          "&.Mui-selected": {
            color: "primary.main",
            backgroundColor: "unset",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "unset",
            },
          },
          "&:hover": {
            color: "primary.main",
            backgroundColor: "unset",
          },
        }}
        onClick={() => handleClick(sessionKey, key)}
      >
        <ListItemIcon sx={{ minWidth: "unset", mr: "0.8rem", color: "inherit" }}>
          <SvgIcon sx={{ fontSize: "2rem", color: "inherit" }} component={icon} inheritViewBox></SvgIcon>
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ sx: { fontSize: "1.6rem", lineHeight: "2.4rem", cursor: "pointer", color: "inherit", fontWeight: "inherit" } }}
        >
          {label}
        </ListItemText>
      </ListItemButton>
    ))
  }
  return (
    <List
      sx={{
        position: "sticky",
        top: stickyTop,
        backgroundColor: "themeBackground.normal",
        borderRadius: "1.6rem",
        width: "24rem",
        height: "min-content",
        py: "1.6rem",
      }}
    >
      {SESSIONS_SECTION.map(item => (
        <>
          <ListItem sx={{ fontSize: "2rem", lineHeight: "2.4rem", fontWeight: 600, py: "1.6rem" }}>{item.label}</ListItem>
          <>{renderItems(item.items, item.key)}</>
        </>
      ))}
    </List>
  )
}

export default AnchorNavigation
