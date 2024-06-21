import { Fragment, useEffect, useMemo } from "react"

import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, SvgIcon } from "@mui/material"
import useScrollTrigger from "@mui/material/useScrollTrigger"

// import { ReactComponent as ActivitiesSvg } from "@/assets/svgs/sessions/activities.svg"
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
      // {
      //   label: "Platform activities",
      //   key: "activities",
      //   icon: ActivitiesSvg,
      // },
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
    const [session, section] = prop.split("-").slice(1)
    const sessionTarget = target.find(item => item.key === +session)?.items
    return sessionTarget?.find(item => item.key === section)
  },
})

const AnchorNavigation = props => {
  const { mobile, onSeleted } = props
  const trigger = useScrollTrigger()
  const { selectedSection, changeSelectedSection } = useSessionsStore()

  const stickyTop = useMemo(() => (trigger ? "2rem" : NORMAL_HEADER_HEIGHT), [trigger])

  useEffect(() => {
    if (!mobile) {
      const callback: IntersectionObserverCallback = entries => {
        for (const entry of entries) {
          if (entry.intersectionRatio === 1 || entry.isIntersecting) {
            changeSelectedSection(entry.target.id)
            break
          }
        }
      }
      const observerOptions: IntersectionObserverInit = {
        rootMargin: "0px 0px -55%",
      }

      const sectionObserver = new IntersectionObserver(callback, observerOptions)
      document.querySelectorAll(".session-section").forEach(section => {
        sectionObserver.observe(section)
      })
      return () => sectionObserver.disconnect()
    }
  }, [mobile])

  const handleClick = (sessionKey, sectionKey) => {
    changeSelectedSection(`session-${sessionKey}-${sectionKey}`)

    const targetEl = document.getElementById(`session-${sessionKey}-${sectionKey}`)
    const offsetTop = targetEl!.getBoundingClientRect().top + window.pageYOffset

    window.scrollTo({
      top: offsetTop - parseFloat(mobile ? "11.2rem" : NORMAL_HEADER_HEIGHT) * 10 - 20,
      behavior: "smooth",
    })

    // targetEl?.scrollIntoView({
    //   behavior: "smooth",
    //   block: "start",
    // })

    onSeleted?.()
  }

  const renderItems = (items, sessionKey) => {
    return items.map(({ icon, key, label }) => (
      <ListItemButton
        key={key}
        selected={key === selectedSection.split("-")[2]}
        sx={[
          {
            py: ["1.2rem", "1.2rem", "1.6rem"],

            "&.Mui-selected": {
              color: "primary.main",
              backgroundColor: "unset",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "unset",
              },
            },
          },
          theme => ({
            [theme.breakpoints.up("md")]: {
              "&:hover": {
                color: "primary.main",
                backgroundColor: "unset",
              },
            },
          }),
        ]}
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
        borderRadius: ["0 0 0.8rem 0.8rem", "0 0 0.8rem 0.8rem", "1.6rem"],
        width: ["100%", "100%", "24rem"],
        height: "min-content",
        py: "1.6rem",
      }}
    >
      {SESSIONS_SECTION.map(item => (
        <Fragment key={item.key}>
          <ListItem sx={{ fontSize: ["1.6rem", "2rem"], lineHeight: "2.4rem", fontWeight: 600, py: ["1.2rem", "1.2rem", "1.6rem"] }}>
            {item.label}
          </ListItem>
          <>{renderItems(item.items, item.key)}</>
        </Fragment>
      ))}
    </List>
  )
}

export default AnchorNavigation
