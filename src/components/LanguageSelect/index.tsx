import { useMemo, useState } from "react"
import { makeStyles } from "tss-react/mui"

import { ButtonBase, Fade, ListItemIcon, ListItemText, Menu, MenuItem, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as GlobalSvg } from "@/assets/svgs/common/global.svg"
import { ReactComponent as LanguageCheckedSvg } from "@/assets/svgs/common/language-checked.svg"
import { ReactComponent as LanguageUncheckSvg } from "@/assets/svgs/common/language-uncheck.svg"
import { BLOG_LANGUAGE_LIST } from "@/constants"
import useUserLanguage from "@/hooks/useUserLanguage"

const useStyles = makeStyles<any>()((theme, { dark }) => ({
  button: {
    height: "3.6rem",
    width: "10rem",
    padding: "0 1.2rem",
    border: dark ? `1px solid ${theme.palette.primary.contrastText}` : "none",
    backgroundColor: dark ? "unset" : theme.palette.themeBackground.normal,
    color: dark ? theme.palette.primary.contrastText : "#473835",
    borderRadius: "0.5rem",
    justifyContent: "flex-start",
  },
  paper: {
    marginTop: "0.5rem",
    borderRadius: "0.5rem",
    border: dark ? `1px solid ${theme.palette.primary.contrastText}` : "none",
    backgroundColor: dark ? theme.palette.themeBackground.dark : theme.palette.themeBackground.normal,
  },
  list: {
    padding: 0,
  },
  listItem: {
    padding: "0.8rem 1.2rem",
    gap: "0.8rem",
  },
  listItemIcon: {
    minWidth: "unset !important",
  },
  listItemText: {
    fontSize: "1.6rem",
    fontFamily: "var(--developer-page-font-family)",
    cursor: "pointer",
    color: dark ? theme.palette.primary.contrastText : "#473835",
  },
}))

const LanguageSelect = props => {
  const { sx, dark } = props
  const { classes } = useStyles({ dark })

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const [language, setLanguage] = useUserLanguage()

  const currentLanguage = useMemo(() => {
    return BLOG_LANGUAGE_LIST.find(item => item.key === language)?.label
  }, [language])

  const open = useMemo(() => Boolean(anchorEl), [anchorEl])

  const handleClick = e => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleChangeLanguage = key => {
    setLanguage(key)
    handleClose()
  }

  return (
    <>
      <ButtonBase classes={{ root: classes.button }} sx={sx} onClick={handleClick}>
        <SvgIcon sx={{ fontSize: "1.6rem", mr: "0.8rem" }} component={GlobalSvg} inheritViewBox></SvgIcon>
        <Typography sx={{ fontSize: "1.6rem", fontFamily: "var(--developer-page-font-family)", cursor: "pointer" }}>{currentLanguage}</Typography>
      </ButtonBase>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} TransitionComponent={Fade} classes={{ paper: classes.paper, list: classes.list }}>
        {BLOG_LANGUAGE_LIST.map(({ label, key }) => (
          <MenuItem key={key} classes={{ root: classes.listItem }} onClick={() => handleChangeLanguage(key)}>
            <ListItemIcon classes={{ root: classes.listItemIcon }}>
              <SvgIcon sx={{ fontSize: "1.6rem" }} component={language === key ? LanguageCheckedSvg : LanguageUncheckSvg} inheritViewBox></SvgIcon>
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.listItemText }}>{label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default LanguageSelect
